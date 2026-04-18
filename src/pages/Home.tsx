import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Bitcoin,
  TrendingDown,
  ShieldCheck,
  ThumbsUp,
  Wallet,
  UserPlus,
  Headphones,
  Users,
  Coins,
  Eye,
  HeartHandshake,
  Lock,
  Plus,
  Minus,
  Megaphone,
  Store,
  Zap,
} from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

const heroPattern =
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=80";

const services = [
  { icon: Bitcoin, title: "Buy Bitcoin", desc: "Buy Bitcoin instantly with your preferred payment method.", tone: "from-amber-100 to-amber-50" },
  { icon: TrendingDown, title: "Sell Bitcoin", desc: "Sell Bitcoin securely to verified buyers worldwide.", tone: "from-emerald-100 to-emerald-50" },
  { icon: ShieldCheck, title: "Secure trading", desc: "Bank-grade escrow protects every P2P trade end-to-end.", tone: "from-sky-100 to-sky-50" },
  { icon: ThumbsUp, title: "Valuable feedback", desc: "Reputation-based ratings keep merchants accountable.", tone: "from-rose-100 to-rose-50" },
  { icon: Wallet, title: "Free LocalCoin Wallet", desc: "Hold and manage 50+ assets from a single dashboard.", tone: "from-violet-100 to-violet-50" },
  { icon: UserPlus, title: "Invite friends", desc: "Earn rewards every time a friend trades on LocalCoin.", tone: "from-orange-100 to-orange-50" },
];

const tickerAssets = [
  { symbol: "BTC", name: "Bitcoin", price: "$11,000,000", img: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=80&q=80" },
  { symbol: "USDT", name: "Tether USD", price: "$130", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=80&q=80" },
];

const popularAssets = ["BTC", "USDT"];

const whyChoose = [
  { icon: Headphones, title: "24/7 Customer Support", desc: "Real humans available around the clock to help with every trade." },
  { icon: Users, title: "People-Powered Technology", desc: "Built by traders, for traders — community feedback drives every release." },
  { icon: Coins, title: "Free Crypto Wallet", desc: "A zero-fee custodial wallet bundled with every account." },
  { icon: Eye, title: "Our Vision", desc: "Empower Africa with seamless access to digital finance." },
  { icon: HeartHandshake, title: "Our Customer Right", desc: "Transparency, fair pricing and dispute resolution you can trust." },
  { icon: Lock, title: "Secure", desc: "Industry-leading encryption and cold-storage for your assets." },
];

const faqs = [
  { q: "Is LocalCoin App available on Android & iOS?", a: "Yes — our mobile apps are launching soon on the App Store and Google Play." },
  { q: "What is Escrow Service and how is it for trading?", a: "Escrow holds the seller's crypto until the buyer pays, protecting both parties." },
  { q: "How am I protected from fraudulent trades?", a: "All trades use escrow and KYC-verified merchants with dispute resolution." },
  { q: "How do I create a new LocalCoin account?", a: "Click Register, verify your email, and complete KYC to start trading." },
  { q: "How fees work?", a: "Deposits are free. P2P trades have a 0.1% maker / 0.2% taker fee." },
  { q: "Introduction about the Company - LocalCoin", a: "LocalCoin is a peer-to-peer crypto exchange focused on Africa and beyond." },
];

const testimonials = [
  { name: "Marcus", quote: "Best P2P platform I've used. Settlements are fast and support is responsive.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" },
  { name: "Chiamaka", quote: "Loved the merchant verification — I trade with confidence every time.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80" },
  { name: "Nick", quote: "Withdrawals are smooth and the fees are fair. Highly recommended.", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&q=80" },
  { name: "Mr Pop", quote: "The escrow system gives me peace of mind on every order.", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80" },
  { name: "Chris", quote: "Clean interface, great mobile experience. Five stars from me.", avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=120&q=80" },
  { name: "Lazee", quote: "Customer support resolved my dispute in under an hour. Impressive!", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80" },
];

const Home = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [crypto, setCrypto] = useState("BTC");
  const [payment, setPayment] = useState("Bank Transfer");
  const [fiat, setFiat] = useState("USD");
  const [region, setRegion] = useState("Worldwide");

  return (
    <div className="min-h-screen bg-background flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-1 pt-16">
        {/* HERO — dark */}
        <section className="relative bg-[hsl(var(--nav-bg))] overflow-hidden">
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroPattern})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--nav-bg))] via-[hsl(var(--nav-bg))]/95 to-[hsl(var(--nav-bg))]/70" />
          <div className="container mx-auto px-4 py-16 lg:py-24 relative grid lg:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-5">
                P2P CRYPTO EXCHANGE
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-5">
                Trade Bitcoin On <span className="text-primary">Localcoinex</span>
              </h1>
              <p className="text-white/70 text-base lg:text-lg mb-7 max-w-xl">
                A trusted P2P marketplace built for Africa. Buy, sell and convert digital assets with verified merchants, escrow protection and instant settlements.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white/80 text-xs font-medium">Protected money</span>
                <span className="px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white/80 text-xs font-medium">300+ ways to pay</span>
                <span className="px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white/80 text-xs font-medium">A merchant who helps</span>
              </div>
            </div>

            {/* Find offers card */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 lg:p-8 shadow-2xl">
              <div className="flex items-center gap-2 mb-5">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-primary text-xs font-semibold tracking-wider uppercase">Localcoinex Wallet</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-5">Find Your Offers</h3>
              <div className="grid grid-cols-2 gap-3">
                <Field label="I want to" value={crypto} onChange={setCrypto} options={["BTC", "USDT", "ETH"]} />
                <Field label="Currency" value={fiat} onChange={setFiat} options={["USD", "NGN", "KES", "EUR"]} />
                <Field label="Payment" value={payment} onChange={setPayment} options={["Bank Transfer", "Mobile Money", "Cash"]} />
                <Field label="Region" value={region} onChange={setRegion} options={["Worldwide", "Africa", "Europe"]} />
              </div>
              <button
                onClick={() => navigate("/p2p")}
                className="w-full mt-5 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:brightness-110 transition flex items-center justify-center gap-2"
              >
                Find Offers <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* SERVICES — light */}
        <section className="bg-background py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">OUR SERVICES</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">Buy Crypto Currencies</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                With over a decade of combined experience, we help you trade safely on the most reliable P2P platform for crypto in Africa.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s) => (
                <div
                  key={s.title}
                  className={`bg-gradient-to-br ${s.tone} rounded-2xl p-6 border border-border/30 hover:shadow-lg transition group cursor-pointer`}
                  onClick={() => navigate("/p2p")}
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4">
                    <s.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>

            {/* Market ticker dark band */}
            <div className="mt-10 bg-[hsl(var(--nav-bg))] rounded-2xl p-6 lg:p-8">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-semibold mb-2">LIVE MARKET</span>
                  <h3 className="text-white font-bold text-lg">Track the market before you trade</h3>
                </div>
                <button onClick={() => navigate("/p2p")} className="text-primary text-sm font-semibold hover:underline">
                  See more →
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {tickerAssets.map((a) => (
                  <div key={a.symbol} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                    <img src={a.img} alt={a.name} className="h-12 w-12 rounded-full object-cover" />
                    <div className="flex-1">
                      <div className="text-white font-semibold">{a.symbol}</div>
                      <div className="text-white/50 text-xs">{a.name}</div>
                    </div>
                    <div className="text-white font-bold">{a.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PEOPLE-POWERED MONEY — light split */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">WHY LOCALCOIN</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Welcome to People-Powered Money</h2>
              <p className="text-muted-foreground mb-4">
                LocalCoin is changing how the world of finance interacts with crypto. We were built on the belief that everyone deserves access to digital money — without barriers or gatekeepers.
              </p>
              <p className="text-muted-foreground">
                Join millions trading their way into a new economy with one of Africa's most trusted exchanges.
              </p>
            </div>
            <div className="bg-card border border-border/30 rounded-2xl p-6 shadow-sm">
              <p className="text-sm font-semibold text-foreground mb-4">Popular assets on the platform</p>
              <div className="grid grid-cols-2 gap-3">
                {popularAssets.map((p) => (
                  <button
                    key={p}
                    onClick={() => navigate("/one-click-buy")}
                    className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Coins className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-semibold text-foreground">{p}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHY PEOPLE CHOOSE US — dark */}
        <section className="bg-[hsl(var(--nav-bg))] py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-3">WHY CRYPTO CHOOSE US</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">Why People Choose Us</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Leading the future of decentralized markets with technology built for trust, speed and global compliance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {whyChoose.map((w) => (
                <div key={w.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
                  <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-4">
                    <w.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{w.title}</h3>
                  <p className="text-sm text-white/60">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ — light */}
        <section className="bg-background py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">FAQ</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">Frequently Asked Questions.</h2>
              <p className="text-muted-foreground">We answer some of your frequently asked questions regarding our platform, so we can give you the best answer.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {faqs.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="text-left bg-card border border-border/30 rounded-xl p-5 hover:shadow-sm transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-semibold text-foreground text-sm">{f.q}</span>
                    {openFaq === i ? (
                      <Minus className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                    ) : (
                      <Plus className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                    )}
                  </div>
                  {openFaq === i && <p className="text-sm text-muted-foreground mt-3">{f.a}</p>}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS — dark */}
        <section className="bg-[hsl(var(--nav-bg))] py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-3">CUSTOMER REVIEWS</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">What Our Clients Say About Us</h2>
              <p className="text-white/60 max-w-2xl mx-auto">We have served over 240,000 customers and we always strive for the best customer experience that we can.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="text-white/80 text-sm mb-5 leading-relaxed">"{t.quote}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                    <div className="font-semibold text-white text-sm">{t.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MARKETPLACE CTA — light */}
        <section className="bg-background py-16">
          <div className="container mx-auto px-4">
            <div className="bg-card border border-border/30 rounded-3xl p-8 lg:p-12 grid md:grid-cols-2 gap-8 items-center shadow-sm">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">OPEN MARKETPLACE</span>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
                  Trade peer-to-peer or post your own ad in minutes.
                </h3>
                <p className="text-muted-foreground mb-5">
                  LocalCoin's open P2P market connects you with thousands of verified merchants worldwide. Browse live offers, set your own price, or become a merchant by publishing an advertisement — all backed by escrow protection.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">300+ payment methods</span>
                  <span className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">Escrow secured</span>
                  <span className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">Zero deposit fees</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate("/p2p")}
                    className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:brightness-110 transition flex items-center gap-2"
                  >
                    Open P2P Market <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => navigate("/my-ads")}
                    className="px-6 py-3 rounded-full border border-border text-foreground font-semibold hover:bg-muted/50 transition"
                  >
                    Post an Ad
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex gap-4 p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-border/30">
                  <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                    <Store className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Browse the open market</h4>
                    <p className="text-sm text-muted-foreground">240,000+ active traders posting live buy and sell offers across 50+ assets.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 border border-border/30">
                  <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                    <Megaphone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Advertise your offer</h4>
                    <p className="text-sm text-muted-foreground">Set your price, choose payment methods and reach buyers in seconds.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-border/30">
                  <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Instant settlements</h4>
                    <p className="text-sm text-muted-foreground">Funds release the moment payment is confirmed — no waiting around.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

const Field = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) => (
  <label className="block">
    <span className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">{label}</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-primary"
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-[hsl(var(--nav-bg))]">
          {o}
        </option>
      ))}
    </select>
  </label>
);

export default Home;
