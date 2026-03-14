# 📋 Task Plan - Persistence & Migration

## Phase 1: Blueprint (Planning) 🟢
- [ ] Answer Discovery Questions (User Input Required)
- [ ] Define Data Schema in `gemini.md`
- [ ] Select Database Provider (Supabase recommend for Next.js)
- [ ] Create Implementation Plan

## Phase 2: Link (Connectivity) ⚡
- [ ] Provision Database on Supabase/Railway
- [ ] Set up `.env` variables
- [ ] Create connection utility (`lib/db.js` or equivalent)
- [ ] Verify connection with a "Handshake" script

## Phase 3: Architect (Build) ⚙️
- [ ] Create Database SOP in `architecture/db_sop.md`
- [ ] Seed initial projects into the database
- [ ] Rewrite `src/app/api/projects/route.ts` to use the DB
- [ ] Test CRUD operations locally

## Phase 4: Stylize (Refinement) ✨
- [ ] Ensure Admin Panel handles loading/error states from the DB
- [ ] Add toast notifications for successful DB saves

## Phase 5: Trigger (Deployment) 🛰️
- [ ] Configure Railway/Render for Next.js deployment
- [ ] Transfer environment secrets
- [ ] Run final verification after deployment
