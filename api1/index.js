import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import roomsRoute from "./routes/rooms.js"
import hotelsRoute from "./routes/hotels.js"
import usersRoute from "./routes/users.js"
import cookieParser from "cookie-parser"
import cors from "cors"





const app = express();
dotenv.config();

const connect = async () => {
    
    
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB");
        
    } catch(error){
        throw error;
    }
}

mongoose.connection.on("dissconnectd" , () => {
    console.log("mongDB is disconnected");
    
})
mongoose.connection.on("connectd" , () => {
    console.log("mongDB is connected");
})

app.get("/users" , (req,res) => {
    res.send("Hello first requst")
})

//middlewares

app.use(cors({ origin: "http://localhost:3000" }));

app.use(cookieParser());

//1st viste
// app.use((req,res,next) => {
//     console.log("Hay i am a middleware");
//     next() // allowing to go to next middlewere
// })
app.use(express.json());

app.use("/api/auth" , authRoute);
app.use("/api/users" , usersRoute);
app.use("/api/hotels" , hotelsRoute);
app.use("/api/rooms" , roomsRoute);

app.use((err,req,res,next) => {

    const errorStatus = err.status || 500
    const errorMessage = err.message || "Somwthing Went Wrong"

    return res.status(errorStatus).json({
        sussess : false,
        status : errorStatus,
        message : errorMessage,
        stack : err.stack,
    })
})

    app.listen(8800 , () => {
        connect();
        console.log("Connected to backend");
})