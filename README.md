# GitPulse: Real-Time GitHub Activity Monitor

GitPulse is a high-performance dashboard designed to track GitHub repository activity in real-time. Built with a focus on low latency and optimized delivery.

## System Architecture
The application follows an event-driven architecture to ensure instant updates:
1. **GitHub Webhooks**: Pushes events (commits, stars) to the backend.
2. **FastAPI Backend**: Validates payloads using `X-Hub-Signature-256` (HMAC-SHA256).
3. **Broadcaster**: Events are sent to the frontend via **WebSockets (Socket.io)**.
4. **React Frontend**: A reactive HUD built with **Tailwind CSS v4** and **Recharts**.

## Performance & Optimization
This project implements senior-level frontend optimizations:
* **Manual Chunking Strategy**: High-volume libraries (Recharts, Apollo) are split into independent chunks to maximize long-term caching.
* **96% Reduction in Critical Bundle**: The main entry point was reduced from ~1.1MB to **39KB**, ensuring near-instant Time-to-Interactive (TTI).
* **Tree-shaking**: Optimized imports for Lucide and Date-fns to prevent dead code inclusion.

## Key Challenges
### Webhook Security
One of the main challenges was securing the ingestion endpoint. I implemented a strict verification layer that computes a hash of the payload using a shared secret, ensuring that only authentic GitHub events are processed.

## Tech Stack
* **Frontend**: React 19, Vite 7, Tailwind CSS v4, Recharts.
* **State & Data**: Apollo Client (GraphQL), Socket.io-client.
* **Testing**: Vitest + React Testing Library (Unit tests for data transformation).
* **Quality**: ESLint, Stylelint (Tailwind v4 compatible), Prettier.