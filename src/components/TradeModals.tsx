import { useState, useEffect, useRef } from "react";
import { X, Shield, CheckCircle, AlertCircle, FileText, Smartphone, ChevronRight, ChevronDown, Copy, Send, Plus, AlertTriangle, PartyPopper, Lock, Flag, Clock, ArrowRight, ThumbsUp, ThumbsDown, MessageCircle, Bitcoin, TrendingUp, Paperclip, ArrowLeft, Lightbulb } from "lucide-react";

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
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6" onClick={onClose}>
    <div onClick={(e) => e.stopPropagation()} className="relative bg-card rounded-2xl shadow-2xl border border-border/30 max-h-[90vh] overflow-y-auto w-full max-w-full sm:w-auto">
      {children}
    </div>
  </div>
);

// ─── KYC Verification Modal ─────────────────────────────────────────
export const KYCModal = ({ onClose }: { onClose: () => void }) => (
  <Overlay onClose={onClose}>
    <div className="w-full sm:w-[460px] p-6 sm:p-8 text-center">
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
    <div className="w-full sm:w-[460px] p-6 sm:p-8">
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
    <div className="w-full sm:w-[460px] p-6 sm:p-8 text-center">
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
    <div className="w-full sm:w-[500px] p-6 sm:p-8">
      <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
        <X className="h-5 w-5" />
      </button>
      <h2 className="text-lg font-bold text-foreground mb-6 leading-snug">
        If you are unable to make payment or encounter other issues, you can choose to cancel your order.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
      <div className="w-full md:w-[720px] flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
        {/* Top (mobile) / Left (desktop) – Merchant Info */}
        <div className="w-full md:w-[340px] p-4 md:p-6 border-b md:border-b-0 md:border-r border-border/30">
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

        {/* Bottom (mobile) / Right (desktop) – Order Form */}
        <div className="flex-1 p-4 md:p-6">
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

// ─── Trade Success Screen ────────────────────────────────────────────
const TradeSuccessScreen = ({
  offer,
  activeTab,
  selectedCrypto,
  quantity,
  payAmount,
  onClose,
}: {
  offer: TradeOffer;
  activeTab: "buy" | "sell";
  selectedCrypto: string;
  quantity: string;
  payAmount: string;
  onClose: () => void;
}) => {
  const isBuy = activeTab === "buy";
  return (
    <div className="fixed inset-0 z-[90] bg-background overflow-y-auto">
      <div className="max-w-xl mx-auto px-6 py-16 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
          <PartyPopper className="h-10 w-10 text-success" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Transaction Completed!</h1>
        <p className="text-muted-foreground mb-8">
          Your P2P {isBuy ? "purchase" : "sale"} has been successfully completed.
        </p>

        {/* Coin Transfer Summary */}
        <div className="bg-card rounded-2xl border border-border/30 p-6 mb-6 text-left">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">Transfer Summary</h3>
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 text-center">
              <p className="text-xs text-muted-foreground mb-1">{isBuy ? "You Paid" : "You Sold"}</p>
              <p className="text-xl font-bold text-foreground">
                {isBuy ? `${payAmount} ${offer.currency}` : `${quantity} ${selectedCrypto}`}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center mx-4">
              <ArrowRight className="h-5 w-5 text-success" />
            </div>
            <div className="flex-1 text-center">
              <p className="text-xs text-muted-foreground mb-1">{isBuy ? "You Received" : "You Received"}</p>
              <p className="text-xl font-bold text-success">
                {isBuy ? `${quantity} ${selectedCrypto}` : `${payAmount} ${offer.currency}`}
              </p>
            </div>
          </div>

          <div className="border-t border-border/30 pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Merchant</span>
              <span className="font-medium text-foreground flex items-center gap-1">{offer.merchant} <Shield className="h-3 w-3 text-primary" /></span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price</span>
              <span className="font-medium text-foreground">{offer.price} {offer.currency}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium text-foreground">{offer.paymentMethods[0]}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium text-success flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5" /> Completed</span>
            </div>
          </div>
        </div>

        {/* Coin credited notice */}
        <div className="bg-success/5 border border-success/20 rounded-xl p-4 mb-8 flex items-start gap-3 text-left">
          <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-0.5">
              {isBuy ? `${quantity} ${selectedCrypto} has been credited to your Spot Wallet` : `${payAmount} ${offer.currency} has been transferred to your account`}
            </p>
            <p className="text-xs text-muted-foreground">
              The funds are now available for trading, withdrawal, or conversion.
            </p>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all"
          >
            Back to P2P
          </button>
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-full border border-border text-foreground text-sm font-medium hover:bg-muted/30 transition-colors"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Dispute Modal (2-panel wizard) ──────────────────────────────────
const DisputeModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: () => void;
}) => {
  const [reason, setReason] = useState("");
  const [step, setStep] = useState<"select" | "confirm">("select");

  const reasons = [
    "I've completed my payment but the counterparty hasn't released the coins",
    "I have paid more than the required amount",
    "Counterparty requested payment to an account that mismatched with the verified name, and I have completed the payment",
    "Counterparty requested additional payment (excluding transaction fees), and I have completed the payment.",
    "I have paid to the wrong account",
    "Counterparty engaged in fraudulent behavior, and I have completed the payment",
    "Counterparty insulted me, and I do not wish to continue this trade",
    "Other order dispute issues",
  ];

  return (
    <Overlay onClose={onClose}>
      <div className="w-full sm:w-[560px] max-h-[85vh] overflow-y-auto p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-foreground">Order Dispute</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>

        {step === "select" && (
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-foreground mb-4 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>Be assured that LocalCoin Trade places the Seller's crypto assets in escrow for all uncompleted orders.</span>
          </div>
        )}

        <div className="bg-muted/30 rounded-xl p-4 mb-5">
          <p className="text-sm text-foreground mb-2">Before making an appeal, please attempt to resolve the issue with your counterparty.</p>
          <button className="text-sm text-primary font-medium flex items-center gap-1.5">
            <MessageCircle className="h-4 w-4" /> Contact now
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-3">What's the issue?</p>
        <div className="space-y-3 mb-5">
          {reasons.map((r) => (
            <label key={r} className="flex items-start gap-3 cursor-pointer">
              <div className={`w-4 h-4 mt-0.5 rounded-full border-2 flex items-center justify-center shrink-0 ${reason === r ? "border-primary" : "border-border"}`}>
                {reason === r && <div className="w-2 h-2 rounded-full bg-primary" />}
              </div>
              <span className="text-sm text-foreground leading-snug">{r}</span>
            </label>
          ))}
        </div>

        {step === "confirm" && (
          <p className="text-xs text-muted-foreground mb-5">
            If there is no financial dispute over the order but you would like to report your counterparty's violation, please use the "Report User" button.
            <span className="text-primary font-medium ml-1 cursor-pointer">Report User</span>
          </p>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => {
              if (!reason) return;
              if (step === "select") setStep("confirm");
              else onSubmit();
            }}
            disabled={!reason}
            className="flex-1 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {step === "select" ? "Next" : "Submit Dispute"}
          </button>
          <button onClick={onClose} className="flex-1 py-3 rounded-full border border-border text-foreground text-sm font-medium hover:bg-muted/30 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </Overlay>
  );
};

// ─── Order Completed Pop-up ──────────────────────────────────────────
const OrderCompletedPopup = ({
  fiatAmount,
  fiat,
  quantity,
  selectedCrypto,
  onClose,
}: {
  fiatAmount: string;
  fiat: string;
  quantity: string;
  selectedCrypto: string;
  onClose: () => void;
}) => (
  <Overlay onClose={onClose}>
    <div className="w-full sm:w-[480px] p-6 sm:p-8 relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-success/10 border-2 border-success flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-success" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{fiatAmount} {fiat}</h2>
        <p className="text-sm text-muted-foreground">Congrats, you've bought <span className="font-semibold text-foreground">{quantity} {selectedCrypto}</span>!</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <button onClick={onClose} className="py-3 rounded-full border border-border text-foreground text-sm font-semibold hover:bg-muted/30 transition-colors">
          View Order
        </button>
        <button onClick={onClose} className="py-3 rounded-full border border-border text-foreground text-sm font-semibold hover:bg-muted/30 transition-colors">
          View My Assets
        </button>
      </div>

      <div className="space-y-3">
        <div className="bg-muted/20 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Bitcoin className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Explore Spot X on LocalCoin Trade</p>
            <p className="text-xs text-muted-foreground">Unlock new crypto opportunities and earn rewards!</p>
          </div>
          <button className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1">
            Trade <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <div className="bg-muted/20 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Derivatives</p>
            <p className="text-xs text-muted-foreground">Upgrade your trades with USDT Perpetual, Inverse Futures, and more.</p>
          </div>
          <button className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1">
            Trade <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  </Overlay>
);

// ─── Escrow Status Banner ────────────────────────────────────────────
const EscrowBanner = ({ status, selectedCrypto, quantity }: { status: "locked" | "releasing" | "disputed"; selectedCrypto: string; quantity: string }) => {
  const configs = {
    locked: {
      icon: <Lock className="h-4 w-4 text-primary" />,
      bg: "bg-primary/5 border-primary/20",
      title: "Escrow: Funds Locked",
      desc: `${quantity} ${selectedCrypto} is securely held in escrow until the trade is completed.`,
    },
    releasing: {
      icon: <Clock className="h-4 w-4 text-warning" />,
      bg: "bg-warning/5 border-warning/20",
      title: "Escrow: Releasing Funds",
      desc: `${quantity} ${selectedCrypto} is being released to your wallet. This may take a few moments.`,
    },
    disputed: {
      icon: <Flag className="h-4 w-4 text-destructive" />,
      bg: "bg-destructive/5 border-destructive/20",
      title: "Escrow: Dispute in Progress",
      desc: `${quantity} ${selectedCrypto} is frozen in escrow. A moderator will review and resolve this dispute.`,
    },
  };
  const c = configs[status];

  return (
    <div className={`border rounded-xl p-4 mb-6 flex items-start gap-3 ${c.bg}`}>
      <div className="w-8 h-8 rounded-full bg-background/50 flex items-center justify-center shrink-0">{c.icon}</div>
      <div>
        <p className="text-sm font-semibold text-foreground">{c.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{c.desc}</p>
      </div>
    </div>
  );
};

// ─── Order Page (full-page, replaces dashboard) ─────────────────────
type OrderStep =
  | "pending_payment"
  | "pending_release"
  | "get_help"
  | "dispute_select"
  | "upload_proof"
  | "completed_review"
  | "disputed";
type ChatMsg = { from: "system" | "buyer" | "seller"; text: string; ts: string; kind?: "text" | "file" | "info" };

// ─── Mobile Order Flow (Bybit-style) ────────────────────────────────
type MobileFlowProps = {
  offer: TradeOffer;
  selectedCrypto: string;
  pay: number;
  quantity: string;
  orderId: string;
  dateStr: string;
  minutes: number;
  seconds: number;
  releaseMin: number;
  releaseSec: number;
  orderStep: OrderStep;
  setOrderStep: (s: OrderStep) => void;
  disputeReason: string;
  setDisputeReason: (r: string) => void;
  proofFiles: File[];
  setProofFiles: React.Dispatch<React.SetStateAction<File[]>>;
  showAppealDetails: boolean;
  setShowAppealDetails: (v: boolean) => void;
  rating: "good" | "bad" | null;
  setRating: (r: "good" | "bad") => void;
  onShowConfirmPayment: () => void;
  onShowCancelOrder: () => void;
  onClose: () => void;
};

const MobileProgressBar = ({ step }: { step: 1 | 2 | 3 }) => (
  <div className="flex gap-1.5 mb-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
    ))}
  </div>
);

const SellerPill = ({ merchant }: { merchant: string }) => (
  <div className="flex items-center justify-between bg-muted/30 rounded-full pl-4 pr-1 py-1 mb-5">
    <div className="flex items-center gap-1 text-sm font-medium text-foreground min-w-0">
      <span className="truncate">{merchant}</span>
      <span className="text-base">🛡️</span>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </div>
    <button className="bg-primary text-primary-foreground text-sm font-semibold rounded-full px-5 py-2">
      Contact Seller
    </button>
  </div>
);

const CopyRow = ({ label, value, valueClass = "" }: { label: string; value: string; valueClass?: string }) => (
  <div className="flex items-center justify-between py-2.5">
    <span className="text-sm text-muted-foreground">{label}</span>
    <div className="flex items-center gap-1.5">
      <span className={`text-sm font-semibold text-foreground ${valueClass}`}>{value}</span>
      <Copy className="h-3.5 w-3.5 text-muted-foreground" />
    </div>
  </div>
);

const MobileOrderFlow = (p: MobileFlowProps) => {
  const reasons = [
    "I've completed my payment but the counterparty hasn't released the coins",
    "I have paid more than the required amount",
    "Counterparty requested payment to an account that mismatched with the verified name, and I have completed the payment",
    "Counterparty requested additional payment (excluding transaction fees), and I have completed the payment.",
    "I have paid to the wrong account",
    "Counterparty engaged in fraudulent behavior, and I have completed the payment",
    "Counterparty insulted me, and I do not wish to continue this trade",
    "Other order dispute issues",
  ];

  const handleProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files || []);
    p.setProofFiles((prev) => [...prev, ...list].slice(0, 4));
    e.target.value = "";
  };

  if (p.orderStep === "get_help") {
    return (
      <div className="flex flex-col min-h-screen pb-24">
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <button onClick={() => p.setOrderStep("pending_payment")} className="p-1 -ml-1">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-base font-semibold text-foreground">Get Help</h1>
          <span className="w-6" />
        </div>
        <div className="px-4 flex-1">
          <p className="text-sm text-muted-foreground mb-3">Try to resolve the issue by following these steps:</p>
          <div className="bg-muted/30 rounded-xl p-5 space-y-5">
            {[
              "Ensure you have paid the order amount using the seller's accepted payment method.",
              "Please allow the seller some time to verify your payment, as the payment provider may take a while to process it.",
              "Communicate with the seller and provide your payment proof for verification.",
              "Rest assured the crypto amount for this order is locked until the coin is released.",
            ].map((t, i, arr) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full border-2 border-primary bg-background" />
                  {i < arr.length - 1 && <div className="w-px flex-1 border-l border-dashed border-border mt-1" />}
                </div>
                <p className="text-sm text-foreground/80 flex-1 pb-1">{t}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Please wait patiently for our assistance after you submit an appeal. Cancelling the order hastily may result in asset loss.
          </p>
        </div>
        <div className="fixed bottom-0 inset-x-0 bg-background border-t border-border/40 p-3 flex flex-col gap-2">
          <button onClick={() => p.setOrderStep("dispute_select")} className="w-full py-3 rounded-full border border-border text-foreground text-sm font-semibold">
            Submit Appeal
          </button>
          <button className="w-full py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
            Contact Seller
          </button>
        </div>
      </div>
    );
  }

  if (p.orderStep === "dispute_select") {
    return (
      <div className="flex flex-col min-h-screen pb-24">
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <button onClick={() => p.setOrderStep("pending_release")} className="p-1 -ml-1">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-base font-semibold text-foreground">Order Dispute</h1>
          <span className="w-6" />
        </div>
        <div className="px-4 flex-1">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex items-start gap-2 mb-4">
            <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-foreground">Be assured that LocalCoin Trade places the Seller's crypto assets in escrow for all uncompleted orders.</p>
          </div>
          <div className="bg-muted/30 rounded-xl p-4 mb-5">
            <p className="text-sm text-foreground mb-2">Before making an appeal, please attempt to resolve the issue with your counterparty.</p>
            <button className="text-sm text-primary font-medium flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4" /> Contact Seller
            </button>
          </div>
          <p className="text-sm text-muted-foreground mb-3">What's the issue?</p>
          <div className="space-y-3 mb-5">
            {reasons.map((r) => (
              <label key={r} onClick={() => p.setDisputeReason(r)} className="flex items-start gap-3 cursor-pointer">
                <div className={`w-4 h-4 mt-0.5 rounded-full border-2 flex items-center justify-center shrink-0 ${p.disputeReason === r ? "border-primary" : "border-border"}`}>
                  {p.disputeReason === r && <div className="w-2 h-2 rounded-full bg-primary" />}
                </div>
                <span className="text-sm text-foreground leading-snug">{r}</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            If there is no financial dispute over the order but you would like to report your counterparty's violation, please use the "Report User" button.
            <span className="text-primary font-medium ml-1">Report User</span>
          </p>
        </div>
        <div className="fixed bottom-0 inset-x-0 bg-background border-t border-border/40 p-3">
          <button
            disabled={!p.disputeReason}
            onClick={() => p.setShowAppealDetails(true)}
            className="w-full py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-40"
          >
            Next
          </button>
        </div>

        {p.showAppealDetails && (
          <div className="fixed inset-0 z-[120] bg-black/40 flex items-end" onClick={() => p.setShowAppealDetails(false)}>
            <div className="w-full bg-card rounded-t-2xl p-5 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-foreground">Appeal Details:</h3>
                <button onClick={() => p.setShowAppealDetails(false)}><X className="h-5 w-5 text-muted-foreground" /></button>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Please select according to the real situation.</p>
              <div className="border border-border rounded-xl p-4 space-y-4">
                {[
                  "Did you make the payment using your verified-name account?",
                  "Did you make the payment in a single transaction?",
                  "Is the current transaction status completed (i.e., not pending or delayed)?",
                ].map((q) => (
                  <div key={q}>
                    <p className="text-sm text-foreground mb-2">{q}</p>
                    <div className="flex gap-6">
                      {["Yes", "No"].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                            {opt === "Yes" && <div className="w-2 h-2 rounded-full bg-primary" />}
                          </div>
                          <span className="text-sm text-foreground">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 mb-5">
                Answering the questions above would help us to understand more about the disputed situation, so that we could better assist you.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => { p.setShowAppealDetails(false); p.setOrderStep("upload_proof"); }}
                  className="w-full py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold"
                >
                  Get Help
                </button>
                <button onClick={() => p.setShowAppealDetails(false)} className="w-full py-3 rounded-full border border-border text-foreground text-sm font-semibold">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (p.orderStep === "upload_proof") {
    const stages = ["Appeal Submitted", "Mutual Negotiation", "Appeal in Progress", "Appeal Ended"];
    return (
      <div className="flex flex-col min-h-screen pb-24">
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <button onClick={() => p.setOrderStep("dispute_select")} className="p-1 -ml-1">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-base font-semibold text-foreground">Upload Proof</h1>
          <span className="w-6" />
        </div>
        <div className="px-4 flex-1">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex items-start gap-2 mb-5">
            <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-foreground">Any malicious appeal requests may result in your account being suspended.</p>
          </div>

          <div className="flex items-start justify-between mb-6 px-1">
            {stages.map((s, i) => (
              <div key={s} className="flex flex-col items-center flex-1 relative">
                {i < stages.length - 1 && (
                  <div className="absolute top-3 left-1/2 w-full h-px bg-border" />
                )}
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center relative z-10">
                  {i + 1}
                </div>
                <span className="text-[11px] text-foreground text-center mt-1.5 leading-tight">{s}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mb-1">Reason for appeal:</p>
          <p className="text-sm font-semibold text-foreground mb-5">{p.disputeReason || "—"}</p>

          <p className="text-sm text-muted-foreground mb-3">Proof Document(s)<span className="text-foreground">(Required)</span></p>
          <div className="flex flex-wrap gap-3 mb-3">
            {p.proofFiles.map((f, i) => (
              <div key={i} className="w-20 h-20 rounded-lg bg-muted/40 border border-border text-[10px] text-muted-foreground flex items-center justify-center text-center px-1 break-words">
                {f.name.length > 18 ? f.name.slice(0, 16) + "…" : f.name}
              </div>
            ))}
            {p.proofFiles.length < 4 && (
              <label className="w-20 h-20 rounded-lg bg-muted/30 border border-dashed border-border flex items-center justify-center cursor-pointer">
                <Plus className="h-6 w-6 text-muted-foreground" />
                <input type="file" multiple accept="image/*,video/mp4,application/pdf" hidden onChange={handleProofChange} />
              </label>
            )}
          </div>
          <p className="text-xs text-muted-foreground mb-1">Upload up to 4 files. Images, videos and PDFs are supported.</p>
          <p className="text-xs text-muted-foreground mb-5">File upload limit: 100MB</p>

          <div className="bg-muted/30 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-foreground mb-3">Submit video proof in .mp4 or .pdf format only. Refer to the proof guidelines below:</p>
            {[
              { t: "Step 1", d: "Login process: Log in to your bank account" },
              { t: "Step 2", d: "Account details page: Including your name and account number used in this P2P order" },
              { t: "Step 3", d: "Transaction details: Including amount paid, beneficiary account number and name as well as date and time related to this P2P order" },
            ].map((s, i, arr) => (
              <div key={s.t} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-primary bg-background mt-1" />
                  {i < arr.length - 1 && <div className="w-px flex-1 border-l border-dashed border-border" />}
                </div>
                <div className="pb-3 flex-1">
                  <p className="text-sm font-semibold text-primary">{s.t}</p>
                  <p className="text-xs text-foreground/80 mt-0.5">{s.d}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="text-sm text-primary font-medium flex items-center gap-1 mb-2">
            Video Upload Guide for Different Devices <ChevronRight className="h-4 w-4" />
          </button>
          <p className="text-xs text-muted-foreground">
            Please be aware that providing false proof could lead to the suspension of your account.
          </p>
        </div>
        <div className="fixed bottom-0 inset-x-0 bg-background border-t border-border/40 p-3">
          <button
            disabled={p.proofFiles.length === 0}
            onClick={() => p.setOrderStep("disputed")}
            className="w-full py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-40"
          >
            Submit Appeal
          </button>
        </div>
      </div>
    );
  }

  if (p.orderStep === "pending_release") {
    return (
      <div className="flex flex-col min-h-screen pb-28">
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <button onClick={p.onClose} className="p-1 -ml-1">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <button className="text-sm text-foreground">Cancel Order</button>
        </div>
        <div className="px-4">
          <MobileProgressBar step={2} />
          <h1 className="text-2xl font-bold text-foreground mb-1">The coins will be released in</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Coin Release in Progress <span className="text-primary font-semibold">{String(p.releaseMin).padStart(2, "0")}:{String(p.releaseSec).padStart(2, "0")}</span>
          </p>
          <SellerPill merchant={p.offer.merchant} />

          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-full bg-success/20 flex items-center justify-center">
              <Bitcoin className="h-4 w-4 text-success" />
            </div>
            <span className="text-base font-semibold text-foreground">Buy {p.selectedCrypto}</span>
          </div>

          <div className="space-y-0.5 divide-y divide-border/30">
            <CopyRow label="Amount" value={`${p.pay.toFixed(2)} ${p.offer.currency}`} />
            <CopyRow label="Price" value={`${p.offer.price} ${p.offer.currency}`} />
            <CopyRow label="Total Quantity" value={`${p.quantity} ${p.selectedCrypto}`} />
            <CopyRow label="Transaction Fees" value={`0 ${p.selectedCrypto}`} />
            <CopyRow label="Order No." value={p.orderId.slice(0, 19)} />
            <CopyRow label="Order Time" value={p.dateStr} />
          </div>
          <div className="border-t border-border/30 mt-3 pt-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Payment Method</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-0.5 h-4 bg-success rounded-full" />
            <span className="text-sm font-semibold text-foreground">{p.offer.paymentMethods[0]}</span>
          </div>
        </div>
        <div className="fixed bottom-0 inset-x-0 bg-background border-t border-border/40 p-3 flex gap-3">
          <button
            onClick={() => p.setOrderStep("dispute_select")}
            className="flex-1 py-3 rounded-full border border-border text-foreground text-sm font-semibold"
          >
            Order Dispute?
          </button>
          <button className="flex-1 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
            Reminder
          </button>
        </div>
      </div>
    );
  }

  if (p.orderStep === "disputed") {
    return (
      <div className="flex flex-col min-h-screen pb-24">
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <button onClick={p.onClose} className="p-1 -ml-1">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-base font-semibold text-foreground">Appeal Submitted</h1>
          <span className="w-6" />
        </div>
        <div className="px-4 flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Flag className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">Your appeal is under review</h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            A moderator will review the evidence from both parties. Funds remain locked in escrow until the dispute is resolved.
          </p>
        </div>
        <div className="fixed bottom-0 inset-x-0 bg-background border-t border-border/40 p-3">
          <button onClick={p.onClose} className="w-full py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
            Back to P2P
          </button>
        </div>
      </div>
    );
  }

  if (p.orderStep === "completed_review") {
    return (
      <div className="flex flex-col min-h-screen pb-24">
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <button onClick={p.onClose} className="p-1 -ml-1">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-base font-semibold text-foreground">Order completed</h1>
          <span className="w-6" />
        </div>
        <div className="px-4 flex-1">
          <p className="text-sm text-muted-foreground mb-4">
            This order has concluded, and the assets are no longer locked by LocalCoin Trade.
          </p>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 mb-4 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-foreground">
              The coin you purchased has been credited to your Funding Account. However, you may not be able to withdraw or sell it immediately due to the security protection period.
            </p>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-full bg-success/20 flex items-center justify-center">
              <Bitcoin className="h-4 w-4 text-success" />
            </div>
            <span className="text-base font-semibold text-foreground">Buy {p.selectedCrypto}</span>
          </div>
          <div className="space-y-0.5 divide-y divide-border/30 mb-4">
            <CopyRow label="Fiat Amount" value={`${p.pay.toFixed(2)} ${p.offer.currency}`} valueClass="text-success" />
            <CopyRow label="Price" value={`${p.offer.price} ${p.offer.currency}`} />
            <CopyRow label="Receive quantity" value={`${p.quantity} ${p.selectedCrypto}`} />
            <CopyRow label="Order No." value={p.orderId.slice(0, 19)} />
            <CopyRow label="Order Time" value={p.dateStr} />
            <CopyRow label="Payment Method" value={p.offer.paymentMethods[0]} />
          </div>

          <div className="border border-border rounded-xl p-4">
            <h4 className="text-base font-bold text-foreground mb-1">Review</h4>
            {p.rating ? (
              <p className="text-sm text-success">Thanks for your feedback!</p>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-3">How was your experience with this seller?</p>
                <div className="flex gap-3">
                  <button onClick={() => p.setRating("good")} className="flex-1 py-3 rounded-xl border border-border flex items-center justify-center gap-2">
                    <ThumbsUp className="h-5 w-5" /> <span className="font-semibold">Good</span>
                  </button>
                  <button onClick={() => p.setRating("bad")} className="flex-1 py-3 rounded-xl border border-border flex items-center justify-center gap-2">
                    <ThumbsDown className="h-5 w-5" /> <span className="font-semibold">Bad</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="fixed bottom-0 inset-x-0 bg-background border-t border-border/40 p-3">
          <button onClick={p.onClose} className="w-full py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
            Back to P2P
          </button>
        </div>
      </div>
    );
  }

  // Default: Pending for Payment
  return (
    <div className="flex flex-col min-h-screen pb-32">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <button onClick={p.onClose} className="p-1 -ml-1">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <button onClick={p.onShowCancelOrder} className="text-sm text-foreground">Cancel Order</button>
      </div>
      <div className="px-4">
        <MobileProgressBar step={1} />
        <h1 className="text-2xl font-bold text-foreground mb-1">Pending for Payment</h1>
        <p className="text-sm text-destructive mb-5">
          Note: The order will be automatically canceled if the button is not clicked by the deadline.{" "}
          <span className="font-semibold">{String(p.minutes).padStart(2, "0")}:{String(p.seconds).padStart(2, "0")}</span>
        </p>
        <SellerPill merchant={p.offer.merchant} />

        <div className="flex gap-3 mb-3">
          <div className="w-6 h-6 rounded-full border-2 border-foreground flex items-center justify-center text-xs font-bold text-foreground shrink-0">1</div>
          <h3 className="text-base font-semibold text-foreground">Transfer via {p.offer.paymentMethods[0]}</h3>
        </div>
        <div className="ml-9 border-l border-border pl-4 pb-5">
          <div className="space-y-0 divide-y divide-border/30">
            <CopyRow label="Fiat Amount" value={`${p.pay.toFixed(2)} ${p.offer.currency}`} valueClass="text-success" />
            <CopyRow label="Name" value="WILLIAM MWANGI WACHIRA" />
            <CopyRow label="Account Number/Card No" value="02305140556150" />
            <CopyRow label="Paybill Number" value="542542" />
            <CopyRow label="Order No." value={p.orderId.slice(0, 19)} />
          </div>
          <button className="text-sm text-muted-foreground flex items-center gap-1 mt-3">
            Order details <ChevronRight className="h-3.5 w-3.5" />
          </button>
          <p className="text-xs text-muted-foreground mt-3">
            Follow the payment instructions displayed on the order page. If any payment details appear unclear, do not proceed with the payment and cancel the order instead.
          </p>
        </div>

        <div className="flex gap-3 mb-5">
          <div className="w-6 h-6 rounded-full border-2 border-foreground flex items-center justify-center text-xs font-bold text-foreground shrink-0">2</div>
          <h3 className="text-base font-semibold text-foreground">After payment, click the button below so the seller can release the crypto.</h3>
        </div>

        <ol className="text-xs text-muted-foreground space-y-2 list-decimal list-inside leading-relaxed pb-6">
          <li>Always use a payment account that matches your verified name.</li>
          <li>Do not split the payment into multiple transactions, even if requested by the seller.</li>
          <li>Real-time payment is strongly recommended.</li>
          <li>Follow the payment instructions displayed on the order page. If any payment details appear unclear, do not proceed with the payment and cancel the order instead.</li>
          <li>Failure to comply with the above may result in payment loss or account restrictions.</li>
          <li>No bargaining after you place an order. The transaction must follow the order details exactly.</li>
        </ol>
      </div>

      <div className="fixed bottom-0 inset-x-0 bg-background border-t border-border/40 p-3 space-y-2">
        <button
          onClick={() => p.setOrderStep("get_help")}
          className="w-full py-2.5 rounded-full bg-muted/40 text-foreground text-sm font-medium flex items-center justify-center gap-2"
        >
          <Lightbulb className="h-4 w-4 text-primary" />
          Encountered an Issue? <ChevronRight className="h-4 w-4" />
        </button>
        <button
          onClick={p.onShowConfirmPayment}
          className="w-full py-3 rounded-full bg-primary text-primary-foreground text-base font-semibold"
        >
          Payment Completed
        </button>
      </div>
    </div>
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
  const [orderStep, setOrderStep] = useState<OrderStep>("pending_payment");
  const [showConfirmPayment, setShowConfirmPayment] = useState(false);
  const [showCancelOrder, setShowCancelOrder] = useState(false);
  const [showDispute, setShowDispute] = useState(false);
  const [showCompletedPopup, setShowCompletedPopup] = useState(false);
  const [showAppealDetails, setShowAppealDetails] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");
  const [proofFiles, setProofFiles] = useState<File[]>([]);
  const [chatMessage, setChatMessage] = useState("");
  const [extraMessages, setExtraMessages] = useState<ChatMsg[]>([]);
  const [rating, setRating] = useState<"good" | "bad" | null>(null);
  const [minutes, setMinutes] = useState(14);
  const [seconds, setSeconds] = useState(50);
  const [releaseMin, setReleaseMin] = useState(4);
  const [releaseSec, setReleaseSec] = useState(50);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isBuy = activeTab === "buy";
  const price = parseFloat(offer.price);
  const pay = parseFloat(payAmount) || 600;
  const quantity = (pay / price).toFixed(4);
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
  const orderId = `2038${Date.now()}`;

  useEffect(() => {
    if (orderStep !== "pending_payment") return;
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
  }, [orderStep]);

  // 5-min release countdown
  useEffect(() => {
    if (orderStep !== "pending_release") return;
    const timer = setInterval(() => {
      setReleaseSec(s => {
        if (s === 0) {
          setReleaseMin(m => Math.max(0, m - 1));
          return 59;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [orderStep]);

  // Auto-trigger seller release pop-up after a short wait
  useEffect(() => {
    if (orderStep !== "pending_release") return;
    const t = setTimeout(() => {
      setExtraMessages(prev => [...prev, { from: "system", text: "The seller has released the coins you've just purchased. Please head to your Funding Account to view.", ts: dateStr, kind: "info" }]);
      setShowCompletedPopup(true);
    }, 12000);
    return () => clearTimeout(t);
  }, [orderStep, dateStr]);

  const handlePaymentConfirmed = () => {
    setShowConfirmPayment(false);
    setOrderStep("pending_release");
    setExtraMessages(prev => [...prev, { from: "system", text: "You've completed the payment. Please wait for the seller to release the coins to you.", ts: dateStr, kind: "info" }]);
  };

  const handleDisputeSubmit = () => {
    setShowDispute(false);
    setOrderStep("disputed");
  };

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setExtraMessages(prev => [...prev, { from: "buyer", text: `📎 ${file.name}`, ts: dateStr, kind: "file" }]);
    e.target.value = "";
  };

  const stepIndex = orderStep === "pending_payment" ? 1 : orderStep === "pending_release" ? 2 : orderStep === "disputed" ? 2 : 3;

  return (
    <div className="fixed inset-0 z-[90] bg-background overflow-y-auto">
      {showConfirmPayment && (
        <ConfirmPaymentModal
          offer={offer}
          payAmount={pay.toFixed(2)}
          onClose={() => setShowConfirmPayment(false)}
          onConfirm={handlePaymentConfirmed}
        />
      )}
      {showCancelOrder && (
        <CancelOrderModal
          onClose={() => setShowCancelOrder(false)}
          onConfirm={() => { setShowCancelOrder(false); onClose(); }}
        />
      )}
      {showDispute && (
        <DisputeModal
          onClose={() => setShowDispute(false)}
          onSubmit={handleDisputeSubmit}
        />
      )}
      {showCompletedPopup && (
        <OrderCompletedPopup
          fiatAmount={pay.toFixed(2)}
          fiat={offer.currency}
          quantity={quantity}
          selectedCrypto={selectedCrypto}
          onClose={() => { setShowCompletedPopup(false); setOrderStep("completed_review"); }}
        />
      )}
      {/* ───────── MOBILE LAYOUT ───────── */}
      <div className="md:hidden min-h-screen flex flex-col bg-background">
        <MobileOrderFlow
          offer={offer}
          selectedCrypto={selectedCrypto}
          pay={pay}
          quantity={quantity}
          orderId={orderId}
          dateStr={dateStr}
          minutes={minutes}
          seconds={seconds}
          releaseMin={releaseMin}
          releaseSec={releaseSec}
          orderStep={orderStep}
          setOrderStep={setOrderStep}
          disputeReason={disputeReason}
          setDisputeReason={setDisputeReason}
          proofFiles={proofFiles}
          setProofFiles={setProofFiles}
          showAppealDetails={showAppealDetails}
          setShowAppealDetails={setShowAppealDetails}
          rating={rating}
          setRating={setRating}
          onShowConfirmPayment={() => setShowConfirmPayment(true)}
          onShowCancelOrder={() => setShowCancelOrder(true)}
          onClose={onClose}
        />
      </div>

      {/* ───────── DESKTOP LAYOUT ───────── */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 py-6">
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
            {/* Escrow Banner */}
            <EscrowBanner
              status={orderStep === "disputed" ? "disputed" : orderStep === "pending_release" ? "releasing" : "locked"}
              selectedCrypto={selectedCrypto}
              quantity={quantity}
            />

            {/* Timer / Status Card */}
            <div className="bg-card rounded-xl border border-border/30 p-6 mb-6">
              {orderStep === "pending_payment" && (
                <>
                  <h3 className="text-xl font-bold text-foreground mb-2">Pending for Payment</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Note: The order will be automatically canceled if the button is not clicked by the deadline.{" "}
                    <span className="font-bold text-primary">{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</span>
                  </p>
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 flex items-start gap-2 mb-4">
                    <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground leading-relaxed">
                      Make the payment according to the exact order details. Otherwise, you may incur asset loss or penalties for violating platform policy. The order will be canceled after the countdown timer ends.
                    </p>
                  </div>
                  <p className="text-base font-semibold mb-4"><span className="text-success">Buy</span> <span className="text-foreground">{selectedCrypto}</span></p>
                </>
              )}

              {orderStep === "pending_release" && (
                <>
                  <h3 className="text-xl font-bold text-foreground mb-2">Pending for release</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    The coins you've bought will be released within{" "}
                    <span className="font-bold text-primary">{String(releaseMin).padStart(2, "0")}:{String(releaseSec).padStart(2, "0")}</span>.
                  </p>
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 flex items-start gap-2 mb-4">
                    <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground leading-relaxed">
                      Please do not cancel the order unless you have received the refund of your payment. Please cooperate with the refund if the seller rejects continuing to trade with you.
                    </p>
                  </div>
                  <p className="text-base font-semibold mb-3"><span className="text-success">Buy</span> <span className="text-foreground">{selectedCrypto}</span></p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2"><span className="text-muted-foreground">Fiat Amount</span><span className="font-bold text-success">{pay.toFixed(2)} {offer.currency}</span></div>
                    <div className="flex justify-between py-2"><span className="text-muted-foreground">Price</span><span className="font-bold text-foreground">{offer.price} {offer.currency}</span></div>
                    <div className="flex justify-between py-2"><span className="text-muted-foreground">Receive quantity</span><span className="font-bold text-foreground">{quantity} {selectedCrypto}</span></div>
                    <div className="flex justify-between py-2"><span className="text-muted-foreground">Order No.</span><span className="font-bold text-foreground">{orderId.slice(0, 19)}</span></div>
                    <div className="flex justify-between py-2"><span className="text-muted-foreground">Order Time</span><span className="font-bold text-foreground">{dateStr}</span></div>
                    <div className="flex justify-between py-2"><span className="text-muted-foreground">Payment Method</span><span className="font-bold text-foreground">{offer.paymentMethods[0]}</span></div>
                  </div>
                </>
              )}

              {orderStep === "completed_review" && (
                <>
                  <h3 className="text-xl font-bold text-foreground mb-2">Order completed</h3>
                  <p className="text-sm text-muted-foreground mb-4">This order has concluded, and the assets are no longer locked by LocalCoin Trade.</p>
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 flex items-start gap-2 mb-4">
                    <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground leading-relaxed">
                      The coin you purchased has been credited to your Funding Account. However, you may not be able to withdraw or sell it immediately due to the security protection period.
                    </p>
                  </div>
                  <p className="text-base font-semibold mb-3"><span className="text-success">Buy</span> <span className="text-foreground">{selectedCrypto}</span></p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2"><span className="text-muted-foreground">Fiat Amount</span><span className="font-bold text-success">{pay.toFixed(2)} {offer.currency}</span></div>
                    <div className="flex justify-between py-2"><span className="text-muted-foreground">Price</span><span className="font-bold text-foreground">{offer.price} {offer.currency}</span></div>
                    <div className="flex justify-between py-2"><span className="text-muted-foreground">Receive quantity</span><span className="font-bold text-foreground">{quantity} {selectedCrypto}</span></div>
                    <div className="flex justify-between py-2"><span className="text-muted-foreground">Order No.</span><span className="font-bold text-foreground">{orderId.slice(0, 19)}</span></div>
                    <div className="flex justify-between py-2"><span className="text-muted-foreground">Order Time</span><span className="font-bold text-foreground">{dateStr}</span></div>
                    <div className="flex justify-between py-2"><span className="text-muted-foreground">Payment Method</span><span className="font-bold text-foreground">{offer.paymentMethods[0]}</span></div>
                  </div>
                  <div className="flex gap-5 mt-4 text-sm">
                    <button onClick={() => setShowDispute(true)} className="text-foreground font-medium flex items-center gap-1">Order Dispute? <ChevronRight className="h-4 w-4" /></button>
                    <button className="text-foreground font-medium flex items-center gap-1">View My Assets <ChevronRight className="h-4 w-4" /></button>
                  </div>

                  {/* Review */}
                  <div className="mt-6 border border-border rounded-xl p-4">
                    <h4 className="text-base font-bold text-foreground mb-1">Review</h4>
                    {rating ? (
                      <p className="text-sm text-success">Thanks for your feedback!</p>
                    ) : (
                      <>
                        <p className="text-sm text-muted-foreground mb-3">How was your experience with this seller?</p>
                        <div className="flex gap-3">
                          <button onClick={() => setRating("good")} className="flex-1 py-3 rounded-xl border border-border hover:border-success hover:bg-success/5 flex items-center justify-center gap-2 transition-colors">
                            <ThumbsUp className="h-5 w-5 text-foreground" /> <span className="font-semibold text-foreground">Good</span>
                          </button>
                          <button onClick={() => setRating("bad")} className="flex-1 py-3 rounded-xl border border-border hover:border-destructive hover:bg-destructive/5 flex items-center justify-center gap-2 transition-colors">
                            <ThumbsDown className="h-5 w-5 text-foreground" /> <span className="font-semibold text-foreground">Bad</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}

              {orderStep === "disputed" && (
                <div className="text-center py-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
                    <Flag className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Dispute Under Review</h3>
                  <p className="text-sm text-muted-foreground mb-3">A moderator has been assigned to review this dispute. The escrowed funds remain frozen until resolution.</p>
                  <div className="inline-flex items-center gap-2 bg-destructive/5 border border-destructive/20 rounded-full px-4 py-2 text-xs text-foreground">
                    <Clock className="h-3.5 w-3.5 text-destructive" />
                    Estimated resolution: 24–48 hours
                  </div>
                </div>
              )}

              {/* 3-step progress */}
              {orderStep !== "completed_review" && (
              <div className="flex items-center bg-muted/10 rounded-xl p-4 mt-4">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${stepIndex >= 1 ? "bg-success text-white" : "bg-muted text-muted-foreground"}`}>
                    {stepIndex > 1 ? "✓" : "1"}
                  </span>
                  <span className={`text-sm font-medium ${stepIndex >= 1 ? "text-foreground" : "text-muted-foreground"}`}>Complete Your Payment</span>
                </div>
                <div className="flex-1 mx-4 h-px bg-border relative">
                  <div className={`absolute left-0 top-0 h-px bg-success transition-all ${stepIndex >= 2 ? "w-full" : "w-0"}`} />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${stepIndex >= 2 ? (orderStep === "disputed" ? "bg-destructive text-white" : "bg-success text-white") : "bg-muted text-muted-foreground"}`}>
                    {orderStep === "disputed" ? "!" : stepIndex > 2 ? "✓" : "2"}
                  </span>
                  <span className={`text-sm ${stepIndex >= 2 ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                    {orderStep === "disputed" ? "Dispute Filed" : "Pending for Release"}
                  </span>
                </div>
                <div className="flex-1 mx-4 h-px bg-border relative">
                  <div className={`absolute left-0 top-0 h-px bg-success transition-all ${stepIndex >= 3 ? "w-full" : "w-0"}`} />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${stepIndex >= 3 ? "bg-success text-white" : "bg-muted text-muted-foreground"}`}>3</span>
                  <span className={`text-sm ${stepIndex >= 3 ? "text-foreground" : "text-muted-foreground"}`}>Transaction Completed</span>
                </div>
              </div>
              )}
            </div>

            {/* Order Info – only during pending payment, since other stages already show details */}
            {orderStep === "pending_payment" && (
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
            )}

            {/* Payment Methods */}
            {orderStep === "pending_payment" && (
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
                          <span className="text-muted-foreground">Fiat Amount</span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-success">{pay.toFixed(2)} {offer.currency}</span>
                            <Copy className="h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-foreground" />
                          </div>
                        </div>
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
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Order No.</span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-foreground">{orderId.slice(0, 19)}</span>
                            <Copy className="h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-foreground" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sticky Actions */}
            <div className="flex gap-3 sticky bottom-0 bg-background py-4">
              {orderStep === "pending_payment" && (
                <>
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
                </>
              )}
              {orderStep === "pending_release" && (
                <>
                  <button
                    onClick={() => setShowCancelOrder(true)}
                    className="px-8 py-3 rounded-full border border-border text-foreground text-sm font-medium hover:bg-muted/30 transition-colors"
                  >
                    Cancel Order
                  </button>
                  <button
                    onClick={() => setShowDispute(true)}
                    className="px-6 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    | Order Dispute? <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
              {orderStep === "completed_review" && (
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all"
                >
                  Back to P2P
                </button>
              )}
              {orderStep === "disputed" && (
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-full border border-border text-foreground text-sm font-medium hover:bg-muted/30 transition-colors"
                >
                  Back to P2P
                </button>
              )}
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
                    <button onClick={() => setShowDispute(true)} className="text-xs text-destructive cursor-pointer hover:underline flex items-center gap-1 ml-auto">
                      <Flag className="h-3 w-3" /> Report User
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Panel */}
            <div className="bg-card rounded-xl border border-border/30 flex flex-col" style={{ height: "calc(100vh - 280px)" }}>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
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

                {orderStep === "disputed" && (
                  <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3 space-y-2">
                    <p className="text-xs text-foreground flex items-start gap-1.5">
                      <Flag className="h-3.5 w-3.5 text-destructive shrink-0 mt-0.5" />
                      <strong>A dispute has been filed for this order.</strong>
                    </p>
                    <p className="text-xs text-muted-foreground">A moderator will review both parties' evidence. Please provide any relevant screenshots or transaction proof in the chat.</p>
                  </div>
                )}

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                  <p className="text-xs text-primary leading-relaxed">
                    Do not communicate outside LocalCoin Trade. Please verify the information carefully. Stay vigilant, be aware of scams! <span className="font-medium underline cursor-pointer">Read More</span>
                  </p>
                </div>

                <div className="text-center text-xs text-muted-foreground">{dateStr}</div>

                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                  <p className="text-xs text-foreground flex items-start gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-destructive shrink-0 mt-0.5" />
                    It is strongly recommended that you do not release the coins if the other party requests payment through a third-party account.
                  </p>
                </div>

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

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-lg shrink-0">🤖</div>
                  <div className="flex-1 bg-primary/5 border border-primary/20 rounded-full px-4 py-2 flex items-center justify-between">
                    <span className="text-xs text-foreground">Check the counterparty's trading per...</span>
                    <X className="h-3.5 w-3.5 text-muted-foreground cursor-pointer" />
                  </div>
                </div>

                {/* Dynamic chat messages */}
                {extraMessages.map((m, i) => (
                  <div key={i}>
                    {m.kind === "info" ? (
                      <div className="bg-muted/30 border border-border/40 rounded-lg px-3 py-2 flex items-start gap-2">
                        <Send className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                        <p className="text-xs text-foreground">{m.text}</p>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <div className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-2 max-w-[80%]">
                          <p className="text-xs text-foreground break-words">{m.text}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">{m.ts}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t border-border p-3 flex items-center gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Enter your message"
                  className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                />
                <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/jpg,video/mp4" hidden onChange={handleFileAttach} />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload videos in MP4 format only · Supported image formats: JPG/PNG/JPEG · File upload limit: 100MB"
                  className="text-muted-foreground hover:text-primary"
                >
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
      <div className="w-full sm:w-[480px] p-5 sm:p-6">
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
      <div className="w-full sm:w-[500px] max-h-[85vh] overflow-y-auto p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-foreground">Are you sure you want to cancel this order?</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>

        <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3 text-xs text-foreground mb-4 flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
          <span>Cancelling may affect your completion rate and the seller may reject future trades with you. Only cancel if you have not paid or have already received a refund.</span>
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
