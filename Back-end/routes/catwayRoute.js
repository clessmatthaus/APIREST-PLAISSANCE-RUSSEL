const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createCatway } = require("../controllers/catwayController");
const router = express.Router();

router.post("/", protect, createCatway)



module.exports = router;