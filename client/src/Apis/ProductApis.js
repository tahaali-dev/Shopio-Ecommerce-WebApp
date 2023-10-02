import axios from "axios";
import { toast } from "react-hot-toast";

// ------------------Imports----------------------------
export const apiUrl = axios.create({
  baseURL: "https://e-commerce-server-f8m6.onrender.com",
});
export const apiUrltest = axios.create({
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

//Get filter Products---------------
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

//Get Single Products---------------
export const getSingleProducts = async (slug) => {
  // console.log(slug);
  try {
    const response = await apiUrl.get(`product/Singleproduct/${slug}`);
    // console.log(response, "response in Api");
    if (response.data.success) {
      return response.data.product;
    } else {
      toast.error(response.data.message, "error in get api");
      console.log(response.data.message);
    }
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

// CheckOut Product---------------
export const CheckoutProduct = async ({
  products,
  payment,
  buyerId,
  status,
  user,
}) => {
  try {
    const {
      data: { order },
    } = await apiUrl.post(
      "/product/checkout",
      { payment },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const {
      data: { key },
    } = await apiUrl.get("/product/getkey");

    //Options
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: user.name,
      // description: "Tutorial of RazorPay",
      image: "/logo.png",
      order_id: order.id,
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
      },
      notes: {
        address: user.address,
      },

      handler: async function (response) {
        if (response) {
          const response2 = await apiUrltest.post("/product/orderCreation", {
            products,
            payment,
            buyerId,
            status,
            user,
          });

          localStorage.removeItem("cartItems");
          toast.success("Payment Succeeded");
          window.open("/", "_self");
        }
      },
      theme: {
        color: "#121212",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert("Payment Failed");
    });
    rzp1.open();
  } catch (error) {
    // toast.error(error.message);
    console.log(error);
    throw error;
  }
};

//Get All Orders---------------
export const getAllOrders = async (id) => {
  try {
    const response = await apiUrltest.get(`/product/getorders/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};
