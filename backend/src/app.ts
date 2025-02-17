import express from "express";
import cors from "cors";
import path from "path";
import charactersRoutes from "./routes/charactersRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/characters", charactersRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("❌ Error:", err.message);
    res
      .status(err.status || 500)
      .json({ error: err.message || "Internal Server Error" });
  }
);

export default app;
