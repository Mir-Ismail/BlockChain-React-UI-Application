const express = require("express");
const router = express.Router();
const {
  registerUserInDatabase,
  assetOnHyperledger,
  readAllAssets,
} = require("./buyer");
const { userData } = require("./Middleware");
// Register route for user it is /info
router.post("/register", registerUserInDatabase);

// Create Asset Route
router.post("/createAsset", assetOnHyperledger);

router.get("/readAllAssets", readAllAssets);

router.post("/datapass", userData);

module.exports = router;
