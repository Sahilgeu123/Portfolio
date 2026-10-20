import dotenv from "dotenv";
import waitOn from "wait-on";

dotenv.config({ path: "server/.env" });

const port = process.env.API_PORT || process.env.PORT || "3001";
const healthUrl = `http://127.0.0.1:${port}/api/health`;

try {
  await waitOn({
    resources: [healthUrl],
    timeout: 60_000,
    interval: 250,
  });
  console.log(`Backend is ready at ${healthUrl}`);
} catch {
  console.error(`Backend did not become ready at ${healthUrl}. Check the backend startup output above.`);
  process.exitCode = 1;
}
