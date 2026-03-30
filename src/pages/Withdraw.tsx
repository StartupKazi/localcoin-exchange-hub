import { useState } from "react";
import { AlertCircle, Mail, Shield, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TradeNav from "@/components/TradeNav";

const faqItems = [
  "Crypto Withdrawal FAQs",
  "How to Withdraw Through Internal Transfer",
  "View the Deposit/Withdrawal Status of All Coins",
  "How to Change Your Withdrawal Limit",
  "How to Manage Your Withdrawal Address Book",
];

const Withdraw = () => {
  const [showFiatWithdrawal, setShowFiatWithdrawal] = useState(false);

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
            {/* Left – Security settings card */}
            <div className="flex-1">
              <div className="bg-card rounded-2xl border border-border/30 p-8">
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <h2 className="text-xl font-bold text-foreground">Withdrawal Security Settings</h2>
                </div>

                <p className="text-muted-foreground text-sm mb-6">
                  For your account security, this operation is subject to the following conditions
                </p>

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

                <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition">
                  Set Up Now
                </button>
              </div>
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

              {/* Daily limit */}
              <div className="bg-card rounded-xl border border-border/30 p-5 space-y-3">
                <p className="text-sm text-muted-foreground">Daily Remaining Limit</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-success rounded-full" style={{ width: "100%" }} />
                  </div>
                  <span className="text-sm font-medium text-success">100.00%</span>
                </div>
                <p className="text-sm text-foreground font-medium">
                  1,000,000<span className="text-muted-foreground">/1,000,000 USDT</span>
                </p>
                <button className="text-sm text-primary font-medium hover:underline">
                  Manage Limit
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
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
