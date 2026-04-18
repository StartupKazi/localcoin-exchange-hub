import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, Zap, Globe, TrendingUp, Users, DollarSign } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import cryptoHero from "@/assets/crypto-deposit-hero.jpg";

const features = [
  { icon: Shield, title: "Bank-grade Security", desc: "Escrow protection on every P2P trade." },
  { icon: Zap, title: "Instant Settlements", desc: "Convert and trade with zero delays." },
  { icon: Globe, title: "Global Reach", desc: "Multi-currency, multi-payment support." },
  { icon: Users, title: "Trusted Merchants", desc: "Verified KYC traders worldwide." },
];

const stats = [
  { label: "Daily Volume", value: "$12M+", icon: TrendingUp },
  { label: "Active Users", value: "240K+", icon: Users },
  { label: "Cryptos Listed", value: "50+", icon: DollarSign },
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-10">
          {/* Hero — 2 columns */}
          <section className="grid lg:grid-cols-2 gap-8 items-center bg-card rounded-3xl p-6 lg:p-12 shadow-sm border border-border/30">
            <div>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4">
                LocalCoin Trade
              </span>
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
                Buy, Sell & Trade Crypto with Trust
              </h1>
              <p className="text-muted-foreground text-base lg:text-lg mb-6">
                The fastest way to access digital assets across Africa and beyond — peer-to-peer, instant convert, and zero-fee deposits.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/one-click-buy")}
                  className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:brightness-110 transition flex items-center gap-2"
                >
                  Start Trading <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate("/p2p")}
                  className="px-6 py-3 rounded-full border border-border text-foreground font-semibold hover:bg-muted/50 transition"
                >
                  Explore P2P
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <s.icon className="h-5 w-5 text-primary mx-auto mb-1" />
                    <div className="text-lg lg:text-2xl font-bold text-foreground">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-square lg:aspect-auto lg:h-[480px]">
              <img src={cryptoHero} alt="Crypto trading" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent" />
            </div>
          </section>

          {/* Features — 1 column table style grid */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-foreground mb-6">Why Choose LocalCoin</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((f) => (
                <div key={f.title} className="bg-card border border-border/30 rounded-2xl p-5 hover:shadow-md transition">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-10 bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-3">
              Ready to start your crypto journey?
            </h2>
            <p className="text-primary-foreground/80 mb-6">Join thousands of traders today.</p>
            <button
              onClick={() => navigate("/deposit")}
              className="px-8 py-3 rounded-full bg-white text-primary font-semibold hover:bg-white/90 transition"
            >
              Deposit Now
            </button>
          </section>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Home;
