import express from "express";
import path from "path";

import cors from "cors";
import authRoutes from "../backend/routes/auth.route.js";
import movieRoutes from "../backend/routes/movie.route.js";
import tvRoutes from "../backend/routes/tv.route.js";
import { ENV_VARS } from "../backend/config/envVars.js";
import { connectDB } from "../backend/config/db.js";
import cookieParser from "cookie-parser";
import { protectRoute } from "../backend/middleware/protectRoute.js";
import searchRoute from "../backend/routes/search.route.js";

const app = express();

const PORT = ENV_VARS.PORT;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoute);

if (ENV_VARS.NODE_ENV === "production") {
  console.log("asd");

  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${ENV_VARS.PORT}`);
  connectDB();
});
