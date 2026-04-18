import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Missing fields", description: "Please complete all required fields." });
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({ title: "Message sent", description: "Our team will reply within 24 hours." });
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  const channels = [
    { icon: Mail, title: "Email Support", value: "support@localcoin.trade", note: "Replies within 24h" },
    { icon: Phone, title: "Phone", value: "+254 700 000 000", note: "Mon–Fri 9am–6pm EAT" },
    { icon: MessageCircle, title: "Live Chat", value: "Available in-app", note: "24/7 instant chat" },
    { icon: MapPin, title: "Headquarters", value: "Nairobi, Kenya", note: "By appointment only" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-10">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left: form */}
            <div className="bg-card rounded-2xl border border-border/30 p-6 lg:p-8 shadow-sm">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Get in Touch</h1>
              <p className="text-muted-foreground mb-6">We'd love to hear from you. Send us a message.</p>
              <form onSubmit={submit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-foreground font-medium block mb-1">Name *</label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-foreground font-medium block mb-1">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-foreground font-medium block mb-1">Subject</label>
                  <input
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="text-sm text-foreground font-medium block mb-1">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={6}
                    className="w-full px-3 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    placeholder="Tell us more..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:brightness-110 transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {sending ? "Sending..." : <>Send Message <Send className="h-4 w-4" /></>}
                </button>
              </form>
            </div>

            {/* Right: channels */}
            <div className="space-y-4">
              {channels.map((c) => (
                <div key={c.title} className="bg-card rounded-2xl border border-border/30 p-5 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <c.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{c.title}</h3>
                    <p className="text-sm text-foreground mt-0.5">{c.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{c.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Contact;
