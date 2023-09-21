import slugify from "slugify";
import { prisma } from "../config/prismaconfig.js";
//Imports--------------

//Create Category
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.send({ message: "Name is required" });
    }

    //check category
    const result = await prisma.Category.findUnique({
      where: {
        name: name,
      },
    });
    console.log(result);

    if (result) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exisits",
      });
    }

    //creation of new category
    const dataSend = {
      name: name,
      slug: slugify(name),
    };

    const category = await prisma.Category.create({ data: dataSend });
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

//update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    

    const category = await prisma.Category.update({
      where: { id: id },
      data: {
        name: name,
        slug: slugify(name),
      },
    });

    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

// get all cat
export const categoryControlller = async (req, res) => {
  try {
    const category = await prisma.Category.findMany();
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await prisma.Category.findUnique({
      where: { slug: req.params.slug },
    });
    res.status(200).send({
      success: true,
      message: "Get Single Category Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};

//delete category
export const deleteCategoryCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.Category.delete({ where: { id: id } });
    res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};
