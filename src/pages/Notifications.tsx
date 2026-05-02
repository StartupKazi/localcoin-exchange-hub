import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Megaphone, Gift, LineChart, Newspaper, Activity, Settings2, Mail, Inbox, Brush, ArrowRight, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

type Category =
  | "all"
  | "system"
  | "events"
  | "announcement"
  | "rewards"
  | "tradingview"
  | "news"
  | "strategy"
  | "account";

interface NotificationItem {
  id: string;
  category: Exclude<Category, "all">;
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

const seed: NotificationItem[] = [
  {
    id: "n1",
    category: "account",
    title: "Login From Another Device",
    body: "We noticed a login attempt to your LocalCoin Trade account at 2026-04-29 18:16:33 (UTC) from Chrome/147.0.0.0 at Kenya, Nairobi (IP address: 102.0.13.120). If this was not you, please disable your account immediately.",
    time: "04-29 21:16",
    unread: true,
  },
  {
    id: "n2",
    category: "account",
    title: "Login From Another Device",
    body: "We noticed a login attempt to your LocalCoin Trade account at 2026-04-26 01:13:35 (UTC) from Chrome/147.0.0.0 at Kenya, Nairobi (IP address: 102.0.13.120). If this was not you, please disable your account immediately.",
    time: "04-26 04:13",
    unread: true,
  },
  {
    id: "n3",
    category: "events",
    title: "Deposit and win guaranteed rewards!",
    body: "Deposit and trade to claim 5 USDT + Lucky Draw entry. Register now to participate in this limited-time event.",
    time: "04-24 14:53",
    unread: true,
  },
  {
    id: "n4",
    category: "events",
    title: "Deposit and win guaranteed rewards!",
    body: "Deposit and trade to claim 5 USDT + Lucky Draw entry. Register now to participate in this limited-time event.",
    time: "04-23 12:53",
    unread: true,
  },
  {
    id: "n5",
    category: "rewards",
    title: "You've received 2 USDT cashback",
    body: "Your P2P trade reward has been credited to your Funding Account. Keep trading to unlock the next tier reward.",
    time: "04-22 09:30",
    unread: false,
  },
  {
    id: "n6",
    category: "system",
    title: "Scheduled maintenance complete",
    body: "Wallet services are now fully operational. Thank you for your patience while we improved performance.",
    time: "04-21 18:00",
    unread: false,
  },
  {
    id: "n7",
    category: "announcement",
    title: "New fiat gateway: M-Pesa instant deposit",
    body: "You can now deposit KES instantly via M-Pesa. Visit the Deposit page to try it out.",
    time: "04-20 11:12",
    unread: false,
  },
  {
    id: "n8",
    category: "news",
    title: "Market update: BTC reclaims $68K",
    body: "Bitcoin breaks above the $68,000 resistance amid strong spot inflows. Read the full breakdown in our newsroom.",
    time: "04-19 08:05",
    unread: false,
  },
  {
    id: "n9",
    category: "tradingview",
    title: "BTC/USDT alert triggered",
    body: "Your TradingView alert 'RSI oversold' was triggered. Open the chart to review.",
    time: "04-18 22:41",
    unread: false,
  },
  {
    id: "n10",
    category: "strategy",
    title: "Grid bot completed a cycle",
    body: "Your ETH/USDT grid completed cycle #14 with a realized profit of 4.21 USDT.",
    time: "04-17 16:24",
    unread: false,
  },
];

const categories: { key: Category; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "all", label: "All", icon: Inbox },
  { key: "system", label: "System Notifications", icon: Settings2 },
  { key: "events", label: "Latest Events", icon: Activity },
  { key: "announcement", label: "Announcement", icon: Megaphone },
  { key: "rewards", label: "Rewards", icon: Gift },
  { key: "tradingview", label: "TradingView Alerts", icon: LineChart },
  { key: "news", label: "News", icon: Newspaper },
  { key: "strategy", label: "Strategy Signal", icon: Activity },
  { key: "account", label: "Changes to Account", icon: Mail },
];

const categoryIcon: Record<Exclude<Category, "all">, React.ComponentType<{ className?: string }>> = {
  system: Settings2,
  events: Activity,
  announcement: Megaphone,
  rewards: Gift,
  tradingview: LineChart,
  news: Newspaper,
  strategy: Activity,
  account: Mail,
};

const Notifications = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<NotificationItem[]>(seed);
  const [active, setActive] = useState<Category>("all");
  const [selected, setSelected] = useState<NotificationItem | null>(null);

  const counts = useMemo(() => {
    const c: Record<Category, number> = {
      all: 0, system: 0, events: 0, announcement: 0, rewards: 0,
      tradingview: 0, news: 0, strategy: 0, account: 0,
    };
    items.forEach((n) => {
      if (n.unread) {
        c.all += 1;
        c[n.category] += 1;
      }
    });
    return c;
  }, [items]);

  const filtered = active === "all" ? items : items.filter((n) => n.category === active);

  const markAllAsRead = () => setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  const markOneAsRead = (id: string) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));

  const openDetail = (n: NotificationItem) => {
    markOneAsRead(n.id);
    setSelected({ ...n, unread: false });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Page header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
              <Bell className="h-6 w-6 text-primary" />
              Notification Center
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={markAllAsRead}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                <Brush className="h-4 w-4" /> Mark All as Read
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                <Settings2 className="h-4 w-4" /> Message Setting
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[260px_1fr] gap-6">
            {/* Sidebar */}
            <aside className="bg-card rounded-2xl border border-border/30 shadow-sm p-2 h-fit lg:sticky lg:top-20">
              <ul className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
                {categories.map((c) => {
                  const Icon = c.icon;
                  const isActive = active === c.key;
                  const count = counts[c.key];
                  return (
                    <li key={c.key} className="flex-shrink-0 lg:flex-shrink">
                      <button
                        onClick={() => setActive(c.key)}
                        className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary border-l-2 lg:border-l-4 border-primary"
                            : "text-foreground/80 hover:bg-muted/40"
                        }`}
                      >
                        <span className="flex items-center gap-2 whitespace-nowrap">
                          <Icon className="h-4 w-4" />
                          {c.label}
                        </span>
                        {count > 0 && (
                          <span className="text-xs font-semibold text-muted-foreground">{count}</span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            {/* List */}
            <section className="bg-card rounded-2xl border border-border/30 shadow-sm">
              {filtered.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground">
                  <Inbox className="h-10 w-10 mx-auto mb-3 opacity-60" />
                  <p className="text-sm">No notifications in this category.</p>
                </div>
              ) : (
                <ul className="divide-y divide-border/40">
                  {filtered.map((n) => {
                    const Icon = categoryIcon[n.category];
                    return (
                      <li key={n.id} className="p-5 hover:bg-muted/20 transition-colors">
                        <div className="flex items-start gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full shrink-0 bg-destructive"
                            style={{ visibility: n.unread ? "visible" : "hidden" }}
                            aria-hidden
                          />
                          <span className="h-8 w-8 rounded-full bg-muted/50 text-foreground/70 flex items-center justify-center shrink-0">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-semibold text-foreground mb-1">{n.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed break-words">{n.body}</p>
                            <div className="flex items-center justify-between mt-3">
                              <span className="text-xs text-muted-foreground">{n.time}</span>
                              <button
                                onClick={() => openDetail(n)}
                                className="inline-flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                              >
                                View more <ArrowRight className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          </div>
        </div>
      </main>

      {selected && (
        <div
          className="fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-card rounded-2xl shadow-xl border border-border/30 w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-border/40">
              <div className="flex items-start gap-3 min-w-0">
                <span className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  {(() => {
                    const Icon = categoryIcon[selected.category];
                    return <Icon className="h-4 w-4" />;
                  })()}
                </span>
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-foreground leading-tight">{selected.title}</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    {categories.find((c) => c.key === selected.category)?.label} · {selected.time}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 py-5 overflow-y-auto">
              <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line">{selected.body}</p>
            </div>
            <div className="px-6 py-4 border-t border-border/40 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 rounded-full text-sm font-medium text-foreground/80 hover:bg-muted/40 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => { setSelected(null); navigate("/profile"); }}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:brightness-110 transition"
              >
                Manage settings
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Notifications;