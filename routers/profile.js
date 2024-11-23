const express = require("express");
const router = express.Router();
const User = require("../models/userModel")
const verifyToken = require("../middlewares/verifyTokenMW")
const profileController = require("../controllers/myProfileController")

router.get("/me", verifyToken ,profileController.showProfile);

module.exports = router;
