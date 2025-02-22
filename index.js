import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import  cors from 'cors';

dotenv.config();

const connectDB = async () => {
  try {
      await mongoose.connect('mongodb+srv://vinoth19rfc:Linux-199219@cluster0.frymi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
      console.log('MongoDB connected');
  } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1);
  }
};

connectDB();


//const __dirname = path.resolve();

const app = express();
//CORS configuration
const corsOptions = {
  origin: 'https://grand-kangaroo-2c0776.netlify.app', // Remove trailing slash
  credentials: true, // Allow cookies and authentication headers
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use(cors(corsOptions));

app.use(express.json());
//allow JSON data

app.use(cookieParser());
let PORT=3000;
app.listen( PORT, () => {
  console.log(`localhost ${PORT}!`);
});

app.use("/api/user", userRouter); //api/user
app.use("/api/auth", authRouter); //api/auth
app.use("/api/listing", listingRouter); //api/listing

// app.use(express.static(path.join(__dirname, "/client/dist")));
// 
// app.get("*", (req, res) => {
  // res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });

//Errors Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
