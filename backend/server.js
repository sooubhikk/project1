import path from 'path';
import express from "express"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";



const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); // for parsing application/json
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)
app.use("/api/users",userRoutes)

app.use(express.static(path.join(__dirname,"/frontend/vite-project/dist")));

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"/frontend/vite-project/dist/index.html"))
})

//app.get("/",(req,res)=>{
  //res.send("Hello Broth");
//})


server.listen(PORT,()=>{
  connectToMongoDB();
  console.log(`server is running on port ${PORT}`)
});