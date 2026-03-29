import { useState, useEffect } from "react";
import { Shield, Clock, ChevronRight, ChevronLeft, Filter, Volume2, RefreshCw } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────
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

const buyOffers: TradeOffer[] = [
  { id: 1, merchant: "Lunex.", completionRate: "96 %", orders: 1116, price: "130.40", currency: "KES", available: "138.2111 USDT", limit: "1,500.00 ~ 18,022.72 KES", paymentMethods: ["M-pesa Paybill"], time: "15m", eligible: false },
  { id: 2, merchant: "FrankTheCrypto_", completionRate: "99 %", orders: 2296, price: "130.40", currency: "KES", available: "245.4271 USDT", limit: "10,000.00 ~ 32,003.69 KES", paymentMethods: ["I&M Bank", "M-pesa Paybill"], time: "15m", eligible: false },
  { id: 3, merchant: "Hezzy254", completionRate: "98 %", orders: 264, price: "130.40", currency: "KES", available: "274.7078 USDT", limit: "800.00 ~ 35,821.89 KES", paymentMethods: ["I&M Bank", "M-pesa Paybill"], time: "15m", eligible: false },
  { id: 4, merchant: "Abdul 10", completionRate: "97 %", orders: 35, price: "130.44", currency: "KES", available: "740.4466 USDT", limit: "10,000.00 ~ 96,583.85 KES", paymentMethods: ["M-Pesa Kenya(Safarico...", "Equity", "M-pesa Paybill"], time: "15m", eligible: false },
  { id: 5, merchant: "Goldy", completionRate: "100 %", orders: 290, price: "130.49", currency: "KES", available: "387.7910 USDT", limit: "500.00 ~ 1,000.00 KES", paymentMethods: ["M-Pesa Kenya(Safarico..."], time: "15m", eligible: true },
  { id: 6, merchant: "Bahari23", completionRate: "98 %", orders: 1598, price: "130.49", currency: "KES", available: "4,723.6839 USDT", limit: "1,000.00 ~ 616,393.51 KES", paymentMethods: ["I&M Bank"], time: "30m", eligible: false },
  { id: 7, merchant: "Kadosh25", completionRate: "98 %", orders: 1198, price: "130.60", currency: "KES", available: "93.9717 USDT", limit: "300.00 ~ 12,272.70 KES", paymentMethods: ["I&M Bank", "M-pesa Paybill", "Bank Transfer"], time: "30m", eligible: true },
  { id: 8, merchant: "Joshua102", completionRate: "99 %", orders: 984, price: "130.88", currency: "KES", available: "9,192.5946 USDT", limit: "4,000.00 ~ 486,586.00 KES", paymentMethods: ["M-pesa Paybill"], time: "30m", eligible: false },
];

const cryptos = ["USDT", "BTC", "ETH", "USDC", "TRX", "BNB", "TRUMP 🔥", "SOL", "SUI"];
const fiats = ["KES", "USD", "NGN", "GHS", "TZS", "UGX"];
const payments = ["All Payment Methods", "M-Pesa", "Bank Transfer", "Airtel Money", "Cash Deposit"];

// ─── Page Title ──────────────────────────────────────────────────────
const PageTitle = () => (
  <div className="pt-6 pb-2">
    <h1 className="text-xl font-bold text-foreground">
      Buy USDT with KES via P2P
    </h1>
  </div>
);

// ─── Promo Banner (Carousel) ─────────────────────────────────────────
const promoSlides = [
  {
    title: "LocalCoin Fiat Spring Blossom",
    description: "Deposit, trade & share a 15,500 USDT prize pool!",
  },
  {
    title: "Maker Referral Program",
    description: "Invite P2P makers and earn together.",
  },
  {
    title: "Zero-Fee Trading Week",
    description: "Trade with 0% maker fees this week only!",
  },
];

const PromoBanner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % promoSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  });

  const slide = promoSlides[activeSlide];

  return (
    <div className="bg-card rounded-xl p-6 border border-border/40">
      <div className="text-center flex-1 min-h-[48px] flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-foreground">{slide.title}</h2>
        <p className="text-muted-foreground text-sm mt-1">
          {slide.description}{" "}
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs ml-1">→</span>
        </p>
      </div>
      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {promoSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeSlide ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Announce Ribbon ─────────────────────────────────────────────────
const AnnounceRibbon = () => (
  <div className="bg-primary/10 border-b border-primary/20 px-4 py-2.5 flex items-center gap-2 text-sm rounded-t-xl overflow-hidden">
    <span className="font-bold text-primary italic shrink-0">Super</span>
    <p className="text-foreground/80 truncate">
      Make a first deposit of at least 10 USDT via P2P trading. Earn a lucky draw ticket for a chance to win a 99 USDT P2P Super Deal Coupon, or get a chance to win exciting physical prizes! It's on a first-come, first-served basis.
    </p>
    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
  </div>
);

// ─── Buy/Sell + Crypto Tabs ──────────────────────────────────────────
const ActionTabs = ({
  activeTab,
  setActiveTab,
  selectedCrypto,
  setSelectedCrypto,
}: {
  activeTab: "buy" | "sell";
  setActiveTab: (t: "buy" | "sell") => void;
  selectedCrypto: string;
  setSelectedCrypto: (c: string) => void;
}) => (
  <div className="px-4 pt-4 pb-3 flex flex-wrap items-center gap-4">
    {/* Buy / Sell pill buttons */}
    <div className="flex rounded-full border border-border overflow-hidden">
      <button
        onClick={() => setActiveTab("buy")}
        className={`px-7 py-2 text-sm font-semibold transition-colors ${
          activeTab === "buy"
            ? "bg-success text-white"
            : "bg-card text-foreground hover:bg-muted/30"
        }`}
      >
        Buy
      </button>
      <button
        onClick={() => setActiveTab("sell")}
        className={`px-7 py-2 text-sm font-semibold transition-colors ${
          activeTab === "sell"
            ? "bg-foreground text-card"
            : "bg-card text-foreground hover:bg-muted/30"
        }`}
      >
        Sell
      </button>
    </div>

    {/* Crypto tabs */}
    <div className="flex items-center gap-1 flex-wrap">
      {cryptos.map((c) => (
        <button
          key={c}
          onClick={() => setSelectedCrypto(c.replace(" 🔥", ""))}
          className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
            selectedCrypto === c.replace(" 🔥", "")
              ? "text-primary font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {c}
        </button>
      ))}
      <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-0.5 ml-1">
        Supports 300+ Cryptos <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  </div>
);

// ─── Filter Row ──────────────────────────────────────────────────────
const FilterRow = () => (
  <div className="px-4 pb-3 flex flex-wrap items-center gap-3">
    {/* Amount input */}
    <div className="flex items-center border border-border rounded-lg overflow-hidden bg-card">
      <input
        type="text"
        placeholder="Enter Amount"
        className="px-3 py-2 text-sm bg-transparent outline-none w-32 text-foreground placeholder:text-muted-foreground"
      />
      <div className="flex items-center gap-1.5 px-3 py-2 border-l border-border text-sm text-foreground">
        <div className="w-4 h-4 rounded-full bg-success flex items-center justify-center text-white text-[8px] font-bold">K</div>
        KES
        <ChevronRight className="h-3 w-3 text-muted-foreground rotate-90" />
      </div>
    </div>

    {/* Payment Methods dropdown */}
    <select className="text-sm bg-card text-foreground rounded-lg px-3 py-2 border border-border appearance-none pr-8 cursor-pointer">
      {payments.map((p) => (
        <option key={p}>{p}</option>
      ))}
    </select>

    {/* Refresh settings */}
    <button className="flex items-center gap-1.5 text-sm text-foreground border border-border rounded-lg px-3 py-2 bg-card hover:bg-muted/30">
      <RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />
      Refresh settin...
      <ChevronRight className="h-3 w-3 text-muted-foreground rotate-90" />
    </button>

    {/* Filter button */}
    <button className="flex items-center gap-1.5 text-sm text-foreground hover:text-primary">
      Filter <Filter className="h-3.5 w-3.5" />
    </button>
  </div>
);

// ─── Marquee Announcement ────────────────────────────────────────────
const marqueeMessages = [
  "Please be cautious of scammers who may share personal contact details, such as phone numbers or email addresses. Always verify information independently and do not rely on screenshots.",
  "LocalCoin Trade never escrows any asset other than the asset you are purchasing. If you encounter any suspicious activity, report it immediately.",
  "Never share your account password, 2FA codes, or private keys with anyone. LocalCoin Trade support will never ask for these details.",
  "Ensure you only release crypto after confirming payment has been received in your account. Do not rely on screenshots as proof of payment.",
];

const MarqueeAnnouncement = () => {
  const [currentMsg, setCurrentMsg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMsg((prev) => (prev + 1) % marqueeMessages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 py-2.5 border-t border-b border-border/40 flex items-center gap-2 text-sm text-muted-foreground overflow-hidden">
      <Volume2 className="h-4 w-4 shrink-0" />
      <div className="overflow-hidden whitespace-nowrap flex-1 relative">
        <p key={currentMsg} className="inline-block animate-marquee whitespace-nowrap">
          {marqueeMessages[currentMsg]}
        </p>
      </div>
    </div>
  );
};

// ─── Trade Table ─────────────────────────────────────────────────────
const TradeTable = ({
  activeTab,
  selectedCrypto,
}: {
  activeTab: "buy" | "sell";
  selectedCrypto: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  return (
    <div>
      {/* Table Header */}
      <div className="grid grid-cols-[2fr_1.2fr_2fr_2fr_1.2fr] px-4 py-3 text-xs text-muted-foreground border-b border-border/30">
        <span>Advertiser</span>
        <span>Price</span>
        <span>Available|Limits</span>
        <span>Payment Method</span>
        <span className="text-right text-primary">Taker 0 Transaction Fees</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-border/30">
        {buyOffers.map((offer) => (
          <div
            key={offer.id}
            className="grid grid-cols-[2fr_1.2fr_2fr_2fr_1.2fr] px-4 py-5 items-center hover:bg-muted/20 transition-colors"
          >
            {/* Advertiser */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground font-bold text-sm">
                {offer.merchant[0]}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-foreground">{offer.merchant}</span>
                  <Shield className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                  <span>{offer.orders.toLocaleString()} Order(s)</span>
                  <span>|</span>
                  <span>{offer.completionRate}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                  <Clock className="h-3 w-3" />
                  <span>{offer.time}</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div>
              <span className="text-2xl font-bold text-foreground">{offer.price}</span>
              <span className="text-xs text-muted-foreground ml-1.5">{offer.currency}</span>
            </div>

            {/* Available / Limits */}
            <div>
              <div className="text-sm font-medium text-foreground">{offer.available}</div>
              <div className="text-sm text-muted-foreground mt-0.5">{offer.limit}</div>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-wrap gap-1.5">
              {offer.paymentMethods.map((pm) => (
                <span
                  key={pm}
                  className="text-xs px-2.5 py-1 rounded border border-border bg-card text-foreground"
                >
                  {pm}
                </span>
              ))}
            </div>

            {/* Action */}
            <div className="text-right">
              {offer.eligible ? (
                <button className="px-6 py-2.5 rounded-full bg-success text-white text-sm font-semibold hover:brightness-110 transition-all">
                  {activeTab === "buy" ? "Buy" : "Sell"} {selectedCrypto}
                </button>
              ) : (
                <button className="px-6 py-2.5 rounded-full border border-border text-foreground text-sm font-medium hover:bg-muted/30 transition-colors">
                  ineligible
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-1 px-4 py-4 border-t border-border/30">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:bg-muted/30"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 rounded text-sm font-medium flex items-center justify-center transition-colors ${
              currentPage === page
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted/30"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:bg-muted/30"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// ─── Below-the-fold sections ─────────────────────────────────────────
const HowItWorks = () => (
  <section className="bg-card rounded-xl p-8 shadow-sm border border-border/30">
    <h2 className="text-2xl font-bold text-foreground mb-2">
      Buy USDT with KES in 3 easy steps
    </h2>
    <p className="text-muted-foreground text-sm mb-8">
      Start your P2P journey with LocalCoin Trade. Follow these simple steps to buy crypto securely.
    </p>
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { step: "1", title: "Select an Ad", desc: "Choose a verified seller with competitive rates and your preferred payment method." },
        { step: "2", title: "Confirm Payment", desc: "Transfer payment via the selected method within the time limit." },
        { step: "3", title: "Receive USDT", desc: "Once the seller confirms, USDT is released from escrow to your wallet." },
      ].map((item) => (
        <div key={item.step} className="text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 text-primary font-bold text-xl flex items-center justify-center mx-auto mb-4">
            {item.step}
          </div>
          <h3 className="font-semibold text-foreground mb-2">
            Step {item.step}: {item.title}
          </h3>
          <p className="text-sm text-muted-foreground">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const Benefits = () => (
  <section className="bg-card rounded-xl p-8 shadow-sm border border-border/30">
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Why choose LocalCoin Trade for P2P?
        </h2>
        <ul className="space-y-3">
          {[
            "Secure escrow protection on every trade",
            "24/7 support with fast dispute resolution",
            "Competitive rates with zero platform fees",
            "Multiple local payment methods supported",
            "Verified merchants with transparent trade history",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
              <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-shrink-0">
        <div className="w-48 h-48 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Shield className="h-20 w-20 text-primary" />
        </div>
      </div>
    </div>
  </section>
);

const PaymentMethods = () => (
  <section className="bg-card rounded-xl p-8 shadow-sm border border-border/30">
    <h2 className="text-2xl font-bold text-foreground mb-2">Payment Methods</h2>
    <p className="text-sm text-muted-foreground mb-6">
      Trade easily with our popular payment methods
    </p>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {["M-Pesa", "Bank Transfer", "Airtel Money", "Cash Deposit", "ABSA", "Access Bank", "Equity Bank", "Chipper Cash"].map(
        (method) => (
          <div
            key={method}
            className="px-4 py-3 rounded-lg border border-border text-sm text-foreground text-center hover:border-primary/40 transition-colors cursor-pointer"
          >
            {method}
          </div>
        )
      )}
    </div>
  </section>
);

const FAQs = () => {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "What is P2P on LocalCoin Trade?", a: "P2P (Peer-to-Peer) trading allows you to buy and sell crypto directly with other users using local payment methods." },
    { q: "Are there any transaction fees?", a: "LocalCoin Trade charges zero platform fees for P2P trades. You only pay the advertised price." },
    { q: "Do I need to verify my identity?", a: "Yes, KYC verification is required to ensure safe and compliant trading for all users." },
    { q: "How is my payment protected?", a: "All trades use escrow protection. The seller's crypto is locked until payment is confirmed." },
    { q: "What payment methods are supported?", a: "We support M-Pesa, bank transfers, Airtel Money, cash deposits, and many more local options." },
  ];

  return (
    <section className="bg-card rounded-xl p-8 shadow-sm border border-border/30">
      <h2 className="text-2xl font-bold text-foreground mb-6">FAQs</h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-border/50 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-muted/30 transition-colors"
            >
              {faq.q}
              <ChevronRight
                className={`h-4 w-4 text-muted-foreground transition-transform ${
                  open === i ? "rotate-90" : ""
                }`}
              />
            </button>
            {open === i && (
              <div className="px-4 pb-3 text-sm text-muted-foreground">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Main Dashboard ──────────────────────────────────────────────────
const P2PDashboard = () => {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [selectedCrypto, setSelectedCrypto] = useState("USDT");

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 space-y-6 pb-12">
      {/* 1. Page Title */}
      <PageTitle />

      {/* 2. Promo Section */}
      <PromoBanner />

      {/* 3. Main Trade Dashboard */}
      <div className="bg-card rounded-xl shadow-sm border border-border/30 overflow-hidden">
        <AnnounceRibbon />
        <ActionTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedCrypto={selectedCrypto}
          setSelectedCrypto={setSelectedCrypto}
        />
        <FilterRow />
        <MarqueeAnnouncement />
        <TradeTable activeTab={activeTab} selectedCrypto={selectedCrypto} />
      </div>

      {/* Below the fold */}
      <HowItWorks />
      <Benefits />
      <PaymentMethods />
      <FAQs />
    </div>
  );
};

export default P2PDashboard;
