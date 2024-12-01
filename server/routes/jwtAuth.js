// routes/auth.js
const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const axios = require('axios');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo.js');
const authorization = require("../middleware/authorization.js");

const prisma = new PrismaClient();

router.post("/register", validInfo, async (req, res) => {
    try {
        const { user_name, user_email, user_password, user_phone } = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { user_email }
        });

        if (existingUser) {
            return res.status(401).send("User Already Exists. Try With Another Email");
        }

        // Hash the password
        const bcryptPassword = await bcrypt.hash(user_password, 10);

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                user_name,
                user_email,
                user_phone,
                user_password: bcryptPassword,
            }
        });

        // Generate JWT token
        const token = jwtGenerator(newUser.user_id);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


router.post("/login", validInfo, async (req, res) => {
    try {
      const { user_email, user_password } = req.body;
  
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { user_email },
      });
  
      if (!user) {
        return res.status(401).send("Invalid Password And Email");
      }
  
      // Compare passwords
      const validPassword = await bcrypt.compare(user_password, user.user_password);
      if (!validPassword) {
        return res.status(401).send("Invalid Password And Email");
      }
  
      const token = jwtGenerator(user.user_id);
  
      const response = await axios.post('http://localhost:5000/datapass', {
        user_email: user.user_email // Send the user_email
      });

      res.send(response.data);
      if (user.user_email) {
      // res.json({ token, user_email: user.user_email.user_email });
      } else {
        res.status(404).json({ error: 'User email not found' });
      }

    } catch (err) {
      console.error('Error:', err);
      res.status(500).send("Server Error");
    }
  });

router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post("/data", async (req, res) => {
    const { user_email } = req.body; // Assuming user_email is provided in the request body
    try {
        const user = await prisma.user.findUnique({
            where: { user_email }, // Use user_email as the unique identifier
            include: {
                insuranceBuyer: true,
            },
        });

        if (!user) {
            return res.json({ users: [] }); // Handle case where user is not found
        }

        const responseData = {
            user_email: user.user_email,
            insuranceDetails: user.insuranceBuyer,
        };

        res.json({ users: [responseData] }); // Return user data
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error"); // Handle server error
    }
});

module.exports = router;
