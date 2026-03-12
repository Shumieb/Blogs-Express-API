import express from "express";
import { getUserById } from "../controllers/usersController.js";

export const usersRouter = express.Router();

usersRouter.get("/:userId", getUserById);
