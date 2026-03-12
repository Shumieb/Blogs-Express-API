import express from "express";
import cors from "cors";
import { blogsRouter } from "./routes/blogsRouter";

const app = express();

// port
const port = 8000;

// cors
app.use(cors());

// routes
app.use("/api", blogsRouter);

// route not found
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
