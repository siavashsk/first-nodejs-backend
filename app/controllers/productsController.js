const ProductModel = require("../models/ProductModel");

const productList = async (req, res, next) => {
  try {
    const products = await ProductModel.find({});
    res.send({
      success: true,
      message: "Products list generated successfuly",
      data: { products },
    });
  } catch (error) {
    next();
  }
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
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .send({ error: true, message: "There is no product with this id" });
    }
    const product = await ProductModel.findOne({ _id: id });
    if (!product) {
      return res.status(404).send({ error: true, message: "Product not found" });
    }

    return res.send({
      success: true,
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        error: true,
        message: "There is no product with this id",
      });
    }

    await ProductModel.deleteOne({ _id: id });
    res.send({
      success: true,
      message: "Product deleted successfuly",
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        error: true,
        message: "There is no product with this id",
      });
    }

    const { n, nModified } = await ProductModel.updateOne(
      { _id: id },
      { ...req.body }
    );
    if (n === 0 || nModified === 0) {
      throw new Error("Update failed");
    }
    res.send({
      success: true,
      message: "Product updated successfuly",
    });
  } catch (error) {
    next(error);
  }
};


module.exports = { productList, addProduct, getProduct, deleteProduct, updateProduct };
