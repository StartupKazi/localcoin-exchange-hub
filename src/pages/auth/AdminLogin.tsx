import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminLogin() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Welcome, Admin");
    navigate("/admin");
  };
  return (
    <AuthLayout
      variant="admin"
      title="Admin Console Sign In"
      subtitle="Restricted access. Authorized personnel only."
      footer={<>Need an admin account? <Link to="/admin/register" className="text-primary font-medium hover:underline">Request access</Link></>}
    >
      <div className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
        Two-factor authentication is for all admin accounts.
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Admin email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="email" type="email" placeholder="admin@localcoin.io" className="pl-9" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="password" type={show ? "text" : "password"} placeholder="••••••••" className="pl-9 pr-9" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="otp">2FA Code</Label>
          <Input id="otp" inputMode="numeric" maxLength={6} placeholder="6-digit code" />
        </div>
        <div className="flex justify-end text-sm">
          <Link to="/admin/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
        </div>
        <Button type="submit" className="w-full">Access console</Button>
        <div className="text-center text-xs text-muted-foreground">
          Not an admin? <Link to="/login" className="text-primary hover:underline">User sign in</Link>
        </div>
      </form>
    </AuthLayout>
  );
}
