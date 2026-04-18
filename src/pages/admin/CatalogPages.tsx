import GenericListPage, { StatusBadge } from "@/components/admin/GenericListPage";

type Crypto = { symbol: string; name: string; network: string; price: string; deposit: string; withdraw: string; status: string };
type Fiat = { code: string; name: string; symbol: string; rate: string; status: string };
type Window = { id: string; method: string; min: string; max: string; window: string; status: string };
type Deposit = { id: string; user: string; method: string; amount: string; currency: string; date: string; status: string };
type Subscriber = { id: string; email: string; subscribed: string; source: string; status: string };

export const Cryptos = () => {
  const rows: Crypto[] = [
    { symbol: "BTC", name: "Bitcoin", network: "BTC", price: "$67,824", deposit: "Enabled", withdraw: "Enabled", status: "Active" },
    { symbol: "ETH", name: "Ethereum", network: "ERC20", price: "$3,412", deposit: "Enabled", withdraw: "Enabled", status: "Active" },
    { symbol: "USDT", name: "Tether", network: "TRC20/ERC20", price: "$1.00", deposit: "Enabled", withdraw: "Enabled", status: "Active" },
    { symbol: "USDC", name: "USD Coin", network: "ERC20", price: "$1.00", deposit: "Enabled", withdraw: "Enabled", status: "Active" },
    { symbol: "BNB", name: "BNB", network: "BEP20", price: "$612", deposit: "Enabled", withdraw: "Disabled", status: "Active" },
    { symbol: "SOL", name: "Solana", network: "SOL", price: "$184", deposit: "Enabled", withdraw: "Enabled", status: "Active" },
    { symbol: "XRP", name: "Ripple", network: "XRPL", price: "$0.52", deposit: "Disabled", withdraw: "Disabled", status: "Inactive" },
  ];
  return (
    <GenericListPage<Crypto> title="Crypto Currencies" description="Manage supported cryptocurrencies"
      primaryAction={{ label: "Add Crypto" }}
      rows={rows}
      columns={[
        { key: "symbol", header: "Symbol" },
        { key: "name", header: "Name" },
        { key: "network", header: "Network" },
        { key: "price", header: "Price" },
        { key: "deposit", header: "Deposit", render: (r) => <StatusBadge status={r.deposit} tone={r.deposit === "Enabled" ? "success" : "muted"} /> },
        { key: "withdraw", header: "Withdraw", render: (r) => <StatusBadge status={r.withdraw} tone={r.withdraw === "Enabled" ? "success" : "muted"} /> },
        { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} tone={r.status === "Active" ? "success" : "destructive"} /> },
      ]} />
  );
};

export const FiatGateways = () => {
  const rows: Fiat[] = [
    { code: "USD", name: "US Dollar", symbol: "$", rate: "1.00", status: "Active" },
    { code: "EUR", name: "Euro", symbol: "€", rate: "1.08", status: "Active" },
    { code: "GBP", name: "British Pound", symbol: "£", rate: "1.27", status: "Active" },
    { code: "NGN", name: "Naira", symbol: "₦", rate: "0.00067", status: "Active" },
    { code: "KES", name: "Kenyan Shilling", symbol: "KSh", rate: "0.0078", status: "Active" },
    { code: "INR", name: "Indian Rupee", symbol: "₹", rate: "0.012", status: "Active" },
    { code: "BRL", name: "Brazilian Real", symbol: "R$", rate: "0.20", status: "Inactive" },
  ];
  return (
    <GenericListPage<Fiat> title="Fiat Gateways" description="Configure supported fiat currencies"
      primaryAction={{ label: "Add Fiat" }}
      rows={rows}
      columns={[
        { key: "code", header: "Code" },
        { key: "name", header: "Name" },
        { key: "symbol", header: "Symbol" },
        { key: "rate", header: "Rate vs USD" },
        { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} tone={r.status === "Active" ? "success" : "muted"} /> },
      ]} />
  );
};

export const PaymentWindows = () => {
  const rows: Window[] = [
    { id: "PW-1", method: "Bank Transfer", min: "$10", max: "$50,000", window: "30 min", status: "Active" },
    { id: "PW-2", method: "PayPal", min: "$5", max: "$10,000", window: "15 min", status: "Active" },
    { id: "PW-3", method: "Wise", min: "$10", max: "$25,000", window: "20 min", status: "Active" },
    { id: "PW-4", method: "M-Pesa", min: "$2", max: "$5,000", window: "10 min", status: "Active" },
    { id: "PW-5", method: "PIX", min: "$1", max: "$20,000", window: "10 min", status: "Active" },
    { id: "PW-6", method: "UPI", min: "$1", max: "$15,000", window: "10 min", status: "Active" },
    { id: "PW-7", method: "Cash", min: "$50", max: "$2,000", window: "60 min", status: "Inactive" },
  ];
  return (
    <GenericListPage<Window> title="Payment Windows" description="Configure timeouts and limits per payment method"
      primaryAction={{ label: "Add Method" }}
      rows={rows}
      columns={[
        { key: "id", header: "ID" },
        { key: "method", header: "Method" },
        { key: "min", header: "Min" },
        { key: "max", header: "Max" },
        { key: "window", header: "Window" },
        { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} tone={r.status === "Active" ? "success" : "muted"} /> },
      ]} />
  );
};

export const Deposits = () => {
  const rows: Deposit[] = Array.from({ length: 10 }, (_, i) => ({
    id: `DP-${70000 + i}`,
    user: ["alice","bob","chen","diego","emma","farah","grace","hugo","ivy","jon"][i],
    method: ["Bank Transfer","Wise","PayPal","SEPA","M-Pesa","UPI","PIX","Bank","Wire","SWIFT"][i],
    amount: `${(150 + i * 110).toLocaleString()}`,
    currency: ["USD","EUR","GBP","EUR","KES","INR","BRL","USD","USD","USD"][i],
    date: `2025-04-${(10 + i).toString().padStart(2, "0")}`,
    status: i % 5 === 0 ? "Pending" : "Success",
  }));
  return (
    <GenericListPage<Deposit> title="Deposits" description="All fiat & crypto deposits"
      rows={rows}
      columns={[
        { key: "id", header: "TXN ID" },
        { key: "user", header: "User" },
        { key: "method", header: "Method" },
        { key: "amount", header: "Amount" },
        { key: "currency", header: "Currency" },
        { key: "date", header: "Date" },
        { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} tone={r.status === "Success" ? "success" : "warning"} /> },
      ]} />
  );
};

export const Subscribers = () => {
  const rows: Subscriber[] = Array.from({ length: 10 }, (_, i) => ({
    id: `SUB-${80000 + i}`,
    email: ["alice","bob","chen","diego","emma","farah","grace","hugo","ivy","jon"][i] + "@mail.com",
    subscribed: `2025-0${(i % 9) + 1}-12`,
    source: ["Footer","Popup","Signup","Referral","Footer","Popup","Signup","Referral","Footer","Popup"][i],
    status: i % 7 === 0 ? "Unsubscribed" : "Subscribed",
  }));
  return (
    <GenericListPage<Subscriber> title="Subscribers" description="Newsletter subscriber list"
      rows={rows}
      columns={[
        { key: "id", header: "ID" },
        { key: "email", header: "Email" },
        { key: "subscribed", header: "Subscribed On" },
        { key: "source", header: "Source" },
        { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} tone={r.status === "Subscribed" ? "success" : "muted"} /> },
      ]} />
  );
};
