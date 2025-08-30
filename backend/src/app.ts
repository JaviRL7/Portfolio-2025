import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import commentsRouter from "./routes/comments.routes";
import { errorHandler } from "./middleware/error";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({ origin: true, credentials: true }));

  app.get("/", (_req, res) => res.json({ 
    status: "ok", 
    message: "Portfolio API is running",
    timestamp: new Date().toISOString()
  }));

  app.get("/health", (_req, res) => res.json({ ok: true }));

  app.use("/comments", commentsRouter);

  app.use(errorHandler);
  return app;
}
