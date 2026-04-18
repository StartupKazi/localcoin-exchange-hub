import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import {
  Users, UserCheck, MailWarning, PhoneMissed, CheckCircle2, Clock, XCircle, Wallet,
  ArrowDownToLine, Megaphone, Repeat, Bitcoin, Banknote, ArrowUpFromLine,
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend } from "recharts";

const trend = Array.from({ length: 12 }, (_, i) => ({
  m: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  deposits: 4000 + Math.round(Math.sin(i) * 1200) + i * 220,
  withdrawals: 2800 + Math.round(Math.cos(i) * 900) + i * 180,
}));

const tradeBars = Array.from({ length: 7 }, (_, i) => ({
  d: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i],
  trades: 80 + Math.round(Math.random() * 120),
}));

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "12,438", icon: Users, tone: "primary" as const },
    { label: "Active Users", value: "9,210", icon: UserCheck, tone: "success" as const },
    { label: "Email Unverified", value: "1,124", icon: MailWarning, tone: "warning" as const },
    { label: "Mobile Unverified", value: "842", icon: PhoneMissed, tone: "warning" as const },
    { label: "Approved Withdrawals", value: "3,402", icon: CheckCircle2, tone: "success" as const },
    { label: "Pending Withdrawals", value: "128", icon: Clock, tone: "warning" as const },
    { label: "Rejected Withdrawals", value: "57", icon: XCircle, tone: "destructive" as const },
    { label: "Total Withdrawals", value: "$1.82M", icon: ArrowUpFromLine, tone: "info" as const },
    { label: "Deposit Summary", value: "$2.41M", icon: ArrowDownToLine, tone: "success" as const },
    { label: "Total Advertisements", value: "748", icon: Megaphone, tone: "primary" as const },
    { label: "Total Trades", value: "26,914", icon: Repeat, tone: "info" as const },
    { label: "Total Cryptocurrency", value: "32", icon: Bitcoin, tone: "warning" as const },
    { label: "Total Fiat Currency", value: "18", icon: Banknote, tone: "muted" as const },
    { label: "Withdrawal Summary", value: "$1.82M", icon: Wallet, tone: "destructive" as const },
  ];

  return (
    <AdminLayout title="Dashboard" description="Overview of platform performance and activity">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold">Deposits vs Withdrawals</h3>
              <p className="text-xs text-muted-foreground">Last 12 months</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend}>
                <defs>
                  <linearGradient id="d" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="w" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Area type="monotone" dataKey="deposits" stroke="hsl(var(--success))" fill="url(#d)" />
                <Area type="monotone" dataKey="withdrawals" stroke="hsl(var(--primary))" fill="url(#w)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="font-semibold mb-1">Weekly Trades</h3>
          <p className="text-xs text-muted-foreground mb-3">Trade volume per day</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tradeBars}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="d" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Bar dataKey="trades" fill="hsl(var(--primary))" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="font-semibold mb-3">Recent Activity</h3>
          <ul className="space-y-3 text-sm">
            {[
              ["New user registered", "alice@mail.com", "2m ago"],
              ["Withdrawal approved", "$420 USDT", "10m ago"],
              ["Trade completed", "BTC/USDT • #28194", "22m ago"],
              ["KYC submitted", "user_8821", "1h ago"],
              ["Dispute opened", "Trade #28110", "2h ago"],
            ].map(([a, b, c]) => (
              <li key={a + b} className="flex items-center justify-between border-b border-border last:border-0 pb-2 last:pb-0">
                <div>
                  <div className="font-medium">{a}</div>
                  <div className="text-xs text-muted-foreground">{b}</div>
                </div>
                <span className="text-xs text-muted-foreground">{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="font-semibold mb-3">Top Cryptocurrencies</h3>
          <ul className="space-y-3 text-sm">
            {[
              ["BTC", "Bitcoin", "$67,824", "+1.8%"],
              ["ETH", "Ethereum", "$3,412", "+2.4%"],
              ["USDT", "Tether", "$1.00", "0.0%"],
              ["BNB", "BNB", "$612", "-0.6%"],
              ["SOL", "Solana", "$184", "+4.1%"],
            ].map(([s, n, p, c]) => (
              <li key={s} className="flex items-center justify-between border-b border-border last:border-0 pb-2 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">{s}</div>
                  <div>
                    <div className="font-medium">{n}</div>
                    <div className="text-xs text-muted-foreground">{s}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{p}</div>
                  <div className={`text-xs ${c.startsWith("-") ? "text-destructive" : "text-[hsl(var(--success))]"}`}>{c}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
