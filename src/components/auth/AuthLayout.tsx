import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Bitcoin, TrendingUp, Lock } from "lucide-react";

interface AuthLayoutProps {
  variant?: "user" | "admin";
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function AuthLayout({ variant = "user", title, subtitle, children, footer }: AuthLayoutProps) {
  const isAdmin = variant === "admin";
  return (
    <div className={isAdmin ? "admin-theme" : ""}>
      <div className={`min-h-screen w-full grid lg:grid-cols-2 ${isAdmin ? "bg-background text-foreground" : "bg-[#F6F7FA] text-foreground"}`}>
        {/* Left brand panel */}
        <div className={`hidden lg:flex flex-col justify-between p-10 relative overflow-hidden ${isAdmin ? "bg-[hsl(0_0%_7%)]" : "bg-[#021B38]"} text-white`}>
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, hsl(37 90% 55% / 0.25), transparent 40%), radial-gradient(circle at 80% 70%, hsl(210 100% 50% / 0.18), transparent 45%)",
            }}
          />
          <div className="relative">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground grid place-items-center">
                <Bitcoin className="h-5 w-5" />
              </div>
              <span>LocalCoin {isAdmin && <span className="text-primary">Admin</span>}</span>
            </Link>
          </div>

          <div className="relative space-y-6 max-w-md">
            <h2 className="text-4xl font-bold leading-tight">
              {isAdmin ? "Manage your trading platform with confidence." : "Trade crypto safely with verified merchants."}
            </h2>
            <p className="text-white/70">
              {isAdmin
                ? "Monitor users, trades, withdrawals and disputes in one secure dashboard."
                : "Buy, sell and convert crypto across 100+ payment methods. Zero fees on conversions."}
            </p>
            <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                { icon: ShieldCheck, label: "Secure" },
                { icon: TrendingUp, label: "Fast" },
                { icon: Lock, label: "Private" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                  <Icon className="h-5 w-5 mx-auto text-primary" />
                  <div className="text-xs mt-1 text-white/80">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative text-xs text-white/50">© {new Date().getFullYear()} LocalCoin. All rights reserved.</div>
        </div>

        {/* Right form panel */}
        <div className="flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <div className="lg:hidden mb-8 flex items-center gap-2 font-bold text-lg">
              <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground grid place-items-center">
                <Bitcoin className="h-5 w-5" />
              </div>
              <span>LocalCoin {isAdmin && <span className="text-primary">Admin</span>}</span>
            </div>
            <div className={`rounded-2xl p-6 md:p-8 border ${isAdmin ? "bg-card border-border" : "bg-white border-border shadow-sm"}`}>
              <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
              </div>
              {children}
            </div>
            {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
