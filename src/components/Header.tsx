import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "One-Click Buy", href: "/one-click-buy" },
  { label: "P2P", href: "/" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-nav transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#" className="flex-shrink-0">
          <img src={logo} alt="LocalCoin Trade" className="h-10" />
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#"
            className="px-5 py-2 text-sm font-semibold rounded bg-primary text-primary-foreground hover:brightness-110 transition"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="px-5 py-2 text-sm font-semibold rounded bg-primary text-primary-foreground hover:brightness-110 transition"
          >
            Logout
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
