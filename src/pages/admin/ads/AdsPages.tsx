import GenericListPage, { StatusBadge } from "@/components/admin/GenericListPage";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Ad = { id: string; user: string; type: string; coin: string; fiat: string; price: string; available: string; limit: string; status: string };

const ads: Ad[] = Array.from({ length: 10 }, (_, i) => ({
  id: `AD-${500 + i}`,
  user: ["alice","bob","chen","diego","emma","farah","grace","hugo","ivy","jon"][i],
  type: i % 2 === 0 ? "BUY" : "SELL",
  coin: ["USDT","BTC","ETH","USDC","BNB","USDT","SOL","USDT","BTC","USDT"][i],
  fiat: ["USD","EUR","GBP","NGN","KES","INR","BRL","ZAR","AED","JPY"][i],
  price: `$${(0.99 + i * 0.002).toFixed(3)}`,
  available: `${(1000 + i * 250).toLocaleString()}`,
  limit: `100 - ${(2000 + i * 100).toLocaleString()}`,
  status: i % 5 === 0 ? "Paused" : "Active",
}));

export function AllAdverts() {
  return (
    <GenericListPage<Ad>
      title="All Adverts"
      description="Every active and inactive advertisement on the platform"
      rows={ads}
      columns={[
        { key: "id", header: "Ad ID" },
        { key: "user", header: "Advertiser" },
        { key: "type", header: "Type", render: (r) => <StatusBadge status={r.type} tone={r.type === "BUY" ? "success" : "info"} /> },
        { key: "coin", header: "Coin" },
        { key: "fiat", header: "Fiat" },
        { key: "price", header: "Price" },
        { key: "available", header: "Available" },
        { key: "limit", header: "Limit" },
        { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} tone={r.status === "Active" ? "success" : "muted"} /> },
      ]}
    />
  );
}

export function AdLimit() {
  return (
    <AdminLayout title="Ad Limit Settings" description="Configure global limits for user advertisements">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <h3 className="font-semibold">Global Ad Limits</h3>
          {[
            ["Min Trade Amount (USD)", "10"],
            ["Max Trade Amount (USD)", "50000"],
            ["Max Active Ads / User", "5"],
            ["Min Margin (%)", "-2"],
            ["Max Margin (%)", "10"],
            ["Default Payment Window (min)", "15"],
          ].map(([l, v]) => (
            <div key={l} className="grid grid-cols-2 gap-3 items-center">
              <Label className="text-sm">{l}</Label>
              <Input defaultValue={v} />
            </div>
          ))}
          <div className="flex justify-end pt-2">
            <Button onClick={() => toast({ title: "Saved", description: "Ad limits updated." })} className="gap-1">
              <Save className="h-4 w-4" /> Save Changes
            </Button>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <h3 className="font-semibold">Per-Coin Limits</h3>
          {[
            ["BTC", "0.0005", "10"],
            ["ETH", "0.01", "200"],
            ["USDT", "10", "50000"],
            ["USDC", "10", "50000"],
          ].map(([c, mn, mx]) => (
            <div key={c} className="grid grid-cols-3 gap-2 items-center">
              <div className="font-medium text-sm">{c}</div>
              <Input defaultValue={mn} placeholder="Min" />
              <Input defaultValue={mx} placeholder="Max" />
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
