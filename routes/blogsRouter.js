import express from "express";
import { getBlogs } from "../controllers/blogsController.js";

export const blogsRouter = express.Router();

blogsRouter.get("/", getBlogs);

blogsRouter.get("/:blogId", getBlogs);
