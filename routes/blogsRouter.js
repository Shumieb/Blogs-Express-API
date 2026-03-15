import express from "express";
import {
  addNewBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByAuthor,
  getBlogsByCategory,
  updateBlog,
  updateBlogLikes,
} from "../controllers/blogsController.js";

export const blogsRouter = express.Router();

// get routes
blogsRouter.get("/", getAllBlogs);

blogsRouter.get("/:blogId", getBlogById);

blogsRouter.get("/category/:categoryId", getBlogsByCategory);

blogsRouter.get("/author/:authorId", getBlogsByAuthor);

// post routes
blogsRouter.post("/", addNewBlog);

// update routes
blogsRouter.put("/likes/:blogId", updateBlogLikes);
blogsRouter.put("/:authorId/:blogId", updateBlog);

// delete routes
blogsRouter.delete("/:authorId/:blogId", deleteBlog);
