const express = require("express");
const app = new express();
const cors =require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
app.use(cors());

app.use(express.json());


const dbPort = process.env.DB_URL;


mongoose.connect(dbPort).then((res)=>{
    console.log(`Database connceted successfully`)
}).catch((e)=>{
    console.log(`Database connected fail`);
})




const router = require("./src/routes/api");

app.use("/api/v1", router);










module.exports = app;