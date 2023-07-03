import express from "express";
import { forgotPassword, loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import { test } from "../controllers/productControllers.js";
import { isAuthenticated } from "../middleware/Auth.js";

const router = express.Router()

router.route("/usertest").get(test)
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(isAuthenticated,logoutUser);
router.route("/forgotpassword").post(forgotPassword);

export default router;