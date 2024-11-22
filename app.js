const express = require('express');
const app = express();
const port = process.env.PORT || 3008;
const registerRouter = require("./routers/register")
const profileRouter = require("./routers/profile")
const LoginRouter = require("./routers/login")
require('dotenv').config({ path: './config/development.json' });

app.use(express.json());

app.use("/register",registerRouter)
app.use("/",LoginRouter)
app.use("/profile",profileRouter)

app.listen(port,()=>{
    console.log(`hello ${port}`)
})