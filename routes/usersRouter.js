import express from "express";
import {
  getAuthorById,
  getAuthors,
  updateAuthor,
} from "../controllers/usersController.js";

export const usersRouter = express.Router();

// get routes
usersRouter.get("/authors", getAuthors);
usersRouter.get("/authors/:userId", getAuthorById);

// update routes
usersRouter.put("/authors/:userId", updateAuthor);
