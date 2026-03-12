import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { blogsRouter } from "./routes/blogsRouter.js";
import { categoriesRouter } from "./routes/categoriesRouter.js";
import { usersRouter } from "./routes/usersRouter.js";

const app = express();

// port
const port = 8000;

// cors
app.use(cors());

// body parser
app.use(bodyParser.json());

// routes
app.use("/api/blogs", blogsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/users", usersRouter);

// route not found
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
