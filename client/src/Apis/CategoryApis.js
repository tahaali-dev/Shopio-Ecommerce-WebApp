import axios from "axios";
import { toast } from "react-hot-toast";

// ------------------Imports----------------------------
export const apiUrl = axios.create({
  baseURL: "https://extinct-bee-khakis.cyclic.app",
});

//Get All Category---------------
export const getAllCats = async () => {
  try {
    const response = await apiUrl.get("/category/getall");
    if (response.data.success) {
      return response.data.category;
    } else {
      toast.error(response.data.message, "error in get api");
      console.log(response.data.message);
    }
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

//Add Category---------------
export const AddCats = async ({ name, Token }) => {
  try {
    const response = await apiUrl.post(
      "/category/create",
      { name },
      {
        headers: {
          Authorization: Token,
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      return response.data;
    } else {
      toast.error(response.data.message, "error in  api");
      console.log(response.data.message);
    }
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

//Delete Category---------------
export const DeleteCats = async ({ id, Token }) => {
  try {
    const response = await apiUrl.delete(`/category/delete/${id}`, {
      headers: {
        Authorization: Token,
      },
    });

    if (response.data.success) {
      toast.success(response.data.message);
      return response.data.category;
    } else {
      toast.error(response.data.message, "error in  api");
      console.log(response.data.message);
    }
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

//Update Category---------------
export const UpdateCats = async ({ name, Token, id }) => {
  try {
    const response = await apiUrl.put(
      `/category/update/${id}`,
      { name },
      {
        headers: {
          Authorization: Token,
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      return response.data;
    } else {
      toast.error(response.data.message, "error in api");
      console.log(response.data.message);
    }
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};
