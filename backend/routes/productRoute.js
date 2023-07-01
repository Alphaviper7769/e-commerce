import express from "express";
import { test } from "../controllers/productControllers.js";

const router = express.Router();

router.route("/test").get(test)

