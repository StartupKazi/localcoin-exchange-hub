import { useState } from "react";
import { Shield, Clock, ChevronRight } from "lucide-react";

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
};

const buyOffers: TradeOffer[] = [
  { id: 1, merchant: "CryptoKing_KE", completionRate: "98.2%", orders: 1245, price: "130.08", currency: "KES", available: "45,000 USDT", limit: "5,000 - 500,000 KES", paymentMethods: ["M-Pesa", "Bank Transfer"] },
  { id: 2, merchant: "SafeTrade254", completionRate: "97.8%", orders: 892, price: "130.22", currency: "KES", available: "12,500 USDT", limit: "10,000 - 250,000 KES", paymentMethods: ["M-Pesa"] },
  { id: 3, merchant: "BlockGlobal_10", completionRate: "99.1%", orders: 3201, price: "130.27", currency: "KES", available: "88,000 USDT", limit: "1,000 - 1,000,000 KES", paymentMethods: ["Bank Transfer", "Airtel Money"] },
  { id: 4, merchant: "NairobiCrypto", completionRate: "96.5%", orders: 567, price: "130.27", currency: "KES", available: "8,200 USDT", limit: "5,000 - 150,000 KES", paymentMethods: ["M-Pesa", "Cash Deposit"] },
  { id: 5, merchant: "SwiftBTC", completionRate: "99.4%", orders: 4510, price: "130.30", currency: "KES", available: "120,000 USDT", limit: "2,000 - 800,000 KES", paymentMethods: ["M-Pesa", "Bank Transfer"] },
  { id: 6, merchant: "CoinMaster_KE", completionRate: "95.9%", orders: 321, price: "130.34", currency: "KES", available: "6,800 USDT", limit: "3,000 - 100,000 KES", paymentMethods: ["Airtel Money"] },
];

const cryptos = ["USDT", "BTC", "ETH", "USDC", "BNB", "SOL"];
const fiats = ["KES", "USD", "NGN", "GHS", "TZS", "UGX"];
const payments = ["All Payments", "M-Pesa", "Bank Transfer", "Airtel Money", "Cash Deposit"];

const TradeTable = () => {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [selectedCrypto, setSelectedCrypto] = useState("USDT");

  return (
    <section className="bg-surface-light rounded-xl shadow-xl animate-fade-in">
      {/* Tabs */}
      <div className="flex border-b border-border/20">
        {(["buy", "sell"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 text-sm font-bold uppercase tracking-wide transition-colors ${
              activeTab === tab
                ? tab === "buy"
                  ? "text-success border-b-2 border-success"
                  : "text-destructive border-b-2 border-destructive"
                : "text-muted-foreground hover:text-surface-light-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="p-4 flex flex-wrap items-center gap-3 border-b border-border/10">
        {/* Crypto selector */}
        <div className="flex gap-1 bg-muted/10 rounded-lg p-1">
          {cryptos.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCrypto(c)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                selectedCrypto === c
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-surface-light-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <select className="text-xs bg-secondary/30 text-surface-light-foreground rounded-md px-3 py-2 border border-border/20">
          {fiats.map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>

        <select className="text-xs bg-secondary/30 text-surface-light-foreground rounded-md px-3 py-2 border border-border/20">
          {payments.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-muted-foreground border-b border-border/10">
              <th className="text-left px-4 py-3 font-medium">Advertisers</th>
              <th className="text-left px-4 py-3 font-medium">Price</th>
              <th className="text-left px-4 py-3 font-medium">Available / Limit</th>
              <th className="text-left px-4 py-3 font-medium">Payment</th>
              <th className="text-right px-4 py-3 font-medium">Trade</th>
            </tr>
          </thead>
          <tbody>
            {buyOffers.map((offer) => (
              <tr
                key={offer.id}
                className="border-b border-border/5 hover:bg-muted/5 transition-colors"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      {offer.merchant[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-surface-light-foreground">
                          {offer.merchant}
                        </span>
                        <Shield className="h-3.5 w-3.5 text-success" />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        <span>{offer.orders} orders</span>
                        <span>·</span>
                        <span>{offer.completionRate} completion</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-lg font-bold text-surface-light-foreground">
                    {offer.price}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">{offer.currency}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-surface-light-foreground">{offer.available}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{offer.limit}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {offer.paymentMethods.map((pm) => (
                      <span
                        key={pm}
                        className="text-xs px-2 py-0.5 rounded bg-muted/10 text-muted-foreground border border-border/10"
                      >
                        {pm}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <button
                    className={`px-5 py-2 rounded-md text-sm font-semibold transition-all ${
                      activeTab === "buy"
                        ? "bg-success text-white hover:brightness-110"
                        : "bg-destructive text-white hover:brightness-110"
                    }`}
                  >
                    {activeTab === "buy" ? "Buy" : "Sell"} {selectedCrypto}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const HowItWorks = () => (
  <section className="bg-surface-light rounded-xl p-8 shadow-lg animate-fade-in">
    <h2 className="text-2xl font-bold text-surface-light-foreground mb-2">
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
          <h3 className="font-semibold text-surface-light-foreground mb-2">
            Step {item.step}: {item.title}
          </h3>
          <p className="text-sm text-muted-foreground">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const Benefits = () => (
  <section className="bg-card rounded-xl p-8 shadow-lg border border-border">
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
  <section className="bg-surface-light rounded-xl p-8 shadow-lg">
    <h2 className="text-2xl font-bold text-surface-light-foreground mb-2">Payment Methods</h2>
    <p className="text-sm text-muted-foreground mb-6">
      Trade easily with our popular payment methods
    </p>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {["M-Pesa", "Bank Transfer", "Airtel Money", "Cash Deposit", "ABSA", "Access Bank", "Equity Bank", "Chipper Cash"].map(
        (method) => (
          <div
            key={method}
            className="px-4 py-3 rounded-lg border border-border/20 text-sm text-surface-light-foreground text-center hover:border-primary/40 transition-colors cursor-pointer"
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
    <section className="bg-card rounded-xl p-8 shadow-lg border border-border">
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

const P2PDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 space-y-10">
      {/* Hero tagline */}
      <div className="text-center pt-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">
          Buy & Sell Crypto <span className="text-primary">P2P</span>
        </h1>
        <p className="text-muted-foreground mt-2 flex items-center justify-center gap-2">
          <Clock className="h-4 w-4" /> Fast, secure, and fee-free trading
        </p>
      </div>

      <TradeTable />
      <HowItWorks />
      <Benefits />
      <PaymentMethods />
      <FAQs />
    </div>
  );
};

export default P2PDashboard;
