const express = require('express');
const { PrismaClient } = require('@prisma/client');
const grpc = require('@grpc/grpc-js');
const { signers } = require('@hyperledger/fabric-gateway');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs').promises;

const prisma = new PrismaClient();
const router = express.Router();
const { updatePaths, setOrgConfiguration } = require('./directory');

const channelName = process.env.CHANNEL_NAME || 'mychannel';
const chaincodeName = process.env.CHAINCODE_NAME || 'basic';
// Paths and Identity Information (initialized here for later use)
let paths = {};
let peerEndpoint = '';
let peerHostAlias = '';
let mspId = '';

// Fetch user data by CNIC and set paths, TLS, and certs
async function userData(req, res) {
    const { cnic } = req.body;
    if (!cnic) {
        return res.status(400).json({ error: 'User CNIC is required' });
    }
    try {
        // Fetch user data from the database
        const user = await prisma.client.findUnique({
            where: { cnic },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Determine the organization from the fetched user data
        const org = user.org;
        // Update paths based on the CNIC and organization
        paths = updatePaths(cnic, org);

        // Set the organization-specific configuration (e.g., peer endpoint, MSP ID)
        const orgConfig = setOrgConfiguration(org);
        peerEndpoint = orgConfig.peerEndpoint;
        peerHostAlias = orgConfig.peerHostAlias;
        mspId = orgConfig.mspId;

        // Display input parameters for debugging or logging purposes
        displayInputParameters();

        // Respond with the CNIC as confirmation
        res.json({ cnic });
    } catch (err) {
        console.error('Error in userData:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Function to establish a new gRPC connection
async function newGrpcConnection() {
    const tlsRootCert = await fs.readFile(paths.tlsCertPath);
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
    return new grpc.Client(peerEndpoint, tlsCredentials, {
        'grpc.ssl_target_name_override': peerHostAlias,
    });
}

// Function to retrieve identity credentials
async function newIdentity() {
    const certPath = await getFirstDirFileName(paths.certDirectoryPath);
    const credentials = await fs.readFile(certPath);
    return { mspId, credentials };
}

// Helper function to get the first file name from a directory
async function getFirstDirFileName(dirPath) {
    const files = await fs.readdir(dirPath);
    const file = files[0];
    if (!file) {
        throw new Error(`No files in directory: ${dirPath}`);
    }
    return path.join(dirPath, file);
}

// Function to create a new signer using a private key
async function newSigner() {
    const keyPath = await getFirstDirFileName(paths.keyDirectoryPath);
    const privateKeyPem = await fs.readFile(keyPath);
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    return signers.newPrivateKeySigner(privateKey);
}

// Log input parameters (debugging purposes)
function displayInputParameters() {
    console.log(`channelName:       ${channelName}`);
    console.log(`chaincodeName:     ${chaincodeName}`);
    console.log(`mspId:             ${mspId}`);
    console.log(`cryptoPath:        ${paths.cryptoPath}`);
    console.log(`keyDirectoryPath:  ${paths.keyDirectoryPath}`);
    console.log(`certDirectoryPath: ${paths.certDirectoryPath}`);
    console.log(`tlsCertPath:       ${paths.tlsCertPath}`);
    console.log(`peerEndpoint:      ${peerEndpoint}`);
    console.log(`peerHostAlias:     ${peerHostAlias}`);
}

// Export the necessary functions for use in other files
module.exports = {
    updatePaths,
    userData,
    newSigner,
    newIdentity,
    newGrpcConnection,
};
