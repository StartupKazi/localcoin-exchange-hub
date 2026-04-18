import GenericListPage, { StatusBadge } from "@/components/admin/GenericListPage";

type Withdraw = { id: string; user: string; method: string; amount: string; currency: string; date: string; status: string };

const seed = (status: string): Withdraw[] =>
  Array.from({ length: 10 }, (_, i) => ({
    id: `WD-${20000 + i}`,
    user: ["alice","bob","chen","diego","emma","farah","grace","hugo","ivy","jon"][i],
    method: ["Bank Transfer","Wise","PayPal","SEPA","M-Pesa","UPI","PIX","Bank","Wire","SWIFT"][i],
    amount: `${(120 + i * 95).toLocaleString()}`,
    currency: ["USD","EUR","GBP","EUR","KES","INR","BRL","USD","USD","USD"][i],
    date: `2025-04-${(10 + i).toString().padStart(2, "0")}`,
    status,
  }));

const cols = [
  { key: "id", header: "TXN ID" },
  { key: "user", header: "User" },
  { key: "method", header: "Method" },
  { key: "amount", header: "Amount" },
  { key: "currency", header: "Currency" },
  { key: "date", header: "Date" },
];

export const PendingWithdrawals = () => (
  <GenericListPage<Withdraw> title="Pending Withdrawals" description="Awaiting admin approval"
    rows={seed("Pending")}
    columns={[...cols, { key: "status", header: "Status", render: () => <StatusBadge status="Pending" tone="warning" /> }]}
  />
);

export const ApprovedWithdrawals = () => (
  <GenericListPage<Withdraw> title="Approved Withdrawals"
    rows={seed("Approved")}
    columns={[...cols, { key: "status", header: "Status", render: () => <StatusBadge status="Approved" tone="success" /> }]}
  />
);

export const RejectedWithdrawals = () => (
  <GenericListPage<Withdraw> title="Rejected Withdrawals"
    rows={seed("Rejected")}
    columns={[...cols, { key: "status", header: "Status", render: () => <StatusBadge status="Rejected" tone="destructive" /> }]}
  />
);

export const AllWithdrawals = () => {
  const mix: Withdraw[] = [...seed("Pending").slice(0,3), ...seed("Approved").slice(0,5), ...seed("Rejected").slice(0,2)];
  return (
    <GenericListPage<Withdraw> title="All Withdrawals"
      rows={mix}
      columns={[...cols, { key: "status", header: "Status", render: (r) => (
        <StatusBadge status={r.status} tone={r.status === "Pending" ? "warning" : r.status === "Approved" ? "success" : "destructive"} />
      ) }]}
    />
  );
};
