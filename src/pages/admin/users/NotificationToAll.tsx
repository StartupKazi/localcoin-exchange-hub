import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function NotificationToAll() {
  return (
    <AdminLayout
      title="Notification to All Users"
      description="Broadcast a notification, email, or SMS to your user base"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Channel</Label>
              <Select defaultValue="email">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="push">Push Notification</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Audience</Label>
              <Select defaultValue="all">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="active">Active Users</SelectItem>
                  <SelectItem value="kyc">KYC Verified</SelectItem>
                  <SelectItem value="banned">Banned Users</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Subject</Label>
            <Input placeholder="Enter subject..." />
          </div>
          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea rows={8} placeholder="Type your message here..." />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Save Draft</Button>
            <Button onClick={() => toast({ title: "Notification queued", description: "Broadcast scheduled to all users." })} className="gap-1">
              <Send className="h-4 w-4" /> Send Now
            </Button>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <h3 className="font-semibold">Recent Broadcasts</h3>
          <ul className="space-y-3 text-sm">
            {[
              ["Maintenance window", "All Users · Email", "2d ago"],
              ["New listing: PEPE", "Active Users · Push", "5d ago"],
              ["KYC reminder", "Unverified · Email", "1w ago"],
            ].map(([t, m, w]) => (
              <li key={t} className="border-b border-border last:border-0 pb-2 last:pb-0">
                <div className="font-medium">{t}</div>
                <div className="text-xs text-muted-foreground flex justify-between">
                  <span>{m}</span><span>{w}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
