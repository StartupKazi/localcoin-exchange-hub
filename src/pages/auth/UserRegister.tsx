import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User as UserIcon, Phone } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function UserRegister() {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Account created! Please verify your email.");
    navigate("/login");
  };
  return (
    <AuthLayout
      variant="user"
      title="Create your account"
      subtitle="Start trading in minutes"
      footer={<>Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link></>}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="first">First name</Label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="first" required placeholder="John" className="pl-9" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="last">Last name</Label>
            <Input id="last" required placeholder="Doe" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="email" type="email" required placeholder="you@example.com" className="pl-9" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="phone" type="tel" placeholder="+1 555 000 0000" className="pl-9" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="password" type="password" required placeholder="At least 8 characters" className="pl-9" />
          </div>
        </div>
        <label className="flex items-start gap-2 text-sm">
          <Checkbox id="terms" required className="mt-0.5" />
          <span className="text-muted-foreground">I agree to the <Link to="#" className="text-primary hover:underline">Terms</Link> and <Link to="#" className="text-primary hover:underline">Privacy Policy</Link></span>
        </label>
        <Button type="submit" className="w-full">Create account</Button>
      </form>
    </AuthLayout>
  );
}
