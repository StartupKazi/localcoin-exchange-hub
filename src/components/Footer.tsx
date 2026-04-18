import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const sections = [
  {
    title: "Trade",
    links: [
      { label: "P2P Marketplace", to: "/p2p" },
      { label: "One-Click Buy", to: "/one-click-buy" },
      { label: "Convert", to: "/convert" },
      { label: "Fiat Deposit", to: "/deposit" },
      { label: "Withdraw", to: "/withdraw" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Profile", to: "/profile" },
      { label: "KYC Verification", to: "/kyc" },
      { label: "My Ads", to: "/my-ads" },
      { label: "Orders", to: "/orders" },
      { label: "Transactions", to: "/transactions" },
      { label: "Disputes", to: "/disputes" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", to: "/" },
      { label: "Contact", to: "/contact" },
      { label: "Support", to: "/support" },
      { label: "Referral", to: "/referral" },
    ],
  },
  {
    title: "Access",
    links: [
      { label: "User Sign In", to: "/login" },
      { label: "Create Account", to: "/register" },
      { label: "Forgot Password", to: "/forgot-password" },
      { label: "Admin Console", to: "/admin/login" },
      { label: "Admin Dashboard", to: "/admin" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-nav border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="text-white font-semibold text-sm mb-3">{s.title}</h4>
              <ul className="space-y-2">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-white/60 text-sm hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 pt-8 border-t border-white/10">
          <img src={logo} alt="LocalCoin Trade" className="h-10" />
          <p className="text-white/50 text-sm text-center">
            © 2014–2026, LOCALCOINEX All rights reserved. Babylon Solutions Limited
          </p>
          <div className="flex items-center gap-3">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/50 text-xs">Copyright © 2026 | All Rights Reserved</p>
          <div className="flex gap-6">
            <a href="#" className="text-white/50 text-xs hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-white/50 text-xs hover:text-primary transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
