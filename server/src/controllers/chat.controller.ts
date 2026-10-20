import type { NextFunction, Request, Response } from "express";

export type AnswerQuestion = (question: string) => Promise<string>;

export function createChatController(answerQuestion: AnswerQuestion) {
  return async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const answer = await answerQuestion(res.locals.question as string);
      res.status(200).json({ answer });
    } catch (error) {
      next(error);
    }
  };
}
