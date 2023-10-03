import axios from "axios";
import { toast } from "react-hot-toast";

// ------------------Imports----------------------------
export const apiUrl = axios.create({
  baseURL: "https://uninterested-tan-centipede.cyclic.cloud",
});

//User Register-------------------------------
export const UserRegister = async ({
  username,
  email,
  password,
  phone,
  address,
}) => {
  try {
    const response = await apiUrl.post("/user/register", {
      username,
      email,
      password,
      phone,
      address,
    });
    if (response.data.success) {
      toast.success("Register Success");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      return response;
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

//User Login-------------------------------
export const UserLogin = async ({ email, password }) => {
  try {
    const response = await apiUrl.post("/user/login", {
      email,
      password,
    });

    if (response.data.success) {
      toast.success(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      return response;
    } else {
      console.log(response.data.message, "loging error");
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};
