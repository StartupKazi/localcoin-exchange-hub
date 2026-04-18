import GenericListPage, { StatusBadge } from "@/components/admin/GenericListPage";

type Txn = { id: string; user: string; type: string; asset: string; amount: string; date: string; status: string };
type Login = { id: string; user: string; ip: string; device: string; location: string; date: string; status: string };
type Notif = { id: string; channel: string; subject: string; audience: string; sent: string; status: string };

export const TransactionLog = () => {
  const rows: Txn[] = Array.from({ length: 10 }, (_, i) => ({
    id: `TX-${40000 + i}`,
    user: ["alice","bob","chen","diego","emma","farah","grace","hugo","ivy","jon"][i],
    type: ["Deposit","Withdrawal","Trade","Convert","Trade","Deposit","Trade","Withdrawal","Convert","Trade"][i],
    asset: ["USDT","BTC","ETH","USDC","BNB","USDT","SOL","USDT","BTC","USDT"][i],
    amount: `${(50 + i * 80).toFixed(2)}`,
    date: `2025-04-${(10 + i).toString().padStart(2, "0")}`,
    status: i % 4 === 0 ? "Failed" : "Success",
  }));
  return (
    <GenericListPage<Txn> title="Transaction Log" description="System-wide transaction history"
      rows={rows}
      columns={[
        { key: "id", header: "TX ID" },
        { key: "user", header: "User" },
        { key: "type", header: "Type" },
        { key: "asset", header: "Asset" },
        { key: "amount", header: "Amount" },
        { key: "date", header: "Date" },
        { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} tone={r.status === "Success" ? "success" : "destructive"} /> },
      ]} />
  );
};

export const LoginHistory = () => {
  const rows: Login[] = Array.from({ length: 10 }, (_, i) => ({
    id: `LH-${50000 + i}`,
    user: ["alice","bob","chen","diego","emma","farah","grace","hugo","ivy","jon"][i],
    ip: `192.168.1.${10 + i}`,
    device: ["Chrome / macOS","Safari / iOS","Firefox / Win","Edge / Win","Chrome / Android","Chrome / Linux","Safari / macOS","Brave / Win","Chrome / Android","Firefox / macOS"][i],
    location: ["NYC, US","London, UK","Beijing, CN","Mexico City, MX","Paris, FR","Dubai, AE","Seoul, KR","Sao Paulo, BR","Singapore, SG","Toronto, CA"][i],
    date: `2025-04-${(10 + i).toString().padStart(2, "0")} 10:${(10 + i).toString().padStart(2, "0")}`,
    status: i % 6 === 0 ? "Failed" : "Success",
  }));
  return (
    <GenericListPage<Login> title="Login History"
      rows={rows}
      columns={[
        { key: "user", header: "User" },
        { key: "ip", header: "IP Address" },
        { key: "device", header: "Device" },
        { key: "location", header: "Location" },
        { key: "date", header: "Date / Time" },
        { key: "status", header: "Result", render: (r) => <StatusBadge status={r.status} tone={r.status === "Success" ? "success" : "destructive"} /> },
      ]} />
  );
};

export const NotificationHistory = () => {
  const rows: Notif[] = Array.from({ length: 10 }, (_, i) => ({
    id: `NT-${60000 + i}`,
    channel: ["Email","Push","SMS","Email","Push","Email","SMS","Push","Email","Push"][i],
    subject: ["Maintenance window","New listing","KYC reminder","Promo: 0% fees","Security alert","Welcome","2FA enabled","Trade complete","Newsletter","Withdrawal alert"][i],
    audience: ["All Users","Active","Unverified","Active","All Users","New Users","All","All","Subscribers","All"][i],
    sent: `${(8000 + i * 120).toLocaleString()}`,
    status: "Delivered",
  }));
  return (
    <GenericListPage<Notif> title="Notification History"
      rows={rows}
      columns={[
        { key: "id", header: "ID" },
        { key: "channel", header: "Channel" },
        { key: "subject", header: "Subject" },
        { key: "audience", header: "Audience" },
        { key: "sent", header: "Recipients" },
        { key: "status", header: "Status", render: () => <StatusBadge status="Delivered" tone="success" /> },
      ]} />
  );
};
