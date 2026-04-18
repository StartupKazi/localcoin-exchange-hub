---
name: Auth Pages (Mock UI)
description: User and Admin login/register/forgot-password pages with shared AuthLayout (2-column brand panel + form)
type: feature
---
Mock auth UI only — no real backend wired. Routes:
- /login, /register, /forgot-password (user, light theme #021B38 brand panel)
- /admin/login, /admin/register, /admin/forgot-password (admin, dark theme brand panel)

Shared `src/components/auth/AuthLayout.tsx` with `variant: "user" | "admin"`. Admin variant wraps in `.admin-theme` scope.
Admin login includes 2FA code field; admin register requires invite code. Forgot-password shows success state after submit.
Submitting toasts success and navigates to home (user) or /admin (admin). Replace handlers when wiring real auth.
