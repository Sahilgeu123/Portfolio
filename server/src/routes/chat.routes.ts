import { Router } from "express";
import type { AnswerQuestion } from "../controllers/chat.controller.js";
import { createChatController } from "../controllers/chat.controller.js";
import { createChatRateLimit } from "../middleware/rate-limit.js";
import { validateChatRequest } from "../middleware/validate-request.js";

export function createChatRouter(answerQuestion: AnswerQuestion) {
  const router = Router();
  router.post("/", createChatRateLimit(), validateChatRequest, createChatController(answerQuestion));
  return router;
}
