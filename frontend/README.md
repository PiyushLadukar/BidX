# BidX Frontend

AI-powered reverse auction platform for hospitals and vendors — frontend only, built against a FastAPI backend at `http://localhost:8000`.

## Stack

React 19 · Vite · TypeScript · Tailwind CSS v4 · React Router · TanStack Query · Axios · React Hook Form · Zod · Lucide React · Framer Motion

## Getting started

```bash
npm install
npm run dev
```

The app expects the FastAPI backend to be running at `http://localhost:8000` (see `/docs` for the Swagger UI). To point at a different backend, copy `.env.example` to `.env` and set `VITE_API_BASE_URL`.

## Build

```bash
npm run build
```

## Structure

- `src/api` — Axios instance (JWT interceptor) + one module per resource (auth, auctions, bids, alerts)
- `src/components` — reusable UI: Navbar, Sidebar, ProtectedRoute, StatCard, AuctionCard, BidTable, Modal, Loading, EmptyState, Button, Input, Badge
- `src/hooks` — `useAuth` (auth context + JWT/localStorage), `usePolling` (5s React Query polling)
- `src/layouts` — `DashboardLayout` (Sidebar + Navbar + content)
- `src/pages` — Landing, Login, Register, Dashboard, Auctions, AuctionDetails, CreateAuction, Alerts, Profile, NotFound
- `src/types` — shared TypeScript interfaces
- `src/utils` — constants and formatting helpers

## Auth

JWT is stored in `localStorage` and attached automatically to every request via an Axios request interceptor. A 401 response clears the token and redirects to `/login`.

## Real-time updates

No WebSockets — auctions, bids, and alerts are polled every 5 seconds via TanStack Query's `refetchInterval`.
