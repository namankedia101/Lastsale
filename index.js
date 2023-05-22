import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js"
import productRoutes from "./routes/products.js";
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

dotenv.config();

app.use(express.json({ extended: true, limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin",  req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    if ("OPTIONS" == req.method) {
      res.send(200);
    } else {
      next();
    }
  });

app.use("/user",userRoutes);
app.use("/products",productRoutes);

app.get("/api",(req,res)=>{
  res.send("Welcome to Amazon Clone API");
})

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 5000;
mongoose
.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() =>
    app.listen(PORT, () => console.log("Server is running on port:"+ PORT))
  )
  .catch((error) => console.log(error.message));