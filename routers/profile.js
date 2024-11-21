const express = require("express");
const router = express.Router();
const User = require("../models/userModel")
const verifyToken = require("../middlewares/verifyTokenMW")

router.get("/me", verifyToken ,async(req,res) => {   
    const id = req.user.userid;
    const user = await User.findById({_id:id}).select("-password");
    if(!user){
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ success: true, profile: user });

});

module.exports = router;
