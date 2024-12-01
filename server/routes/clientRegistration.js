const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo.js');
const authorization = require('../middleware/authorization.js');
const axios = require('axios');

const prisma = new PrismaClient();

// Register Route
router.post('/registerUser', validInfo, async (req, res) => {
    try {
        const {
            org,
            userId,
            cnic,
            affiliation,
            attributes,
            user_password,
            user_name,
        } = req.body;

        // Check if user already exists
        const existingUser = await prisma.client.findUnique({
            where: { userId },
        });

        if (existingUser) {
            return res
                .status(401)
                .send('User Already Exists. Try With Another Email');
        }

        // Hash the user password
        const bcryptPassword = await bcrypt.hash(user_password, 10);

        // Create new user
        const newUser = await prisma.client.create({
            data: {
                org,
                userId,
                cnic,
                affiliation,
                attributes: JSON.stringify(attributes),
                user_password: bcryptPassword,
                user_name,
            },
        });

        const token = jwtGenerator(newUser.userId);

        // Parse the attributes field for a clean response
        const parsedUser = {
            ...newUser,
            attributes: JSON.parse(newUser.attributes),
        };

        // Send success response with the token and user's data
        res.status(200).json({
            message: 'User Registered Successfully',
            token,
            data: parsedUser,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Login Route
router.post('/userlogin', validInfo, async (req, res) => {
    try {
        const { cnic, user_password } = req.body;

        // Find user by userId
        const client = await prisma.client.findUnique({
            where: { cnic },
        });

        if (!client) {
            return res.status(401).send('Invalid Password And Email');
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(
            user_password,
            client.user_password
        );
        if (!validPassword) {
            return res.status(401).send('Invalid Password And Email');
        }

        const token = jwtGenerator(client.cnic);

        // Make an external API call
        const response = await axios.post(
            'http://localhost:5000/insurance_buy/datapass',
            {
                cnic: client.cnic, // Send the userId
            }
        );

        if (client.cnic) {
            // Send the successful response with token and additional data
            res.json({ token, data: response.data, org: client.org });
        } else {
            res.status(404).json({ error: 'User ID not found' });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Server Error');
    }
});

// Verification Route
router.get('/is-verify', authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
