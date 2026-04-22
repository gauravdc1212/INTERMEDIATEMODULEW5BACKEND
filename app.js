import express from "express";
import cors from "cors";
import authRoute from "./routes/authroute.js";
import taskRoutes from "./routes/taskroute.js";
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/auth", authRoute);

app.use("/api/tasks", taskRoutes);

export default app;