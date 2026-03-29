import { useState, useEffect } from "react";
import { X, Shield, CheckCircle, AlertCircle, FileText, Smartphone, ChevronRight, ChevronDown, Copy, Send, Plus, AlertTriangle } from "lucide-react";

type TradeOffer = {
  id: number;
  merchant: string;
  completionRate: string;
  orders: number;
  price: string;
  currency: string;
  available: string;
  limit: string;
  paymentMethods: string[];
  time: string;
  eligible: boolean;
};

// ─── Modal Overlay ───────────────────────────────────────────────────
const Overlay = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
    <div onClick={(e) => e.stopPropagation()} className="relative bg-card rounded-2xl shadow-2xl border border-border/30 max-h-[90vh] overflow-y-auto">
      {children}
    </div>
  </div>
);

// ─── KYC Verification Modal ─────────────────────────────────────────
export const KYCModal = ({ onClose }: { onClose: () => void }) => (
  <Overlay onClose={onClose}>
    <div className="w-[460px] p-8 text-center">
      <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
        <X className="h-5 w-5" />
      </button>
      <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-muted/30 flex items-center justify-center">
        <Shield className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-bold text-foreground mb-3">Get verified</h2>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        To ensure your security and that of your counterparty, please complete KYC Verification.
        Your information is only used for identity verification.
      </p>
      <button className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all">
        Verify Now
      </button>
    </div>
  </Overlay>
);

// ─── Trading Requirements Modal ─────────────────────────────────────
export const RequirementsModal = ({ onClose }: { onClose: () => void }) => (
  <Overlay onClose={onClose}>
    <div className="w-[460px] p-8">
      <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
        <X className="h-5 w-5" />
      </button>
      <h2 className="text-xl font-bold text-foreground mb-2">Trading Requirements</h2>
      <p className="text-sm text-muted-foreground mb-6">
        The following conditions do not meet the advertiser requirements
      </p>
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
          <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
          <span className="text-sm text-foreground">At least 5 orders in the past 30 days.</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
          <div className="flex items-center gap-3">
            <Smartphone className="h-5 w-5 text-muted-foreground shrink-0" />
            <span className="text-sm text-foreground">Link your mobile number</span>
          </div>
          <button className="text-xs px-3 py-1 rounded-full border border-primary text-primary font-medium hover:bg-primary/5">
            Check Now
          </button>
        </div>
      </div>
      <button onClick={onClose} className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all">
        Select another ad
      </button>
    </div>
  </Overlay>
);

// ─── Security Protection Modal ───────────────────────────────────────
export const SecurityModal = ({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) => (
  <Overlay onClose={onClose}>
    <div className="w-[460px] p-8 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
        <AlertCircle className="h-8 w-8 text-primary" />
      </div>
      <h2 className="text-xl font-bold text-foreground mb-3">Security Protection</h2>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        In order to enhance security, our system comprehensively evaluates every transaction to estimate risk levels.
        Should the transaction be deemed risky, it will impose a <span className="text-primary font-medium">24</span> hours
        withdrawal restriction on the relevant account(s).
      </p>
      <button onClick={onConfirm} className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all">
        Confirm
      </button>
    </div>
  </Overlay>
);

// ─── Dos and Don'ts Modal ────────────────────────────────────────────
export const DosAndDontsModal = ({ onClose, onContinue }: { onClose: () => void; onContinue: () => void }) => (
  <Overlay onClose={onClose}>
    <div className="w-[500px] p-8">
      <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
        <X className="h-5 w-5" />
      </button>
      <h2 className="text-lg font-bold text-foreground mb-6 leading-snug">
        If you are unable to make payment or encounter other issues, you can choose to cancel your order.
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
          <h3 className="text-destructive font-semibold text-sm mb-3 flex items-center gap-1">
            <X className="h-3.5 w-3.5" /> Don'ts
          </h3>
          <ul className="space-y-2 text-xs text-foreground/80">
            <li className="flex items-start gap-1.5"><span className="text-destructive mt-0.5">•</span>Don't cancel the order after making the payment</li>
            <li className="flex items-start gap-1.5"><span className="text-destructive mt-0.5">•</span>Don't make the payment if the payment information is ambiguous or mismatched</li>
            <li className="flex items-start gap-1.5"><span className="text-destructive mt-0.5">•</span>Don't be misled by false promises</li>
          </ul>
        </div>
        <div className="bg-success/5 border border-success/20 rounded-xl p-4">
          <h3 className="text-success font-semibold text-sm mb-3 flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5" /> Dos
          </h3>
          <ul className="space-y-2 text-xs text-foreground/80">
            <li className="flex items-start gap-1.5"><span className="text-success mt-0.5">•</span>Select the correct order cancellation reason</li>
            <li className="flex items-start gap-1.5"><span className="text-success mt-0.5">•</span>Communicate with the seller only via the order chatbox</li>
            <li className="flex items-start gap-1.5"><span className="text-success mt-0.5">•</span>Understand the trading process and information before trading</li>
          </ul>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-6">
        • You will be restricted from placing a new P2P order for 24 hours if you cancel 3 orders within a day (due to Buyer's issue).
      </p>
      <button onClick={onContinue} className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all">
        Continue
      </button>
    </div>
  </Overlay>
);

// ─── Trade Dialog (Buy / Sell) ───────────────────────────────────────
export const TradeDialog = ({
  offer,
  activeTab,
  selectedCrypto,
  onClose,
}: {
  offer: TradeOffer;
  activeTab: "buy" | "sell";
  selectedCrypto: string;
  onClose: () => void;
}) => {
  const [payAmount, setPayAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [lastEdited, setLastEdited] = useState<"pay" | "receive">("pay");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [paymentDropdownOpen, setPaymentDropdownOpen] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showDosAndDonts, setShowDosAndDonts] = useState(false);
  const [showOrderPage, setShowOrderPage] = useState(false);

  const isBuy = activeTab === "buy";
  const countdown = parseInt(offer.time) || 30;
  const rate = parseFloat(offer.price);

  const handlePayChange = (val: string) => {
    setPayAmount(val);
    setLastEdited("pay");
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      if (isBuy) {
        setReceiveAmount((num / rate).toFixed(4));
      } else {
        setReceiveAmount((num * rate).toFixed(2));
      }
    } else {
      setReceiveAmount("");
    }
  };

  const handleReceiveChange = (val: string) => {
    setReceiveAmount(val);
    setLastEdited("receive");
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      if (isBuy) {
        setPayAmount((num * rate).toFixed(2));
      } else {
        setPayAmount((num / rate).toFixed(4));
      }
    } else {
      setPayAmount("");
    }
  };

  const handleAllPay = () => {
    const available = parseFloat(offer.available.replace(/[^0-9.]/g, ""));
    if (isBuy) {
      const maxKes = available * rate;
      handlePayChange(maxKes.toFixed(2));
    } else {
      handlePayChange(available.toFixed(4));
    }
  };

  const handleAllReceive = () => {
    const available = parseFloat(offer.available.replace(/[^0-9.]/g, ""));
    if (isBuy) {
      handleReceiveChange(available.toFixed(4));
    } else {
      const maxKes = available * rate;
      handleReceiveChange(maxKes.toFixed(2));
    }
  };

  const handleBuySell = () => {
    setShowSecurity(true);
  };

  const handleSecurityConfirm = () => {
    setShowSecurity(false);
    setShowDosAndDonts(true);
  };

  const handleDosAndDontsContinue = () => {
    setShowDosAndDonts(false);
    setShowOrderPage(true);
  };

  if (showSecurity) {
    return <SecurityModal onClose={() => setShowSecurity(false)} onConfirm={handleSecurityConfirm} />;
  }

  if (showDosAndDonts) {
    return <DosAndDontsModal onClose={() => setShowDosAndDonts(false)} onContinue={handleDosAndDontsContinue} />;
  }

  if (showOrderPage) {
    return (
      <OrderPage
        offer={offer}
        activeTab={activeTab}
        selectedCrypto={selectedCrypto}
        payAmount={payAmount || "600.00"}
        onClose={onClose}
      />
    );
  }

  return (
    <Overlay onClose={onClose}>
      <div className="w-[720px] flex">
        {/* Left – Merchant Info */}
        <div className="w-[340px] p-6 border-r border-border/30">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
              {offer.merchant[0]}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-foreground">{offer.merchant}</span>
                <Shield className="h-3.5 w-3.5 text-primary" />
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {offer.orders.toLocaleString()} Order(s) &nbsp;|&nbsp; {offer.completionRate}
              </div>
              <div className="text-xs text-muted-foreground">2 minutes ago</div>
            </div>
          </div>

          <div className="flex gap-3 mt-3 mb-5">
            <span className="flex items-center gap-1 text-xs"><CheckCircle className="h-3 w-3 text-success" />Email</span>
            <span className="flex items-center gap-1 text-xs"><CheckCircle className="h-3 w-3 text-success" />SMS</span>
            <span className="flex items-center gap-1 text-xs"><CheckCircle className="h-3 w-3 text-success" />Identity Verification</span>
          </div>

          <div className="space-y-2.5 text-sm mb-5">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Available</span>
              <span className="font-medium text-foreground">{offer.available}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Limits</span>
              <span className="font-medium text-foreground">{offer.limit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Duration</span>
              <span className="font-medium text-foreground">{offer.time.replace("m", "m")}</span>
            </div>
            {isBuy && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Payment Method</span>
                <div className="flex gap-1">
                  {offer.paymentMethods.slice(0, 2).map(pm => (
                    <span key={pm} className="text-xs px-2 py-0.5 rounded border border-border bg-muted/20">{pm.length > 14 ? pm.slice(0, 14) + "..." : pm}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border/30 pt-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Advertiser Terms</h4>
            <div className="text-xs text-muted-foreground bg-muted/10 rounded-lg p-3 leading-relaxed">
              <p className="flex items-start gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                Merchants may include additional terms in their Advertiser Terms. Please review them carefully before placing an order. In the event of any conflict, the <span className="text-primary cursor-pointer">Platform Terms</span> shall prevail. Violations will not be protected under platform protection.
              </p>
            </div>
            <div className="mt-3 text-xs font-semibold text-foreground bg-muted/20 rounded-lg p-3">
              NO THIRD PARTY ACCEPTED FOR NOW
            </div>
          </div>
        </div>

        {/* Right – Order Form */}
        <div className="flex-1 p-6">
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Price</span>
            <span className="text-xl font-bold text-primary">{offer.price} {offer.currency}</span>
            <span className="text-sm text-muted-foreground">{countdown}s</span>
          </div>

          {/* I will pay / I will sell */}
          <div className="mb-4">
            <div className="border border-border rounded-xl p-4">
              <label className="text-xs text-muted-foreground mb-2 block">
                {isBuy ? "I will pay" : "I will sell"}
              </label>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[8px] font-bold text-primary">
                  {isBuy ? offer.currency.substring(0, 2) : "₮"}
                </div>
                <input
                  type="text"
                  value={payAmount}
                  onChange={(e) => handlePayChange(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 bg-transparent outline-none text-sm text-foreground"
                />
                <span className="text-sm text-muted-foreground">{isBuy ? offer.currency : selectedCrypto}</span>
                <button onClick={handleAllPay} className="text-primary text-sm font-medium">All</button>
              </div>
            </div>
            {!isBuy && (
              <p className="text-xs text-muted-foreground mt-1.5">Available for Sale <span className="font-medium text-foreground">0 {selectedCrypto}</span></p>
            )}
          </div>

          {/* I will receive */}
          <div className="border border-border rounded-xl p-4 mb-4">
            <label className="text-xs text-muted-foreground mb-2 block">
              {isBuy ? "I will receive" : "I will receive"}
            </label>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center text-[8px] font-bold text-success">
                {isBuy ? "₮" : offer.currency.substring(0, 2)}
              </div>
              <input
                type="text"
                value={receiveAmount}
                onChange={(e) => handleReceiveChange(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-transparent outline-none text-sm text-foreground"
              />
              <span className="text-sm text-muted-foreground">{isBuy ? selectedCrypto : offer.currency}</span>
              <button onClick={handleAllReceive} className="text-primary text-sm font-medium">All</button>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="relative mb-6">
            <button
              onClick={() => setPaymentDropdownOpen(!paymentDropdownOpen)}
              className="w-full flex items-center justify-between border border-border rounded-xl px-4 py-3 text-sm text-muted-foreground"
            >
              {selectedPayment || "Select A Payment Method"}
              <ChevronDown className="h-4 w-4" />
            </button>
            {paymentDropdownOpen && (
              <div className="absolute top-full mt-1 w-full bg-card border border-border rounded-xl shadow-lg z-10 py-1">
                {offer.paymentMethods.map(pm => (
                  <button
                    key={pm}
                    onClick={() => { setSelectedPayment(pm); setPaymentDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted/30"
                  >
                    {pm}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={handleBuySell}
              className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all ${
                isBuy
                  ? "bg-primary text-primary-foreground hover:brightness-110"
                  : "bg-destructive/80 text-white hover:bg-destructive"
              }`}
            >
              {isBuy ? "Buy" : "Sell"}
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-full border border-border text-foreground text-sm font-medium hover:bg-muted/30 transition-colors"
            >
              Cancel
            </button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            If there is risk, the withdrawal may be delayed by up to 24 hours.
          </p>
        </div>
      </div>
    </Overlay>
  );
};

// ─── Order Page (full-page, replaces dashboard) ─────────────────────
const OrderPage = ({
  offer,
  activeTab,
  selectedCrypto,
  payAmount,
  onClose,
}: {
  offer: TradeOffer;
  activeTab: "buy" | "sell";
  selectedCrypto: string;
  payAmount: string;
  onClose: () => void;
}) => {
  const [showConfirmPayment, setShowConfirmPayment] = useState(false);
  const [showCancelOrder, setShowCancelOrder] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [minutes, setMinutes] = useState(14);
  const [seconds, setSeconds] = useState(59);
  const isBuy = activeTab === "buy";
  const price = parseFloat(offer.price);
  const pay = parseFloat(payAmount) || 600;
  const quantity = (pay / price).toFixed(4);
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
  const orderId = `2038${Date.now()}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => {
        if (s === 0) {
          setMinutes(m => Math.max(0, m - 1));
          return 59;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[90] bg-background overflow-y-auto">
      {/* Modals rendered as overlays on top of order page */}
      {showConfirmPayment && (
        <ConfirmPaymentModal
          offer={offer}
          payAmount={pay.toFixed(2)}
          onClose={() => setShowConfirmPayment(false)}
          onConfirm={() => { setShowConfirmPayment(false); onClose(); }}
        />
      )}
      {showCancelOrder && (
        <CancelOrderModal
          onClose={() => setShowCancelOrder(false)}
          onConfirm={() => { setShowCancelOrder(false); onClose(); }}
        />
      )}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">{isBuy ? "Buy" : "Sell"} {selectedCrypto}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{dateStr}</span>
            <span className="flex items-center gap-1 font-mono text-xs">{orderId.slice(0, 19)} <Copy className="h-3 w-3 cursor-pointer hover:text-foreground" /></span>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Left – Order Details */}
          <div className="flex-1">
            {/* Timer Card */}
            <div className="bg-card rounded-xl border border-border/30 p-6 mb-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-xl">⏱</span>
                  <h3 className="text-lg font-semibold text-foreground">Complete Your Payment Within:</h3>
                </div>
                <div className="flex items-center gap-1">
                  <span className="bg-success text-white text-xl font-bold px-2.5 py-1 rounded">{String(minutes).padStart(2, "0")}</span>
                  <span className="text-xl font-bold text-foreground">:</span>
                  <span className="bg-success text-white text-xl font-bold px-2.5 py-1 rounded">{String(seconds).padStart(2, "0")}</span>
                </div>
              </div>

              <ul className="text-sm text-muted-foreground space-y-2 mb-6 list-disc pl-5">
                <li>Please complete payment within the allowed timeframe.</li>
                <li>After making the payment using a payment method outside of LocalCoin Trade, please click on the "I have completed the payment" button below.</li>
                <li>Note: The order will be automatically canceled if the button is not clicked by the deadline.</li>
              </ul>

              {/* 3-step progress */}
              <div className="flex items-center bg-muted/10 rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">1</span>
                  <span className="text-sm font-medium text-foreground">Complete Your Payment</span>
                </div>
                <div className="flex-1 mx-4 h-px bg-border relative">
                  <div className="absolute left-0 top-0 h-px bg-success w-0" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs font-bold flex items-center justify-center">2</span>
                  <span className="text-sm text-muted-foreground">Coin Release in Progress</span>
                </div>
                <div className="flex-1 mx-4 h-px bg-border" />
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs font-bold flex items-center justify-center">3</span>
                  <span className="text-sm text-muted-foreground">Transaction Completed</span>
                </div>
              </div>
            </div>

            {/* Order Info */}
            <div className="mb-6">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" /> Order Info
              </h4>
              <div className="grid grid-cols-3 border border-border rounded-xl overflow-hidden">
                <div className="p-4 border-r border-border">
                  <span className="text-xs text-muted-foreground block mb-1">Pay</span>
                  <span className="text-sm font-semibold text-primary">{pay.toFixed(2)} {offer.currency}</span>
                </div>
                <div className="p-4 border-r border-border">
                  <span className="text-xs text-muted-foreground block mb-1">Price</span>
                  <span className="text-sm font-medium text-foreground">{offer.price} {offer.currency}</span>
                </div>
                <div className="p-4">
                  <span className="text-xs text-muted-foreground block mb-1">Total Quantity</span>
                  <span className="text-sm font-medium text-foreground">{quantity} {selectedCrypto}</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" /> Payment Methods Accepted by the Seller
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                Please select a payment method and visit the site of the bank or the payment service of your choosing to complete the payment.
              </p>
              <div className="space-y-3">
                {offer.paymentMethods.map(pm => (
                  <div key={pm} className="border border-border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-success" />
                      <span className="text-sm font-medium text-foreground">{pm}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Name</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-foreground">RACHAEL MUUSI KILONZI</span>
                          <Copy className="h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-foreground" />
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Payment Details</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-foreground">0759810845</span>
                          <Copy className="h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Actions */}
            <div className="flex gap-3 sticky bottom-0 bg-background py-4">
              <button
                onClick={() => setShowConfirmPayment(true)}
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all"
              >
                Payment Completed
              </button>
              <button
                onClick={() => setShowCancelOrder(true)}
                className="px-8 py-3 rounded-full border border-border text-foreground text-sm font-medium hover:bg-muted/30 transition-colors flex items-center gap-1"
              >
                Cancel Order <AlertCircle className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Right – Seller Info & Chat */}
          <div className="w-[380px] shrink-0">
            {/* Seller Card */}
            <div className="bg-card rounded-xl border border-border/30 p-4 mb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                    {offer.merchant[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-foreground">{offer.merchant}</span>
                      <Shield className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <CheckCircle className="h-3 w-3 text-success" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground">RACHAEL MUUSI KILONZI</span>
                  <div className="mt-1">
                    <span className="text-xs text-destructive cursor-pointer hover:underline">Report User</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Panel */}
            <div className="bg-card rounded-xl border border-border/30 flex flex-col" style={{ height: "calc(100vh - 280px)" }}>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* System messages */}
                <div className="bg-success/10 border border-success/20 rounded-lg p-3 space-y-2">
                  <p className="text-xs text-foreground flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                    The assets of the seller have been locked. You can make the transfer with confidence.
                  </p>
                  <p className="text-xs text-foreground flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                    Please chat within the platform. External records cannot be used as evidence in order disputes.
                  </p>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                  <p className="text-xs text-primary leading-relaxed">
                    communicate outside the LocalCoin Trade. Please verify the information carefully. Stay vigilant, be aware of scams! <span className="font-medium underline cursor-pointer">Read More</span>
                  </p>
                </div>

                <div className="text-center text-xs text-muted-foreground">{dateStr}</div>

                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                  <p className="text-xs text-foreground flex items-start gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-destructive shrink-0 mt-0.5" />
                    It is strongly recommended that you do not release the coins if the other party requests payment through a third-party account instead of an account under their real name. In such situations, we advise you to refund the payment and cancel the order.
                  </p>
                </div>

                {/* Seller message */}
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground font-bold text-xs shrink-0">
                    {offer.merchant[0]}
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">{offer.merchant} (Seller)</div>
                    <div className="bg-muted/20 rounded-lg px-3 py-2 text-sm text-foreground">
                      NO THIRD PARTY ACCEPTED FOR NOW
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{dateStr}</div>
                  </div>
                </div>

                {/* Bot suggestion */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-lg shrink-0">🤖</div>
                  <div className="flex-1 bg-primary/5 border border-primary/20 rounded-full px-4 py-2 flex items-center justify-between">
                    <span className="text-xs text-foreground">Check the counterparty's trading per...</span>
                    <X className="h-3.5 w-3.5 text-muted-foreground cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="border-t border-border p-3 flex items-center gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Enter your message"
                  className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                />
                <button className="text-muted-foreground hover:text-foreground">
                  <Plus className="h-5 w-5" />
                </button>
                <button className="text-primary hover:brightness-110">
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Confirm Payment Modal ───────────────────────────────────────────
const ConfirmPaymentModal = ({
  offer,
  payAmount,
  onClose,
  onConfirm,
}: {
  offer: TradeOffer;
  payAmount: string;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const [transferAmount, setTransferAmount] = useState("");
  const [checkPlatform, setCheckPlatform] = useState(false);
  const [checkLegalName, setCheckLegalName] = useState(false);

  return (
    <Overlay onClose={onClose}>
      <div className="w-[480px] p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-foreground">Confirm Payment</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>

        <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3 text-xs text-foreground mb-5 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
          <span>To avoid account suspension, do not tap 'Confirm Payment' without having paid.</span>
        </div>

        <p className="text-sm text-foreground mb-4">Confirm you have made payment to the following:</p>

        <div className="border border-border rounded-xl p-4 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1 h-4 bg-primary rounded-full" />
            <span className="text-sm font-medium">{offer.paymentMethods[0]}</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-foreground">RACHAEL MUUSI KILONZI</span>
                <Copy className="h-3.5 w-3.5 text-muted-foreground cursor-pointer" />
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Details</span>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-foreground">0759810845</span>
                <Copy className="h-3.5 w-3.5 text-muted-foreground cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm text-foreground mb-2 block">Actual transfer amount:</label>
          <div className="flex items-center border-2 border-primary rounded-xl px-4 py-3">
            <input
              type="text"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder="Actual transfer amount:"
              className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
            />
            <span className="text-primary text-sm font-medium">{offer.currency}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> Tip: Please enter the payment amount for the current order.
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <div
              onClick={() => setCheckPlatform(!checkPlatform)}
              className={`w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${checkPlatform ? "bg-primary border-primary" : "border-border"}`}
            >
              {checkPlatform && <span className="text-primary-foreground text-[9px]">✓</span>}
            </div>
            <span className="text-xs text-foreground leading-relaxed">I understand completing the transfer requires leaving the platform and that LocalCoin Trade does not automatically process the payment.</span>
          </label>
          <label className="flex items-start gap-2.5 cursor-pointer">
            <div
              onClick={() => setCheckLegalName(!checkLegalName)}
              className={`w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${checkLegalName ? "bg-primary border-primary" : "border-border"}`}
            >
              {checkLegalName && <span className="text-primary-foreground text-[9px]">✓</span>}
            </div>
            <span className="text-xs text-foreground">I confirm that I will pay using an account with my legal name.</span>
          </label>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            disabled={!checkPlatform || !checkLegalName}
            className="flex-1 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Payment
          </button>
          <button onClick={onClose} className="flex-1 py-3 rounded-full border border-border text-foreground text-sm font-medium hover:bg-muted/30 transition-colors">
            Not paid
          </button>
        </div>
      </div>
    </Overlay>
  );
};

// ─── Cancel Order Modal ──────────────────────────────────────────────
const CancelOrderModal = ({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const [buyerReason, setBuyerReason] = useState("I no longer wish to proceed with this order");
  const [sellerReason, setSellerReason] = useState("");
  const [confirmNotPaid, setConfirmNotPaid] = useState(false);

  const buyerReasons = [
    "I no longer wish to proceed with this order",
    "I didn't meet the counterparty's requirements",
    "I didn't know how to make the payment",
    "Other",
  ];
  const sellerReasons = [
    "I have made the payment, but the seller requests to cancel order",
    "The payment method provided by the seller is missing/invalid/incomplete",
    "The counterparty tended to charge me extra fees",
    "The seller requested payment to an account that did not match his/her legal name",
  ];

  return (
    <Overlay onClose={onClose}>
      <div className="w-[500px] max-h-[85vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-foreground">Are you sure you want to cancel this order?</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-xs text-foreground mb-5 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <span>The order cancellation reason can only be selected once. It affects whether this order should be counted in your completion rate calculation.</span>
        </div>

        <h3 className="text-sm font-bold text-foreground mb-1">Please select a reason for cancellation.</h3>
        <p className="text-xs text-primary mb-4 cursor-pointer">
          If you are unable to make payment or encounter other issues, you can choose to cancel your order. <ChevronRight className="inline h-3 w-3" />
        </p>

        {/* Buyer Issue */}
        <h4 className="text-sm font-medium text-foreground mb-3">Buyer Issue</h4>
        <div className="space-y-2 mb-5 border border-border rounded-xl p-3">
          {buyerReasons.map(r => (
            <label key={r} className="flex items-center gap-3 cursor-pointer py-1">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${buyerReason === r ? "border-primary" : "border-border"}`}>
                {buyerReason === r && <div className="w-2 h-2 rounded-full bg-primary" />}
              </div>
              <span className="text-sm text-foreground">{r}</span>
              {r.includes("didn't know") && (
                <button className="text-xs text-primary flex items-center gap-0.5 ml-auto">View Tutorial</button>
              )}
            </label>
          ))}
        </div>

        {/* Seller Issue */}
        <h4 className="text-sm font-medium text-foreground mb-3">Seller Issue</h4>
        <div className="space-y-2 mb-5 border border-border rounded-xl p-3">
          {sellerReasons.map(r => (
            <label key={r} className="flex items-start gap-3 cursor-pointer py-1">
              <div className={`w-4 h-4 mt-0.5 rounded-full border-2 flex items-center justify-center shrink-0 ${sellerReason === r ? "border-primary" : "border-border"}`}>
                {sellerReason === r && <div className="w-2 h-2 rounded-full bg-primary" />}
              </div>
              <span className="text-sm text-foreground">{r}</span>
            </label>
          ))}
        </div>

        {/* Confirm checkbox */}
        <label className="flex items-center gap-2.5 mb-5 cursor-pointer">
          <div
            onClick={() => setConfirmNotPaid(!confirmNotPaid)}
            className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${confirmNotPaid ? "bg-primary border-primary" : "border-border"}`}
          >
            {confirmNotPaid && <span className="text-primary-foreground text-[9px]">✓</span>}
          </div>
          <span className="text-sm text-foreground">I have not paid the seller / have received seller's refund</span>
        </label>

        <div className="flex gap-3 mb-4">
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all"
          >
            Yes
          </button>
          <button onClick={onClose} className="flex-1 py-3 rounded-full border border-border text-foreground text-sm font-bold hover:bg-muted/30 transition-colors">
            No
          </button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          If you would like to report any malicious behavior, <span className="text-primary cursor-pointer">Report User</span>
        </p>
      </div>
    </Overlay>
  );
};
