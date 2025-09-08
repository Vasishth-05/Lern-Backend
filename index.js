const express = require('express')
require('dotenv').config();

const app = express();

const port = process.env.PORT;

app.get('/', function(req,res){
    res.send(
        "Hare krsna"
    )
})

app.listen(port, () => {
    console.log(`Server is listening on the Port ${port}`);
})