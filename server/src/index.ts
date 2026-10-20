import { createServer } from "node:http";
import { env } from "./config/env.js";
import { createApp } from "./app.js";
import { createGeminiAnswerService } from "./services/gemini.service.js";

const app = createApp({
  answerQuestion: createGeminiAnswerService(
    env.GEMINI_API_KEY,
    env.GEMINI_MODEL,
  ),
  frontendOrigin: env.FRONTEND_ORIGIN,
});

const server = createServer(app);
server.requestTimeout = 40_000;
server.headersTimeout = 45_000;
server.keepAliveTimeout = 5_000;
// Allow the bounded Gemini requests to finish or time out and return a JSON error first.
server.timeout = 50_000;

server.listen(env.PORT, "0.0.0.0", () => {
  console.log(`Portfolio AI server listening on port ${env.PORT}.`);
});

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
