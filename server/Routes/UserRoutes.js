import express from "express";
import {
  LoginUser,
  regsiterUser,
  testController,
} from "../Controllers/UserControllers.js";
import { isAdmin, requireSignIn } from "../MiddleWares/authMiddleware.js";
//-------------------------------Imports----#
const router = express.Router();

router.post("/register", regsiterUser);
router.post("/login", LoginUser);
router.get("/test", requireSignIn,  testController);

export { router as UserRoutes };
