import { useState } from "react";
import { ChevronDown, ArrowRight, CheckCircle, Clock, AlertTriangle, Copy, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TradeNav from "@/components/TradeNav";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const cryptoOptions = ["BTC", "ETH", "USDT", "USDC", "BNB", "SOL", "TRX"];
const fiatOptions = ["KES", "USD", "NGN", "GHS", "TZS", "UGX"];

const paymentMethods = [
  { id: "bank", label: "Bank Transfer", icon: "🏦" },
  { id: "card", label: "Bank Card", icon: "💳" },
  { id: "mpesa", label: "M-Pesa", icon: "📱" },
];

type OrderStep = "idle" | "confirm" | "payment" | "processing" | "success" | "failed";

const OneClickBuy = () => {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [selectedFiat, setSelectedFiat] = useState("KES");
  const [showCryptoDropdown, setShowCryptoDropdown] = useState(false);
  const [showFiatDropdown, setShowFiatDropdown] = useState(false);
  const [spendAmount, setSpendAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("bank");
  const [orderStep, setOrderStep] = useState<OrderStep>("idle");
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);

  const isBuy = activeTab === "buy";

  const rates: Record<string, Record<string, number>> = {
    BTC: { KES: 8801652, USD: 86502, NGN: 135000000, GHS: 1200000, TZS: 220000000, UGX: 320000000 },
    ETH: { KES: 258000, USD: 2450, NGN: 3800000, GHS: 35000, TZS: 6200000, UGX: 9000000 },
    USDT: { KES: 129, USD: 1, NGN: 1550, GHS: 14, TZS: 2550, UGX: 3700 },
    USDC: { KES: 129, USD: 1, NGN: 1550, GHS: 14, TZS: 2550, UGX: 3700 },
    BNB: { KES: 78000, USD: 605, NGN: 940000, GHS: 8500, TZS: 1540000, UGX: 2230000 },
    SOL: { KES: 17800, USD: 138, NGN: 215000, GHS: 1950, TZS: 352000, UGX: 510000 },
    TRX: { KES: 32, USD: 0.25, NGN: 390, GHS: 3.5, TZS: 638, UGX: 925 },
  };

  const rate = rates[selectedCrypto]?.[selectedFiat] || 1;
  const exchangeRate = rate.toLocaleString();

  const handleSpendChange = (val: string) => {
    setSpendAmount(val);
    const num = parseFloat(val.replace(/,/g, ""));
    if (!isNaN(num) && num > 0) {
      const result = isBuy ? num / rate : num * rate;
      setReceiveAmount(result < 0.0001 ? result.toFixed(8) : result.toLocaleString(undefined, { maximumFractionDigits: 6 }));
    } else {
      setReceiveAmount("");
    }
  };

  const handleSubmitOrder = () => {
    if (!spendAmount) return;
    setOrderStep("confirm");
  };

  const handleConfirmOrder = () => {
    setOrderStep("payment");
  };

  const handlePaymentDone = () => {
    setOrderStep("processing");
    setTimeout(() => {
      setOrderStep(Math.random() > 0.15 ? "success" : "failed");
    }, 2500);
  };

  const handleReset = () => {
    setOrderStep("idle");
    setSpendAmount("");
    setReceiveAmount("");
  };

  const currentPayment = paymentMethods.find((p) => p.id === selectedPayment)!;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <TradeNav />
        <div className="w-full px-4 md:px-8 lg:px-12 py-8">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left side */}
            <div className="flex-1 space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {isBuy ? `One-Click Buy ${selectedCrypto} With ${selectedFiat}` : `One-Click Sell ${selectedCrypto} to ${selectedFiat}`}
              </h1>
              <p className="text-muted-foreground text-base max-w-lg">
                Trade {selectedCrypto} seamlessly on LocalCoin Trade with P2P and multiple payment options. VIPs enjoy 10% off fees with a minimum transaction of 1,500 USDT.
              </p>

              {/* Trending Events Card */}
              <div className="bg-card rounded-xl border border-border/40 p-6 max-w-lg">
                <span className="inline-block text-sm font-semibold text-primary border border-primary rounded-full px-4 py-1 mb-4">Trending Events</span>
                <div className="bg-foreground rounded-xl p-5 mb-4">
                  <h3 className="text-lg font-bold text-background">New User Welcome Bonus</h3>
                  <p className="text-background/70 text-sm mt-1">Embark on Your Fiat Journey to Earn 10 USDT!</p>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-xs font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded">Ongoing</span>
                    <span className="text-background/50 text-xs">Long-term Validity</span>
                  </div>
                </div>
                <div className="border-b border-border/30 pb-3 mb-3">
                  <p className="text-sm font-medium text-foreground flex items-center gap-2">
                    <span className="text-base">🎁</span> Tasks and Rewards
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-primary font-semibold text-base">10 USDT Airdrop</p>
                  <div className="text-sm text-muted-foreground text-right space-y-0.5">
                    <p>Step 1: Deposit $100 or more</p>
                    <p>Step 2: Trade any amount on Spot or Derivatives</p>
                  </div>
                </div>
                <a href="#" className="text-primary text-sm font-medium mt-4 inline-flex items-center gap-1 hover:underline">
                  Event Details <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Right side – Buy/Sell card */}
            <div className="w-full lg:w-[420px] shrink-0">
              <div className="bg-card rounded-2xl shadow-sm border border-border/30 overflow-hidden">
                {/* Buy / Sell tabs */}
                <div className="flex">
                  {(["buy", "sell"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => { setActiveTab(tab); setSpendAmount(""); setReceiveAmount(""); }}
                      className={`flex-1 py-5 text-center text-xl font-bold transition-colors ${
                        activeTab === tab ? "text-foreground bg-card" : "text-muted-foreground/40 bg-muted/30"
                      }`}
                    >
                      {tab === "buy" ? "Buy" : "Sell"}
                    </button>
                  ))}
                </div>

                <div className="p-6 space-y-4">
                  {/* Spend input */}
                  <div className="border border-border rounded-xl p-4">
                    <label className="text-sm text-muted-foreground block mb-1">Spend</label>
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={spendAmount}
                        onChange={(e) => handleSpendChange(e.target.value)}
                        placeholder={isBuy ? "1,400 - 1,440,000" : "Enter sell amount"}
                        className="bg-transparent text-lg text-foreground placeholder:text-muted-foreground/50 outline-none flex-1"
                      />
                      <div className="relative">
                        <button
                          onClick={() => { setShowFiatDropdown(!showFiatDropdown); setShowCryptoDropdown(false); }}
                          className="flex items-center gap-1.5 text-sm font-semibold text-foreground"
                        >
                          <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[10px] font-bold">
                            {isBuy ? (selectedFiat === "KES" ? "KSh" : "$") : "₿"}
                          </span>
                          {isBuy ? selectedFiat : selectedCrypto}
                          <ChevronDown className="h-3.5 w-3.5" />
                        </button>
                        {(isBuy ? showFiatDropdown : showCryptoDropdown) && (
                          <div className="absolute right-0 top-8 bg-card border border-border rounded-lg shadow-lg z-10 min-w-[100px]">
                            {(isBuy ? fiatOptions : cryptoOptions).map((opt) => (
                              <button
                                key={opt}
                                onClick={() => {
                                  isBuy ? setSelectedFiat(opt) : setSelectedCrypto(opt);
                                  setShowFiatDropdown(false); setShowCryptoDropdown(false);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-muted/50 text-foreground"
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {!isBuy && (
                    <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                      <span>Available: 0 {selectedCrypto}</span>
                      <a href="#" className="text-primary font-medium hover:underline">Transfer</a>
                    </div>
                  )}

                  {/* Receive input */}
                  <div className="border border-border rounded-xl p-4">
                    <label className="text-sm text-muted-foreground block mb-1">Receive ≈</label>
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={receiveAmount}
                        readOnly
                        placeholder={isBuy ? "Calculated automatically" : "Calculated automatically"}
                        className="bg-transparent text-lg text-foreground placeholder:text-muted-foreground/50 outline-none flex-1"
                      />
                      <div className="relative">
                        <button
                          onClick={() => { setShowCryptoDropdown(!showCryptoDropdown); setShowFiatDropdown(false); }}
                          className="flex items-center gap-1.5 text-sm font-semibold text-foreground"
                        >
                          <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[10px] font-bold">
                            {isBuy ? "₿" : "$"}
                          </span>
                          {isBuy ? selectedCrypto : selectedFiat}
                          <ChevronDown className="h-3.5 w-3.5" />
                        </button>
                        {(isBuy ? showCryptoDropdown : showFiatDropdown) && (
                          <div className="absolute right-0 top-8 bg-card border border-border rounded-lg shadow-lg z-10 min-w-[100px]">
                            {(isBuy ? cryptoOptions : fiatOptions).map((opt) => (
                              <button
                                key={opt}
                                onClick={() => {
                                  isBuy ? setSelectedCrypto(opt) : setSelectedFiat(opt);
                                  setShowCryptoDropdown(false); setShowFiatDropdown(false);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-muted/50 text-foreground"
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground px-1">1 {selectedCrypto} ≈ {exchangeRate} {selectedFiat}</p>

                  {/* Payment Method */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground">Payment Method</p>
                    <div className="relative">
                      <button
                        onClick={() => setShowPaymentDropdown(!showPaymentDropdown)}
                        className="w-full border border-border rounded-xl p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">{currentPayment.icon}</span>
                          <span className="text-sm font-medium text-foreground">{currentPayment.label}</span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </button>
                      {showPaymentDropdown && (
                        <div className="absolute left-0 right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-10">
                          {paymentMethods.map((pm) => (
                            <button
                              key={pm.id}
                              onClick={() => { setSelectedPayment(pm.id); setShowPaymentDropdown(false); }}
                              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/10 ${pm.id === selectedPayment ? "bg-primary/10" : ""}`}
                            >
                              <span className="text-sm">{pm.icon}</span>
                              <span className="text-sm font-medium text-foreground">{pm.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleSubmitOrder}
                    disabled={!spendAmount}
                    className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:brightness-110 transition disabled:bg-primary/20 disabled:text-primary disabled:cursor-not-allowed"
                  >
                    {isBuy ? `Buy ${selectedCrypto}` : `Sell ${selectedCrypto}`}
                  </button>

                  {isBuy && (
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <span>📅</span> Recurring Buy
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Order Confirmation Modal */}
      <Dialog open={orderStep === "confirm"} onOpenChange={() => setOrderStep("idle")}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-5 pt-2">
            <h2 className="text-xl font-bold text-foreground text-center">Confirm Order</h2>
            <div className="bg-muted/30 rounded-xl p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type</span>
                <span className="font-semibold text-foreground">{isBuy ? "Buy" : "Sell"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">You {isBuy ? "spend" : "sell"}</span>
                <span className="font-semibold text-foreground">{spendAmount} {isBuy ? selectedFiat : selectedCrypto}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">You receive ≈</span>
                <span className="font-semibold text-primary">{receiveAmount} {isBuy ? selectedCrypto : selectedFiat}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rate</span>
                <span className="text-foreground">1 {selectedCrypto} = {exchangeRate} {selectedFiat}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment</span>
                <span className="text-foreground">{currentPayment.label}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fee</span>
                <span className="text-success font-medium">0.00 USDT</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleConfirmOrder} className="flex-1 h-11 font-semibold">
                Confirm {isBuy ? "Buy" : "Sell"}
              </Button>
              <Button variant="outline" onClick={() => setOrderStep("idle")} className="flex-1 h-11 font-semibold">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Details Modal */}
      <Dialog open={orderStep === "payment"} onOpenChange={() => setOrderStep("idle")}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-5 pt-2">
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground">{isBuy ? "Complete Payment" : "Confirm Receipt"}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {isBuy ? "Transfer the amount below to complete your purchase" : "Confirm you've received the payment"}
              </p>
            </div>

            <div className="text-center py-4">
              <p className="text-3xl font-bold text-primary">{spendAmount} {isBuy ? selectedFiat : selectedCrypto}</p>
              <p className="text-sm text-muted-foreground mt-1">Amount to {isBuy ? "pay" : "receive"}</p>
            </div>

            {isBuy && (
              <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                <p className="text-sm font-semibold text-foreground mb-2">Payment Details</p>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Bank</span>
                  <div className="flex items-center gap-1">
                    <span className="text-foreground">Equity Bank</span>
                    <Copy className="h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-primary" />
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Account Name</span>
                  <div className="flex items-center gap-1">
                    <span className="text-foreground">LocalCoin Trade Ltd</span>
                    <Copy className="h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-primary" />
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Account Number</span>
                  <div className="flex items-center gap-1">
                    <span className="text-foreground">0150 2940 1823</span>
                    <Copy className="h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-primary" />
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Reference</span>
                  <div className="flex items-center gap-1">
                    <span className="text-foreground font-mono">OCB{Date.now().toString().slice(-8)}</span>
                    <Copy className="h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-primary" />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 bg-primary/10 rounded-lg p-3">
              <Clock className="h-4 w-4 text-primary shrink-0" />
              <p className="text-sm text-foreground">Complete within <span className="font-semibold text-primary">15:00</span> minutes</p>
            </div>

            <Button onClick={handlePaymentDone} className="w-full h-11 font-semibold">
              {isBuy ? "I've Made Payment" : "Confirm Received"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Processing Modal */}
      <Dialog open={orderStep === "processing"} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-sm">
          <div className="flex flex-col items-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center animate-pulse">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Processing Order</h2>
            <p className="text-sm text-muted-foreground text-center">Please wait while we verify your transaction...</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={orderStep === "success"} onOpenChange={handleReset}>
        <DialogContent className="sm:max-w-sm">
          <div className="flex flex-col items-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Order Successful!</h2>
            <p className="text-sm text-muted-foreground text-center">
              You've {isBuy ? "purchased" : "sold"} <span className="text-foreground font-semibold">{receiveAmount} {isBuy ? selectedCrypto : selectedFiat}</span>
            </p>
            <div className="bg-muted/30 rounded-lg p-3 w-full text-center">
              <p className="text-xs text-muted-foreground">Order ID</p>
              <p className="text-sm font-mono text-foreground">ORD-{Date.now().toString().slice(-10)}</p>
            </div>
            <Button onClick={handleReset} className="w-full h-11 font-semibold">Done</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Failed Modal */}
      <Dialog open={orderStep === "failed"} onOpenChange={handleReset}>
        <DialogContent className="sm:max-w-sm">
          <div className="flex flex-col items-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-destructive/15 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Order Failed</h2>
            <p className="text-sm text-muted-foreground text-center">
              Your transaction could not be completed. Please try again or contact support.
            </p>
            <div className="flex gap-3 w-full">
              <Button onClick={() => setOrderStep("confirm")} className="flex-1 h-11 font-semibold">Retry</Button>
              <Button variant="outline" onClick={handleReset} className="flex-1 h-11 font-semibold">Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OneClickBuy;
