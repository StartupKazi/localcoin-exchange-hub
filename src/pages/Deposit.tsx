import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ArrowRight, Wallet, DollarSign, Rocket, Search, CheckCircle, Copy, Clock, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TradeNav from "@/components/TradeNav";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const currencies = [
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
];

type DepositStep = "idle" | "details" | "processing" | "success" | "failed";

const Deposit = () => {
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState("KES");
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);
  const [currencySearch, setCurrencySearch] = useState("");
  const [amount, setAmount] = useState("");
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [depositStep, setDepositStep] = useState<DepositStep>("idle");

  const currency = currencies.find((c) => c.code === selectedCurrency)!;
  const filteredCurrencies = currencies.filter(
    (c) =>
      c.code.toLowerCase().includes(currencySearch.toLowerCase()) ||
      c.name.toLowerCase().includes(currencySearch.toLowerCase())
  );

  const handleContinue = () => {
    if (!amount) return;
    setDepositStep("details");
  };

  const handleConfirmDeposit = () => {
    setDepositStep("processing");
    setTimeout(() => {
      setDepositStep(Math.random() > 0.1 ? "success" : "failed");
    }, 2500);
  };

  const handleReset = () => {
    setDepositStep("idle");
    setAmount("");
  };

  const refCode = `DEP-${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen bg-background flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-1 pt-16">
        <TradeNav />

        <div className="container mx-auto px-4 py-10">
          {/* Payment method selector panel */}
          <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${showPaymentMethod ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowPaymentMethod(false)} />
            <div className={`absolute top-0 right-0 h-full w-full sm:max-w-md bg-card border-l border-border/30 shadow-2xl transform transition-transform duration-300 ease-in-out ${showPaymentMethod ? "translate-x-0" : "translate-x-full"}`}>
              <div className="p-6 space-y-6 h-full overflow-y-auto">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground">Select Payment Method</h2>
                  <button onClick={() => setShowPaymentMethod(false)} className="text-muted-foreground hover:text-foreground text-xl">✕</button>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Already have crypto</p>
                  <button className="w-full flex items-center gap-4 p-4 border border-border/30 rounded-xl hover:bg-muted/10 transition-colors">
                    <span className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Wallet className="h-5 w-5 text-primary" />
                    </span>
                    <div className="text-left">
                      <p className="font-semibold text-foreground">Deposit Crypto</p>
                      <p className="text-sm text-muted-foreground">Already have crypto? Deposit directly</p>
                    </div>
                  </button>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-muted-foreground">Don't have crypto</p>
                    <div className="relative">
                      <button onClick={() => setShowCurrencyPicker(!showCurrencyPicker)} className="flex items-center gap-1.5 bg-muted/20 rounded-full px-3 py-1.5 text-sm font-medium">
                        <span className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-[10px] font-bold text-primary">{currency.symbol}</span>
                        {selectedCurrency}
                        <ChevronDown className={`h-3 w-3 transition-transform ${showCurrencyPicker ? "rotate-180" : ""}`} />
                      </button>
                      {showCurrencyPicker && (
                        <div className="absolute right-0 top-10 bg-card border border-border/30 rounded-xl shadow-xl z-10 w-64 max-h-72 overflow-hidden">
                          <div className="p-3 border-b border-border/20">
                            <div className="flex items-center gap-2 bg-muted/10 rounded-lg px-3 py-2">
                              <Search className="h-4 w-4 text-muted-foreground" />
                              <input value={currencySearch} onChange={(e) => setCurrencySearch(e.target.value)} placeholder="Search currency" className="bg-transparent text-sm outline-none flex-1 text-foreground placeholder:text-muted-foreground/50" />
                            </div>
                          </div>
                          <div className="overflow-y-auto max-h-52">
                            {filteredCurrencies.map((c) => (
                              <button key={c.code} onClick={() => { setSelectedCurrency(c.code); setShowCurrencyPicker(false); setCurrencySearch(""); }}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/10 transition-colors ${c.code === selectedCurrency ? "bg-primary/10" : ""}`}>
                                <span className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">{c.symbol}</span>
                                <span className="font-semibold text-sm">{c.code}</span>
                                <span className="text-xs text-muted-foreground">{c.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button onClick={() => { setShowPaymentMethod(false); navigate("/"); }} className="w-full flex items-center gap-4 p-4 border border-border/30 rounded-xl hover:bg-muted/10 transition-colors">
                      <span className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center"><span className="text-primary font-bold text-sm">P2P</span></span>
                      <div className="text-left">
                        <p className="font-semibold text-foreground">P2P Trading</p>
                        <p className="text-sm text-muted-foreground">More Choices, Better Prices</p>
                      </div>
                    </button>
                    <button onClick={() => { setShowPaymentMethod(false); navigate("/one-click-buy"); }} className="w-full flex items-center gap-4 p-4 border border-border/30 rounded-xl hover:bg-muted/10 transition-colors">
                      <span className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center"><Rocket className="h-5 w-5 text-primary" /></span>
                      <div className="text-left">
                        <p className="font-semibold text-foreground">Buy with {selectedCurrency}</p>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard and JCB are supported</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl font-bold text-foreground">Deposit {selectedCurrency}</h1>
              <p className="text-muted-foreground text-base max-w-lg">Purchase crypto instantly with deposits from your bank account.</p>
            </div>

            <div className="w-full lg:w-[460px] shrink-0">
              <div className="bg-card rounded-2xl border border-border/30 p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Fiat Deposit</h2>
                  <button onClick={() => navigate("/withdraw")} className="flex items-center gap-1.5 border border-border rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/30 transition-colors">
                    Fiat Withdrawal <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="border border-border rounded-xl p-4">
                  <label className="text-sm text-muted-foreground block mb-1">Amount</label>
                  <div className="flex items-center justify-between">
                    <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="100 - 500,000" className="bg-transparent text-lg text-foreground placeholder:text-muted-foreground/50 outline-none flex-1" />
                    <button onClick={() => setShowPaymentMethod(true)} className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                      <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[10px] font-bold">{currency.symbol}</span>
                      {selectedCurrency}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Payment Method</p>
                  <div className="border-2 border-primary rounded-xl p-4 relative">
                    <span className="absolute -top-2.5 right-3 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded">Zero Fees</span>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                          <DollarSign className="h-4 w-4 text-primary" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Local bank transfer</p>
                          <p className="text-xs text-muted-foreground">Real Time</p>
                        </div>
                      </div>
                      <span className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleContinue}
                  disabled={!amount}
                  className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:brightness-110 transition disabled:bg-primary/20 disabled:text-primary disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
              <p className="text-xs text-muted-foreground/60 text-center mt-4">✅ Service provided by LOCALCOIN VIRTUAL ASSET PLATFORM OPERATOR LLC SPC.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />

      {/* Deposit Details Modal */}
      <Dialog open={depositStep === "details"} onOpenChange={() => setDepositStep("idle")}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-5 pt-2">
            <h2 className="text-xl font-bold text-foreground text-center">Deposit Details</h2>
            <div className="text-center py-3">
              <p className="text-3xl font-bold text-primary">{amount} {selectedCurrency}</p>
              <p className="text-sm text-muted-foreground mt-1">Deposit Amount</p>
            </div>
            <div className="bg-muted/30 rounded-xl p-4 space-y-3">
              <p className="text-sm font-semibold text-foreground mb-2">Transfer to:</p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Bank</span>
                <div className="flex items-center gap-1">
                  <span className="text-foreground">Equity Bank Kenya</span>
                  <Copy className="h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-primary" />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Account Name</span>
                <div className="flex items-center gap-1">
                  <span className="text-foreground">LocalCoin Collections</span>
                  <Copy className="h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-primary" />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Account No.</span>
                <div className="flex items-center gap-1">
                  <span className="text-foreground">0220 4810 3297</span>
                  <Copy className="h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-primary" />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Reference</span>
                <div className="flex items-center gap-1">
                  <span className="text-foreground font-mono">{refCode}</span>
                  <Copy className="h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-primary" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 rounded-lg p-3">
              <Clock className="h-4 w-4 text-primary shrink-0" />
              <p className="text-sm text-foreground">Deposits are credited within <span className="font-semibold text-primary">5-30 minutes</span></p>
            </div>
            <Button onClick={handleConfirmDeposit} className="w-full h-11 font-semibold">I've Made the Transfer</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Processing */}
      <Dialog open={depositStep === "processing"} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-sm">
          <div className="flex flex-col items-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center animate-pulse">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Verifying Deposit</h2>
            <p className="text-sm text-muted-foreground text-center">We're confirming your transfer...</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success */}
      <Dialog open={depositStep === "success"} onOpenChange={handleReset}>
        <DialogContent className="sm:max-w-sm">
          <div className="flex flex-col items-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Deposit Submitted!</h2>
            <p className="text-sm text-muted-foreground text-center">
              Your deposit of <span className="text-foreground font-semibold">{amount} {selectedCurrency}</span> is being processed.
            </p>
            <div className="bg-muted/30 rounded-lg p-3 w-full text-center">
              <p className="text-xs text-muted-foreground">Reference</p>
              <p className="text-sm font-mono text-foreground">{refCode}</p>
            </div>
            <Button onClick={handleReset} className="w-full h-11 font-semibold">Done</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Failed */}
      <Dialog open={depositStep === "failed"} onOpenChange={handleReset}>
        <DialogContent className="sm:max-w-sm">
          <div className="flex flex-col items-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-destructive/15 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Deposit Failed</h2>
            <p className="text-sm text-muted-foreground text-center">We couldn't verify your deposit. Please try again or contact support.</p>
            <div className="flex gap-3 w-full">
              <Button onClick={() => setDepositStep("details")} className="flex-1 h-11 font-semibold">Retry</Button>
              <Button variant="outline" onClick={handleReset} className="flex-1 h-11 font-semibold">Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Deposit;
