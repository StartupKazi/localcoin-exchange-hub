import { ShieldAlert, ShieldCheck, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

/** Inline banner shown above trading surfaces when KYC not verified. */
export default function KycBanner() {
  const { profile, isKycVerified } = useAuth();
  if (!profile || isKycVerified) return null;

  const pending = profile.kycStatus === "pending";
  const rejected = profile.kycStatus === "rejected";

  return (
    <div className="container mx-auto px-4 mt-3">
      <div
        className={`flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border p-4 ${
          pending
            ? "bg-amber-50 border-amber-200 text-amber-900"
            : rejected
            ? "bg-red-50 border-red-200 text-red-900"
            : "bg-blue-50 border-blue-200 text-blue-900"
        }`}
      >
        <div className="flex items-center gap-2 font-semibold">
          {pending ? <Clock className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
          {pending
            ? "KYC under review"
            : rejected
            ? "KYC was rejected"
            : "Complete your KYC to start trading"}
        </div>
        <p className="text-sm flex-1">
          {pending
            ? "We're reviewing your documents. You can browse, but trading is locked until approval."
            : "Verify your identity to unlock buying, selling and posting ads."}
        </p>
        {!pending && (
          <Link
            to="/kyc"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110"
          >
            <ShieldCheck className="h-4 w-4" /> {rejected ? "Resubmit KYC" : "Complete KYC"}
          </Link>
        )}
      </div>
    </div>
  );
}

/** Wrap an action (e.g. Buy button click) — returns false and navigates if not allowed. */
export function useTradeGuard() {
  const { isAuthenticated, isKycVerified, profile } = useAuth();
  return () => {
    if (!isAuthenticated) {
      return { allowed: false, reason: "auth" as const };
    }
    if (!isKycVerified) {
      return { allowed: false, reason: profile?.kycStatus === "pending" ? ("pending" as const) : ("kyc" as const) };
    }
    return { allowed: true as const };
  };
}
