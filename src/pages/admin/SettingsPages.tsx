import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

function SettingsShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <AdminLayout title={title} description={description}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 space-y-4">{children}
          <div className="flex justify-end pt-2">
            <Button onClick={() => toast({ title: "Saved", description: "Settings updated successfully." })} className="gap-1">
              <Save className="h-4 w-4" /> Save Changes
            </Button>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 space-y-3 h-fit">
          <h3 className="font-semibold">Tips</h3>
          <p className="text-sm text-muted-foreground">Changes apply globally and may take a few minutes to propagate. Always test on staging first.</p>
        </div>
      </div>
    </AdminLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center py-2 border-b border-border last:border-0">
      <Label className="text-sm md:col-span-1">{label}</Label>
      <div className="md:col-span-2">{children}</div>
    </div>
  );
}

export const GeneralSetting = () => (
  <SettingsShell title="General Settings" description="Basic information about your platform">
    <Field label="Site Name"><Input defaultValue="LocalCoin Trade" /></Field>
    <Field label="Support Email"><Input defaultValue="support@localcoin.io" /></Field>
    <Field label="Contact Number"><Input defaultValue="+1 555-0100" /></Field>
    <Field label="Default Currency">
      <Select defaultValue="USD">
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="USD">USD</SelectItem>
          <SelectItem value="EUR">EUR</SelectItem>
          <SelectItem value="GBP">GBP</SelectItem>
        </SelectContent>
      </Select>
    </Field>
    <Field label="Timezone">
      <Select defaultValue="UTC">
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="UTC">UTC</SelectItem>
          <SelectItem value="EST">EST</SelectItem>
          <SelectItem value="PST">PST</SelectItem>
        </SelectContent>
      </Select>
    </Field>
    <Field label="About"><Textarea rows={4} defaultValue="P2P crypto trading platform." /></Field>
  </SettingsShell>
);

export const SystemConfiguration = () => (
  <SettingsShell title="System Configuration" description="Operational and security configuration">
    <Field label="Maintenance Mode"><Switch /></Field>
    <Field label="Force 2FA"><Switch defaultChecked /></Field>
    <Field label="Email Verification Required"><Switch defaultChecked /></Field>
    <Field label="KYC Required for Trading"><Switch defaultChecked /></Field>
    <Field label="Trade Fee (%)"><Input defaultValue="0.1" /></Field>
    <Field label="Withdrawal Fee (%)"><Input defaultValue="0.5" /></Field>
    <Field label="Min Withdrawal (USD)"><Input defaultValue="10" /></Field>
  </SettingsShell>
);

export const ReferralSetting = () => (
  <SettingsShell title="Referral Settings" description="Configure referral commissions and rewards">
    <Field label="Referral Program Enabled"><Switch defaultChecked /></Field>
    <Field label="Commission Rate (%)"><Input defaultValue="20" /></Field>
    <Field label="Min Payout (USD)"><Input defaultValue="10" /></Field>
    <Field label="Bonus on Signup (USD)"><Input defaultValue="5" /></Field>
    <Field label="Levels (Multi-tier)">
      <Select defaultValue="1">
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1 Level</SelectItem>
          <SelectItem value="2">2 Levels</SelectItem>
          <SelectItem value="3">3 Levels</SelectItem>
        </SelectContent>
      </Select>
    </Field>
    <Field label="Referral Description"><Textarea rows={3} defaultValue="Earn 20% on every trade your friends make." /></Field>
  </SettingsShell>
);

export const NotificationSetting = () => (
  <SettingsShell title="Notification Settings" description="Choose which events trigger notifications">
    <Field label="Email Notifications"><Switch defaultChecked /></Field>
    <Field label="Push Notifications"><Switch defaultChecked /></Field>
    <Field label="SMS Notifications"><Switch /></Field>
    <Field label="Notify on Trade Created"><Switch defaultChecked /></Field>
    <Field label="Notify on Trade Completed"><Switch defaultChecked /></Field>
    <Field label="Notify on Withdrawal Approved"><Switch defaultChecked /></Field>
    <Field label="Notify on Login from New Device"><Switch defaultChecked /></Field>
    <Field label="SMTP Host"><Input defaultValue="smtp.mailgun.org" /></Field>
    <Field label="SMTP From"><Input defaultValue="no-reply@localcoin.io" /></Field>
  </SettingsShell>
);
