import { useState } from "react";
import { Search, ChevronDown, CheckCircle, XCircle, Clock, AlertTriangle, ArrowUpDown, Eye } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TradeNav from "@/components/TradeNav";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type OrderStatus = "completed" | "pending" | "cancelled" | "failed";
type OrderType = "buy" | "sell" | "convert" | "deposit" | "withdraw";

interface Order {
  id: string;
  type: OrderType;
  asset: string;
  amount: string;
  fiatAmount: string;
  fiat: string;
  status: OrderStatus;
  date: string;
  method: string;
  counterparty?: string;
}

const mockOrders: Order[] = [
  { id: "ORD-2840192837", type: "buy", asset: "BTC", amount: "0.00578", fiatAmount: "500", fiat: "USDT", status: "completed", date: "2026-03-30 14:23", method: "P2P", counterparty: "CryptoKing" },
  { id: "ORD-2840192838", type: "sell", asset: "ETH", amount: "0.5", fiatAmount: "1,225", fiat: "USDT", status: "completed", date: "2026-03-30 12:10", method: "One-Click", counterparty: "FastTrader" },
  { id: "ORD-2840192839", type: "buy", asset: "USDT", amount: "1,000", fiatAmount: "129,000", fiat: "KES", status: "pending", date: "2026-03-30 10:45", method: "P2P", counterparty: "KenyaCrypto" },
  { id: "ORD-2840192840", type: "convert", asset: "USDT → BTC", amount: "500 USDT → 0.00578 BTC", fiatAmount: "", fiat: "", status: "completed", date: "2026-03-29 18:30", method: "Convert" },
  { id: "ORD-2840192841", type: "deposit", asset: "KES", amount: "50,000", fiatAmount: "50,000", fiat: "KES", status: "completed", date: "2026-03-29 15:20", method: "Bank Transfer" },
  { id: "ORD-2840192842", type: "withdraw", asset: "USDT", amount: "200", fiatAmount: "", fiat: "", status: "failed", date: "2026-03-29 11:05", method: "TRC20" },
  { id: "ORD-2840192843", type: "sell", asset: "BNB", amount: "2.0", fiatAmount: "1,210", fiat: "USDT", status: "cancelled", date: "2026-03-28 22:00", method: "P2P", counterparty: "TradeMax" },
  { id: "ORD-2840192844", type: "buy", asset: "SOL", amount: "10", fiatAmount: "1,380", fiat: "USDT", status: "completed", date: "2026-03-28 09:15", method: "One-Click" },
  { id: "ORD-2840192845", type: "deposit", asset: "USD", amount: "1,000", fiatAmount: "1,000", fiat: "USD", status: "pending", date: "2026-03-27 16:40", method: "Wire Transfer" },
  { id: "ORD-2840192846", type: "withdraw", asset: "ETH", amount: "0.25", fiatAmount: "", fiat: "", status: "completed", date: "2026-03-27 08:30", method: "ERC20" },
];

const statusConfig: Record<OrderStatus, { color: string; icon: React.ReactNode; label: string }> = {
  completed: { color: "bg-success/10 text-success", icon: <CheckCircle className="h-3.5 w-3.5" />, label: "Completed" },
  pending: { color: "bg-primary/10 text-primary", icon: <Clock className="h-3.5 w-3.5" />, label: "Pending" },
  cancelled: { color: "bg-muted text-muted-foreground", icon: <XCircle className="h-3.5 w-3.5" />, label: "Cancelled" },
  failed: { color: "bg-destructive/10 text-destructive", icon: <AlertTriangle className="h-3.5 w-3.5" />, label: "Failed" },
};

const typeLabels: Record<OrderType, { label: string; color: string }> = {
  buy: { label: "Buy", color: "text-success" },
  sell: { label: "Sell", color: "text-destructive" },
  convert: { label: "Convert", color: "text-primary" },
  deposit: { label: "Deposit", color: "text-foreground" },
  withdraw: { label: "Withdraw", color: "text-foreground" },
};

const tabs: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Buy", value: "buy" },
  { label: "Sell", value: "sell" },
  { label: "Convert", value: "convert" },
  { label: "Deposit", value: "deposit" },
  { label: "Withdraw", value: "withdraw" },
];

const statusFilters: { label: string; value: string }[] = [
  { label: "All Status", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Failed", value: "failed" },
];

const Orders = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = mockOrders.filter((o) => {
    if (activeTab !== "all" && o.type !== activeTab) return false;
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    if (searchQuery && !o.id.toLowerCase().includes(searchQuery.toLowerCase()) && !o.asset.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: mockOrders.length,
    completed: mockOrders.filter((o) => o.status === "completed").length,
    pending: mockOrders.filter((o) => o.status === "pending").length,
    failed: mockOrders.filter((o) => o.status === "failed").length,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <TradeNav />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-foreground mb-6">Orders</h1>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card rounded-xl border border-border/30 p-4">
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stats.total}</p>
            </div>
            <div className="bg-card rounded-xl border border-border/30 p-4">
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-success mt-1">{stats.completed}</p>
            </div>
            <div className="bg-card rounded-xl border border-border/30 p-4">
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-primary mt-1">{stats.pending}</p>
            </div>
            <div className="bg-card rounded-xl border border-border/30 p-4">
              <p className="text-sm text-muted-foreground">Failed</p>
              <p className="text-2xl font-bold text-destructive mt-1">{stats.failed}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-xl border border-border/30 p-4 mb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted/30"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search order ID or asset"
                    className="bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground/50 w-48"
                  />
                </div>
                <div className="relative">
                  <button onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 text-sm text-foreground">
                    {statusFilters.find((s) => s.value === statusFilter)?.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  {showStatusDropdown && (
                    <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-10 min-w-[140px]">
                      {statusFilters.map((sf) => (
                        <button key={sf.value} onClick={() => { setStatusFilter(sf.value); setShowStatusDropdown(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-muted/10 ${sf.value === statusFilter ? "bg-primary/10 text-primary" : "text-foreground"}`}>
                          {sf.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-card rounded-xl border border-border/30 overflow-hidden">
            <div className="hidden md:grid grid-cols-7 gap-4 px-6 py-3 border-b border-border text-sm text-muted-foreground font-medium">
              <span>Type</span>
              <span>Asset</span>
              <span>Amount</span>
              <span>Method</span>
              <span>Date</span>
              <span>Status</span>
              <span>Action</span>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-muted-foreground/30" />
                </div>
                <p className="text-muted-foreground text-sm">No orders found</p>
              </div>
            ) : (
              filtered.map((order) => {
                const st = statusConfig[order.status];
                const tp = typeLabels[order.type];
                return (
                  <div key={order.id} className="grid grid-cols-1 md:grid-cols-7 gap-2 md:gap-4 px-6 py-4 border-b border-border/20 hover:bg-muted/5 transition-colors items-center">
                    <div>
                      <span className={`text-sm font-semibold ${tp.color}`}>{tp.label}</span>
                      <p className="text-xs text-muted-foreground md:hidden mt-0.5">{order.date}</p>
                    </div>
                    <span className="text-sm font-medium text-foreground">{order.asset}</span>
                    <div>
                      <p className="text-sm text-foreground">{order.amount}</p>
                      {order.fiatAmount && <p className="text-xs text-muted-foreground">{order.fiatAmount} {order.fiat}</p>}
                    </div>
                    <span className="text-sm text-muted-foreground">{order.method}</span>
                    <span className="text-sm text-muted-foreground hidden md:block">{order.date}</span>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${st.color}`}>
                      {st.icon} {st.label}
                    </span>
                    <button onClick={() => setSelectedOrder(order)} className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <Eye className="h-3.5 w-3.5" /> Details
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
      <Footer />

      {/* Order Detail Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedOrder && (
            <div className="space-y-5 pt-2">
              <h2 className="text-xl font-bold text-foreground text-center">Order Details</h2>
              <div className="flex justify-center">
                <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-full ${statusConfig[selectedOrder.status].color}`}>
                  {statusConfig[selectedOrder.status].icon} {statusConfig[selectedOrder.status].label}
                </span>
              </div>
              <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-mono text-foreground">{selectedOrder.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type</span>
                  <span className={`font-semibold ${typeLabels[selectedOrder.type].color}`}>{typeLabels[selectedOrder.type].label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Asset</span>
                  <span className="text-foreground">{selectedOrder.asset}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-semibold text-foreground">{selectedOrder.amount}</span>
                </div>
                {selectedOrder.fiatAmount && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fiat Value</span>
                    <span className="text-foreground">{selectedOrder.fiatAmount} {selectedOrder.fiat}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Method</span>
                  <span className="text-foreground">{selectedOrder.method}</span>
                </div>
                {selectedOrder.counterparty && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Counterparty</span>
                    <span className="text-foreground">{selectedOrder.counterparty}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span className="text-foreground">{selectedOrder.date}</span>
                </div>
              </div>
              <Button onClick={() => setSelectedOrder(null)} className="w-full h-11 font-semibold">Close</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
