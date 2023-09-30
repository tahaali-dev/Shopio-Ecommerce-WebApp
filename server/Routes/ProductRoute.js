import express from "express";
import { isAdmin, requireSignIn } from "../MiddleWares/authMiddleware.js";
import multer from "multer";
import {
  Checkout,
  CreateProduct,
  deleteProductController,
  getProductController,
  getSingleProductController,
  paymentVerification,
  productFiltersController,
  updateProductController,
} from "../Controllers/ProductControllers.js";
//-------------------------------Imports----
const router = express.Router();

//Multer Disk Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Destination directory for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Custom file naming strategy
  },
});
const upload = multer({ storage: storage });

//Routes--------
//create Product
router.post(
  "/create",
  upload.single("image"),
  requireSignIn,
  isAdmin,
  CreateProduct
);

//update Product
router.put(
  "/update/:id",
  requireSignIn,
  isAdmin,
  upload.single("image"),
  updateProductController
);

//get products
router.get("/get", getProductController);

//single product
router.get("/Singleproduct/:slug", getSingleProductController);

//delete product
router.delete("/delete/:id", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//CheckOut route
router.post("/checkout", Checkout);
router.post("/paymentverification", paymentVerification);

router.get("/getkey", (req, res) => {
  res.send({
    message: "success",
    key: process.env.KEYID,
  });
});

export { router as ProductRoutes };
