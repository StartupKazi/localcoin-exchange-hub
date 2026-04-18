import { useState } from "react";
import { Copy, Gift, Users, DollarSign, Share2, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { toast } from "@/hooks/use-toast";

const referrals = [
  { name: "John K.", joined: "2025-04-12", earned: "$12.50", status: "active" },
  { name: "Mary W.", joined: "2025-04-08", earned: "$5.20", status: "active" },
  { name: "Ali B.", joined: "2025-04-01", earned: "$0.00", status: "pending" },
];

const Referral = () => {
  const [copied, setCopied] = useState(false);
  const code = "LCT-A8F3K2";
  const link = `https://localcoin.trade/?ref=${code}`;

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(true);
    toast({ title: "Copied!", description: "Share this with friends to earn rewards." });
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { icon: Users, label: "Friends Invited", value: "8" },
    { icon: DollarSign, label: "Total Earned", value: "$42.80" },
    { icon: Gift, label: "Active Bonuses", value: "3" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-10">
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Left: hero card */}
            <div className="bg-gradient-to-br from-primary to-primary/70 rounded-2xl p-6 lg:p-8 text-primary-foreground shadow-sm">
              <Gift className="h-10 w-10 mb-4" />
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">Earn 30% Commission</h1>
              <p className="text-primary-foreground/80 mb-6">Invite your friends and earn a share of every trade they make — for life.</p>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-3">
                <p className="text-xs uppercase tracking-wider opacity-70 mb-1">Your Referral Code</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">{code}</span>
                  <button onClick={() => copy(code)} className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition">
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <p className="text-xs uppercase tracking-wider opacity-70 mb-1">Your Referral Link</p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm truncate">{link}</span>
                  <button onClick={() => copy(link)} className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition flex-shrink-0">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: stats + how it works */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="bg-card rounded-2xl border border-border/30 p-4 shadow-sm text-center">
                    <s.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                    <div className="text-xl font-bold text-foreground">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="bg-card rounded-2xl border border-border/30 p-5 shadow-sm">
                <h3 className="font-semibold text-foreground mb-3">How it works</h3>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-primary font-bold">1.</span> Share your unique code or link.</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">2.</span> Your friend signs up and trades.</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">3.</span> You earn 30% of their trading fees — for life.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Referrals list */}
          <div className="bg-card rounded-2xl border border-border/30 p-5 lg:p-6 shadow-sm">
            <h3 className="font-semibold text-foreground mb-4">Your Referrals</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground border-b border-border/40">
                    <th className="py-3 font-medium">Name</th>
                    <th className="py-3 font-medium">Joined</th>
                    <th className="py-3 font-medium">Earned</th>
                    <th className="py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((r) => (
                    <tr key={r.name} className="border-b border-border/20">
                      <td className="py-3 text-foreground font-medium">{r.name}</td>
                      <td className="py-3 text-muted-foreground">{r.joined}</td>
                      <td className="py-3 text-success font-medium">{r.earned}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                          r.status === "active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                        }`}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Referral;
