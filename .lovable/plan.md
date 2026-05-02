## Goal
Tighten the P2P buyer trade flow inside `src/components/TradeModals.tsx` so it mirrors the screens in the uploads: clearer payment-pending screen, a real "Pending for Release" stage, file attachment from chat, a richer dispute modal, a friendlier cancel warning, and a celebratory completion pop-up followed by an order review.

## Files touched
- `src/components/TradeModals.tsx` (main flow rewrite)
- new state machine inside `OrderPage`: `pending_payment → pending_release → completed_popup → completed_review → success(back to P2P)`

## Stage-by-stage changes

### 1. Pending for Payment (matches `01-active-p2p`)
- Rename the timer card heading to **"Pending for Payment"** with sub-line:
  *"Note: The order will be automatically canceled if the button is not clicked by the deadline. 00:14:50"* (orange).
- Add a soft-orange info banner: *"Make the payment according to the exact order details…"*.
- Show **Buy USDT** label, then a numbered 2-step list:
  1. *Transfer via {payment method}* with a **"Have issues in trading?"** pill on the right, then a card with *Seller's name*, *Fiat Amount* (green), *Name*, *Payment Details*, *Order No.*, and a collapsible *Order Details ▾*.
  2. *After payment, click the button below so the seller can release the crypto.*
- Bottom buttons: orange **Payment Completed** + outline **Cancel Order** (no Report/Dispute here).

### 2. Chat: + button file attach (matches `02-chat-plus-sign`)
- Wrap the `+` icon with a hidden `<input type="file" accept="image/jpeg,image/png,image/jpg,video/mp4">` and trigger it on click.
- Add a tooltip on hover: *"Upload videos in MP4 format only · Supported image formats: JPG/PNG/JPEG · File upload limit: 100MB"*.
- On file selection, append a system chat bubble showing the file name (no real upload).

### 3. Pending for Release (matches `03-pending-released`)
- New `orderStep === "pending_release"` rendered after Payment Completed.
- Header: **"Pending for release"** + *"The coins you've bought will be released within 00:09:50."* (orange) — start a fresh **5:00** countdown.
- Yellow info banner: *"Please do not cancel the order unless you have received the refund of your payment…"*.
- Summary block: Buy USDT, Fiat Amount, Price, Receive quantity, Order No., Order Time, Payment Method.
- Footer actions: **Cancel Order** (outline) + **Order Dispute? ›** link.
- Append a system chat message: *"You've completed the payment. Please wait for the seller to release the coins to you."*
- After ~12s of mock wait, auto-trigger the seller-release pop-up (step 4).

### 4. Order Dispute modal — 2 panels (matches `04-launch-dispute-A` / `B`)
Replace current `DisputeModal` with a 2-step wizard:
- **Panel A** shows orange info banner *"Be assured that LocalCoin Trade places the Seller's crypto assets in escrow…"* + a gray *"Before making an appeal, please attempt to resolve the issue with your counterparty. Contact now"* card + **What's the issue?** radio list with the exact 8 reasons from the screenshot. Buttons: orange **Next** (disabled until selection) + outline **Cancel**.
- **Panel B** appears when scrolled / Next clicked — same list with footnote *"If there is no financial dispute over the order but you would like to report your counterparty's violation, please use the 'Report User' button."* and a **Report User** link. Submitting moves order to `disputed`.

### 5. Cancel Order warning pop-up
- Keep existing `CancelOrderModal` but ensure copy reads as a clear warning:
  - Title: *"Are you sure you want to cancel this order?"* (already present).
  - Add prominent red icon + line *"Cancelling may affect your completion rate and the seller may reject future trades with you."*
- Yes → cancel; No → close.

### 6. Order Completed pop-up (matches `05-order-completed-pop-up`)
- New `Overlay` modal triggered when seller releases:
  - Big green check, **"{fiatAmount} {fiat}"**, sub-line *"Congrats, you've bought {quantity} {crypto}!"*.
  - Two side-by-side buttons: **View Order** (closes modal → review screen) + **View My Assets** (closes modal → review screen).
  - Two promo cards underneath: *"Explore Spot X on LocalCoin Trade"* and *"Derivatives — Upgrade your trades…"*, each with an orange **Trade →** button (no-op).
- Close (X) also moves to step 7.

### 7. Order completed + Review (matches `06-order-review`)
- Replace the full `TradeSuccessScreen` with an **Order completed** layout:
  - Title *"Order completed"* + sub-line *"This order has concluded, and the assets are no longer locked by LocalCoin Trade."*
  - Yellow notice about funding-account credit + security period.
  - Same details block as step 3 (Buy USDT, Fiat Amount, Price, Receive qty, Order No., Order Time, Payment Method).
  - Footer links: **Order Dispute? ›** + **View My Assets ›**.
  - **Review** card: *"How was your experience with this seller?"* with **Good 👍** / **Bad 👎** buttons. Clicking either shows a small *"Thanks for your feedback"* state and reveals **Back to P2P**.
  - Keep the chat panel on the right with the new "seller released the coins" system message.

## Technical notes
- All copy uses semantic tokens already in `index.css` (`bg-primary`, `text-success`, `text-destructive`, `bg-muted/20`, etc.) — no hard-coded colors.
- New stage type:
  ```ts
  type OrderStep = "pending_payment" | "pending_release" | "completed_popup" | "completed_review" | "disputed";
  ```
- Two independent `useEffect` countdowns (15-min for payment, 5-min for release).
- File-input ref pattern for the chat attach button; keep behaviour view-only (no upload).
- Dispute modal becomes internal 2-step: `disputeStep: "select" | "confirm"`.
- No backend, routing, or auth changes — purely presentational tweaks to one component.
