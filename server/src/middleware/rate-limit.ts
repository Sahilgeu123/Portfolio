import { rateLimit } from "express-rate-limit";

export function createChatRateLimit() {
  return rateLimit({
    windowMs: 60_000,
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { error: "Too many chat requests. Please wait a minute and try again." },
  });
}
