import { useNavigate, useLocation } from "react-router-dom";
import { Home, ArrowLeftRight, Receipt, TrendingUp, User } from "lucide-react";

const navItems = [
  { label: "P2P", icon: Home, href: "/" },
  { label: "Orders", icon: Receipt, href: "/orders" },
  { label: "Ads", icon: TrendingUp, href: "/my-ads" },
  { label: "Profile", icon: User, href: "/profile" },
];

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border/40 md:hidden">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
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
      </div>
    </nav>
  );
};

export default MobileBottomNav;
