import express from "express";
import { GetAllProducts, createProduct, deleteProduct, getProductDetails, test, updateProduct } from "../controllers/productControllers.js";
import { authorizeRoles, isAuthenticated } from "../middleware/Auth.js";

const router = express.Router();

//Product routes 
router.route("/test").get(isAuthenticated , authorizeRoles("admin") , test)
router.route("/product/new").post(isAuthenticated,createProduct)
router.route("/product/all").get(GetAllProducts)
router.route("/product/:id").put(isAuthenticated,updateProduct)
router.route("/product/:id").delete(isAuthenticated,deleteProduct)
router.route("/product/:id").get(getProductDetails)




export default router;

