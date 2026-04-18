import { useNavigate } from "react-router-dom";
import { ShieldCheck, ShieldAlert, Clock, Mail, Phone, User as UserIcon, Calendar, MapPin, LogOut, Edit3 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();

  if (!profile) {
    navigate("/login");
    return null;
  }

  const status = profile.kycStatus;
  const statusMeta = {
    none: { label: "Not started", color: "bg-muted text-muted-foreground", Icon: ShieldAlert },
    pending: { label: "Under review", color: "bg-amber-100 text-amber-800", Icon: Clock },
    verified: { label: "Verified", color: "bg-green-100 text-green-800", Icon: ShieldCheck },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-800", Icon: ShieldAlert },
  }[status];
  const StatusIcon = statusMeta.Icon;

  const initials = `${profile.firstName?.[0] || ""}${profile.lastName?.[0] || ""}`.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-background flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 max-w-5xl space-y-4">
          {/* Profile header */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-primary/15 border-2 border-primary/30 grid place-items-center text-2xl font-bold text-primary">
              {initials}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h1>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mt-2 ${statusMeta.color}`}>
                <StatusIcon className="h-3.5 w-3.5" /> KYC: {statusMeta.label}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => signOut()}>
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </Button>
            </div>
          </div>

          {/* KYC card */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" /> Identity Verification
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {status === "verified"
                    ? "Your identity has been verified. You can trade without restrictions."
                    : status === "pending"
                    ? "Your documents are being reviewed. Trading is temporarily locked."
                    : status === "rejected"
                    ? "Your previous submission was rejected. Please resubmit with valid documents."
                    : "Complete KYC to unlock trading, posting ads, and higher withdrawal limits."}
                </p>
              </div>
              {status !== "verified" && status !== "pending" && (
                <Button onClick={() => navigate("/kyc")}>
                  <ShieldCheck className="h-4 w-4 mr-1" /> {status === "rejected" ? "Resubmit" : "Start KYC"}
                </Button>
              )}
              {status === "pending" && (
                <Button variant="outline" onClick={() => navigate("/kyc")}>View status</Button>
              )}
            </div>

            {/* KYC progress checklist */}
            <div className="mt-5 grid sm:grid-cols-3 gap-3">
              {[
                { label: "Account created", done: true },
                { label: "Email verified", done: true },
                { label: "Identity verified", done: status === "verified" },
              ].map(item => (
                <div key={item.label} className={`rounded-xl border p-3 flex items-center gap-2 text-sm ${item.done ? "bg-green-50 border-green-200 text-green-900" : "bg-muted/40 border-border text-muted-foreground"}`}>
                  <div className={`h-5 w-5 rounded-full grid place-items-center ${item.done ? "bg-green-500 text-white" : "bg-muted"}`}>
                    {item.done ? "✓" : ""}
                  </div>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Personal info */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Personal Information</h2>
              <Button variant="ghost" size="sm"><Edit3 className="h-4 w-4 mr-1" /> Edit</Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { Icon: UserIcon, label: "Full name", value: `${profile.firstName} ${profile.lastName}`.trim() || "—" },
                { Icon: Mail, label: "Email", value: profile.email },
                { Icon: Phone, label: "Phone", value: profile.phone || "—" },
                { Icon: MapPin, label: "Country", value: profile.country || "—" },
                { Icon: Calendar, label: "Date of birth", value: profile.dob || "—" },
                { Icon: Calendar, label: "Member since", value: new Date(profile.createdAt).toLocaleDateString() },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-muted grid place-items-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">{label}</div>
                    <div className="text-sm font-medium truncate">{value}</div>
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
}
