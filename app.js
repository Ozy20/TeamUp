const express = require('express');
const app = express();
const port = process.env.PORT || 3008;


app.listen(port,()=>{
    console.log(`hello ${port}`)
})