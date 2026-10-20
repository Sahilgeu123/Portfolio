import assert from "node:assert/strict";
import { once } from "node:events";
import { after, before, test } from "node:test";
import type { AddressInfo } from "node:net";
import { parseServerEnv } from "../config/env.js";
import { createApp } from "../app.js";

const trustedOrigin = "http://localhost:5173";
let baseUrl: string;
let server: ReturnType<ReturnType<typeof createApp>["listen"]>;
const receivedQuestions: string[] = [];
let providerUnavailable = false;

test("missing server configuration fails with variable names and no values", () => {
  assert.throws(() => parseServerEnv({}), error => {
    assert.match(String(error), /GEMINI_API_KEY/);
    assert.match(String(error), /FRONTEND_ORIGIN/);
    assert.doesNotMatch(String(error), /secret|AIza/);
    return true;
  });
});

before(async () => {
  const app = createApp({
    frontendOrigin: trustedOrigin,
    answerQuestion: async question => {
      if (providerUnavailable) throw new Error("AI_PROVIDER_UNAVAILABLE");
      receivedQuestions.push(question);
      return "Sahil built portfolio projects.";
    },
  });
  server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

after(async () => {
  const closed = once(server, "close");
  server.close();
  await closed;
});

test("health endpoint returns a simple status", async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});

test("valid chat trims the question and returns an answer", async () => {
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: trustedOrigin },
    body: JSON.stringify({ question: "  What projects has Sahil built?  " }),
  });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { answer: "Sahil built portfolio projects." });
  assert.equal(receivedQuestions.at(-1), "What projects has Sahil built?");
});

test("provider failures return a JSON gateway error instead of dropping the connection", async () => {
  providerUnavailable = true;
  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: trustedOrigin },
      body: JSON.stringify({ question: "What projects has Sahil built?" }),
    });
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), {
      error: "The AI service is temporarily unavailable. Please try again shortly.",
    });
  } finally {
    providerUnavailable = false;
  }
});

test("empty and oversized questions are rejected", async () => {
  const empty = await fetch(`${baseUrl}/api/chat`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: "  " }),
  });
  assert.equal(empty.status, 400);

  const oversized = await fetch(`${baseUrl}/api/chat`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: "x".repeat(1001) }),
  });
  assert.equal(oversized.status, 400);
});

test("malformed JSON and client portfolio context are rejected", async () => {
  const malformed = await fetch(`${baseUrl}/api/chat`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: "{",
  });
  assert.equal(malformed.status, 400);

  const extraContext = await fetch(`${baseUrl}/api/chat`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: "Who is Sahil?", portfolio: { profile: "client-controlled" } }),
  });
  assert.equal(extraContext.status, 400);
});

test("CORS rejects an origin other than the configured frontend", async () => {
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST", headers: { "Content-Type": "application/json", Origin: "https://bad.example" },
    body: JSON.stringify({ question: "Who is Sahil?" }),
  });
  assert.equal(response.status, 403);
});

test("chat endpoint rate limits after ten requests", async () => {
  let lastResponse: Response | undefined;
  for (let i = 0; i < 11; i += 1) {
    lastResponse = await fetch(`${baseUrl}/api/chat`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "What projects has Sahil built?" }),
    });
  }
  assert.equal(lastResponse?.status, 429);
});
