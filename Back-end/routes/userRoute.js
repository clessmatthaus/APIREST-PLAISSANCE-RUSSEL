const express = require("express");
const {registerUser, loginUser, logout, getUser, connected, updateUser, changePassword}  = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", protect, getUser);
router.get("/connected", connected);
router.patch("/updateuser", protect, updateUser);
router.patch("/changepassword", protect, changePassword)

module.exports = router;