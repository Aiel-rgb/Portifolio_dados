# 🔍 Findings - Persistence & Migration

- **Current Issue**: Projects are stored in an in-memory array in `src/app/api/projects/route.ts`, causing data loss on server restarts/redeploys.
- **Current Deployment**: Vercel (reported as unstable/unreliable for this specific use case).
- **Proposed Solution**: 
    1.  Implement a persistent database (Supabase or PostgreSQL on Railway).
    2.  Migrate the API to interact with the database.
    3.  Move deployment to a platform that supports persistent environments better or simply provide a stable DB link.
