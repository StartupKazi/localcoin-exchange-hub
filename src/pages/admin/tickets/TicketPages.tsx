import GenericListPage, { StatusBadge } from "@/components/admin/GenericListPage";

type Ticket = { id: string; user: string; subject: string; category: string; priority: string; updated: string; status: string };

const seed = (status: string): Ticket[] =>
  Array.from({ length: 10 }, (_, i) => ({
    id: `TKT-${30000 + i}`,
    user: ["alice","bob","chen","diego","emma","farah","grace","hugo","ivy","jon"][i],
    subject: ["Cannot withdraw","KYC stuck","Trade dispute","Login issue","Wrong amount","Missing deposit","2FA reset","Refund request","Account locked","Slow support"][i],
    category: ["Withdrawal","KYC","Trade","Login","Trade","Deposit","Security","Refund","Account","General"][i],
    priority: ["High","Medium","High","Low","Medium","High","Medium","High","High","Low"][i],
    updated: `2025-04-${(10 + i).toString().padStart(2, "0")}`,
    status,
  }));

const cols = [
  { key: "id", header: "Ticket ID" },
  { key: "user", header: "User" },
  { key: "subject", header: "Subject" },
  { key: "category", header: "Category" },
  { key: "priority", header: "Priority", render: (r: Ticket) => (
    <StatusBadge status={r.priority} tone={r.priority === "High" ? "destructive" : r.priority === "Medium" ? "warning" : "muted"} />
  )},
  { key: "updated", header: "Updated" },
];

export const PendingTickets = () => (
  <GenericListPage<Ticket> title="Pending Tickets" rows={seed("Pending")}
    columns={[...cols, { key: "status", header: "Status", render: () => <StatusBadge status="Pending" tone="warning" /> }]} />
);
export const AnsweredTickets = () => (
  <GenericListPage<Ticket> title="Answered Tickets" rows={seed("Answered")}
    columns={[...cols, { key: "status", header: "Status", render: () => <StatusBadge status="Answered" tone="info" /> }]} />
);
export const ClosedTickets = () => (
  <GenericListPage<Ticket> title="Closed Tickets" rows={seed("Closed")}
    columns={[...cols, { key: "status", header: "Status", render: () => <StatusBadge status="Closed" tone="muted" /> }]} />
);
export const AllTickets = () => {
  const mix = [...seed("Pending").slice(0,3), ...seed("Answered").slice(0,4), ...seed("Closed").slice(0,3)];
  return (
    <GenericListPage<Ticket> title="All Tickets" rows={mix}
      columns={[...cols, { key: "status", header: "Status", render: (r) => (
        <StatusBadge status={r.status} tone={r.status === "Pending" ? "warning" : r.status === "Answered" ? "info" : "muted"} />
      )}]} />
  );
};
