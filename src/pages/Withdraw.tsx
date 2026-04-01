import { useState } from "react";
import { AlertCircle, Mail, Shield, CheckCircle, XCircle, Clock, Copy, AlertTriangle, ChevronDown, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TradeNav from "@/components/TradeNav";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const faqItems = [
  "Crypto Withdrawal FAQs",
  "How to Withdraw Through Internal Transfer",
  "View the Deposit/Withdrawal Status of All Coins",
  "How to Change Your Withdrawal Limit",
  "How to Manage Your Withdrawal Address Book",
];

const networks = [
  { name: "ERC20", fee: "3.52 USDT", time: "~5 min" },
  { name: "TRC20", fee: "1.00 USDT", time: "~1 min" },
  { name: "BEP20", fee: "0.80 USDT", time: "~3 min" },
  { name: "SOL", fee: "0.10 USDT", time: "~1 min" },
];

type WithdrawStep = "setup" | "form" | "confirm" | "security" | "processing" | "success" | "failed";

const Withdraw = () => {
  const [showFiatWithdrawal, setShowFiatWithdrawal] = useState(false);
  const [withdrawStep, setWithdrawStep] = useState<WithdrawStep>("setup");
  const [selectedCrypto, setSelectedCrypto] = useState("USDT");
  const [selectedNetwork, setSelectedNetwork] = useState("TRC20");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
  const [securityCode, setSecurityCode] = useState("");

  const network = networks.find((n) => n.name === selectedNetwork)!;

  const handleSetupDone = () => setWithdrawStep("form");

  const handleSubmitWithdraw = () => {
    if (!address || !amount) return;
    setWithdrawStep("confirm");
  };

  const handleConfirm = () => setWithdrawStep("security");

  const handleSecurityVerify = () => {
    setWithdrawStep("processing");
    setTimeout(() => {
      setWithdrawStep(Math.random() > 0.1 ? "success" : "failed");
    }, 2500);
  };

  const handleReset = () => {
    setWithdrawStep("setup");
    setAddress("");
    setAmount("");
    setSecurityCode("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <TradeNav />

        <div className="container mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-foreground">Withdraw</h1>
            <button
              onClick={() => setShowFiatWithdrawal(!showFiatWithdrawal)}
              className="flex items-center gap-2 border border-border rounded-full px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted/30 transition-colors"
            >
              <DollarIcon />
              Fiat Withdrawal
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left – Main content */}
            <div className="flex-1">
              {withdrawStep === "setup" && (
                <div className="bg-card rounded-2xl border border-border/30 p-8">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <h2 className="text-xl font-bold text-foreground">Withdrawal Security Settings</h2>
                  </div>
                  <p className="text-muted-foreground text-sm mb-6">For your account security, this operation is subject to the following conditions</p>
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex-1 flex items-center gap-3 border border-border/30 rounded-xl p-4">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Registered email</span>
                      <span className="ml-auto flex items-center gap-1 text-sm font-medium text-success">
                        <CheckCircle className="h-4 w-4" /> Verified
                      </span>
                    </div>
                    <div className="flex-1 flex items-center gap-3 border border-border/30 rounded-xl p-4">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Google Authentication</span>
                      <span className="ml-auto flex items-center gap-1 text-sm font-medium text-destructive">
                        <XCircle className="h-4 w-4" /> Not Set
                      </span>
                    </div>
                  </div>
                  <button onClick={handleSetupDone} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition">
                    Set Up Now
                  </button>
                </div>
              )}

              {withdrawStep === "form" && (
                <div className="bg-card rounded-2xl border border-border/30 p-8 space-y-5">
                  <h2 className="text-xl font-bold text-foreground">Withdraw Crypto</h2>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Coin</label>
                    <div className="border border-border rounded-xl p-4 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">₮</span>
                      <span className="text-foreground font-semibold">{selectedCrypto}</span>
                      <span className="text-muted-foreground text-sm">Tether</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Network</label>
                    <div className="relative">
                      <button onClick={() => setShowNetworkDropdown(!showNetworkDropdown)} className="w-full border border-border rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-foreground">{selectedNetwork}</span>
                          <span className="text-xs text-muted-foreground">Fee: {network.fee} • {network.time}</span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </button>
                      {showNetworkDropdown && (
                        <div className="absolute left-0 right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-10">
                          {networks.map((n) => (
                            <button key={n.name} onClick={() => { setSelectedNetwork(n.name); setShowNetworkDropdown(false); }}
                              className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/10 ${n.name === selectedNetwork ? "bg-primary/10" : ""}`}>
                              <span className="text-sm font-semibold text-foreground">{n.name}</span>
                              <span className="text-xs text-muted-foreground">Fee: {n.fee} • {n.time}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Withdrawal Address</label>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter wallet address"
                      className="w-full border border-border rounded-xl p-4 bg-transparent text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground">Amount</label>
                      <span className="text-xs text-muted-foreground">Available: 0.00 {selectedCrypto}</span>
                    </div>
                    <div className="border border-border rounded-xl p-4 flex items-center justify-between">
                      <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Minimum 10 USDT"
                        className="bg-transparent text-lg text-foreground placeholder:text-muted-foreground/50 outline-none flex-1"
                      />
                      <button className="text-primary text-sm font-semibold hover:underline">Max</button>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Network Fee: {network.fee}</span>
                      <span>You receive: {amount ? (parseFloat(amount) - parseFloat(network.fee)).toFixed(2) : "0.00"} {selectedCrypto}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmitWithdraw}
                    disabled={!address || !amount}
                    className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:brightness-110 transition disabled:bg-primary/20 disabled:text-primary disabled:cursor-not-allowed"
                  >
                    Withdraw
                  </button>
                </div>
              )}
            </div>

            {/* Right – FAQ */}
            <div className="w-full lg:w-[380px] shrink-0 space-y-5">
              <h3 className="text-xl font-bold text-foreground">FAQ</h3>
              <ul className="space-y-3">
                {faqItems.map((item) => (
                  <li key={item}>
                    <button className="text-sm text-foreground hover:text-primary transition-colors flex items-center gap-2">
                      <span className="text-muted-foreground">•</span>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="bg-card rounded-xl border border-border/30 p-5 space-y-3">
                <p className="text-sm text-muted-foreground">Daily Remaining Limit</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-success rounded-full" style={{ width: "100%" }} />
                  </div>
                  <span className="text-sm font-medium text-success">100.00%</span>
                </div>
                <p className="text-sm text-foreground font-medium">1,000,000<span className="text-muted-foreground">/1,000,000 USDT</span></p>
                <button className="text-sm text-primary font-medium hover:underline">Manage Limit</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Confirm Withdrawal */}
      <Dialog open={withdrawStep === "confirm"} onOpenChange={() => setWithdrawStep("form")}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-5 pt-2">
            <h2 className="text-xl font-bold text-foreground text-center">Confirm Withdrawal</h2>
            <div className="bg-muted/30 rounded-xl p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Coin</span>
                <span className="font-semibold text-foreground">{selectedCrypto}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Network</span>
                <span className="text-foreground">{selectedNetwork}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Address</span>
                <span className="text-foreground font-mono text-xs">{address.slice(0, 10)}...{address.slice(-6)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-semibold text-foreground">{amount} {selectedCrypto}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fee</span>
                <span className="text-foreground">{network.fee}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">You receive</span>
                <span className="font-semibold text-primary">{(parseFloat(amount || "0") - parseFloat(network.fee)).toFixed(2)} {selectedCrypto}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-destructive/10 rounded-lg p-3">
              <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
              <p className="text-sm text-foreground">Please verify the address. Withdrawals to wrong addresses cannot be recovered.</p>
            </div>
            <Button onClick={handleConfirm} className="w-full h-11 font-semibold">Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Security Verification */}
      <Dialog open={withdrawStep === "security"} onOpenChange={() => setWithdrawStep("form")}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-5 pt-2">
            <h2 className="text-xl font-bold text-foreground text-center">Security Verification</h2>
            <p className="text-sm text-muted-foreground text-center">Enter the 6-digit code sent to your email</p>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email Verification Code</label>
              <div className="flex gap-3">
                <input
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter 6-digit code"
                  className="flex-1 border border-border rounded-xl p-4 bg-transparent text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary transition-colors font-mono text-center text-lg tracking-widest"
                />
                <button className="px-4 py-2 text-primary text-sm font-semibold border border-primary rounded-xl hover:bg-primary/10 transition-colors whitespace-nowrap">
                  Send Code
                </button>
              </div>
            </div>
            <Button onClick={handleSecurityVerify} disabled={securityCode.length < 6} className="w-full h-11 font-semibold">
              Verify & Withdraw
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Processing */}
      <Dialog open={withdrawStep === "processing"} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-sm">
          <div className="flex flex-col items-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center animate-pulse">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Processing Withdrawal</h2>
            <p className="text-sm text-muted-foreground text-center">Please wait...</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success */}
      <Dialog open={withdrawStep === "success"} onOpenChange={handleReset}>
        <DialogContent className="sm:max-w-sm">
          <div className="flex flex-col items-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Withdrawal Submitted!</h2>
            <p className="text-sm text-muted-foreground text-center">
              <span className="text-foreground font-semibold">{amount} {selectedCrypto}</span> will arrive in {network.time}
            </p>
            <div className="bg-muted/30 rounded-lg p-3 w-full text-center">
              <p className="text-xs text-muted-foreground">Transaction ID</p>
              <p className="text-sm font-mono text-foreground">TXN-{Date.now().toString().slice(-10)}</p>
            </div>
            <Button onClick={handleReset} className="w-full h-11 font-semibold">Done</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Failed */}
      <Dialog open={withdrawStep === "failed"} onOpenChange={handleReset}>
        <DialogContent className="sm:max-w-sm">
          <div className="flex flex-col items-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-destructive/15 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Withdrawal Failed</h2>
            <p className="text-sm text-muted-foreground text-center">Transaction could not be processed. Please try again.</p>
            <div className="flex gap-3 w-full">
              <Button onClick={() => setWithdrawStep("confirm")} className="flex-1 h-11 font-semibold">Retry</Button>
              <Button variant="outline" onClick={handleReset} className="flex-1 h-11 font-semibold">Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const DollarIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="9" y1="11" x2="15" y2="11" />
    <line x1="9" y1="13" x2="15" y2="13" />
  </svg>
);

export default Withdraw;
