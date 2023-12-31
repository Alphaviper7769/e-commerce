import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";
import asyncError from "./../middleware/catchAsyncError.js";
import ApiFeatures from './../utils/features.js';

export const test = (req, res) => {
  res.status(200).json({ message: "Route is working fine" });
};

//Create Product ------> Admin
export const createProduct = asyncError(async (req, res, next) => {
  const product = await Product.create(req.body);

  req.body.user = req.user.id;

  res.status(201).json({
    success: true,
    product,
  });
});

//Get all Products
export const GetAllProducts = asyncError(async (req, res, next) => {

  const resultPerPage = 5;
  const productCount = await Product.countDocuments()
  
  const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)
  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productCount
  });
});

//update Product ---------> admin
export const updateProduct = asyncError(async (req, res, next) => {
  let product = Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product

export const deleteProduct = asyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
});

// Single Product Details
export const getProductDetails = asyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: "true",
    message: "details fetched successfully",
    product,
  });
});
