import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ArrowRight, Wallet, DollarSign, Rocket, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TradeNav from "@/components/TradeNav";

const currencies = [
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
];

const Deposit = () => {
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState("KES");
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);
  const [currencySearch, setCurrencySearch] = useState("");
  const [amount, setAmount] = useState("");
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);

  const currency = currencies.find((c) => c.code === selectedCurrency)!;
  const filteredCurrencies = currencies.filter(
    (c) =>
      c.code.toLowerCase().includes(currencySearch.toLowerCase()) ||
      c.name.toLowerCase().includes(currencySearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <TradeNav />

        <div className="container mx-auto px-4 py-10">
          {/* Payment method selector modal */}
          {showPaymentMethod && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
              <div className="bg-sidebar-background text-sidebar-foreground rounded-2xl w-full max-w-md p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Select Payment Method</h2>
                  <button
                    onClick={() => setShowPaymentMethod(false)}
                    className="text-muted-foreground hover:text-foreground text-xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Already have crypto */}
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Already have crypto</p>
                  <button className="w-full flex items-center gap-4 p-4 border border-border/30 rounded-xl hover:bg-muted/10 transition-colors">
                    <span className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Wallet className="h-5 w-5 text-primary" />
                    </span>
                    <div className="text-left">
                      <p className="font-semibold">Deposit Crypto</p>
                      <p className="text-sm text-muted-foreground">Already have crypto? Deposit directly</p>
                    </div>
                  </button>
                </div>

                {/* Don't have crypto */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-muted-foreground">Don't have crypto</p>
                    <div className="relative">
                      <button
                        onClick={() => setShowCurrencyPicker(!showCurrencyPicker)}
                        className="flex items-center gap-1.5 bg-muted/20 rounded-full px-3 py-1.5 text-sm font-medium"
                      >
                        <span className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-[10px] font-bold text-primary">
                          {currency.symbol}
                        </span>
                        {selectedCurrency}
                        <ChevronDown className={`h-3 w-3 transition-transform ${showCurrencyPicker ? "rotate-180" : ""}`} />
                      </button>

                      {showCurrencyPicker && (
                        <div className="absolute right-0 top-10 bg-sidebar-background border border-border/30 rounded-xl shadow-xl z-10 w-64 max-h-72 overflow-hidden">
                          <div className="p-3 border-b border-border/20">
                            <div className="flex items-center gap-2 bg-muted/10 rounded-lg px-3 py-2">
                              <Search className="h-4 w-4 text-muted-foreground" />
                              <input
                                value={currencySearch}
                                onChange={(e) => setCurrencySearch(e.target.value)}
                                placeholder="Search currency"
                                className="bg-transparent text-sm outline-none flex-1 text-foreground placeholder:text-muted-foreground/50"
                              />
                            </div>
                          </div>
                          <div className="overflow-y-auto max-h-52">
                            {filteredCurrencies.map((c) => (
                              <button
                                key={c.code}
                                onClick={() => {
                                  setSelectedCurrency(c.code);
                                  setShowCurrencyPicker(false);
                                  setCurrencySearch("");
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/10 transition-colors ${
                                  c.code === selectedCurrency ? "bg-primary/10" : ""
                                }`}
                              >
                                <span className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                                  {c.symbol}
                                </span>
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
                    <button
                      onClick={() => setShowPaymentMethod(false)}
                      className="w-full flex items-center gap-4 p-4 border border-border/30 rounded-xl hover:bg-muted/10 transition-colors"
                    >
                      <span className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">P2P</span>
                      </span>
                      <div className="text-left">
                        <p className="font-semibold">P2P Trading</p>
                        <p className="text-sm text-muted-foreground">More Choices, Better Prices</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setShowPaymentMethod(false)}
                      className="w-full flex items-center gap-4 p-4 border border-border/30 rounded-xl hover:bg-muted/10 transition-colors"
                    >
                      <span className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </span>
                      <div className="text-left">
                        <p className="font-semibold">Deposit {selectedCurrency}</p>
                        <p className="text-sm text-muted-foreground">Deposit via Bank Transfers or Top-Ups</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setShowPaymentMethod(false)}
                      className="w-full flex items-center gap-4 p-4 border border-border/30 rounded-xl hover:bg-muted/10 transition-colors"
                    >
                      <span className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Rocket className="h-5 w-5 text-primary" />
                      </span>
                      <div className="text-left">
                        <p className="font-semibold">Buy with {selectedCurrency}</p>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard and JCB are supported</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left side */}
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl font-bold text-foreground">
                Deposit {selectedCurrency}
              </h1>
              <p className="text-muted-foreground text-base max-w-lg">
                Purchase crypto instantly with deposits from your bank account.
              </p>
            </div>

            {/* Right side – Deposit card */}
            <div className="w-full lg:w-[460px] shrink-0">
              <div className="bg-card rounded-2xl border border-border/30 p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Fiat Deposit</h2>
                  <button
                    onClick={() => {
                      // Navigate to withdrawal
                      window.location.href = "/withdraw";
                    }}
                    className="flex items-center gap-1.5 border border-border rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/30 transition-colors"
                  >
                    Fiat Withdrawal <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Amount input */}
                <div className="border border-border rounded-xl p-4">
                  <label className="text-sm text-muted-foreground block mb-1">Amount</label>
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="100 - 500,000"
                      className="bg-transparent text-lg text-foreground placeholder:text-muted-foreground/50 outline-none flex-1"
                    />
                    <button
                      onClick={() => setShowPaymentMethod(true)}
                      className="flex items-center gap-1.5 text-sm font-semibold text-foreground"
                    >
                      <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[10px] font-bold">
                        {currency.symbol}
                      </span>
                      {selectedCurrency}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Payment Method</p>
                  <div className="border-2 border-primary rounded-xl p-4 relative">
                    <span className="absolute -top-2.5 right-3 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded">
                      Zero Fees
                    </span>
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

                {/* Continue button */}
                <button className="w-full py-3.5 rounded-xl bg-primary/20 text-primary font-semibold text-base hover:bg-primary/30 transition-colors">
                  Continue
                </button>
              </div>

              <p className="text-xs text-muted-foreground/60 text-center mt-4">
                ✅ Service provided by LOCALCOIN VIRTUAL ASSET PLATFORM OPERATOR LLC SPC.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Deposit;
