const router = require("express").Router();
const { PrismaClient } = require('@prisma/client');
const authorization = require("../middleware/authorization.js");

const prisma = new PrismaClient();

router.get("/", authorization, async (req, res) => {
  try {
    const userId = req.user;
    const user = await prisma.user.findUnique({
      where: { user_id: userId },
    });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
