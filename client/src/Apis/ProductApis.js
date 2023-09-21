import axios from "axios";
import { toast } from "react-hot-toast";

// ------------------Imports----------------------------
export const apiUrl = axios.create({
  baseURL: "http://localhost:3000",
});

//Get All Products---------------
export const getAllProducts = async () => {
  try {
    const response = await apiUrl.get("/product/get");
    if (response.data.success) {
      return response.data.products;
    } else {
      toast.error(response.data.message, "error in get api");
      console.log(response.data.message);
    }
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

// Create Product---------------
export const CreateProduct = async ({
  name,
  description,
  price,
  categoryId,
  quantity,
  image,
  Token,
}) => {
  console.log(Token);
  try {
    const response = await apiUrl.post(
      "/product/create",
      { name, description, price, categoryId, quantity, image, Token },
      {
        headers: {
          Authorization: Token,
          "Content-Type": "multipart/form-data",
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

// Update Product---------------
export const UpdateProduct = async ({
  name,
  description,
  price,
  categoryId,
  quantity,
  image,
  Token,
  id,
}) => {
  console.log(
    {
      name,
      description,
      price,
      categoryId,
      quantity,
      image,
      Token,
      id,
    },
    "data inside api log"
  );
  try {
    const response = await apiUrl.put(
      `/product/update/${id}`,
      { name, description, price, categoryId, quantity, image, Token },
      {
        headers: {
          Authorization: Token,
          "Content-Type": "multipart/form-data",
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
export const DeleteProducts = async (id) => {
  console.log(id, "id in api");
  try {
    const response = await apiUrl.delete(`/product/delete/${id}`);

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

//Get All Products---------------
export const FilterProducts = async ({ categoryIds, priceRange }) => {
  try {
    const response = await apiUrl.post("/product/product-filters", {
      categoryIds,
      priceRange,
    });
    if (response.data.success) {
      return response.data.products;
    } else {
      toast.error(response.data.message, "error in get api");
      console.log(response.data.message);
    }
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};
