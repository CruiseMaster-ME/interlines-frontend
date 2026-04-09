CruiseMaster Interlines Portal (Frontend)

Production requirements:
- Static Site Generation only (SSG)
- Static export (`output: "export"`) — no Node runtime in production
- No Next.js API routes / no server rendering

## Environment

Create `interlines-frontend/.env.local`:

```bash
# Laravel origin. Use empty string for same-origin deployment.
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Optional (used for SEO metadata base URL)
NEXT_PUBLIC_SITE_URL=https://interlinecruises-me.com
```

`NEXT_PUBLIC_API_BASE_URL` is baked into the static build.

## Development

```bash
cd interlines-frontend
npm install
npm run dev
```

## Static export (IIS/CDN)

```bash
cd interlines-frontend
npm run build
npm run export
```

Static output is generated in `interlines-frontend/out/`.

## Notes

- Authenticated pages (Dashboard/Booking) validate the Laravel session client-side by calling `GET /api/user`.
- All dynamic logic (auth, approvals, JWT signing, Odysseus SSO) is handled by Laravel.
