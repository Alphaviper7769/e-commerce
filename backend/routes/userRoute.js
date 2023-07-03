import express from "express";
import { forgotPassword, loginUser, logoutUser, registerUser, resetPassword } from "../controllers/userController.js";
import { test } from "../controllers/productControllers.js";
import { isAuthenticated } from "../middleware/Auth.js";

const router = express.Router()

router.route("/usertest").get(test)
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(isAuthenticated,logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

export default router;