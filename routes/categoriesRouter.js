import express from "express";
import { getCategories } from "../controllers/categoriesController.js";

export const categoriesRouter = express.Router();

categoriesRouter.get("/", getCategories);
