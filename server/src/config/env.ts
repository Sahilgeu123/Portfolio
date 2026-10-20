import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { z } from "zod";

// The emitted build lives one directory deeper than the source tree.
import dotenv from "dotenv";

const sourceEnvPath = fileURLToPath(new URL("../../.env", import.meta.url));
const builtEnvPath = fileURLToPath(new URL("../../../../.env", import.meta.url));
dotenv.config({ path: existsSync(sourceEnvPath) ? sourceEnvPath : builtEnvPath });

const envSchema = z.object({
  GEMINI_API_KEY: z.string().trim().min(1),
  GEMINI_MODEL: z.string().trim().min(1),
  PORT: z.coerce.number().int().min(1).max(65535),
  FRONTEND_ORIGIN: z.string().url().refine(value => ["http:", "https:"].includes(new URL(value).protocol)),
});

export function parseServerEnv(source: NodeJS.ProcessEnv) {
  const parsedEnv = envSchema.safeParse(source);
  if (parsedEnv.success) return parsedEnv.data;

  const invalidNames = [...new Set(parsedEnv.error.issues.map(issue => issue.path.join(".")))];
  throw new Error(`Invalid server configuration. Check these variables in server/.env: ${invalidNames.join(", ") || "environment values"}.`);
}

export const env = parseServerEnv(process.env);
