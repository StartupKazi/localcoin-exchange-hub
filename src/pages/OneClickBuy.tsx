import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TradeNav from "@/components/TradeNav";

const cryptoOptions = ["BTC", "ETH", "USDT", "USDC", "BNB", "SOL", "TRX"];
const fiatOptions = ["KES", "USD", "NGN", "GHS", "TZS", "UGX"];

const OneClickBuy = () => {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [selectedFiat, setSelectedFiat] = useState("KES");
  const [showCryptoDropdown, setShowCryptoDropdown] = useState(false);
  const [showFiatDropdown, setShowFiatDropdown] = useState(false);

  const isBuy = activeTab === "buy";

  const exchangeRate = selectedCrypto === "BTC" 
    ? (selectedFiat === "KES" ? "8,801,652.658514" : "86,502.884")
    : selectedCrypto === "ETH"
    ? (selectedFiat === "KES" ? "258,000.00" : "2,450.00")
    : "1.00";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="w-full px-4 md:px-8 lg:px-12">
          {/* Sub-navigation */}
          <div className="flex items-center gap-6 border-b border-border/40 mb-8">
            <a href="/one-click-buy" className="text-sm font-semibold text-primary border-b-2 border-primary pb-3">
              One-Click Buy
            </a>
            <a href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground pb-3 transition-colors">
              P2P
            </a>
          </div>

          {/* Main content */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left side – title + promo */}
            <div className="flex-1 space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {isBuy
                  ? `One-Click Buy ${selectedCrypto} With ${selectedFiat}`
                  : `One-Click Sell ${selectedCrypto} to ${selectedFiat}`}
              </h1>
              <p className="text-muted-foreground text-base max-w-lg">
                Trade {selectedCrypto} seamlessly on LocalCoin Trade with P2P and multiple payment options. VIPs enjoy 10% off fees with a minimum transaction of 1,500 USDT.
              </p>

              {/* Trending Events Card */}
              <div className="bg-card rounded-xl border border-border/40 p-6 max-w-lg">
                <span className="inline-block text-sm font-semibold text-primary border border-primary rounded-full px-4 py-1 mb-4">
                  Trending Events
                </span>

                {/* Dark promo card */}
                <div className="bg-foreground rounded-xl p-5 mb-4">
                  <h3 className="text-lg font-bold text-background">New User Welcome Bonus</h3>
                  <p className="text-background/70 text-sm mt-1">
                    Embark on Your Fiat Journey to Earn 10 USDT!
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-xs font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded">
                      Ongoing
                    </span>
                    <span className="text-background/50 text-xs">Long-term Validity</span>
                  </div>
                </div>

                {/* Tasks and rewards */}
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

              <p className="text-xs text-muted-foreground/60">
                Final participation eligibility will be determined by the event details shown in the Rewards Hub.
              </p>
            </div>

            {/* Right side – Buy/Sell card */}
            <div className="w-full lg:w-[420px] shrink-0">
              <div className="bg-card rounded-2xl shadow-sm border border-border/30 overflow-hidden">
                {/* Buy / Sell tabs */}
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("buy")}
                    className={`flex-1 py-5 text-center text-xl font-bold transition-colors ${
                      isBuy
                        ? "text-foreground bg-card"
                        : "text-muted-foreground/40 bg-muted/30"
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setActiveTab("sell")}
                    className={`flex-1 py-5 text-center text-xl font-bold transition-colors ${
                      !isBuy
                        ? "text-foreground bg-card"
                        : "text-muted-foreground/40 bg-muted/30"
                    }`}
                  >
                    Sell
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  {/* Spend input */}
                  <div className="border border-border rounded-xl p-4">
                    <label className="text-sm text-muted-foreground block mb-1">
                      Spend
                    </label>
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
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
                                  setShowFiatDropdown(false);
                                  setShowCryptoDropdown(false);
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

                  {/* Available (sell mode) */}
                  {!isBuy && (
                    <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                      <span>Available: 0 {selectedCrypto}</span>
                      <a href="#" className="text-primary font-medium hover:underline">Transfer</a>
                    </div>
                  )}

                  {/* Receive input */}
                  <div className="border border-border rounded-xl p-4">
                    <label className="text-sm text-muted-foreground block mb-1">
                      Receive ≈
                    </label>
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        placeholder={isBuy ? "Enter purchase amount" : `2 - 50,000`}
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
                                  setShowCryptoDropdown(false);
                                  setShowFiatDropdown(false);
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

                  {/* Exchange rate */}
                  <p className="text-xs text-muted-foreground px-1">
                    1 {selectedCrypto} ≈ {exchangeRate} {selectedFiat}
                  </p>

                  {/* Payment Methods */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground">Payment Methods</p>
                    <div className="border border-border rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-bold">
                          {isBuy ? "💳" : "P2P"}
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {isBuy ? "Bank Card" : "Bank Transfer"}
                        </span>
                      </div>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Action button */}
                  <button className="w-full py-3.5 rounded-xl bg-primary/20 text-primary font-semibold text-base hover:bg-primary/30 transition-colors">
                    {isBuy ? "Add Card" : `Sell ${selectedCrypto}`}
                  </button>

                  {/* Recurring buy (buy mode) */}
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
    </div>
  );
};

export default OneClickBuy;
