# Posts Manager

> A mini fullstack project built to demonstrate **React + Next.js App Router (server-first mindset)** with interview-ready architecture and trade-offs.

---

## 🎯 Project Goal

This project focuses on **real-world App Router patterns** rather than feature quantity.

Key goals:

* Server-first architecture
* Minimal client JavaScript
* Clear separation of responsibilities
* Interview-ready explanations for every design choice

---

## 🛠 How to run locally

- Install dependencies: `npm install`
- Setup database & Prisma
- Run dev server: `npm run dev`

---


## 🧱 Tech Stack

* **Next.js App Router**
* **React Server Components / Client Components**
* **Server Actions** for mutations
* **Prisma** (direct DB access, no internal fetch API)
* **useOptimistic + useTransition** for UX
* **Next.js Cache (`revalidateTag`, `force-dynamic`)**

---

## 🏗 Architecture Overview

### Server-first by default

* All pages and components are **Server Components unless interaction is required**.
* Client Components are used only for:

  * User interaction
  * Optimistic UI
  * Browser-only logic

This keeps JavaScript bundle size small and improves performance.

---

## 🔄 Data Flow

### Read flow

1. Server Component fetches data directly from database via Prisma
2. Data is cached by Next.js automatically
3. UI is rendered on the server and streamed to the client

### Mutation flow (Create / Delete Post)

1. User triggers action in Client Component
2. UI updates immediately using `useOptimistic`
3. Server Action runs business logic on the server
4. Cache is invalidated using `revalidateTag`
5. Server Components re-render with fresh data

---

## ✨ Server Actions vs API Routes

This project intentionally uses **Server Actions instead of API Routes** for internal mutations.

**Why Server Actions?**

* Mutations are tightly coupled with UI
* No need to expose HTTP endpoints
* Type-safe and simpler mental model

**When API Routes would be better:**

* Multiple clients (mobile, external services)
* Public API contracts
* Integration with non-Next.js systems

---

## ⚡ Optimistic UI Strategy

### Why optimistic updates?

* Improves perceived performance
* UI responds immediately to user actions

### Implementation

* `useOptimistic` updates UI before server response
* `useTransition` marks server sync as non-urgent
* If the action fails, UI automatically re-syncs from server state

### Trade-off

Optimistic UI is used **only for safe, reversible mutations** (e.g. delete post).
It is intentionally avoided for high-risk actions like payments or permissions.

---

## 🚨 Error Handling Strategy

### error.tsx

* Handles **fatal render-level errors**
* Used when the page cannot be rendered (e.g. database failure)

### Client-side error state

* Handles **recoverable user-action errors**
* Example: delete post fails, validation error
* UI remains usable and shows feedback

This separation prevents overusing global error boundaries.

---

## 🗂 Cache Strategy

* Next.js caches Server Components and fetches by default
* Mutations invalidate cache selectively using `revalidateTag`
* `force-dynamic` is used only when data depends on request-specific information

This ensures performance without stale data issues.

---

## 🧠 Design Trade-offs

### Why not fetch from API routes?

* Avoids unnecessary HTTP layer
* Keeps logic closer to UI

### Why not make everything Client Component?

* Reduces performance
* Ships unnecessary JavaScript
* Loses server-first benefits

### Why not manually revert optimistic UI?

* Server re-render ensures consistent source of truth
* Manual revert risks state mismatch

---

## 📌 Interview Talking Points

* "Interaction does not automatically mean Client Component"
* "Server Actions are ideal for UI-driven mutations"
* "Optimistic UI accepts eventual consistency"
* "Next.js App Router encourages server-first thinking"

---

## 🚀 Possible Improvements

* Authentication & authorization
* Pagination & filtering
* Role-based permissions
* Public API exposure using API Routes

---

## ✅ Summary

This project demonstrates:

* Correct App Router mental model
* Realistic data & mutation flow
* Performance-aware design
* Clear trade-offs suitable for Junior–Mid interviews

The focus is not feature quantity, but **clarity, correctness, and reasoning**.
