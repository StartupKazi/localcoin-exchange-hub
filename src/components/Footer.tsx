import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-nav border-t border-border">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center gap-6">
        <img src={logo} alt="LocalCoin Trade" className="h-12" />

        <p className="text-muted-foreground text-sm text-center">
          © 2014–2026, LOCALCOINEX All rights reserved. Babylon Solutions Limited
        </p>

        <div className="flex items-center gap-4">
          {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-10 h-10 rounded-full border border-muted-foreground/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-muted-foreground text-xs">
            Copyright © 2026 | All Rights Reserved
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground text-xs hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground text-xs hover:text-primary transition-colors">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
