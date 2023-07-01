import express from "express";
import { GetAllProducts, createProduct, deleteProduct, getProductDetails, test, updateProduct } from "../controllers/productControllers.js";

const router = express.Router();

//Product routes 
router.route("/test").get(test)
router.route("/product/new").post(createProduct)
router.route("/product/all").get(GetAllProducts)
router.route("/product/:id").put(updateProduct)
router.route("/product/:id").delete(deleteProduct)
router.route("/product/:id").get(getProductDetails)




export default router;

