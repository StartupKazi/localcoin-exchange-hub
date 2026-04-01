import { useState } from "react";
import { ArrowUpDown, ChevronDown, CheckCircle, Clock, AlertTriangle, Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TradeNav from "@/components/TradeNav";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const cryptoList = [
  { symbol: "USDT", name: "Tether", icon: "₮", balance: 1250.0 },
  { symbol: "BTC", name: "Bitcoin", icon: "₿", balance: 0.0042 },
  { symbol: "ETH", name: "Ethereum", icon: "Ξ", balance: 0.15 },
  { symbol: "BNB", name: "BNB", icon: "B", balance: 2.35 },
  { symbol: "SOL", name: "Solana", icon: "S", balance: 5.2 },
  { symbol: "USDC", name: "USD Coin", icon: "$", balance: 500.0 },
  { symbol: "TRX", name: "TRON", icon: "T", balance: 1200 },
  { symbol: "XRP", name: "Ripple", icon: "X", balance: 0 },
];

const rates: Record<string, Record<string, number>> = {
  USDT: { BTC: 0.0000116, ETH: 0.000408, BNB: 0.00165, SOL: 0.00725, USDC: 1, TRX: 4, XRP: 0.47 },
  BTC: { USDT: 86502, ETH: 35.3, BNB: 143, SOL: 627, USDC: 86502, TRX: 346008, XRP: 40658 },
  ETH: { USDT: 2450, BTC: 0.0283, BNB: 4.05, SOL: 17.75, USDC: 2450, TRX: 9800, XRP: 1152 },
  BNB: { USDT: 605, BTC: 0.007, ETH: 0.247, SOL: 4.38, USDC: 605, TRX: 2420, XRP: 284 },
  SOL: { USDT: 138, BTC: 0.0016, ETH: 0.0563, BNB: 0.228, USDC: 138, TRX: 552, XRP: 64.9 },
  USDC: { USDT: 1, BTC: 0.0000116, ETH: 0.000408, BNB: 0.00165, SOL: 0.00725, TRX: 4, XRP: 0.47 },
  TRX: { USDT: 0.25, BTC: 0.0000029, ETH: 0.000102, BNB: 0.000413, SOL: 0.00181, USDC: 0.25, XRP: 0.1175 },
  XRP: { USDT: 2.13, BTC: 0.0000246, ETH: 0.000868, BNB: 0.00352, SOL: 0.0154, USDC: 2.13, TRX: 8.51 },
};

type ConvertStep = "idle" | "confirm" | "processing" | "success" | "failed";

const Convert = () => {
  const [fromCrypto, setFromCrypto] = useState("USDT");
  const [toCrypto, setToCrypto] = useState("BTC");
  const [fromAmount, setFromAmount] = useState("");
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [convertStep, setConvertStep] = useState<ConvertStep>("idle");

  const fromToken = cryptoList.find((c) => c.symbol === fromCrypto)!;
  const toToken = cryptoList.find((c) => c.symbol === toCrypto)!;
  const rate = rates[fromCrypto]?.[toCrypto] || 0;
  const toAmount = fromAmount ? (parseFloat(fromAmount) * rate) : 0;
  const toAmountStr = toAmount < 0.0001 && toAmount > 0 ? toAmount.toFixed(8) : toAmount.toLocaleString(undefined, { maximumFractionDigits: 6 });

  const handleSwap = () => {
    setFromCrypto(toCrypto);
    setToCrypto(fromCrypto);
    setFromAmount("");
  };

  const handleConvert = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) return;
    setConvertStep("confirm");
  };

  const handleConfirm = () => {
    setConvertStep("processing");
    setTimeout(() => {
      setConvertStep(Math.random() > 0.1 ? "success" : "failed");
    }, 2000);
  };

  const handleReset = () => {
    setConvertStep("idle");
    setFromAmount("");
  };

  const recentConversions = [
    { from: "500 USDT", to: "0.00578 BTC", time: "2 hours ago", status: "success" },
    { from: "0.1 ETH", to: "245 USDT", time: "5 hours ago", status: "success" },
    { from: "100 USDT", to: "400 TRX", time: "1 day ago", status: "failed" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <TradeNav />
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left – Convert Card */}
            <div className="flex-1 max-w-xl">
              <h1 className="text-3xl font-bold text-foreground mb-2">Convert</h1>
              <p className="text-muted-foreground text-sm mb-8">Convert between cryptocurrencies instantly with zero fees</p>

              <div className="bg-card rounded-2xl border border-border/30 p-6 space-y-4">
                {/* From */}
                <div className="border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-muted-foreground">From</label>
                    <span className="text-xs text-muted-foreground">Balance: {fromToken.balance} {fromCrypto}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <input
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      placeholder="0.00"
                      className="bg-transparent text-2xl font-semibold text-foreground placeholder:text-muted-foreground/30 outline-none flex-1"
                    />
                    <div className="flex items-center gap-2">
                      <button onClick={() => setFromAmount(fromToken.balance.toString())} className="text-xs text-primary font-semibold hover:underline">MAX</button>
                      <div className="relative">
                        <button onClick={() => { setShowFromDropdown(!showFromDropdown); setShowToDropdown(false); }}
                          className="flex items-center gap-2 bg-muted/30 rounded-full px-3 py-2">
                          <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[10px] font-bold">{fromToken.icon}</span>
                          <span className="font-semibold text-sm text-foreground">{fromCrypto}</span>
                          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                        {showFromDropdown && (
                          <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-20 min-w-[180px] max-h-60 overflow-y-auto">
                            {cryptoList.filter((c) => c.symbol !== toCrypto).map((c) => (
                              <button key={c.symbol} onClick={() => { setFromCrypto(c.symbol); setShowFromDropdown(false); setFromAmount(""); }}
                                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/10 ${c.symbol === fromCrypto ? "bg-primary/10" : ""}`}>
                                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">{c.icon}</span>
                                <span className="text-sm font-semibold text-foreground">{c.symbol}</span>
                                <span className="text-xs text-muted-foreground ml-auto">{c.balance}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center -my-1">
                  <button onClick={handleSwap} className="w-10 h-10 rounded-full bg-primary/10 border border-border/30 flex items-center justify-center hover:bg-primary/20 transition-colors">
                    <ArrowUpDown className="h-4 w-4 text-primary" />
                  </button>
                </div>

                {/* To */}
                <div className="border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-muted-foreground">To</label>
                    <span className="text-xs text-muted-foreground">Balance: {toToken.balance} {toCrypto}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold text-foreground">{fromAmount ? toAmountStr : "0.00"}</span>
                    <div className="relative">
                      <button onClick={() => { setShowToDropdown(!showToDropdown); setShowFromDropdown(false); }}
                        className="flex items-center gap-2 bg-muted/30 rounded-full px-3 py-2">
                        <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[10px] font-bold">{toToken.icon}</span>
                        <span className="font-semibold text-sm text-foreground">{toCrypto}</span>
                        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                      {showToDropdown && (
                        <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-20 min-w-[180px] max-h-60 overflow-y-auto">
                          {cryptoList.filter((c) => c.symbol !== fromCrypto).map((c) => (
                            <button key={c.symbol} onClick={() => { setToCrypto(c.symbol); setShowToDropdown(false); }}
                              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/10 ${c.symbol === toCrypto ? "bg-primary/10" : ""}`}>
                              <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">{c.icon}</span>
                              <span className="text-sm font-semibold text-foreground">{c.symbol}</span>
                              <span className="text-xs text-muted-foreground ml-auto">{c.balance}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rate */}
                <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                  <span className="flex items-center gap-1"><Info className="h-3 w-3" /> Rate refreshes every 10s</span>
                  <span>1 {fromCrypto} ≈ {rate < 0.001 ? rate.toFixed(8) : rate.toLocaleString(undefined, { maximumFractionDigits: 6 })} {toCrypto}</span>
                </div>

                {/* Fee */}
                <div className="bg-success/10 rounded-lg p-3 text-center">
                  <span className="text-sm font-medium text-success">🎉 Zero conversion fee</span>
                </div>

                <button
                  onClick={handleConvert}
                  disabled={!fromAmount || parseFloat(fromAmount) <= 0}
                  className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:brightness-110 transition disabled:bg-primary/20 disabled:text-primary disabled:cursor-not-allowed"
                >
                  Convert
                </button>
              </div>
            </div>

            {/* Right – Recent Conversions */}
            <div className="w-full lg:w-[380px] shrink-0 space-y-5">
              <h3 className="text-xl font-bold text-foreground">Recent Conversions</h3>
              <div className="space-y-3">
                {recentConversions.map((conv, i) => (
                  <div key={i} className="bg-card rounded-xl border border-border/30 p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{conv.from} → {conv.to}</p>
                      <p className="text-xs text-muted-foreground mt-1">{conv.time}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      conv.status === "success" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                    }`}>
                      {conv.status === "success" ? "Completed" : "Failed"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-card rounded-xl border border-border/30 p-5 space-y-3">
                <h4 className="text-sm font-bold text-foreground">About Convert</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" /> Zero fees on all conversions</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" /> Instant settlement</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" /> Best available market rate</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" /> No minimum amount</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Confirm */}
      <Dialog open={convertStep === "confirm"} onOpenChange={() => setConvertStep("idle")}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-5 pt-2">
            <h2 className="text-xl font-bold text-foreground text-center">Confirm Conversion</h2>
            <div className="text-center py-3 space-y-1">
              <p className="text-lg text-muted-foreground">{fromAmount} {fromCrypto}</p>
              <ArrowUpDown className="h-5 w-5 text-primary mx-auto" />
              <p className="text-2xl font-bold text-primary">{toAmountStr} {toCrypto}</p>
            </div>
            <div className="bg-muted/30 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rate</span>
                <span className="text-foreground">1 {fromCrypto} = {rate < 0.001 ? rate.toFixed(8) : rate.toLocaleString(undefined, { maximumFractionDigits: 6 })} {toCrypto}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fee</span>
                <span className="text-success font-medium">Free</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">Price valid for 10 seconds</p>
            <Button onClick={handleConfirm} className="w-full h-11 font-semibold">Confirm Convert</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Processing */}
      <Dialog open={convertStep === "processing"} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-sm">
          <div className="flex flex-col items-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center animate-pulse">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Converting...</h2>
            <p className="text-sm text-muted-foreground text-center">Processing your conversion</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success */}
      <Dialog open={convertStep === "success"} onOpenChange={handleReset}>
        <DialogContent className="sm:max-w-sm">
          <div className="flex flex-col items-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Conversion Successful!</h2>
            <p className="text-sm text-muted-foreground text-center">
              Converted <span className="text-foreground font-semibold">{fromAmount} {fromCrypto}</span> to <span className="text-foreground font-semibold">{toAmountStr} {toCrypto}</span>
            </p>
            <Button onClick={handleReset} className="w-full h-11 font-semibold">Done</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Failed */}
      <Dialog open={convertStep === "failed"} onOpenChange={handleReset}>
        <DialogContent className="sm:max-w-sm">
          <div className="flex flex-col items-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-destructive/15 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Conversion Failed</h2>
            <p className="text-sm text-muted-foreground text-center">Rate expired or insufficient balance. Please try again.</p>
            <div className="flex gap-3 w-full">
              <Button onClick={() => setConvertStep("confirm")} className="flex-1 h-11 font-semibold">Retry</Button>
              <Button variant="outline" onClick={handleReset} className="flex-1 h-11 font-semibold">Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Convert;
