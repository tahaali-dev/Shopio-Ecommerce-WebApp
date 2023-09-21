import { prisma } from "../config/prismaconfig.js";
import { ComparePass, hashPassword } from "../Helpers/hash.js";
import Jwt from "jsonwebtoken";
//-------------Imports-------------------

//register User POST REQ (/user/register)
export const regsiterUser = async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;
    //validations----------
    if (!username) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    //check user
    const exisitingUser = await prisma.User.findUnique({
      where: { email: email },
    });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const dataSend = {
      username,
      email,
      phone,
      address,
      password: hashedPassword,
    };

    const NewUser = await prisma.User.create({ data: dataSend });

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user: {
        id: NewUser.id,
        name: NewUser.username,
        email: NewUser.email,
        phone: NewUser.phone,
        address: NewUser.address,
        role: NewUser.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//Login User POST REQ (/user/login)
export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //Check User
    const CheckUser = await prisma.User.findUnique({ where: { email: email } });
    if (!CheckUser) {
      return res.send({
        success: false,
        message: "You Are Not Registered",
      });
    }
    const match = await ComparePass(password, CheckUser.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //Creating Token
    const token = await Jwt.sign({ id: CheckUser.id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        id: CheckUser.id,
        name: CheckUser.username,
        email: CheckUser.email,
        phone: CheckUser.phone,
        address: CheckUser.address,
        role: CheckUser.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
