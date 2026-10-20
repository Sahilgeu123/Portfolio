import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

const chatRequestSchema = z.object({
  question: z.string().trim().min(1, "Question cannot be empty.").max(1000, "Question must be 1,000 characters or fewer."),
}).strict();

export function validateChatRequest(req: Request, res: Response, next: NextFunction) {
  const result = chatRequestSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.issues[0]?.message ?? "Invalid request body." });
    return;
  }

  res.locals.question = result.data.question;
  next();
}
