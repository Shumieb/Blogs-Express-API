import express from "express";
import { getAuthors } from "../controllers/usersController.js";

export const usersRouter = express.Router();

usersRouter.get("/authors", getAuthors);

usersRouter.get("/authors/:userId", getAuthors);
