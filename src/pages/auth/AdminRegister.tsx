import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User as UserIcon, KeyRound } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminRegister() {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Request submitted. A super admin will review it.");
    navigate("/admin/login");
  };
  return (
    <AuthLayout
      variant="admin"
      title="Request admin access"
      subtitle="Submitted requests are reviewed by a super admin"
      footer={<>Already have access? <Link to="/admin/login" className="text-primary font-medium hover:underline">Sign in</Link></>}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name</Label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="name" placeholder="Jane Admin" className="pl-9" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Work email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="email" type="email" placeholder="admin@localcoin.io" className="pl-9" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="invite">Invite code</Label>
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="invite" placeholder="Provided by super admin" className="pl-9" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="password" type="password" placeholder="Min 12 characters" className="pl-9" />
          </div>
        </div>
        <Button type="submit" className="w-full">Submit request</Button>
      </form>
    </AuthLayout>
  );
}
