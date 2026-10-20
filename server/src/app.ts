import cors from "cors";
import express from "express";
import helmet from "helmet";
import type { AnswerQuestion } from "./controllers/chat.controller.js";
import { errorHandler } from "./middleware/error-handler.js";
import { createChatRouter } from "./routes/chat.routes.js";

type AppOptions = {
  answerQuestion: AnswerQuestion;
  frontendOrigin: string;
};

export function createApp({ answerQuestion, frontendOrigin }: AppOptions) {
  const app = express();
  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors({
    origin(origin, callback) {
      if (!origin || origin === frontendOrigin) callback(null, true);
      else callback(new Error("ORIGIN_NOT_ALLOWED"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    maxAge: 600,
  }));
  app.use(express.json({ limit: "10kb", strict: true }));

  app.get("/api/health", (_req, res) => res.status(200).json({ status: "ok" }));
  app.use("/api/chat", createChatRouter(answerQuestion));
  app.use((_req, res) => res.status(404).json({ error: "Endpoint not found." }));
  app.use(errorHandler);

  return app;
}
