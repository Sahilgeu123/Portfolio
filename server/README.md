# Portfolio chat API

The Express API keeps the Gemini credential on the server. The browser sends only a question to `POST /api/chat`; portfolio context is loaded by the server from `src/data/portfolioData.ts`.

## Local development

1. Copy `server/.env.example` to `server/.env` and set `GEMINI_API_KEY`. Keep that file private.
2. Run `npm run dev`. Nodemon rebuilds and restarts the API when backend files change. Vite starts after `/api/health` responds, then proxies `/api` to the server on `PORT` (3001 by default). Keep this command running while using the portfolio. If the backend fails to start, the combined terminal reports the backend error and Vite does not start.
3. Run `npm run test:server` for API checks.

## Production

Deploy the Node server as a separate service with Node.js installed. Build it with `npm ci` and `npm run build:server`, then start it with `npm run server`. Configure `GEMINI_API_KEY`, `GEMINI_MODEL`, `PORT`, and `FRONTEND_ORIGIN` as server-side environment variables. Put a same-origin reverse proxy in front of `/api` (or configure the frontend host to proxy `/api` to this service). Set `FRONTEND_ORIGIN` to the exact public frontend origin.

No deployment provider configuration was present when this backend was added, so the hosting-specific proxy setup depends on the provider you choose. Do not put Gemini credentials in `VITE_*` variables or frontend hosting settings.

The API limits each IP to 10 chat requests per minute, validates a single question (up to 1,000 characters), caps JSON bodies at 10 KB, and restricts browser origins. CORS is not authentication; for a public launch with meaningful traffic or cost exposure, add an abuse control suited to your audience and monitor Gemini usage. When deploying behind a proxy, configure Express `trust proxy` only for the known proxy hops so rate limits use the real client address safely.
