# LocalCoin System Breakdown and Feature Specification

## 1. Purpose of this document

This document breaks down the current LocalCoin UI prototype into a build-ready system specification.

It is based on the code currently in this repository, especially:

- `src/App.tsx`
- `src/hooks/useAuth.ts`
- `src/pages/auth/*`
- `src/pages/*.tsx`
- `src/components/P2PDashboard.tsx`
- `src/components/TradeModals.tsx`
- `src/pages/admin/*`
- `src/components/admin/*`

The goal is to help us move from a frontend demo into a full working platform.

## 2. Current reality of the repo

This repository is a frontend prototype, not a complete production system.

### What is already present

- A full route map for public, user, trading, support, and admin pages
- UI flows for registration, login, KYC, deposit, withdraw, convert, P2P, disputes, support, referral, and admin management
- Mock datasets for trades, users, withdrawals, tickets, reports, ads, disputes, and transactions
- A realistic P2P order-room experience with escrow, countdown, chat panel, payment confirmation, cancel flow, and dispute flow

### What is not actually implemented yet

- No backend API integration
- No database
- No real authentication or session management
- No real email verification flow
- No real KYC provider integration
- No real payment processing
- No real escrow engine
- No websocket or realtime infrastructure
- No persistent chat
- No persistent dispute evidence storage
- No route protection for user or admin pages
- No production permissions or role enforcement

### Important implementation notes from the current code

- `useAuth.ts` stores the user profile only in `localStorage` under `lc_user_profile`
- User login accepts any email and can create a mock profile on the fly
- KYC auto-approves after 4 seconds for demo purposes
- Many success/failure states are randomised with `Math.random()`
- Admin pages are navigable directly without authentication
- React Query is installed and wrapped in `App.tsx`, but no actual queries or mutations are being used yet

## 3. Platform scope inferred from the UI

The system is trying to be a crypto trading platform with these product areas:

1. Public marketing site
2. User onboarding and account management
3. Identity verification and compliance
4. Fiat deposit and crypto withdrawal
5. P2P marketplace
6. One-click buy/sell
7. Instant crypto convert
8. Merchant advertising
9. Order tracking and transaction history
10. Dispute handling
11. Support and live chat
12. Referral program
13. Admin operations console

## 4. High-level architecture we need

To make this product real, the platform should be split into these major layers:

### 4.1 Frontend

- React web app
- Authenticated user area
- Admin console
- Realtime order room and notifications

### 4.2 Backend services

- Auth service
- User profile service
- Email and notification service
- KYC/compliance service
- Wallet and ledger service
- Deposit and withdrawal service
- P2P ads and order service
- Escrow service
- Realtime chat and event service
- Dispute and support service
- Referral and rewards service
- Admin and reporting service

### 4.3 Infrastructure

- Relational database
- Object storage for KYC docs and dispute evidence
- Queue system for email, KYC review, notifications, settlement jobs
- Websocket or realtime pub/sub layer
- Audit logging
- Monitoring and fraud/risk controls

## 5. User roles and permissions

The UI implies the following roles:

### Guest

- Can view public pages
- Can browse some trade surfaces
- Should not be able to create orders, post ads, deposit, withdraw, or access profile/admin pages

### Registered user

- Can sign in
- Can view profile
- Can begin KYC
- Can access deposit, withdraw, convert, orders, disputes, support, and referral screens

### KYC-verified user

- Can trade on P2P
- Can place one-click buy/sell orders
- Can post ads
- Can withdraw at higher limits

### Advertiser / merchant

- Has nickname
- Can post and manage buy/sell ads
- Can receive P2P orders
- Needs reputation, limits, payment methods, and eligibility checks

### Support / moderator

- Can review disputes
- Can review chat and evidence
- Can freeze or release escrow based on decision
- Can respond to tickets

### Admin / super admin

- Accesses admin dashboard
- Manages users, KYC, ads, trades, deposits, withdrawals, tickets, notifications, reports, catalog, and settings

## 6. Route map in the current UI

### Public and user-facing routes

- `/` home / marketing
- `/p2p` P2P dashboard
- `/one-click-buy` one-click buy/sell
- `/deposit` fiat deposit
- `/withdraw` crypto withdraw
- `/convert` instant convert
- `/my-ads` merchant ads
- `/orders` order history
- `/disputes` dispute center
- `/transactions` transaction history
- `/contact` contact page
- `/support` help center
- `/referral` referral dashboard
- `/profile` user profile
- `/kyc` KYC flow

### User auth routes

- `/login`
- `/register`
- `/forgot-password`

### Admin auth routes

- `/admin/login`
- `/admin/register`
- `/admin/forgot-password`

### Admin operations routes

- `/admin`
- `/admin/users/*`
- `/admin/ads/*`
- `/admin/trades/*`
- `/admin/withdrawals/*`
- `/admin/tickets/*`
- `/admin/reports/*`
- `/admin/crypto`
- `/admin/fiat`
- `/admin/payment-windows`
- `/admin/deposits`
- `/admin/subscribers`
- `/admin/settings/*`

## 7. End-to-end user lifecycle

This is the most important build flow implied by the UI.

### 7.1 Registration to first completed trade

1. User visits home page and chooses a trade path
2. User registers with first name, last name, email, phone, and password
3. User verifies email
4. User signs in
5. User completes profile and identity verification
6. User becomes KYC verified
7. User funds account or chooses a one-click or P2P path
8. User selects an offer or trade amount
9. Order is created and seller assets are locked in escrow
10. Buyer receives payment instructions
11. Buyer sends money and marks payment complete
12. Seller confirms receipt
13. Escrow releases crypto
14. Order is marked complete
15. Wallet, orders, transaction history, notifications, referral rewards, and admin reports are updated

### 7.2 Alternate outcomes

- User does not verify email
- User submits KYC and remains pending
- User fails KYC and must resubmit
- Order times out
- User cancels order
- Counterparty is unresponsive
- Dispute is filed
- Admin resolves dispute for buyer or seller
- Deposit fails verification
- Withdrawal fails security or processing

## 8. Feature-by-feature breakdown

## 8.1 Public marketing and discovery

### Current UI

Files:

- `src/pages/Home.tsx`
- `src/components/Header.tsx`
- `src/components/Footer.tsx`
- `src/components/MobileBottomNav.tsx`

Capabilities shown:

- Hero page
- Service highlights
- Market ticker section
- FAQ
- Testimonials
- Fast links into P2P and one-click buy
- Navigation into all major product areas

### Production requirements

- CMS or static content pipeline for marketing copy
- SEO metadata
- Analytics and funnel tracking
- Geo-aware messaging and local payment availability

### Gaps

- No SEO handling
- No analytics
- No actual live market feed

## 8.2 User registration

### Current UI

File:

- `src/pages/auth/UserRegister.tsx`

Flow:

- User enters first name, last name, email, phone, password
- On submit, `signUp()` writes a profile to `localStorage`
- User is redirected straight to `/kyc`

### Production requirements

- Validate email uniqueness
- Hash password
- Create user and profile records
- Create verification tokens
- Send verification email
- Log registration source and referral attribution
- Create audit event

### Gaps

- Terms checkbox is present but not enforced
- Password is not validated or stored securely
- No email verification trigger
- No anti-bot or rate limiting

## 8.3 Email verification

### Current UI

Email verification is implied, not actually implemented.

Evidence in UI:

- Profile checklist says "Email verified"
- Admin has "Email Unverified Users"
- Admin settings include "Email Verification Required"
- Withdrawal security uses an email verification code

### Missing pieces that must be built

- Verification email send on registration
- Verify-email landing page
- Token lifecycle and expiry
- Resend verification flow
- Email status stored on user record
- Admin visibility and filters
- Gate trading or withdrawals until verified if platform policy requires it

### Suggested statuses

- `unverified`
- `verification_sent`
- `verified`
- `expired`
- `blocked`

## 8.4 Login, logout, and password reset

### Current UI

Files:

- `src/pages/auth/UserLogin.tsx`
- `src/pages/auth/UserForgotPassword.tsx`
- `src/hooks/useAuth.ts`

Behavior:

- User signs in with email
- If the email matches local storage, profile loads
- If not, a minimal fake profile is created
- Forgot password only shows a "check your email" state
- Logout clears local storage

### Production requirements

- Secure authentication
- Session or JWT management
- Refresh token handling
- Device/session list
- Login history
- Lockout and throttling
- Password reset tokens
- Optional 2FA

### Gaps

- No secure auth
- No password check
- No sessions
- No brute-force protection

## 8.5 Profile management

### Current UI

File:

- `src/pages/Profile.tsx`

Capabilities:

- Displays user initials, name, email, phone, country, DOB, joined date
- Shows KYC status card
- Allows logout
- Provides entry into KYC

### Production requirements

- Editable profile endpoint
- Avatar upload
- Verified field ownership
- Country and residency rules
- Security preferences
- Notification preferences

### Gaps

- Edit button is visual only
- No backend persistence outside local storage

## 8.6 KYC and compliance

### Current UI

Files:

- `src/pages/Kyc.tsx`
- `src/components/KycGate.tsx`
- `src/hooks/useAuth.ts`

Flow:

1. Personal information step
2. Identity document step
3. Selfie verification step
4. Submission state

Fields collected:

- Country of residence
- Date of birth
- Address
- Document type
- Document number
- Front/back ID upload
- Selfie upload

UI states:

- `none`
- `pending`
- `verified`
- `rejected`

### Important current demo behavior

- Submission sets status to `pending`
- Code auto-upgrades status to `verified` after 4 seconds
- Uploaded files are not actually persisted anywhere

### Production requirements

- KYC case creation
- Document upload to secure storage
- Integration with KYC vendor or internal review
- AML / sanctions / PEP / watchlist checks
- Manual review queue
- KYC decision logging
- Rejection reasons and resubmission support
- Risk score calculation
- Jurisdiction rules by country

### Gating rules implied by UI

- KYC required for trading
- KYC required for posting ads
- KYC affects withdrawal limits

### Gaps

- Trade guard exists but is not used in trading surfaces
- KYC is not truly enforced server-side
- No review queue or case record
- No document retention or compliance audit trail

## 8.7 Deposit flow

### Current UI

File:

- `src/pages/Deposit.tsx`

Capabilities shown:

- Currency picker
- Payment method side panel
- Deposit amount entry
- Transfer instructions modal
- Deposit reference generation
- Processing, success, and failed states

Flow:

1. User chooses fiat currency
2. User enters deposit amount
3. User sees payment rails
4. User gets transfer instructions
5. User clicks "I've Made the Transfer"
6. Platform verifies deposit
7. Deposit becomes success or failure

### Production requirements

- Deposit order creation
- Unique deposit reference per transfer
- Bank or processor webhook ingestion
- Reconciliation service
- Pending/confirmed/failed lifecycle
- Ledger posting
- Risk review for suspicious deposits
- User notification on credit

### Gaps

- No actual payment provider integration
- No webhook verification
- Success/failure is random
- No wallet balance update

## 8.8 Withdrawal flow

### Current UI

File:

- `src/pages/Withdraw.tsx`

Capabilities shown:

- Security setup screen
- Network selection
- Address input
- Amount input
- Fee and net receive calculation
- Confirm modal
- Email verification modal
- Processing, success, and failed states

Flow:

1. User sees withdrawal security requirements
2. User selects network
3. User enters address and amount
4. User confirms withdrawal details
5. User enters email verification code
6. System processes withdrawal
7. User sees transaction ID if successful

### Production requirements

- On-chain withdrawal request object
- Address validation by network
- Travel rule / compliance checks if needed
- 2FA and email OTP enforcement
- Velocity and limit controls
- Approval workflow for high-risk withdrawals
- Hot wallet / signing integration
- Blockchain broadcast and confirmation tracking
- Ledger entries and notifications

### Gaps

- Google Authenticator is shown but not implemented
- Email code is not sent or verified
- No blockchain integration
- No admin approval tie-in even though admin pages exist

## 8.9 Convert flow

### Current UI

File:

- `src/pages/Convert.tsx`

Capabilities:

- Select source asset
- Select destination asset
- Enter source amount
- See calculated quote
- Swap assets
- Confirm convert
- Processing, success, failure

Current model:

- Uses hard-coded rate tables
- Shows recent conversions
- Advertises zero fees

### Production requirements

- Quote engine
- Quote expiry handling
- Liquidity source
- Balance check
- Ledger entries for debit and credit
- Slippage/price protection
- Conversion history

### Gaps

- No live pricing
- No true wallet balances
- No quote reservation

## 8.10 One-click buy/sell

### Current UI

File:

- `src/pages/OneClickBuy.tsx`

Capabilities:

- Buy and sell tabs
- Crypto and fiat selection
- Spend and receive calculations
- Payment method selection
- Confirm order modal
- Payment instructions modal
- Processing, success, failure

### Intended business meaning

This looks like a simplified instant order flow for users who do not want to browse P2P offers manually.

### Production requirements

- Quote / execution engine
- Fiat payment provider integration
- Processor callback reconciliation
- Order state machine
- Timed payment window
- Processor-specific references
- Settlement into wallet

### Gaps

- Uses static rate table
- No real payment processing
- Success/failure is random
- No persistent order record

## 8.11 P2P marketplace browsing

### Current UI

Files:

- `src/pages/Index.tsx`
- `src/components/P2PDashboard.tsx`

Capabilities:

- Buy/sell tabs
- Asset tabs
- Fiat filter
- Payment-method filter
- Sort and time-window filters
- Offer tables
- Advertiser stats
- Payment method badges
- Promo banner, warnings, FAQ, benefits

Offer attributes modeled:

- Merchant name
- Completion rate
- Order count
- Price
- Available amount
- Limits
- Accepted payment methods
- Payment time window
- Eligibility flag

### Production requirements

- Order book or ad listing service
- Filtering, sorting, pagination
- Merchant reputation service
- Eligibility engine
- KYC and account-state enforcement
- Fraud/risk flags

### Important current limitations

- Offer lists are hard-coded arrays
- Ineligible states are random demo gates
- Actual `useTradeGuard()` is not wired into offer execution

## 8.12 Merchant / advertiser management

### Current UI

File:

- `src/pages/MyAds.tsx`

Capabilities:

- Advertiser onboarding gate
- Nickname creation
- Multi-step ad creation
- Buy or sell ad type
- Asset and fiat selection
- Price input
- Quantity and trade limits
- Payment method selection
- Optional remarks
- Review and publish step
- List of posted ads
- Delete ad action
- Active mode toggle

### Implied business rules

- User may need approval to become advertiser
- Nickname can only be set once
- Advertiser chooses supported payment methods
- Ad has min/max limits and total quantity

### Production requirements

- Advertiser eligibility rules
- Merchant reputation and order thresholds
- Ad state management
- Price formulas or floating margin support
- Available balance locking
- Ad auto-pause when inventory runs out
- Counterparty restrictions
- Per-user and per-coin ad limits

### Gaps

- No server persistence
- No KYC enforcement on publish
- No inventory locking
- No edit action even though UI imports `Edit`

## 8.13 P2P trade initiation

### Current UI

File:

- `src/components/TradeModals.tsx`

Trade initiation stages:

1. Trade dialog
2. Security protection notice
3. Dos and don'ts acknowledgement
4. Order page creation

Trade dialog supports:

- Buy or sell flow
- "I will pay" and "I will receive"
- Auto calculations from offer price
- "All" buttons
- Payment method selector
- Merchant details
- Advertiser terms

### Production requirements

- Validate amount within ad limits
- Check ad remaining quantity
- Lock ad quantity atomically
- Create order record
- Move seller assets into escrow
- Bind buyer and seller identities
- Start payment countdown
- Write audit trail

### Gaps

- No server-side order creation
- No balance or escrow lock
- No real payment method validation

## 8.14 P2P order room

### Current UI

File:

- `src/components/TradeModals.tsx`

Order room includes:

- Header with timestamp and order ID
- Escrow status banner
- Payment countdown
- 3-step order progress
- Order summary
- Seller payment details
- Sticky action buttons
- Seller identity card
- Chat panel

Order states modeled:

- `pending_payment`
- `coin_release`
- `success`
- `disputed`

### Intended backend state machine

- `created`
- `escrow_locked`
- `awaiting_payment`
- `payment_marked`
- `payment_under_review`
- `released`
- `completed`
- `cancelled`
- `disputed`
- `resolved_buyer`
- `resolved_seller`
- `expired`

### Production requirements

- Durable order record
- Timers on backend, not frontend
- Escrow lock object
- Participant-only visibility
- Event history
- Idempotent status transitions
- Role-based allowed actions

## 8.15 Payment confirmation inside P2P order

### Current UI

File:

- `src/components/TradeModals.tsx`

Confirm-payment modal includes:

- Payment destination summary
- Actual transfer amount field
- Acknowledgement checkboxes
- Legal-name confirmation

### Production requirements

- Record payment-marked timestamp
- Store sender-reported amount
- Capture payer account name if required
- Notify seller instantly
- Prevent repeated false confirmations
- Risk scoring for suspicious patterns

### Gaps

- No proof upload on payment confirmation
- No seller confirmation action modeled directly
- Auto-completion jumps from `coin_release` to success after 3 seconds

## 8.16 Escrow logic

### Current UI

Escrow is a visual concept in:

- P2P FAQ and benefits
- Order banner
- Dispute banner
- Support copy

Escrow states shown:

- Funds locked
- Funds releasing
- Funds frozen during dispute

### Production requirements

- Wallet hold / reserve system
- Order-linked asset lock
- Release engine
- Dispute freeze
- Expiration and rollback logic
- Admin override with audit log

### Critical build note

Escrow must never live only in frontend state. It has to be a backend-ledger concern with atomic operations.

## 8.17 Live chat

### Current UI

Main trade chat is modeled in:

- `src/components/TradeModals.tsx`

Support live chat is referenced in:

- `src/pages/Support.tsx`
- `src/pages/Contact.tsx`

Trade chat currently shows:

- System notices
- Safety warnings
- Seller message
- A bot-style prompt
- Input box
- Attachment button
- Send button

### Functional expectations for build

Trade chat should support:

- One chat room per order
- Buyer, seller, moderator participants
- Text messages
- Image/file evidence uploads
- System messages
- Timestamps
- Read and delivery state
- Moderator visibility
- Searchable dispute evidence history

Support chat should support:

- Website support widget
- Queue or assignment to agent
- Ticket conversion
- Canned responses
- SLA and handoff history

### Realtime events needed

- New message
- Typing indicator
- Message delivered
- Message read
- Order status changed
- Dispute filed
- Moderator joined
- Evidence uploaded

### Security requirements

- Only participants and moderators can access order-room chat
- Attachments must be virus-scanned and access-controlled
- External contact sharing should be detected or moderated
- Chats must be retained for disputes and compliance

### Gaps in current UI

- Send button does not append or persist messages
- Attachment flow does nothing
- No socket connection
- No message history storage
- No support chat backend

## 8.18 Cancel order flow

### Current UI

File:

- `src/components/TradeModals.tsx`

Capabilities:

- Buyer issue reasons
- Seller issue reasons
- Confirmation checkbox that seller has not been paid or refund received
- Cancel confirmation
- Warning that reason affects completion rate

### Production requirements

- Record cancellation reason
- Prevent cancel after release
- Restrict cancel after payment unless refund or support review
- Track cancellation penalties
- Affect merchant completion metrics

## 8.19 Dispute handling

### Current UI

Files:

- `src/components/TradeModals.tsx`
- `src/pages/Disputes.tsx`

Capabilities:

- Report/dispute button from order room
- Dispute reason selection
- Additional detail text
- Dispute center with active and resolved tabs
- Timeline of events
- Evidence submission textbox
- Final decision banner
- Resolution status for buyer or seller

Dispute statuses modeled:

- `filed`
- `in_review`
- `responded`
- `resolved_buyer`
- `resolved_seller`
- `escalated`

Timeline actors modeled:

- system
- you
- counterparty
- admin

### Production requirements

- Dispute case record linked to order
- Evidence upload and secure storage
- Moderator notes
- Resolution SLA
- Admin decision actions
- Funds release or refund based on final decision
- Appeal policy if supported

### Gaps

- Reply box does not persist responses
- Evidence upload icon is decorative only
- No actual moderator workflow
- No direct tie from dispute resolution to escrow release

## 8.20 Orders and transaction history

### Current UI

Files:

- `src/pages/Orders.tsx`
- `src/pages/Transactions.tsx`

Capabilities:

- Filters by order type
- Filters by status
- Search by order ID or asset
- Order detail modal
- Separate transaction history with deposits, withdrawals, convert, and P2P
- Summary panel
- Export CSV button

### Production requirements

- Unified order store
- Ledger-backed transaction history
- Filtered and paginated queries
- Export jobs
- Accurate status mapping across products

### Gaps

- Static arrays only
- No export backend
- No true wallet balance movement tied to histories

## 8.21 Referral program

### Current UI

File:

- `src/pages/Referral.tsx`

Capabilities:

- Referral code
- Referral link
- Copy/share actions
- Referral stats
- Earnings summary
- Referred users list

### Business model implied

- Lifetime commission
- 30% commission in referral page copy
- Referral settings page in admin says commission is configurable

### Production requirements

- Referral attribution on signup
- Commission rule engine
- Payout ledger
- Fraud detection for self-referrals and abuse
- Reward reporting

### Gaps

- No referral persistence
- No payout processing
- Copy is inconsistent with admin settings and should be normalised

## 8.22 Support center and contact

### Current UI

Files:

- `src/pages/Support.tsx`
- `src/pages/Contact.tsx`
- `src/pages/admin/tickets/TicketPages.tsx`

Capabilities:

- Help-center FAQ search
- Support topic browsing
- Start live chat CTA
- Contact form
- Admin ticket queues: pending, answered, closed, all

### Production requirements

- Ticket creation from form or chat
- Ticket categories and priorities
- Agent assignment
- Internal notes
- Email/chat bridge
- Escalation into dispute where needed

### Gaps

- Contact form is frontend-only
- Support chat CTA has no backend
- Admin ticket pages use mock data only

## 8.23 Notifications and broadcast

### Current UI

Files:

- Header notification bell
- `src/pages/admin/users/NotificationToAll.tsx`
- `src/pages/admin/reports/ReportPages.tsx`
- `src/pages/admin/SettingsPages.tsx`

Capabilities:

- Channel selection: email, push, SMS
- Audience selection
- Message subject and body
- Recent broadcasts
- Notification history
- Per-event notification settings

### Production requirements

- Notification service abstraction
- Templates
- Queueing and retries
- Delivery tracking
- User notification preferences
- In-app notification center

### Gaps

- No actual dispatch
- No template store
- No user preference persistence

## 8.24 Admin console

### Current UI

Files:

- `src/pages/admin/*`
- `src/components/admin/*`

Admin modules present:

- Dashboard
- User management
- Email unverified users
- Mobile unverified users
- Banned users
- KYC unverified and pending users
- Notification broadcast
- Ad limits and all adverts
- Running, reported, completed, and all trades
- Crypto catalog
- Fiat gateway catalog
- Payment windows
- Deposits
- Withdrawals by status
- Support tickets
- Transaction, login, notification reports
- Subscribers
- General, system, referral, and notification settings

### Production requirements

- Real admin authentication
- RBAC by permission
- Audit logs on every admin action
- Bulk actions
- Approval/reject flows
- Export and filtering
- Dashboard metrics from real data

### Critical gaps

- No admin route protection
- No admin session model
- No approval actions wired to user/trade/withdrawal records

## 9. Data model we should plan for

These are the main entities implied by the UI.

### Identity and access

- `users`
- `user_profiles`
- `sessions`
- `password_resets`
- `email_verifications`
- `roles`
- `permissions`
- `admin_invites`
- `login_history`

### Compliance

- `kyc_cases`
- `kyc_documents`
- `kyc_reviews`
- `risk_flags`
- `sanctions_checks`

### Wallet and money movement

- `wallets`
- `wallet_balances`
- `ledger_entries`
- `deposit_requests`
- `deposit_events`
- `withdrawal_requests`
- `withdrawal_approvals`
- `blockchain_transactions`

### P2P marketplace

- `ads`
- `ad_payment_methods`
- `ad_limits`
- `merchant_profiles`
- `merchant_reputation`
- `orders`
- `order_events`
- `escrow_locks`
- `payment_confirmations`

### Chat and disputes

- `order_chat_rooms`
- `order_messages`
- `message_attachments`
- `disputes`
- `dispute_messages`
- `dispute_evidence`
- `dispute_decisions`

### Support and communication

- `support_tickets`
- `ticket_messages`
- `notifications`
- `notification_templates`
- `broadcast_jobs`
- `subscribers`

### Referral

- `referrals`
- `referral_rewards`
- `referral_payouts`

### Admin and settings

- `platform_settings`
- `payment_windows`
- `supported_assets`
- `supported_fiats`
- `audit_logs`

## 10. Suggested API surface

This is the minimum API grouping that matches the UI.

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `POST /auth/verify-email/request`
- `POST /auth/verify-email/confirm`
- `POST /auth/2fa/verify`

### User and profile

- `GET /me`
- `PATCH /me`
- `GET /me/security`
- `PATCH /me/security`

### KYC

- `POST /kyc/cases`
- `POST /kyc/documents`
- `GET /kyc/status`
- `POST /kyc/resubmit`

### Wallets

- `GET /wallets`
- `GET /wallets/transactions`
- `POST /deposits`
- `GET /deposits/:id`
- `POST /withdrawals`
- `GET /withdrawals/:id`

### Convert

- `POST /convert/quote`
- `POST /convert/execute`
- `GET /convert/history`

### One-click

- `POST /instant-trades/quote`
- `POST /instant-trades`
- `GET /instant-trades/:id`

### P2P ads and marketplace

- `GET /p2p/ads`
- `POST /p2p/ads`
- `PATCH /p2p/ads/:id`
- `DELETE /p2p/ads/:id`
- `POST /p2p/orders`
- `GET /p2p/orders/:id`
- `POST /p2p/orders/:id/payment-confirmed`
- `POST /p2p/orders/:id/cancel`
- `POST /p2p/orders/:id/dispute`

### Chat

- `GET /p2p/orders/:id/messages`
- `POST /p2p/orders/:id/messages`
- `POST /p2p/orders/:id/attachments`

### Disputes

- `GET /disputes`
- `GET /disputes/:id`
- `POST /disputes/:id/messages`
- `POST /disputes/:id/evidence`
- `POST /disputes/:id/resolve`

### Support

- `POST /support/tickets`
- `GET /support/tickets`
- `GET /support/tickets/:id`
- `POST /support/tickets/:id/messages`

### Referral

- `GET /referrals/me`
- `GET /referrals/rewards`

### Admin

- `GET /admin/dashboard`
- `GET /admin/users`
- `GET /admin/trades`
- `GET /admin/deposits`
- `GET /admin/withdrawals`
- `POST /admin/withdrawals/:id/approve`
- `POST /admin/withdrawals/:id/reject`
- `GET /admin/tickets`
- `POST /admin/broadcasts`
- `GET /admin/reports/*`
- `PATCH /admin/settings/*`

## 11. Realtime architecture needed

The P2P order room requires realtime support.

### Events we should publish

- order created
- escrow locked
- payment countdown started
- payment marked complete
- seller confirmed receipt
- funds released
- order cancelled
- dispute filed
- dispute updated
- new chat message
- moderator decision
- withdrawal status changed
- KYC status changed
- notification created

### Recommended channels

- User notification channel
- Order-specific chat/status channel
- Admin ops channel for disputes, withdrawals, KYC queue, and tickets

## 12. Biggest production gaps in the current frontend

These are the most important issues to solve before calling this a working system.

### Security and access

- No real auth
- No route guards
- No admin protection
- No RBAC

### Money movement

- No wallet ledger
- No escrow engine
- No payment integration
- No blockchain integration

### Compliance

- No real email verification
- No KYC processing pipeline
- No sanctions or AML checks

### Realtime and support

- No websocket infrastructure
- No persistent order chat
- No support chat backend

### Data consistency

- Mock arrays everywhere
- Random success/failure states
- No backend state machine
- No audit logs

## 13. Recommended build order

### Phase 1: foundation

- Backend auth
- User profile service
- Route protection
- Database schema
- Audit logs

### Phase 2: compliance and wallet basics

- Email verification
- KYC case management
- Wallet and ledger service
- Deposit creation and reconciliation
- Withdrawal request pipeline

### Phase 3: P2P core

- Ads service
- Merchant profiles
- Order creation
- Escrow locking
- Order state machine
- Payment confirmation

### Phase 4: realtime and disputes

- Order chat websocket
- Message persistence
- Attachment uploads
- Dispute workflow
- Moderator tools

### Phase 5: product extensions

- Convert engine
- One-click buy/sell
- Referral rewards
- Broadcast notifications
- Advanced admin reporting

## 14. MVP definition based on this UI

If we want the smallest real build that still matches the product story, the MVP should include:

1. User registration, login, logout, forgot password
2. Email verification
3. KYC submission and manual review
4. Wallet ledger
5. Fiat deposit request with manual reconciliation
6. Crypto withdrawal request with admin approval
7. P2P ad creation
8. P2P order creation with escrow lock
9. Order room with realtime chat
10. Payment confirmation
11. Release and complete flow
12. Dispute filing and moderator resolution
13. Orders and transaction history
14. Basic admin dashboard and queues

## 15. Final assessment

This codebase is a strong UI exploration of the product, especially for:

- P2P order-room UX
- KYC user journey
- Deposit and withdrawal states
- Admin surface coverage
- Support, dispute, and merchant flows

But it is still a prototype. The frontend already tells us what the full system wants to be, and the next step is not more UI first. The next step is to build the backend state model, security model, wallet/escrow engine, and realtime event pipeline that these screens depend on.

If we build those foundations correctly, most of the current screens can be connected instead of redesigned.
