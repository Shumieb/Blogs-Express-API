import express from "express";
import {
  getCategories,
  getCategoryById,
} from "../controllers/categoriesController.js";

export const categoriesRouter = express.Router();

categoriesRouter.get("/", getCategories);

categoriesRouter.get("/:categoryId", getCategoryById);
