import Jwt from "jsonwebtoken";
import { prisma } from "../config/prismaconfig.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = Jwt.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in User middelware",
    });
  }
};

//Admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await prisma.User.findUnique({ where: { id: req.user.id } });
    if (user.role == false) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
