import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, ArrowLeftRight, Megaphone, Receipt, MoreHorizontal, X, Zap, Repeat, Download, Upload, Headphones, Gift, Mail, Flag } from "lucide-react";

const primary = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Trade", icon: ArrowLeftRight, href: "/p2p" },
  { label: "Ads", icon: Megaphone, href: "/my-ads" },
  { label: "Orders", icon: Receipt, href: "/orders" },
];

const moreItems = [
  { label: "One-Click Buy", icon: Zap, href: "/one-click-buy" },
  { label: "Convert", icon: Repeat, href: "/convert" },
  { label: "Deposit", icon: Download, href: "/deposit" },
  { label: "Withdraw", icon: Upload, href: "/withdraw" },
  { label: "Transactions", icon: Receipt, href: "/transactions" },
  { label: "Disputes", icon: Flag, href: "/disputes" },
  { label: "Referral", icon: Gift, href: "/referral" },
  { label: "Support", icon: Headphones, href: "/support" },
  { label: "Contact", icon: Mail, href: "/contact" },
];

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);

  const go = (href: string) => {
    navigate(href);
    setMoreOpen(false);
  };

  return (
    <>
      {moreOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setMoreOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-16 left-0 right-0 bg-card rounded-t-2xl border-t border-border/40 shadow-2xl p-4 max-h-[70vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">More</h3>
              <button onClick={() => setMoreOpen(false)} className="p-1 text-muted-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {moreItems.map((m) => (
                <button
                  key={m.label}
                  onClick={() => go(m.href)}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border/30 hover:bg-muted/30 transition"
                >
                  <m.icon className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium text-foreground text-center">{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border/40 md:hidden">
        <div className="flex items-center justify-around px-2 py-1">
          {primary.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.href)}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 text-xs font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => setMoreOpen(true)}
            className={`flex flex-col items-center gap-0.5 px-3 py-2 text-xs font-medium transition-colors ${
              moreOpen ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <MoreHorizontal className="h-5 w-5" />
            <span>More</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default MobileBottomNav;
