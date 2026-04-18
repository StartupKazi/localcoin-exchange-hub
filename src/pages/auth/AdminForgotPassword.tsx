import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AdminForgotPassword() {
  const [sent, setSent] = useState(false);
  return (
    <AuthLayout
      variant="admin"
      title={sent ? "Check your inbox" : "Reset admin password"}
      subtitle={sent ? "Reset instructions sent if the account exists." : "We'll email you a secure reset link"}
      footer={<Link to="/admin/login" className="inline-flex items-center gap-1 text-primary hover:underline"><ArrowLeft className="h-3 w-3" /> Back to admin sign in</Link>}
    >
      {sent ? (
        <div className="text-center space-y-4 py-4">
          <div className="h-14 w-14 mx-auto rounded-full bg-success/15 grid place-items-center">
            <CheckCircle2 className="h-7 w-7 text-success" />
          </div>
          <p className="text-sm text-muted-foreground">A super admin will be notified of this reset request for security auditing.</p>
          <Button variant="outline" className="w-full" onClick={() => setSent(false)}>Resend email</Button>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Admin email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="admin@localcoin.io" className="pl-9" />
            </div>
          </div>
          <Button type="submit" className="w-full">Send reset link</Button>
        </form>
      )}
    </AuthLayout>
  );
}
