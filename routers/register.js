const express = require("express");
const router = express.Router();
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const config = require("config")

//terminating the process if the towken is not set 
if (!config.get("jwtsec")) {
    console.log("");
    process.exit(0);
}
//register
router.post("/",  async (req, res) => {

    try {
        let user = await User.findOne({ email: req.body.email }).exec();
        if (user) {
            res.status(403).send("User already exists");
        } else {
            // Create a new user since no existing user was found
            let hashedPass = await bcrypt.hash(req.body.password, 10)
            user = new User({ name: req.body.name, email: req.body.email, password: hashedPass ,userRole:req.body.userRole}); // Pass user data to create a new user
            await user.save(); // Save the new user
            const token = user.genAuthToken();
            console.log(token);
            res.header("log-header-x", token)
            res.status(200).send({ message: "User added", data: { name: user.name, email: user.email } });

        }
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(403).send("Could not add the user");
    }
});




module.exports = router;
