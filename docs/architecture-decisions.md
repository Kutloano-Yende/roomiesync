# RoomieSync — Architecture Decision Record (ADR)

**Status:** Proposed — pending explicit sign-off before Phase 1 implementation begins.
**Date:** 2026-08-26
**Author:** BT Masilela, with architecture analysis assisted by Claude (Anthropic)

## Purpose

The three RoomieSync source documents (Project Proposal, Technical/Assignment 2 Specification, UI Prototype) contain six areas where stated technology choices conflict with each other or with how the system is actually described elsewhere in the same documents. This ADR resolves each conflict into a single, explicit, written decision so that implementation can proceed without silently guessing at architecture.

This document does not modify, remove, or reinterpret any requirement in the three source documents. Where a documented requirement is structurally unsatisfiable as written (see ADR-004), that fact is stated plainly rather than papered over.

Each decision below is recorded independently so any one of them can be revisited later without invalidating the others.

---

## ADR-001: Database — Supabase vs. standalone PostgreSQL

**What the documents say:**
- Doc2 Technology Stack table: `Database → PostgreSQL`
- Doc2 Justification section: relies on "Supabase's real-time database capabilities"
- Doc2 Constraints: "All student data must be stored within Supabase's secure environment with row-level security enabled"
- Doc2 +Security NFR: "Supabase row-level security must ensure students can only access their own profile and match data"
- Doc2 Code Integration: "lifestyle profile is fetched from Supabase"

**Conflict:** The stack table names generic "PostgreSQL"; four other places in the same document name Supabase specifically and depend on Supabase-specific features (RLS, real-time).

**Decision:** Use **Supabase** as the database.

**Rationale:** Supabase *is* managed PostgreSQL — this is not a two-vendor conflict but an underspecified stack-table entry. Using Supabase satisfies the literal "PostgreSQL" requirement while directly satisfying the explicitly-named RLS and real-time requirements without building that infrastructure by hand.

**Consequences:** Backend (`app/config.py`) will need Supabase connection/service-role configuration added. Schema and RLS policies live in Supabase, not in a self-managed Postgres instance.

---

## ADR-002: Authentication — Firebase Auth vs. Supabase Auth

**What the documents say:**
- Doc2 Technology Stack: `Authentication → Firebase Auth`
- Doc2 Justification: implies Supabase is the platform of record via its real-time DB capabilities

**Conflict:** Firebase Auth and Supabase are different vendors. Supabase RLS policies are written against `auth.uid()`, populated by Supabase's own auth JWTs — Firebase Auth doesn't populate this natively.

**Decision:** Use **Supabase Auth**.

**Rationale:** Satisfies the actual stated purpose of the Firebase Auth requirement ("secure student login and verification") while working natively with the RLS requirement documented elsewhere in the same document. Avoids building and maintaining a Firebase-token-to-Supabase-session bridge for no functional gain.

**Consequences:** Mobile app integrates the Supabase Auth SDK directly. Backend verifies Supabase JWTs on protected routes. No Firebase project is provisioned.

---

## ADR-003: Backend — FastAPI as the single API surface

**What the documents say:**
- Doc1 Approach: "React Native mobile front-end with a Python-based AI matching engine"
- Doc2 Technology Stack: `Backend API → Python (FastAPI)` — "Business logic and AI model serving"
- Doc2 Code Integration: describes the compatibility scoring function living "directly inside the match suggestions endpoint" of the FastAPI backend
- Doc2 API Design diagram: shows Auth, Profile, Matching, Expenses, Feedback, and Messages all as routers under one API

**Conflict:** None between documents — this is the one area of full agreement. The only open implementation question is scope: does FastAPI proxy everything, or does the mobile app talk to Supabase directly for basic CRUD and call FastAPI only for scoring?

**Decision:** **FastAPI is the single API surface for everything** — auth-adjacent profile, match, chat, and expense operations, not just matching/scoring.

**Rationale:** Matches Doc2's own API diagram exactly. Keeps one consistent authorization and business-logic layer instead of splitting logic between FastAPI, Supabase RLS policies, and mobile-side code.

**Consequences:** `backend/app/main.py` grows a `routers/` package per domain (auth, profile, matches, expenses, chat, feedback, notifications, admin). The mobile app's `apiClient.ts` talks only to FastAPI, never directly to Supabase for data operations (Supabase Auth SDK is the one exception, per ADR-002).

---

## ADR-004: AI/ML — Cosine similarity/rule-based for MVP; supervised ML deferred

**What the documents say:**
- Doc2 Description: "supervised machine learning model to power its Neural Match Engine"
- Doc2 Emerging Tech Goals: "Train a supervised ML model... to generate a compatibility score"
- Doc2 Code Integration (the actual described implementation): "scored against all other profiles using cosine similarity"
- Doc2 Emerging Tech-Specific Requirements: "A minimum of 500 student lifestyle preference records are required to train the initial model"
- Doc2 Fallback Mechanism: "fall back to a rule-based matching system using basic preference filters"

**Conflict:** Three different techniques are named for one system. Supervised ML requires labeled real-world outcome data that cannot exist before the product has launched and run for a period of time. The stated "500 records" and "75% accuracy" requirements have no documented data source and are **structurally unsatisfiable at initial launch** — this is stated plainly, not resolved by reinterpreting the requirement.

**Decision:** MVP matching engine is **cosine similarity with a hard gender/roommate-preference filter applied first**, matching what Doc2's own Code Integration section describes as the actual implementation. Supervised ML is deferred until real feedback/outcome data exists (see ADR-004 Consequences).

**Rationale:** This is the only approach that can produce real matches on day one without fabricating training data. It also trivially satisfies the "Model Explainability" requirement (cosine similarity is decomposable per-dimension) and the "consistent results" requirement (deterministic by construction).

**Consequences:** Matching logic is implemented behind a `MatchScorer` interface (`score(student_a, student_b) -> (score, top_factors)`). The MVP implementation is `CosineSimilarityScorer`. A future `MLModelScorer` can replace it later without changes to the API endpoint, mobile app, or explanation display — because everything downstream depends only on the interface's output shape, not on how the score was produced. The 500-record/75%-accuracy requirements become meaningful once `feedback` data has accumulated post-launch, not before.

---

## ADR-005: Hosting — Render (API) + Supabase (data/auth/storage)

**What the documents say:**
- Doc1 Resources: "AWS/Azure Hosting and Secure Payment Gateway APIs"
- Doc2 Technology Stack: `Cloud Hosting → Render` — "Free-tier backend API deployment"
- Doc2 +Scalability NFR: "backend must be containerised using Docker to allow easy scaling if user numbers grow beyond Render's free tier"

**Conflict:** Doc1 names AWS/Azure generically; Doc2 names Render specifically with concrete operational detail (free tier, Docker for scaling).

**Decision:** **Render** for the FastAPI backend, **Supabase** for database/auth/storage (managed, not separately hosted).

**Rationale:** Doc1 reads as an earlier, more generic proposal-stage placeholder; Doc2's Render mention is more specific and includes a concrete scaling plan (Docker). This is a judgment call, flagged as such rather than asserted as the only valid reading of Doc1.

**Consequences:** `backend/Dockerfile` (already scaffolded) becomes the deployment artifact for Render. No AWS/Azure account is provisioned for hosting.

---

## ADR-006: Payments — Expense tracking/splitting only; no Stripe processing in MVP

**What the documents say:**
- Doc1 Approach: "secure third-party payment APIs"
- Doc2 Technology Stack: `Expense Tracking API → Stripe API` — "Shared expense processing and splitting"
- Doc2 Functional Requirements: "log, split, and track shared expenses" (no mention of moving money)
- Prototype Screens 10–11: a pure bookkeeping ledger UI — no payment UI, no card entry, no "Pay Now" anywhere in the 15 screens

**Conflict:** The tech stack names Stripe for "processing," but the only artifact depicting actual product behavior (the prototype) shows students settling up outside the app.

**Decision:** MVP tracks and splits expenses only. **No live payment processing.**

**Rationale:** Matches what the prototype screens actually depict. Real payment processing between individuals (not a merchant) adds Stripe Connect complexity, webhook handling, and materially more security/compliance surface for limited added product value at MVP stage.

**Consequences:** `expenses` table tracks amounts and a `settled` boolean/status only. No Stripe SDK, no webhook endpoints, no card data ever touches the system. Stripe integration remains a clearly separable future addition if ever decided.

---

## Consolidated Recommended Architecture

| Layer | Decision |
|---|---|
| Database | Supabase (managed PostgreSQL) — ADR-001 |
| Auth | Supabase Auth — ADR-002 |
| Backend | FastAPI, single API surface, deployed to Render — ADR-003, ADR-005 |
| AI/ML | Cosine similarity + hard preference filter (MVP) → supervised ML later, behind a swappable interface — ADR-004 |
| Hosting | Render (API) + Supabase (data/auth/storage) — ADR-005 |
| Payments | Tracking/splitting only, no processor — ADR-006 |

## Sign-off

This ADR requires explicit approval before Phase 1 (backend data + auth foundation) begins. Approval can be per-decision (e.g. "ADR-001 through ADR-005 approved, ADR-006 needs discussion") or as a whole. Until approved, no implementation work depends on these decisions being final.

## Related, still-unresolved items (not architecture — tracked separately)

The following were flagged during requirements analysis and are **not** architecture decisions this ADR covers. They remain open questions for the relevant build phase:
- Definition/trigger threshold for "repeated conflicts" admin alerts (US11)
- Rematching trigger mechanism when compatibility score drops below 50% (US10) and how this reconciles with the "consistent results" requirement
- Definition of "AI-driven safety filters" in chat (Doc1 deliverables)
- Student verification mechanism (email domain check, ID upload, or other)
- Admin authentication/role mechanism (how a user becomes an "Accommodation Administrator")
