import { useState, useEffect, useRef } from "react";
import { ChevronDown, User, Eye, EyeOff, Download, Upload, Bell, Menu, X, ShieldCheck, ShieldAlert, Clock, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useAuth } from "@/hooks/useAuth";

type NavItem = { label: string; href?: string; children?: { label: string; href: string }[] };

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Trade",
    children: [
      { label: "One-Click Buy", href: "/one-click-buy" },
      { label: "P2P", href: "/p2p" },
      { label: "Convert", href: "/convert" },
      { label: "Fiat Deposit", href: "/deposit" },
      { label: "Withdraw", href: "/withdraw" },
    ],
  },
  { label: "Advertisements", href: "/my-ads" },
  {
    label: "Activity",
    children: [
      { label: "Orders", href: "/orders" },
      { label: "Transactions", href: "/transactions" },
      { label: "Disputes", href: "/disputes" },
    ],
  },
  { label: "Contact", href: "/contact" },
  {
    label: "More",
    children: [
      { label: "Referral", href: "/referral" },
      { label: "Support", href: "/support" },
      { label: "My Profile", href: "/profile" },
      { label: "KYC Verification", href: "/kyc" },
      { label: "Admin Dashboard", href: "/admin" },
    ],
  },
];

const assetsLinks = [
  { label: "Funding Account", href: "/transactions" },
  { label: "Unified Trading Account", href: "/transactions" },
];

const investedLinks = [
  { label: "Earn", href: "/" },
  { label: "Copy Trading", href: "/" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [assetsOpen, setAssetsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [balanceHidden, setBalanceHidden] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, signOut } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const assetsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpenDropdown(null);
      if (assetsRef.current && !assetsRef.current.contains(e.target as Node)) setAssetsOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const go = (href: string) => {
    navigate(href);
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  const isActive = (href?: string) => href && location.pathname === href;

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

        {/* Desktop nav */}
        <nav ref={dropdownRef} className="hidden lg:flex items-center gap-5">
          {navItems.map((item) => {
            if (!item.children) {
              return (
                <button
                  key={item.label}
                  onClick={() => go(item.href!)}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.href) ? "text-primary" : "text-white/90 hover:text-primary"
                  }`}
                >
                  {item.label}
                </button>
              );
            }
            const open = openDropdown === item.label;
            return (
              <div key={item.label} className="relative">
                <button
                  onClick={() => setOpenDropdown(open ? null : item.label)}
                  className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-primary transition-colors"
                >
                  {item.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open && (
                  <div className="absolute top-full mt-2 left-0 w-52 rounded-lg border border-border/20 bg-[hsl(var(--nav-bg))] shadow-xl py-2 z-50">
                    {item.children.map((child) => (
                      <button
                        key={child.label}
                        onClick={() => go(child.href)}
                        className="w-full text-left px-4 py-2.5 text-sm text-white/90 hover:text-primary hover:bg-white/5 transition-colors"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right cluster (desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => navigate("/deposit")}
            className="px-5 py-2 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:brightness-110 transition"
          >
            Deposit
          </button>

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

          <button className="relative text-white/70 hover:text-primary transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-bold text-white flex items-center justify-center">
              3
            </span>
          </button>

          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="h-8 w-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center hover:bg-primary/30 transition-colors relative"
            >
              <User className="h-4 w-4 text-primary" />
              {profile && profile.kycStatus !== "verified" && (
                <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-amber-400 border border-[hsl(var(--nav-bg))]" />
              )}
            </button>
            {profileOpen && (
              <div className="absolute top-full mt-2 right-0 w-60 rounded-lg border border-border/20 bg-[hsl(var(--nav-bg))] shadow-xl py-2 z-50">
                {profile ? (
                  <>
                    <div className="px-4 py-2 border-b border-white/10">
                      <div className="text-sm font-semibold text-white truncate">{profile.firstName} {profile.lastName}</div>
                      <div className="text-xs text-white/60 truncate">{profile.email}</div>
                      <div className="mt-2 flex items-center gap-1.5 text-xs">
                        {profile.kycStatus === "verified" ? (
                          <span className="inline-flex items-center gap-1 text-green-400"><ShieldCheck className="h-3.5 w-3.5" /> KYC Verified</span>
                        ) : profile.kycStatus === "pending" ? (
                          <span className="inline-flex items-center gap-1 text-amber-400"><Clock className="h-3.5 w-3.5" /> KYC Pending</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-400"><ShieldAlert className="h-3.5 w-3.5" /> KYC Required</span>
                        )}
                      </div>
                    </div>
                    <button onClick={() => { navigate("/profile"); setProfileOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-white/90 hover:text-primary hover:bg-white/5 transition-colors">My Profile</button>
                    {profile.kycStatus !== "verified" && (
                      <button onClick={() => { navigate("/kyc"); setProfileOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-amber-400 hover:bg-white/5 transition-colors flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" /> Complete KYC
                      </button>
                    )}
                    <button onClick={() => { navigate("/transactions"); setProfileOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-white/90 hover:text-primary hover:bg-white/5 transition-colors">Dashboard</button>
                    <div className="border-t border-white/10 my-1" />
                    <button onClick={() => { signOut(); navigate("/"); setProfileOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-white/5 transition-colors flex items-center gap-2">
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { navigate("/login"); setProfileOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-white/90 hover:text-primary hover:bg-white/5 transition-colors flex items-center gap-2">
                      <LogIn className="h-4 w-4" /> Sign in
                    </button>
                    <button onClick={() => { navigate("/register"); setProfileOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-primary hover:bg-white/5 transition-colors">Create account</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[hsl(var(--nav-bg))] max-h-[calc(100vh-64px)] overflow-y-auto">
          <nav className="container mx-auto px-4 py-3 flex flex-col">
            {navItems.map((item) => {
              if (!item.children) {
                return (
                  <button
                    key={item.label}
                    onClick={() => go(item.href!)}
                    className={`text-left py-3 text-sm font-medium border-b border-white/5 ${
                      isActive(item.href) ? "text-primary" : "text-white/90"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              }
              const open = openDropdown === item.label;
              return (
                <div key={item.label} className="border-b border-white/5">
                  <button
                    onClick={() => setOpenDropdown(open ? null : item.label)}
                    className="w-full flex items-center justify-between py-3 text-sm font-medium text-white/90"
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && (
                    <div className="pb-2 pl-3">
                      {item.children.map((c) => (
                        <button
                          key={c.label}
                          onClick={() => go(c.href)}
                          className="w-full text-left py-2 text-sm text-white/70 hover:text-primary"
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => go("/deposit")}
                className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-full bg-primary text-primary-foreground"
              >
                Deposit
              </button>
              <button
                onClick={() => go("/withdraw")}
                className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-full border border-white/20 text-white"
              >
                Withdraw
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
