import { useState } from "react";
import { Search, MessageCircle, Book, ShieldQuestion, Zap, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

const faqs = [
  {
    q: "How do I make my first deposit?",
    a: "Go to the Deposit page, choose your fiat currency, enter the amount and select a payment method. Funds are credited within 5–30 minutes.",
  },
  {
    q: "What happens if a P2P trade is disputed?",
    a: "Funds are held in escrow during a dispute. Submit your evidence in the Dispute Center and our team reviews within 24 hours.",
  },
  {
    q: "How long do withdrawals take?",
    a: "Crypto withdrawals are processed within 10 minutes after security checks. Fiat withdrawals take 1–3 business days.",
  },
  {
    q: "Are there any fees on Convert?",
    a: "No — Convert is fee-free. The exchange rate updates in real time and what you see is what you get.",
  },
  {
    q: "How do I become a verified merchant?",
    a: "Complete KYC, set a unique nickname under My Ads, and post your first ad. Build reputation through completed trades.",
  },
];

const categories = [
  { icon: Zap, title: "Getting Started", desc: "Account setup, KYC, first deposit" },
  { icon: Book, title: "Trading Guide", desc: "P2P, One-Click Buy, Convert" },
  { icon: ShieldQuestion, title: "Security", desc: "2FA, anti-phishing, safe trading" },
  { icon: MessageCircle, title: "Disputes", desc: "Evidence, resolution, appeals" },
];

const Support = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(0);
  const filtered = faqs.filter((f) => f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-background flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-10">
          {/* Hero */}
          <div className="bg-gradient-to-r from-primary/90 to-primary/70 rounded-3xl p-8 lg:p-12 text-center text-primary-foreground mb-8">
            <h1 className="text-2xl lg:text-4xl font-bold mb-3">How can we help?</h1>
            <p className="opacity-80 mb-6">Search our knowledge base or browse categories below.</p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, guides, FAQs..."
                className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-white/40"
              />
            </div>
          </div>

          {/* 2-column layout */}
          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            {/* Left: FAQs */}
            <div className="bg-card rounded-2xl border border-border/30 p-5 lg:p-6 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <div className="space-y-2">
                {filtered.map((f, i) => (
                  <div key={i} className="border border-border/30 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpen(open === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition"
                    >
                      <span className="font-medium text-foreground">{f.q}</span>
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`} />
                    </button>
                    {open === i && (
                      <div className="px-4 pb-4 text-sm text-muted-foreground">{f.a}</div>
                    )}
                  </div>
                ))}
                {filtered.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No articles found. Try a different search.</p>
                )}
              </div>
            </div>

            {/* Right: categories + contact */}
            <aside className="space-y-4">
              <div className="bg-card rounded-2xl border border-border/30 p-5 shadow-sm">
                <h3 className="font-semibold text-foreground mb-3">Browse Topics</h3>
                <div className="space-y-2">
                  {categories.map((c) => (
                    <button key={c.title} className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition text-left">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <c.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm">{c.title}</div>
                        <div className="text-xs text-muted-foreground">{c.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-card rounded-2xl border border-border/30 p-5 shadow-sm text-center">
                <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Still need help?</h3>
                <p className="text-sm text-muted-foreground mb-3">Our team is online 24/7.</p>
                <button className="w-full py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition">
                  Start Live Chat
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Support;
