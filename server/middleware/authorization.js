const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        const jwttoken = req.header("token");
        if (!jwttoken) {
            return res.status(403).json("Not yet Authorized");
        }
        const payload = jwt.verify(jwttoken, process.env.jwtSecret);
        req.user = payload.user;
        next(); 
    } catch (err) {
        console.error(err.message);
        return res.status(403).json("Not Authorized");
    }
};
