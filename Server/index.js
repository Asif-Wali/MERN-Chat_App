const express= require ("express");
const cors = require ("cors");
const mongoose= require("mongoose");
const app= express();
const userRoutes=require("./routes/userRoutes")
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes)
mongoose.connect(process.env.Mongo_URL).then(()=>{
    console.log(`DB connection successful`);
}).catch((err)=>{
    console.log(err.message)
})
const server= app.listen(process.env.Port, ()=>{
    console.log(`Server Started on port ${process.env.Port}`)
});
