import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, _next) => {
  if (res.headersSent) return;

  if (error instanceof SyntaxError && "body" in error) {
    res.status(400).json({ error: "Malformed JSON request body." });
    return;
  }

  if (error instanceof Error && (error as Error & { status?: unknown }).status === 413) {
    res.status(413).json({ error: "Request body is too large." });
    return;
  }

  if (error instanceof Error && error.message === "AI_PROVIDER_UNAVAILABLE") {
    res.status(502).json({ error: "The AI service is temporarily unavailable. Please try again shortly." });
    return;
  }

  if (error instanceof Error && error.message === "ORIGIN_NOT_ALLOWED") {
    res.status(403).json({ error: "This origin is not allowed to use the chat API." });
    return;
  }

  console.error("Unhandled API request error", {
    name: error instanceof Error ? error.name : "UnknownError",
    method: res.req.method,
    path: res.req.path,
  });
  res.status(500).json({ error: "An unexpected server error occurred." });
};
