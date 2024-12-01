const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { connect } = require("@hyperledger/fabric-gateway");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const multer = require("multer");
const { TextDecoder } = require("util");
const { newIdentity, newSigner, newGrpcConnection } = require("./Middleware");

const prisma = new PrismaClient();

// Constants for Pinata
const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NDk3ZmFhYy1jMjA4LTQzM2MtYjY2Mi1iNjBmMzhjOTNmMTQiLCJlbWFpbCI6IjIxMzE5MEBzdHVkZW50cy5hdS5lZHUucGsiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiM2E4NjliYmQyNGYwZjAwOTgwZjEiLCJzY29wZWRLZXlTZWNyZXQiOiJhYjgzY2YwMzczNGI0NzI3NzQ5MzQ3ODlmZWQwZDU5MTA2Y2YxZDY0ZmE3YzQ0NjExYzIzYWRjYmRkNzVlOTUyIiwiaWF0IjoxNzI2MDg4MTg2fQ.4GSXNz81TBuorgQdoSgUf3OkKR_13I7ou_CVcrLk4og";

// Middleware for handling file uploads
const upload = multer({ dest: "uploads/" });

// Register user in database
async function registerUserInDatabase(req, res) {
  try {
    const {
      first_name,
      last_name,
      //   cnic,  // Extracted for Hyperledger (but not used in Prisma)
      street_address,
      city,
      country,
      gender,
      date_of_birth,
      marital_status,
      phone_number,
      email,
      emergency_contact_name,
      emergency_contact_phone,
      emergency_contact_relationship,
      employment_status,
      government_department,
      government_designation,
      company_name,
      job_title,
      salary,
      business_name,
      business_type,
      annual_income,
    } = req.body;

    // Basic validation for required fields
    if (!first_name || !last_name || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new user record in the database
    const newUser = await prisma.insuranceBuyer.create({
      data: {
        first_name,
        last_name,
        //   cnic,  // Extracted for Hyperledger (but not used in Prisma)
        street_address,
        city,
        country,
        gender,
        date_of_birth,
        marital_status,
        phone_number,
        email,
        emergency_contact_name,
        emergency_contact_phone,
        emergency_contact_relationship,
        employment_status,
        government_department,
        government_designation,
        company_name,
        job_title,
        salary,
        business_name,
        business_type,
        annual_income,
      },
    });

    res.status(200).json({
      message: "User Registered Successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Server Error");
  }
}

// Create asset on Hyperledger
async function assetOnHyperledger(req, res) {
  const { user_img, cnic } = req.body;

  if (!cnic) {
    return res.status(400).json({ error: "Missing required field: cnic" });
  }

  let client, gateway;
  try {
    client = await newGrpcConnection();
    gateway = connect({
      client,
      identity: await newIdentity(),
      signer: await newSigner(),
      evaluateOptions: () => ({ deadline: Date.now() + 5000 }),
      endorseOptions: () => ({ deadline: Date.now() + 15000 }),
      submitOptions: () => ({ deadline: Date.now() + 5000 }),
      commitStatusOptions: () => ({ deadline: Date.now() + 60000 }),
    });

    const network = gateway.getNetwork("mychannel");
    const contract = network.getContract("basic");

    // Submit transaction to create asset
    await contract.submitTransaction("createAsset", cnic, user_img);

    res.status(201).json({ message: "Asset created successfully" });
  } catch (error) {
    console.error("Failed to create asset:", error);
    res.status(500).json({ error: error.message });
  } finally {
    if (gateway) gateway.close();
    if (client) client.close();
  }
}

// Upload file to IPFS
router.post("/uploadFile", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  const originalName = req.file.originalname;

  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath));
  formData.append("pinataMetadata", JSON.stringify({ name: originalName }));
  formData.append("pinataOptions", JSON.stringify({ cidVersion: 0 }));

  try {
    const pinataResponse = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${JWT}`,
        },
      }
    );

    if (!pinataResponse.data || !pinataResponse.data.IpfsHash) {
      throw new Error("Failed to upload file to IPFS");
    }

    const user_img = pinataResponse.data.IpfsHash;
    fs.unlinkSync(filePath);

    res.status(200).json({ user_img });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Error uploading file to IPFS" });
  }
});

// Read all assets
async function readAllAssets(req, res) {
  const client = await newGrpcConnection();
  const gateway = connect({
    client,
    identity: await newIdentity(),
    signer: await newSigner(),
    evaluateOptions: { deadline: Date.now() + 5000 },
  });

  try {
    const network = gateway.getNetwork("mychannel");
    const contract = network.getContract("basic");
    const resultBytes = await contract.evaluateTransaction("readAllAssets");

    if (!resultBytes || resultBytes.length === 0) {
      throw new Error("No assets found");
    }

    const resultString = new TextDecoder().decode(resultBytes);
    console.log("Decoded result from chaincode:", resultString);

    let assets = JSON.parse(resultString);

    res.status(200).json(assets);
  } catch (error) {
    console.error("Error reading assets:", error.message);
    res.status(500).json({ error: error.message });
  } finally {
    gateway.close();
    client.close();
  }
}

module.exports = {
  registerUserInDatabase,
  assetOnHyperledger,
  readAllAssets,
  router,
};
