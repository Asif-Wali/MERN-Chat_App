const express= require ("express");
const cors = require ("cors");
const mongoose= require("mongoose");
const app= express();
const userRoutes=require("./routes/userRoutes")
const messageRoutes=require("./routes/messagesRoutes")
const socket= require("socket.io");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes);
app.use("/api/messages/", messageRoutes);

mongoose.connect(process.env.Mongo_URL).then(()=>{
    console.log(`DB connection successful`);
}).catch((err)=>{
    console.log(err.message)
})
const server= app.listen(process.env.Port, ()=>{
    console.log(`Server Started on port ${process.env.Port}`)
});

const io=socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true,
    }
});
global.onlineUsers=new Map();
io.on("connecion",(socket)=>{
        global.chatSocket=socket;
        socket.on("add-user",(userId)=>{
            console.log(userId)
        online.Users.set(userId,socket.id);
        });
    socket.on("send-msg",(data)=>{
        const sendUserSocket=onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-received", data.message)
        }
    })
})