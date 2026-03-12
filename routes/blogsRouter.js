import express from "express";
import {
  addNewBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByCategory,
} from "../controllers/blogsController.js";

export const blogsRouter = express.Router();

// get routes
blogsRouter.get("/", getAllBlogs);

blogsRouter.get("/blog/:blogId", getBlogById);

blogsRouter.get("/category/:categoryId", getBlogsByCategory);

blogsRouter.get("/author/:authorId", getBlogsByCategory);

// post routes
blogsRouter.post("/", addNewBlog);
