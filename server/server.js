import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { UserRoutes } from "./Routes/UserRoutes.js";
import { CategoryRoute } from "./Routes/CategoryRoutes.js";
import { ProductRoutes } from "./Routes/ProductRoute.js";
import Razorpay from "razorpay";
//-------------Imports-------------------

// App Uses ----------
const app = express();
app.use(express.json());
app.use(express.static("uploads"));
app.use(cors());

//Server Test
app.get("/", (req, res) => {
  res.send("Hey,Your Server Is Up ");
});

export const instance = new Razorpay({
  key_id: process.env.KEYID,
  key_secret: process.env.KEYSECRET,
});

//Setting Listen
const Port = process.env.PORT || 3000;
app.listen(Port, () => {
  console.log("Server Is Running On Port", Port);
});

//Base Routes
app.use("/user", UserRoutes);
app.use("/category", CategoryRoute);
app.use("/product", ProductRoutes);
