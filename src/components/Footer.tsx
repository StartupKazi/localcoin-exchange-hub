import { Facebook, Twitter, Linkedin, Instagram, Youtube, Send, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const sections = [
  {
    title: "About",
    links: [
      { label: "About LocalCoin", to: "/" },
      { label: "Contact", to: "/contact" },
      { label: "Press Room", to: "/" },
      { label: "Communities", to: "/" },
      { label: "Announcements", to: "/" },
      { label: "Risk Disclosure", to: "/" },
      { label: "Careers", to: "/" },
      { label: "Fees Overview", to: "/" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "One-Click Buy", to: "/one-click-buy" },
      { label: "P2P Trading", to: "/p2p" },
      { label: "Convert", to: "/convert" },
      { label: "Fiat Deposit", to: "/deposit" },
      { label: "Withdraw", to: "/withdraw" },
      { label: "Referral Program", to: "/referral" },
      { label: "My Ads", to: "/my-ads" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Submit a Request", to: "/support" },
      { label: "Help Center", to: "/support" },
      { label: "Disputes", to: "/disputes" },
      { label: "Orders", to: "/orders" },
      { label: "Transactions", to: "/transactions" },
      { label: "KYC Verification", to: "/kyc" },
      { label: "My Profile", to: "/profile" },
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
      { label: "Admin Register", to: "/admin/register" },
    ],
  },
];

const socials = [Facebook, Twitter, Instagram, Youtube, Linkedin, Send, MessageCircle];

const Footer = () => {
  return (
    <footer className="bg-[#0B0B0F] text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand + socials */}
          <div className="md:col-span-3">
            <img src={logo} alt="LocalCoin Trade" className="h-9 mb-6 brightness-0 invert" />
            <div className="grid grid-cols-4 gap-3 max-w-[180px]">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary/20 flex items-center justify-center text-white/80 hover:text-primary transition-colors"
                  aria-label="social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="md:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h4 className="text-white font-semibold text-base mb-5">{s.title}</h4>
                <ul className="space-y-3.5">
                  {s.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-white/70 text-sm hover:text-white transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/50 text-xs">
            © 2014–2026 LocalCoin Trade. All Rights Reserved. Babylon Solutions Limited.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/50 text-xs hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-white/50 text-xs hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
