const User = require("../models/userModel")

const showProfile = async(req,res) => {   
    const id = req.user.userid;
    const user = await User.findById({_id:id}).select("-password"); //exclude the password field
    if(!user){
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ success: true, profile: user });

}

module.exports={showProfile}