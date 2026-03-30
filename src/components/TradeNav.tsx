import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const leftLinks = [
  { label: "One-Click Buy", href: "/one-click-buy" },
  { label: "P2P", href: "/" },
  { label: "Fiat Deposit", href: "/deposit" },
  { label: "Withdraw", href: "/withdraw" },
  { label: "Convert", href: "#" },
];

const rightLinks = [
  { label: "User Guide", href: "#", hasDropdown: true },
  { label: "Ads", href: "#", hasDropdown: true },
  { label: "Orders", href: "#" },
  { label: "P2P User Center", href: "#" },
];

const TradeNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full border-b border-border/40 bg-background">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Left links */}
        <div className="flex items-center gap-6">
          {leftLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <button
                key={link.label}
                onClick={() => link.href !== "#" && navigate(link.href)}
                className={`relative text-sm font-medium pb-3 pt-3 transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
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

        {/* Right links */}
        <div className="hidden md:flex items-center gap-5">
          {rightLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => link.href !== "#" && navigate(link.href)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
              {link.hasDropdown && <ChevronDown className="h-3 w-3" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradeNav;
