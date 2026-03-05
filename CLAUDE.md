# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (HMR via Vite)
npm run build     # production build
npm run preview   # preview production build locally
npm run lint      # ESLint check
```

## Environment

Copy `.env.example` to `.env` and set `VITE_API_URL` to point at the RAG backend (default: `http://localhost:8000`). In production this is set as a Netlify environment variable.

## Architecture

Single-page React app (React 19, React Router v7, Vite) deployed on Netlify. Two routes:

- `/` — `src/pages/Home.jsx`: static portfolio landing page with social links (GitHub, LinkedIn, email copy-to-clipboard, resume PDF) while the full portfolio is under renovation.
- `/chat` — `src/pages/Chat.jsx`: RAG chat interface that POSTs questions to `{VITE_API_URL}/answer` (external Python/FastAPI backend, not in this repo) and renders markdown responses with citations.

Routing is set up in `src/main.jsx` (BrowserRouter wraps the app) and `src/App.jsx` (Routes/Route declarations). The `public/_redirects` file handles Netlify SPA routing so deep links work.

All shared styles live in `src/App.css`; chat-specific styles are in `src/pages/Chat.css`. Custom pixel-art SVG icons are inlined directly in JSX (no icon library).

The RAG backend (`VITE_API_URL`) is a separate service — this frontend repo only contains the React client.
