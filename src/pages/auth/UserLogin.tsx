import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export default function UserLogin() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const p = signIn(email);
    toast.success("Welcome back!");
    navigate(p.kycStatus === "verified" ? "/" : "/profile");
  };
  return (
    <AuthLayout
      variant="user"
      title="Sign in to your account"
      subtitle="Enter your credentials to access your wallet"
      footer={<>Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Create one</Link></>}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="email" type="email" required placeholder="you@example.com" className="pl-9" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="password" type={show ? "text" : "password"} required placeholder="••••••••" className="pl-9 pr-9" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox id="remember" /> <span>Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
        </div>
        <Button type="submit" className="w-full">Sign in</Button>
        <div className="text-center text-xs text-muted-foreground">
          Are you an admin? <Link to="/admin/login" className="text-primary hover:underline">Admin sign in</Link>
        </div>
      </form>
    </AuthLayout>
  );
}
