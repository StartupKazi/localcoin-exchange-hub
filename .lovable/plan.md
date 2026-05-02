## Goal

Make the P2P experience match the uploaded mobile screens. Two areas:

1. **P2P Offer (Ads) List** on mobile — replace the cramped 5-column grid with stacked merchant cards like `p2p-bybit.jpeg`.
2. **P2P Trade Flow** on mobile — restyle every stage (Pending for Payment, Confirmation drawer, Pending for Release, Get Help, Order Dispute, Upload Proof, Appeal progress) to match `01–08-p2p.jpeg`. Desktop layout is left untouched; only mobile (`< md`) gets the new look.

No backend, routing, or auth changes. Light-theme stays as-is per project memory; we are only changing structure/spacing for the small viewport.

## Files touched

- `src/components/P2PDashboard.tsx` — add a mobile card list rendering of offers (visible on `< md`), keep existing table for `md+`.
- `src/components/TradeModals.tsx` — restructure `OrderPage`, `ConfirmPaymentModal`, `DisputeModal` and add new `GetHelpScreen`, `UploadProofScreen`, `AppealProgress` step. Mobile becomes a single-column stacked layout with sticky bottom bar; desktop two-column layout is preserved.

## Section-by-section changes

### 1. Mobile Ads List (P2PDashboard `TradeTable`)
Render the existing rows in two ways:
- `md:` and up → current grid table (unchanged).
- below `md` → stacked cards, one per merchant, matching `p2p-bybit.jpeg`:
  - top row: avatar + merchant name (with verified shield) on the left, `15m`/`30m` timer chip top-right.
  - second row: `{orders} Order(s) | {completion}`.
  - large price line: `KES 130.40` with currency label small.
  - `Available 138.2111 USDT`.
  - `Limits 1,500.00 ~ 18,022.72 KES`.
  - payment-method chips with the small left color bar (`| M-pesa Paybill`).
  - bottom-right green pill: `Buy USDT` / `Sell USDT` (or outlined `Ineligible`).
- Hide the "Taker 0 Transaction Fees" header, pagination is moved below the cards on mobile.

### 2. Mobile Order Page layout
On mobile the right-side seller/chat column is dropped from the main page; a `Contact Seller` pill appears inline (matches screen 01). Chat opens via the existing chat affordance — but for this pass we only need the pill button styled like in the screenshot (still calls existing chat panel as a slide-over on mobile, or just routes attention to the seller card).

#### 2a. Pending for Payment (screen 01)
- Top progress bar of 3 segments (active = primary; others muted).
- `Cancel Order` link top-right of the page.
- Title `Pending for Payment` + red note line with countdown.
- Seller pill row: `wAnTeD_CoIn  >`  on left, orange `Contact Seller` pill on right.
- Numbered step `1` "Transfer via {payment method}" then a stacked card containing `Fiat Amount`, `Name`, `Account Number/Card No`, `Paybill Number`, `Order No.`, with copy icons.
- Numbered step `2` "After payment, click the button below so the seller can release the crypto.".
- Soft list of 6 platform rules (mute color).
- Fixed bottom bar: dark pill "💡 Encountered an Issue?  ›" linking to `GetHelpScreen`, then large orange `Payment Completed` button.

#### 2b. Confirmation drawer (screen 03)
Convert `ConfirmPaymentModal` on mobile into a bottom sheet (full width, rounded top, slide up): title `Confirmation`, info banner, payment-method card (Name/Account No/Paybill), `Actual transfer amount` input, two checkboxes pre-checked, full-width orange `Confirm` button.

#### 2c. Pending for Release (screen 04)
- Progress bar advances to step 2.
- Title `The coins will be released in` + `Coin Release in Progress 09:50` (orange).
- Seller pill row again.
- "💎 Buy USDT" header, then list: Amount, Price, Total Quantity, Transaction Fees, Order No. (with copy), Order Time, divider, `Payment Method ▾`, `| M-pesa Paybill`.
- Bottom bar: outline `Order Dispute?` (left) opens new dispute flow; orange `Reminder` (right).

#### 2d. Get Help (screen 06) — new component
Triggered by "Encountered an Issue?" or "Order Dispute?" link.
- Header: back arrow + `Get Help`.
- Subtitle "Try to resolve the issue by following these steps:" then a card with 4 dotted-timeline items.
- Bottom paragraph "Please wait patiently…".
- Bottom: outline `Submit Appeal` (opens Order Dispute), orange `Contact Seller`.

#### 2e. Order Dispute (screens 07 + 08) — refactored DisputeModal
On mobile become a full-screen page rather than centered dialog:
- Header: back arrow + `Order Dispute`.
- Orange info banner "Be assured that LocalCoin Trade places the Seller's crypto assets in escrow…".
- Gray card with "Before making an appeal, please attempt to resolve the issue with your counterparty" + orange `Contact Seller` link.
- "What's the issue?" radio list (8 reasons — already present).
- Footer note "If there is no financial dispute…" + orange `Report User` link.
- Sticky bottom: orange `Next` (disabled until selection).
- After Next, show **Appeal Details** bottom-sheet (screen 07) with three Yes/No questions and `Get Help` / `Cancel` buttons. `Get Help` advances to Upload Proof; `Cancel` dismisses.

#### 2f. Upload Proof (screen 05) — new component
- Header `Upload Proof`.
- Orange warning banner.
- Horizontal stepper (numbered 1-4 orange circles): `Appeal Submitted`, `Mutual Negotiation`, `Appeal in Progress`, `Appeal Ended`.
- "Reason for appeal" line showing the selected reason.
- "Proof Document(s)(Required)" with a `+` upload tile (uses hidden `<input type=file multiple accept="image/*,video/mp4,application/pdf">`); show uploaded file thumbnails/names; cap at 4 files.
- Helper text & 100MB note.
- Card with "Submit video proof in .mp4 or .pdf format only" + 3 dotted steps (Login process / Account details page / Transaction details).
- Orange link "Video Upload Guide for Different Devices ›".
- Sticky bottom: orange `Submit Appeal` (disabled with no proof). Submitting moves to a simple `Appeal Submitted` confirmation that flips order state to `disputed` and lands back on the order page showing dispute banner.

### 3. Cancel Order modal
Keep existing copy; on mobile render as bottom sheet (rounded top, slides up) instead of centered dialog.

### 4. Order Completed pop-up & review (existing)
Keep current flow; just ensure the popup card and review screen also stack cleanly on mobile (single-column buttons, smaller padding).

## Technical notes

- New `OrderStep` becomes:
  ```ts
  type OrderStep =
    | "pending_payment"
    | "pending_release"
    | "get_help"
    | "dispute_select"
    | "dispute_appeal_details"
    | "upload_proof"
    | "completed_review"
    | "disputed";
  ```
- Replace the old single `DisputeModal` with three sub-views rendered inside `OrderPage`'s main column on mobile and as overlay on desktop (we keep the current modal version for desktop unchanged for parity).
- New shared `MobileBottomSheet` helper in `TradeModals.tsx` for `Confirmation`, `Appeal Details`, and `Cancel Order` on `< md`.
- Use Tailwind responsive classes (`md:hidden`, `hidden md:block`) to swap layouts; no separate route.
- Selected reason from dispute page is passed into `UploadProofScreen` so the "Reason for appeal" line is dynamic.
- Files in `UploadProofScreen` are kept in local state only (no real upload), name list rendered next to the `+` tile.
- Stepper uses `w-6 h-6 rounded-full bg-primary text-primary-foreground` for active steps and `bg-muted text-muted-foreground` for inactive.
- All colors via existing semantic tokens (`primary`, `success`, `destructive`, `muted`, `border`, `foreground`).

