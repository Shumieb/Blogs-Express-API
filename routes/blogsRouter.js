import express from "express";
import {
  addNewBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByCategory,
  updateBlog,
} from "../controllers/blogsController.js";

export const blogsRouter = express.Router();

// get routes
blogsRouter.get("/", getAllBlogs);

blogsRouter.get("/blog/:blogId", getBlogById);

blogsRouter.get("/category/:categoryId", getBlogsByCategory);

blogsRouter.get("/author/:authorId", getBlogsByCategory);

// post routes
blogsRouter.post("/", addNewBlog);

// update routes
blogsRouter.put("/:authorId/:blogId", updateBlog);
