import GenericListPage, { StatusBadge } from "@/components/admin/GenericListPage";

type Trade = { id: string; pair: string; buyer: string; seller: string; amount: string; fiat: string; status: string; date: string };

const seed = (status: string): Trade[] =>
  Array.from({ length: 10 }, (_, i) => ({
    id: `TRD-${10000 + i}`,
    pair: ["BTC/USDT","ETH/USDT","USDT/USD","USDC/EUR","BNB/USDT","SOL/USDT","BTC/EUR","ETH/GBP","USDT/INR","BTC/NGN"][i],
    buyer: ["alice","bob","chen","diego","emma","farah","grace","hugo","ivy","jon"][i],
    seller: ["mike","nora","oscar","peter","quinn","ray","sara","tom","uma","vince"][i],
    amount: `${(0.05 + i * 0.02).toFixed(3)}`,
    fiat: `$${(120 + i * 70).toLocaleString()}`,
    status,
    date: `2025-04-${(10 + i).toString().padStart(2, "0")}`,
  }));

const cols = [
  { key: "id", header: "Trade ID" },
  { key: "pair", header: "Pair" },
  { key: "buyer", header: "Buyer" },
  { key: "seller", header: "Seller" },
  { key: "amount", header: "Crypto" },
  { key: "fiat", header: "Fiat" },
  { key: "date", header: "Date" },
];

export const RunningTrades = () => (
  <GenericListPage<Trade> title="Running Trades" description="Trades currently in progress"
    rows={seed("Running")}
    columns={[...cols, { key: "status", header: "Status", render: () => <StatusBadge status="Running" tone="warning" /> }]}
  />
);

export const ReportedTrades = () => (
  <GenericListPage<Trade> title="Reported Trades" description="Trades flagged for dispute or review"
    rows={seed("Reported")}
    columns={[...cols, { key: "status", header: "Status", render: () => <StatusBadge status="Reported" tone="destructive" /> }]}
  />
);

export const CompletedTrades = () => (
  <GenericListPage<Trade> title="Completed Trades" description="Successfully settled trades"
    rows={seed("Completed")}
    columns={[...cols, { key: "status", header: "Status", render: () => <StatusBadge status="Completed" tone="success" /> }]}
  />
);

export const AllTrades = () => {
  const mix: Trade[] = [
    ...seed("Running").slice(0, 3),
    ...seed("Reported").slice(0, 2),
    ...seed("Completed").slice(0, 5),
  ];
  return (
    <GenericListPage<Trade> title="All Trades" description="Combined view of every trade"
      rows={mix}
      columns={[...cols, { key: "status", header: "Status", render: (r) => (
        <StatusBadge status={r.status} tone={r.status === "Running" ? "warning" : r.status === "Reported" ? "destructive" : "success"} />
      ) }]}
    />
  );
};
