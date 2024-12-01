const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get roles
router.get("/", async (req, res) => {
    try {
        const roles = await prisma.role.findMany();
        res.json(roles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error no role");
    }
});

router.post("/create_role", async (req, res) => {
    try {
        const { user_role } = req.body;

        if (!user_role || user_role.trim() === '') { // Check if roles is empty or whitespace
            return res.status(400).send("Role name is required.");
        }

        // Check if role exists
        const existingRole = await prisma.role.findUnique({
            where: {
                user_role: user_role // Assuming 'user_role' is the correct identifier
            }
        });

        if (existingRole) {
            return res.status(409).send("Role Already Exists.");
        }

        // Create new role
        const newRole = await prisma.role.create({
            data: {
                user_role: user_role // Assuming 'user_role' is the correct identifier
            }
        });

        // Send response for successful creation
        res.status(201).json({
            message: `Role '${user_role}' created successfully.`,
            role: newRole
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Delete Role
router.delete("/delete_role/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Check if role exists
        const role = await prisma.role.findUnique({
            where: { role_id: id }
        });

        if (!role) {
            return res.status(404).send("Role Not Found.");
        }

        // Delete the role
        await prisma.role.delete({
            where: { role_id: id }
        });

        // Send response for successful deletion
        res.status(200).json({
            message: `Role with ID ${id} deleted successfully.`,
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;
