import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const leftLinks = [
  { label: "One-Click Buy", href: "/one-click-buy" },
  { label: "P2P", href: "/p2p" },
  { label: "Fiat Deposit", href: "/deposit" },
  { label: "Withdraw", href: "/withdraw" },
  { label: "Convert", href: "/convert" },
];

const rightLinks = [
  { label: "Ads", href: "/my-ads" },
  { label: "Orders", href: "/orders" },
  { label: "Disputes", href: "/disputes" },
];

const TradeNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full border-b border-border/40 bg-background">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {leftLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <button
                key={link.label}
                onClick={() => navigate(link.href)}
                className={`relative text-sm font-medium pb-3 pt-3 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>
        <div className="hidden md:flex items-center gap-5">
          {rightLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <button
                key={link.label}
                onClick={() => navigate(link.href)}
                className={`text-sm font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TradeNav;
