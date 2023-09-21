import express from "express";
import { isAdmin, requireSignIn } from "../MiddleWares/authMiddleware.js";
import { categoryControlller, createCategoryController, deleteCategoryCOntroller, singleCategoryController, updateCategoryController } from "../Controllers/CategoryControllers.js";
//-------------------------------Imports----#
const router = express.Router();

router.post(
  "/create",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//getALl category
router.get("/getall", categoryControlller);

//single category
router.get("/getsingle/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);

export { router as CategoryRoute };
