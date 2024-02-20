const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createCatway, getCatways, getCatway, deleteCatway, updateCatway } = require("../controllers/catwayController");
const { upload } = require("../utils/fileUpload");
const router = express.Router();


router.post("/", protect, upload.single("image"), createCatway)
router.get("/", protect, getCatways)
router.get("/:id", protect, getCatway)
router.delete("/:id", protect, deleteCatway)
router.put("/:id", protect, upload.single("image"), updateCatway)


module.exports = router;