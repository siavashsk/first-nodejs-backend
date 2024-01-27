const ProductModel = require("../models/ProductModel");
const {
  getItemsList,
  getItem,
  deleteItem,
  updateItem,
} = require("./dynamicController");

const productList = async (req, res, next) => {
  getItemsList(req, res, next, "product", ProductModel);
};

const addProduct = async (req, res, next) => {
  try {
    const { avatar, type, value, isActive } = req.body;
    const newProduct = new ProductModel({
      avatar,
      type,
      value,
      isActive,
    });
    await newProduct.save();
    res.status(201).send({
      success: true,
      message: "New product created successfuly",
      newProduct,
    });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  getItem(req, res, next, "product", ProductModel);
};

const deleteProduct = async (req, res, next) => {
  deleteItem(req, res, next, "product", ProductModel);
};

const updateProduct = async (req, res, next) => {
  updateItem(req, res, next, "product", ProductModel);
};

module.exports = {
  productList,
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
};
