import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Repeat, Search, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

type TxType = "deposit" | "withdraw" | "convert" | "p2p";
type TxStatus = "completed" | "pending" | "failed";

interface Tx {
  id: string;
  type: TxType;
  asset: string;
  amount: string;
  fiat: string;
  status: TxStatus;
  date: string;
}

const transactions: Tx[] = [
  { id: "TX-1029", type: "deposit", asset: "USDT", amount: "+250.00", fiat: "$250.00", status: "completed", date: "2025-04-18 09:21" },
  { id: "TX-1028", type: "p2p", asset: "BTC", amount: "+0.0042", fiat: "$278.30", status: "completed", date: "2025-04-17 22:10" },
  { id: "TX-1027", type: "withdraw", asset: "USDT", amount: "-100.00", fiat: "$100.00", status: "pending", date: "2025-04-17 18:02" },
  { id: "TX-1026", type: "convert", asset: "ETH → USDT", amount: "0.05 → 168.20", fiat: "$168.20", status: "completed", date: "2025-04-16 14:48" },
  { id: "TX-1025", type: "withdraw", asset: "BTC", amount: "-0.0010", fiat: "$66.20", status: "failed", date: "2025-04-15 11:30" },
];

const tabs: { key: "all" | TxType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "deposit", label: "Deposits" },
  { key: "withdraw", label: "Withdrawals" },
  { key: "convert", label: "Convert" },
  { key: "p2p", label: "P2P" },
];

const Transactions = () => {
  const [tab, setTab] = useState<"all" | TxType>("all");
  const [query, setQuery] = useState("");

  const filtered = transactions.filter(
    (t) =>
      (tab === "all" || t.type === tab) &&
      (query === "" || t.id.toLowerCase().includes(query.toLowerCase()) || t.asset.toLowerCase().includes(query.toLowerCase()))
  );

  const iconFor = (type: TxType) => {
    if (type === "deposit") return <ArrowDownLeft className="h-4 w-4 text-success" />;
    if (type === "withdraw") return <ArrowUpRight className="h-4 w-4 text-destructive" />;
    return <Repeat className="h-4 w-4 text-primary" />;
  };

  const statusBadge = (s: TxStatus) => {
    const map = {
      completed: "bg-success/10 text-success",
      pending: "bg-warning/10 text-warning",
      failed: "bg-destructive/10 text-destructive",
    };
    return <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${map[s]}`}>{s}</span>;
  };

  const summary = [
    { label: "Total Inflow", value: "$2,840.50", color: "text-success" },
    { label: "Total Outflow", value: "$612.30", color: "text-destructive" },
    { label: "Net Balance", value: "$2,228.20", color: "text-foreground" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-10">
          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            {/* Left: table */}
            <div className="bg-card rounded-2xl border border-border/30 p-5 lg:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by ID or asset"
                    className="pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-background w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
                      tab === t.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground border-b border-border/40">
                      <th className="py-3 font-medium">Type</th>
                      <th className="py-3 font-medium">Asset</th>
                      <th className="py-3 font-medium">Amount</th>
                      <th className="py-3 font-medium hidden md:table-cell">Value</th>
                      <th className="py-3 font-medium">Status</th>
                      <th className="py-3 font-medium hidden md:table-cell">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((t) => (
                      <tr key={t.id} className="border-b border-border/20 hover:bg-muted/30 transition">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">{iconFor(t.type)}</span>
                            <span className="capitalize text-foreground">{t.type}</span>
                          </div>
                        </td>
                        <td className="py-3 text-foreground">{t.asset}</td>
                        <td className="py-3 font-medium text-foreground">{t.amount}</td>
                        <td className="py-3 text-muted-foreground hidden md:table-cell">{t.fiat}</td>
                        <td className="py-3">{statusBadge(t.status)}</td>
                        <td className="py-3 text-muted-foreground text-xs hidden md:table-cell">{t.date}</td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-muted-foreground">
                          No transactions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: summary */}
            <aside className="space-y-4">
              <div className="bg-card rounded-2xl border border-border/30 p-5 shadow-sm">
                <h3 className="font-semibold text-foreground mb-4">Summary</h3>
                <div className="space-y-3">
                  {summary.map((s) => (
                    <div key={s.label} className="flex justify-between items-center py-2 border-b border-border/20 last:border-0">
                      <span className="text-sm text-muted-foreground">{s.label}</span>
                      <span className={`font-bold ${s.color}`}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card rounded-2xl border border-border/30 p-5 shadow-sm">
                <Filter className="h-5 w-5 text-primary mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Need a custom report?</h3>
                <p className="text-sm text-muted-foreground mb-3">Export your transaction history for any date range.</p>
                <button className="w-full py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition">
                  Export CSV
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

export default Transactions;
