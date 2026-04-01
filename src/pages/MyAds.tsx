import { useState } from "react";
import Header from "@/components/Header";
import TradeNav from "@/components/TradeNav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, AlertCircle, ChevronDown, CheckCircle, Trash2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Ad {
  id: string;
  type: "buy" | "sell";
  crypto: string;
  totalQty: string;
  minLimit: string;
  maxLimit: string;
  price: string;
  fiat: string;
  fee: string;
  paymentMethods: string[];
  status: "active" | "inactive";
}

const paymentOptions = [
  { id: "bank", label: "Bank Transfer" },
  { id: "mpesa", label: "M-Pesa" },
  { id: "card", label: "Bank Card" },
  { id: "paypal", label: "PayPal" },
];

const cryptoOptions = ["USDT", "BTC", "ETH", "BNB", "SOL", "TRX"];
const fiatOptions = ["KES", "USD", "NGN", "GHS"];

const MyAds = () => {
  const [activeTab, setActiveTab] = useState<"listed" | "all">("listed");
  const [activeMode, setActiveMode] = useState(true);
  const [showPostAdModal, setShowPostAdModal] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [showCreateAdModal, setShowCreateAdModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [hasNickname, setHasNickname] = useState(false);

  // Ad creation state
  const [adType, setAdType] = useState<"buy" | "sell">("buy");
  const [adCrypto, setAdCrypto] = useState("USDT");
  const [adFiat, setAdFiat] = useState("KES");
  const [adPrice, setAdPrice] = useState("");
  const [adTotalQty, setAdTotalQty] = useState("");
  const [adMinLimit, setAdMinLimit] = useState("");
  const [adMaxLimit, setAdMaxLimit] = useState("");
  const [adPayments, setAdPayments] = useState<string[]>(["bank"]);
  const [adRemarks, setAdRemarks] = useState("");
  const [adStep, setAdStep] = useState<1 | 2 | 3>(1);

  // Ads list
  const [ads, setAds] = useState<Ad[]>([]);

  const handlePostAds = () => {
    if (hasNickname) {
      setShowCreateAdModal(true);
      setAdStep(1);
    } else {
      setShowPostAdModal(true);
    }
  };

  const handleUnlockTrial = () => {
    setShowPostAdModal(false);
    setShowNicknameModal(true);
  };

  const handleConfirmNickname = () => {
    if (nickname.trim() && nickname.length <= 15) {
      setHasNickname(true);
      setShowNicknameModal(false);
      setShowCreateAdModal(true);
      setAdStep(1);
    }
  };

  const togglePayment = (id: string) => {
    setAdPayments((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handlePublishAd = () => {
    const newAd: Ad = {
      id: `AD-${Date.now().toString().slice(-8)}`,
      type: adType,
      crypto: adCrypto,
      totalQty: adTotalQty,
      minLimit: adMinLimit,
      maxLimit: adMaxLimit,
      price: adPrice,
      fiat: adFiat,
      fee: "0.00",
      paymentMethods: adPayments.map((p) => paymentOptions.find((po) => po.id === p)?.label || p),
      status: "active",
    };
    setAds((prev) => [newAd, ...prev]);
    setShowCreateAdModal(false);
    resetAdForm();
  };

  const resetAdForm = () => {
    setAdType("buy");
    setAdCrypto("USDT");
    setAdFiat("KES");
    setAdPrice("");
    setAdTotalQty("");
    setAdMinLimit("");
    setAdMaxLimit("");
    setAdPayments(["bank"]);
    setAdRemarks("");
    setAdStep(1);
  };

  const removeAd = (id: string) => {
    setAds((prev) => prev.filter((a) => a.id !== id));
  };

  const listedAds = ads.filter((a) => a.status === "active");
  const displayAds = activeTab === "listed" ? listedAds : ads;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <TradeNav />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">My Ads</h1>
          <Button variant="outline" className="border-foreground text-foreground font-semibold rounded-lg px-5" onClick={handlePostAds}>
            + Post Ads
          </Button>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6">
              {(["listed", "all"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`text-sm font-medium pb-2 border-b-2 transition-colors capitalize ${
                    activeTab === tab ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-foreground"
                  }`}>
                  {tab === "listed" ? "Listed" : "All Ads"}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-foreground font-medium">Active Mode</span>
              <Switch checked={activeMode} onCheckedChange={setActiveMode} />
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-7 gap-4 py-3 border-b border-border text-sm text-muted-foreground">
            <span>Type</span>
            <span>ID</span>
            <span>Total Quantity / Limits</span>
            <span>Price</span>
            <span>Fee</span>
            <span>Payment Method</span>
            <span>Actions</span>
          </div>

          {displayAds.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 mb-4 flex items-center justify-center">
                <svg viewBox="0 0 80 80" className="w-20 h-20 text-muted-foreground/30">
                  <rect x="15" y="10" width="50" height="60" rx="4" fill="currentColor" opacity="0.3" />
                  <rect x="20" y="18" width="30" height="3" rx="1.5" fill="currentColor" opacity="0.5" />
                  <rect x="20" y="26" width="35" height="3" rx="1.5" fill="currentColor" opacity="0.5" />
                  <rect x="20" y="34" width="25" height="3" rx="1.5" fill="currentColor" opacity="0.5" />
                  <path d="M45 45 L65 65" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                  <circle cx="40" cy="50" r="12" stroke="hsl(var(--primary))" strokeWidth="2.5" fill="none" opacity="0.6" />
                </svg>
              </div>
              <p className="text-muted-foreground text-sm">Oops, you don't have any active ad.</p>
            </div>
          ) : (
            displayAds.map((ad) => (
              <div key={ad.id} className="grid grid-cols-7 gap-4 py-4 border-b border-border/20 items-center text-sm">
                <span className={`font-semibold ${ad.type === "buy" ? "text-success" : "text-destructive"}`}>
                  {ad.type === "buy" ? "Buy" : "Sell"}
                </span>
                <span className="text-foreground font-mono text-xs">{ad.id}</span>
                <div>
                  <p className="text-foreground">{ad.totalQty} {ad.crypto}</p>
                  <p className="text-xs text-muted-foreground">{ad.minLimit} - {ad.maxLimit} {ad.fiat}</p>
                </div>
                <span className="text-foreground font-semibold">{ad.price} {ad.fiat}</span>
                <span className="text-success">{ad.fee}</span>
                <div className="flex flex-wrap gap-1">
                  {ad.paymentMethods.map((pm) => (
                    <span key={pm} className="text-xs bg-muted/30 rounded px-2 py-0.5 text-foreground">{pm}</span>
                  ))}
                </div>
                <button onClick={() => removeAd(ad.id)} className="text-destructive hover:text-destructive/80 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}

          <div className="flex items-center justify-end gap-1 pt-4">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-border text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-primary bg-primary/10 text-primary font-medium text-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-border text-muted-foreground hover:text-foreground transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
      <Footer />

      {/* Unable to Post Ads Modal */}
      <Dialog open={showPostAdModal} onOpenChange={setShowPostAdModal}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center pt-4">
            <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2">Unable to post ads. Please apply to become an advertiser.</h2>
            <div className="flex gap-3 w-full mt-6">
              <Button className="flex-1 h-11 font-semibold" onClick={handleUnlockTrial}>Unlock Trial</Button>
              <Button variant="outline" className="flex-1 h-11 font-semibold" onClick={handleUnlockTrial}>Apply Now</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Set Nickname Modal */}
      <Dialog open={showNicknameModal} onOpenChange={setShowNicknameModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-foreground">Set Nickname</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex gap-2">
              <AlertCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-foreground">Please note that your nickname can only be set once and can not be modified after confirmation.</p>
            </div>
            <p className="text-sm text-foreground">Please set a nickname first before posting your ad.</p>
            <Input placeholder="Your nickname (max 15 characters)" value={nickname}
              onChange={(e) => { if (e.target.value.length <= 15) setNickname(e.target.value); }} className="h-11" />
            <div className="flex gap-3">
              <Button className="flex-1 h-11 font-semibold" onClick={handleConfirmNickname} disabled={!nickname.trim()}>Confirm</Button>
              <Button variant="outline" className="flex-1 h-11 font-semibold" onClick={() => { setShowNicknameModal(false); setNickname(""); }}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Ad Modal - Multi Step */}
      <Dialog open={showCreateAdModal} onOpenChange={setShowCreateAdModal}>
        <DialogContent className="sm:max-w-lg">
          <div className="space-y-5 pt-2">
            {/* Progress steps */}
            <div className="flex items-center justify-center gap-2 mb-2">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    adStep >= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>{step}</div>
                  {step < 3 && <div className={`w-10 h-0.5 ${adStep > step ? "bg-primary" : "bg-muted"}`} />}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-foreground">
                {adStep === 1 ? "Set Type & Price" : adStep === 2 ? "Set Amount & Payment" : "Review & Publish"}
              </h2>
            </div>

            {/* Step 1: Type & Price */}
            {adStep === 1 && (
              <div className="space-y-4">
                <div className="flex rounded-xl overflow-hidden border border-border">
                  {(["buy", "sell"] as const).map((t) => (
                    <button key={t} onClick={() => setAdType(t)}
                      className={`flex-1 py-3 text-center text-sm font-semibold transition-colors capitalize ${
                        adType === t ? (t === "buy" ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground") : "bg-muted/20 text-muted-foreground"
                      }`}>{t === "buy" ? "I want to Buy" : "I want to Sell"}</button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Asset</label>
                    <select value={adCrypto} onChange={(e) => setAdCrypto(e.target.value)}
                      className="w-full border border-border rounded-xl p-3 bg-background text-foreground text-sm outline-none">
                      {cryptoOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Fiat Currency</label>
                    <select value={adFiat} onChange={(e) => setAdFiat(e.target.value)}
                      className="w-full border border-border rounded-xl p-3 bg-background text-foreground text-sm outline-none">
                      {fiatOptions.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Price per {adCrypto}</label>
                  <Input value={adPrice} onChange={(e) => setAdPrice(e.target.value)} placeholder={`Enter price in ${adFiat}`} className="h-11" />
                </div>
                <Button onClick={() => setAdStep(2)} disabled={!adPrice} className="w-full h-11 font-semibold">Next</Button>
              </div>
            )}

            {/* Step 2: Amount & Payment */}
            {adStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Total Quantity ({adCrypto})</label>
                  <Input value={adTotalQty} onChange={(e) => setAdTotalQty(e.target.value)} placeholder="e.g. 1000" className="h-11" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Min Limit ({adFiat})</label>
                    <Input value={adMinLimit} onChange={(e) => setAdMinLimit(e.target.value)} placeholder="e.g. 100" className="h-11" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Max Limit ({adFiat})</label>
                    <Input value={adMaxLimit} onChange={(e) => setAdMaxLimit(e.target.value)} placeholder="e.g. 50000" className="h-11" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Payment Methods</label>
                  <div className="grid grid-cols-2 gap-2">
                    {paymentOptions.map((pm) => (
                      <button key={pm.id} onClick={() => togglePayment(pm.id)}
                        className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-colors ${
                          adPayments.includes(pm.id) ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-foreground"
                        }`}>
                        {adPayments.includes(pm.id) && <CheckCircle className="h-4 w-4 text-primary" />}
                        {pm.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Remarks (optional)</label>
                  <textarea value={adRemarks} onChange={(e) => setAdRemarks(e.target.value)} placeholder="Trading terms or instructions..."
                    className="w-full border border-border rounded-xl p-3 bg-background text-foreground text-sm outline-none resize-none h-20" />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setAdStep(1)} className="flex-1 h-11 font-semibold">Back</Button>
                  <Button onClick={() => setAdStep(3)} disabled={!adTotalQty || !adMinLimit || !adMaxLimit || adPayments.length === 0} className="flex-1 h-11 font-semibold">Next</Button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {adStep === 3 && (
              <div className="space-y-4">
                <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ad Type</span>
                    <span className={`font-semibold ${adType === "buy" ? "text-success" : "text-destructive"}`}>{adType === "buy" ? "Buy" : "Sell"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Asset</span>
                    <span className="text-foreground font-semibold">{adCrypto}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price</span>
                    <span className="text-foreground font-semibold">{adPrice} {adFiat}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Quantity</span>
                    <span className="text-foreground">{adTotalQty} {adCrypto}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Limits</span>
                    <span className="text-foreground">{adMinLimit} - {adMaxLimit} {adFiat}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Payment</span>
                    <span className="text-foreground">{adPayments.map((p) => paymentOptions.find((po) => po.id === p)?.label).join(", ")}</span>
                  </div>
                  {adRemarks && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Remarks</span>
                      <span className="text-foreground text-right max-w-[200px]">{adRemarks}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fee</span>
                    <span className="text-success font-medium">Free</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setAdStep(2)} className="flex-1 h-11 font-semibold">Back</Button>
                  <Button onClick={handlePublishAd} className="flex-1 h-11 font-semibold">Publish Ad</Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyAds;
