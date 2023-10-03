import slugify from "slugify";
import { prisma } from "../config/prismaconfig.js";
import { instance } from "../server.js";
//imports--------------------

//Create Products ----------------
export const CreateProduct = async (req, res) => {
  //Getting file Name From Multer
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  //try Catch
  try {
    const { name, description, price, categoryId, quantity, shipping } =
      req.body;

    //validation--------------
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !categoryId:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
    }

    //Creating New Products------------
    const dataSend = {
      name,
      description,
      price,
      categoryId,
      quantity,
      shipping,
      image: req.file.filename,
      slug: slugify(name),
    };
    const products = await prisma.Product.create({ data: dataSend });

    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await prisma.Product.findMany({
      // take: 12,
      orderBy: { createdAt: "desc" },
      include: {
        Category: true, // Include the category relation
      },
    });

    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await prisma.Product.findUnique({
      where: { slug: req.params.slug },
      include: {
        Category: true,
      },
    });

    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await prisma.Product.delete({ where: { id: req.params.id } });
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate product
export const updateProductController = async (req, res) => {
  //Getting file Name From Multer
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const { name, description, price, categoryId, quantity, shipping } =
      req.body;

    //validation--------------
    switch (true) {
      case !name:
        return res.send({ error: "Name is Required" });
      case !description:
        return res.send({ error: "Description is Required" });
      case !price:
        return res.send({ error: "Price is Required" });
      case !categoryId:
        return res.send({ error: "Category is Required" });
      case !quantity:
        return res.send({ error: "Quantity is Required" });
    }

    //Creating New Products------------
    const dataSend = {
      name,
      description,
      price,
      categoryId,
      quantity,
      shipping,
      image: req.file.filename,
      slug: slugify(name),
    };
    const products = await prisma.Product.update({
      where: { id: req.params.id },
      data: dataSend,
    });

    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update product",
    });
  }
};

// filters
export const productFiltersController = async (req, res) => {
  try {
    const { categoryIds, priceRange } = req.body;

    console.log("Received categoryIds:", categoryIds);
    console.log("Received priceRange:", priceRange);

    const [minPrice, maxPrice] = priceRange.split(",").map(parseFloat);

    console.log("Parsed priceRange:", minPrice, maxPrice);

    const products = await prisma.Product.findMany({
      where: {
        AND: [
          categoryIds.length > 0 ? { categoryId: { in: categoryIds } } : {},
          !isNaN(minPrice) && !isNaN(maxPrice)
            ? {
                price: {
                  gte: minPrice.toString(),
                  lte: maxPrice.toString(),
                },
              }
            : {},
        ],
      },
    });

    console.log("Filtered products:", products);

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Error while filtering products",
      error: error.message,
    });
  }
};

// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};
//Checkout Controller
// export const Checkout = async (req, res) => {
//   const { products, payment, buyerId, status } = req.body;

//   var options = {
//     amount: payment * 100,
//     currency: "INR",
//     receipt: "order_rcptid_11",
//     payment_capture: 1,
//   };

//   try {
//     const order = await instance.orders.create(options);

//     if (order) {
//       // Create the order using Prisma
//       const createdOrder = await prisma.Order.create({
//         data: {
//           products: {
//             connect: products.map((productId) => ({ id: productId })),
//           },
//           payment,
//           buyer: { connect: { id: buyerId } },
//           status,
//         },
//       });

//       res.status(200).json({
//         success: true,
//         single: order,
//         createdOrder: createdOrder,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// };

//Checkout Controller
export const Checkout = async (req, res) => {
  const { payment } = req.body;

  var options = {
    amount: payment * 100,
    currency: "INR",
    receipt: "order_rcptid_11",
    payment_capture: 1,
  };

  try {
    const order = await instance.orders.create(options);

    res.status(200).send({
      message: "success",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//Order Creation Route
export const orderCreation = async (req, res) => {
  const { products, payment, buyerId, status } = req.body;
  try {
    // Create the order using Prisma
    const createdOrder = await prisma.Order.create({
      data: {
        products,
        payment,
        buyer: { connect: { id: buyerId } },
        status,
      },
    });

    res.status(200).json({
      success: true,
      createdOrder: createdOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Get orders for a specific user with product details
export const GetUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract user ID from URL parameter

    const userOrders = await prisma.Order.findMany({
      where: {
        buyerId: userId,
      },
    });

    res.status(200).json(userOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//delete order controller
export const deleteOrder = async (req, res) => {
  try {
    await prisma.Order.delete({ where: { id: req.params.id } });
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

// Get All orders
export const GetAllOrders = async (req, res) => {
  try {
    const userOrders = await prisma.Order.findMany();

    res.status(200).json(userOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// order status Update
export const orderStatusUpdate = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Use Prisma to update the order status
    const updatedOrder = await prisma.Order.update({
      where: { id: orderId },
      data: { status },
    });

    res.status(201).send({
      success: true,
      message: "Product Status Updated  Successfully",
      updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error While Updating Order",
      error,
    });
  } finally {
    await prisma.$disconnect(); 
  }
};
