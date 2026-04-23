import express from "express";
import cors from "cors";
import authRoute from "./routes/authroute.js";
import taskRoutes from "./routes/taskroute.js";

const app = express();

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://intermediatemodulew-5-frontend.vercel.app",
];

// ✅ CORRECT CORS (only this)
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

// middlewares
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/auth", authRoute);
app.use("/api/tasks", taskRoutes);

export default app;
