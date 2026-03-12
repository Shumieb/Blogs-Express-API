import express from "express";
import {
  getAllBlogs,
  getBlogById,
  getBlogsByCategory,
} from "../controllers/blogsController.js";

export const blogsRouter = express.Router();

blogsRouter.get("/", getAllBlogs);

blogsRouter.get("/blog/:blogId", getBlogById);

blogsRouter.get("/category/:categoryId", getBlogsByCategory);

blogsRouter.get("/author/:authorId", getBlogsByCategory);
