import { useState, useEffect, useRef } from "react";
import { ChevronDown, User, Eye, EyeOff, Download, Upload, Bell } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Buy", href: "/one-click-buy", hasDropdown: true },
  { label: "Sell", href: "/", hasDropdown: true },
  { label: "Contact", href: "/" },
];

const moreLinks = [
  { label: "Advertisements", href: "/" },
  { label: "Trades", href: "/" },
  { label: "Wallets", href: "/" },
  { label: "Transactions", href: "/" },
];

const assetsLinks = [
  { label: "Funding Account", href: "/" },
  { label: "Unified Trading Account", href: "/" },
];

const investedLinks = [
  { label: "Earn", href: "/" },
  { label: "Copy Trading", href: "/" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [assetsOpen, setAssetsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [balanceHidden, setBalanceHidden] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const assetsRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (assetsRef.current && !assetsRef.current.contains(e.target as Node)) setAssetsOpen(false);
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-nav transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <button onClick={() => navigate("/")} className="flex-shrink-0">
          <img src={logo} alt="LocalCoin Trade" className="h-10" />
        </button>

        <nav className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => navigate(link.href)}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                location.pathname === link.href
                  ? "text-primary"
                  : "text-white/90 hover:text-primary"
              }`}
            >
              {link.label}
              {link.hasDropdown && <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          ))}

          {/* More Dropdown */}
          <div ref={moreRef} className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-primary transition-colors"
            >
              More
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
            </button>
            {moreOpen && (
              <div className="absolute top-full mt-2 left-0 w-48 rounded-lg border border-border/20 bg-[hsl(var(--nav-bg))] shadow-xl py-2 z-50">
                {moreLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => { navigate(link.href); setMoreOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-white/90 hover:text-primary hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {/* Deposit Button */}
          <button
            onClick={() => navigate("/deposit")}
            className="px-5 py-2 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:brightness-110 transition"
          >
            Deposit
          </button>

          {/* Assets Dropdown */}
          <div ref={assetsRef} className="relative">
            <button
              onClick={() => setAssetsOpen(!assetsOpen)}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                assetsOpen ? "text-primary" : "text-white/90 hover:text-primary"
              }`}
            >
              Assets
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${assetsOpen ? "rotate-180" : ""}`} />
            </button>
            {assetsOpen && (
              <div className="absolute top-full mt-2 right-0 w-72 rounded-lg border border-border/20 bg-[hsl(var(--nav-bg))] shadow-xl py-4 z-50">
                {/* Assets Overview */}
                <div className="px-4 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                    Assets Overview
                    <button onClick={() => setBalanceHidden(!balanceHidden)} className="hover:text-white/90">
                      {balanceHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {balanceHidden ? "******" : "0.00"} <span className="text-sm font-normal text-white/70">USD</span>
                  </div>
                  <div className="text-xs text-white/50 mt-0.5">
                    ≈ {balanceHidden ? "******" : "0.000000"} BTC
                  </div>
                  <p className="text-xs text-white/40 mt-2">*Data may be delayed.</p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => { navigate("/deposit"); setAssetsOpen(false); }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full border border-white/20 text-sm text-white/90 hover:bg-white/5 transition-colors"
                    >
                      <Download className="h-4 w-4" /> Deposit
                    </button>
                    <button
                      onClick={() => { navigate("/withdraw"); setAssetsOpen(false); }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full border border-white/20 text-sm text-white/90 hover:bg-white/5 transition-colors"
                    >
                      <Upload className="h-4 w-4" /> Withdraw
                    </button>
                  </div>
                </div>

                {/* Account */}
                <div className="px-4 pt-3">
                  <p className="text-xs text-white/40 mb-2">Account</p>
                  {assetsLinks.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => { navigate(link.href); setAssetsOpen(false); }}
                      className="w-full text-left py-2 text-sm font-medium text-white/90 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>

                {/* Invested Products */}
                <div className="px-4 pt-3 mt-2 border-t border-white/10">
                  <p className="text-xs text-white/40 mb-2">Invested Products</p>
                  {investedLinks.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => { navigate(link.href); setAssetsOpen(false); }}
                      className="w-full text-left py-2 text-sm font-medium text-white/90 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="relative text-white/70 hover:text-primary transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-bold text-white flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="h-8 w-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center hover:bg-primary/30 transition-colors"
            >
              <User className="h-4 w-4 text-primary" />
            </button>
            {profileOpen && (
              <div className="absolute top-full mt-2 right-0 w-48 rounded-lg border border-border/20 bg-[hsl(var(--nav-bg))] shadow-xl py-2 z-50">
                <button
                  onClick={() => { navigate("/"); setProfileOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-white/90 hover:text-primary hover:bg-white/5 transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => { navigate("/"); setProfileOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-white/90 hover:text-primary hover:bg-white/5 transition-colors"
                >
                  Settings
                </button>
                <div className="border-t border-white/10 my-1" />
                <button
                  onClick={() => { navigate("/"); setProfileOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-white/5 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
