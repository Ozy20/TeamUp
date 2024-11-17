const express = require('express');
const app = express();
const port = process.env.PORT || 3008;
const registerRouter = require("./routers/register")

app.use(express.json());

app.use("/register",registerRouter)
app.listen(port,()=>{
    console.log(`hello ${port}`)
})