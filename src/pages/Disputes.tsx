import { useState } from "react";
import { Shield, Clock, MessageSquare, CheckCircle, XCircle, AlertTriangle, ChevronRight, ArrowLeft, Send, Paperclip } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TradeNav from "@/components/TradeNav";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type DisputeStatus = "filed" | "in_review" | "responded" | "resolved_buyer" | "resolved_seller" | "escalated";

interface Dispute {
  id: string;
  orderId: string;
  type: "buy" | "sell";
  asset: string;
  amount: string;
  fiatAmount: string;
  fiat: string;
  counterparty: string;
  status: DisputeStatus;
  reason: string;
  filedDate: string;
  lastUpdate: string;
  timeline: TimelineEntry[];
}

interface TimelineEntry {
  date: string;
  title: string;
  description: string;
  by: "system" | "you" | "counterparty" | "admin";
  type: "filed" | "response" | "evidence" | "decision" | "escalation";
}

const mockDisputes: Dispute[] = [
  {
    id: "DSP-001",
    orderId: "ORD-2840192839",
    type: "buy",
    asset: "USDT",
    amount: "1,000",
    fiatAmount: "129,000",
    fiat: "KES",
    counterparty: "KenyaCrypto",
    status: "in_review",
    reason: "Payment sent but coins not released",
    filedDate: "2026-03-30 11:00",
    lastUpdate: "2026-03-31 09:15",
    timeline: [
      { date: "2026-03-30 11:00", title: "Dispute Filed", description: "You filed a dispute: Payment sent but coins not released after 45 minutes.", by: "you", type: "filed" },
      { date: "2026-03-30 11:05", title: "Escrow Locked", description: "Funds have been locked in escrow pending investigation.", by: "system", type: "filed" },
      { date: "2026-03-30 14:20", title: "Evidence Submitted", description: "You uploaded M-Pesa payment confirmation screenshot.", by: "you", type: "evidence" },
      { date: "2026-03-31 09:15", title: "Seller Response", description: "I did not receive the payment. Please check the phone number used.", by: "counterparty", type: "response" },
    ],
  },
  {
    id: "DSP-002",
    orderId: "ORD-2840192843",
    type: "sell",
    asset: "BNB",
    amount: "2.0",
    fiatAmount: "1,210",
    fiat: "USDT",
    counterparty: "TradeMax",
    status: "resolved_buyer",
    reason: "Buyer claims underpayment",
    filedDate: "2026-03-28 22:30",
    lastUpdate: "2026-03-29 18:00",
    timeline: [
      { date: "2026-03-28 22:30", title: "Dispute Filed", description: "Buyer filed a dispute claiming underpayment for 2.0 BNB.", by: "counterparty", type: "filed" },
      { date: "2026-03-28 22:35", title: "Escrow Locked", description: "Funds locked in escrow.", by: "system", type: "filed" },
      { date: "2026-03-29 10:00", title: "Your Response", description: "Payment was sent in full. Attached transaction receipt.", by: "you", type: "response" },
      { date: "2026-03-29 14:00", title: "Admin Review", description: "An admin is reviewing the submitted evidence from both parties.", by: "admin", type: "escalation" },
      { date: "2026-03-29 18:00", title: "Resolved — Buyer Wins", description: "After review, evidence shows partial payment. Funds released to buyer.", by: "admin", type: "decision" },
    ],
  },
  {
    id: "DSP-003",
    orderId: "ORD-2840192850",
    type: "buy",
    asset: "ETH",
    amount: "0.3",
    fiatAmount: "735",
    fiat: "USDT",
    counterparty: "EthKing",
    status: "resolved_seller",
    reason: "Seller claims payment not received",
    filedDate: "2026-03-25 08:00",
    lastUpdate: "2026-03-26 16:30",
    timeline: [
      { date: "2026-03-25 08:00", title: "Dispute Filed", description: "Seller filed dispute: no payment received.", by: "counterparty", type: "filed" },
      { date: "2026-03-25 12:00", title: "Your Response", description: "Payment was made via bank transfer. Attached proof.", by: "you", type: "response" },
      { date: "2026-03-26 10:00", title: "Evidence Review", description: "Admin reviewing bank statements from both parties.", by: "admin", type: "escalation" },
      { date: "2026-03-26 16:30", title: "Resolved — Seller Wins", description: "Bank confirms payment was not completed. Coins returned to seller.", by: "admin", type: "decision" },
    ],
  },
];

const statusConfig: Record<DisputeStatus, { color: string; icon: React.ReactNode; label: string }> = {
  filed: { color: "bg-primary/10 text-primary", icon: <AlertTriangle className="h-3.5 w-3.5" />, label: "Filed" },
  in_review: { color: "bg-primary/10 text-primary", icon: <Clock className="h-3.5 w-3.5" />, label: "In Review" },
  responded: { color: "bg-accent/10 text-accent-foreground", icon: <MessageSquare className="h-3.5 w-3.5" />, label: "Responded" },
  resolved_buyer: { color: "bg-success/10 text-success", icon: <CheckCircle className="h-3.5 w-3.5" />, label: "Resolved (Buyer)" },
  resolved_seller: { color: "bg-success/10 text-success", icon: <CheckCircle className="h-3.5 w-3.5" />, label: "Resolved (Seller)" },
  escalated: { color: "bg-destructive/10 text-destructive", icon: <AlertTriangle className="h-3.5 w-3.5" />, label: "Escalated" },
};

const timelineByColor: Record<string, string> = {
  you: "border-primary bg-primary/10",
  counterparty: "border-destructive bg-destructive/10",
  admin: "border-accent bg-accent/10",
  system: "border-muted-foreground bg-muted/30",
};

const Disputes = () => {
  const [activeTab, setActiveTab] = useState<"active" | "resolved">("active");
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [replyText, setReplyText] = useState("");

  const activeDisputes = mockDisputes.filter((d) => d.status === "filed" || d.status === "in_review" || d.status === "responded" || d.status === "escalated");
  const resolvedDisputes = mockDisputes.filter((d) => d.status === "resolved_buyer" || d.status === "resolved_seller");
  const displayedDisputes = activeTab === "active" ? activeDisputes : resolvedDisputes;

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    setReplyText("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-1 pt-16">
        <TradeNav />
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Dispute Center</h1>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-card rounded-xl border border-border/30 p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{mockDisputes.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Total</p>
            </div>
            <div className="bg-card rounded-xl border border-border/30 p-4 text-center">
              <p className="text-2xl font-bold text-primary">{activeDisputes.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Active</p>
            </div>
            <div className="bg-card rounded-xl border border-border/30 p-4 text-center">
              <p className="text-2xl font-bold text-success">{resolvedDisputes.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Resolved</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            {(["active", "resolved"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  activeTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted/30"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dispute List */}
          <div className="space-y-3">
            {displayedDisputes.length === 0 ? (
              <div className="bg-card rounded-xl border border-border/30 p-12 text-center">
                <Shield className="h-12 w-12 text-muted-foreground/20 mx-auto mb-3" />
                <p className="text-muted-foreground">No {activeTab} disputes</p>
              </div>
            ) : (
              displayedDisputes.map((dispute) => {
                const st = statusConfig[dispute.status];
                return (
                  <button
                    key={dispute.id}
                    onClick={() => setSelectedDispute(dispute)}
                    className="w-full bg-card rounded-xl border border-border/30 p-4 text-left hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-foreground">{dispute.id}</span>
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${st.color}`}>
                            {st.icon} {st.label}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{dispute.reason}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span>{dispute.type === "buy" ? "Buy" : "Sell"} {dispute.amount} {dispute.asset}</span>
                          <span>vs {dispute.counterparty}</span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/20 text-xs text-muted-foreground">
                      <span>Filed: {dispute.filedDate}</span>
                      <span>Updated: {dispute.lastUpdate}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />

      {/* Dispute Detail Modal */}
      <Dialog open={!!selectedDispute} onOpenChange={() => setSelectedDispute(null)}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          {selectedDispute && (() => {
            const st = statusConfig[selectedDispute.status];
            const isResolved = selectedDispute.status.startsWith("resolved");
            return (
              <div className="space-y-5 pt-2">
                {/* Header */}
                <div className="text-center">
                  <h2 className="text-lg font-bold text-foreground">{selectedDispute.id}</h2>
                  <p className="text-sm text-muted-foreground mt-1">Order: {selectedDispute.orderId}</p>
                  <div className="flex justify-center mt-2">
                    <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-full ${st.color}`}>
                      {st.icon} {st.label}
                    </span>
                  </div>
                </div>

                {/* Trade Info */}
                <div className="bg-muted/30 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type</span>
                    <span className={`font-semibold ${selectedDispute.type === "buy" ? "text-success" : "text-destructive"}`}>
                      {selectedDispute.type === "buy" ? "Buy" : "Sell"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-semibold text-foreground">{selectedDispute.amount} {selectedDispute.asset}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Value</span>
                    <span className="text-foreground">{selectedDispute.fiatAmount} {selectedDispute.fiat}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Counterparty</span>
                    <span className="text-foreground">{selectedDispute.counterparty}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Reason</span>
                    <span className="text-foreground text-right max-w-[60%]">{selectedDispute.reason}</span>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Timeline</h3>
                  <div className="relative space-y-0">
                    {selectedDispute.timeline.map((entry, idx) => {
                      const isLast = idx === selectedDispute.timeline.length - 1;
                      const borderColor = timelineByColor[entry.by] || timelineByColor.system;
                      return (
                        <div key={idx} className="flex gap-3">
                          {/* Line */}
                          <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${borderColor}`} />
                            {!isLast && <div className="w-px flex-1 bg-border/40 min-h-[24px]" />}
                          </div>
                          {/* Content */}
                          <div className="pb-4 flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-semibold text-foreground">{entry.title}</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground capitalize">{entry.by}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-0.5">{entry.description}</p>
                            <p className="text-xs text-muted-foreground/60 mt-1">{entry.date}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Decision Banner for resolved */}
                {isResolved && (
                  <div className={`rounded-xl p-4 border ${selectedDispute.status === "resolved_buyer" ? "bg-success/5 border-success/20" : "bg-success/5 border-success/20"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span className="text-sm font-bold text-foreground">Final Decision</span>
                    </div>
                    <p className="text-sm text-muted-foreground ml-7">
                      {selectedDispute.timeline[selectedDispute.timeline.length - 1]?.description}
                    </p>
                  </div>
                )}

                {/* Reply Box for active disputes */}
                {!isResolved && (
                  <div className="border border-border/30 rounded-xl p-3">
                    <p className="text-xs text-muted-foreground mb-2">Submit a response or evidence</p>
                    <div className="flex gap-2">
                      <div className="flex-1 flex items-center gap-2 bg-muted/20 rounded-lg px-3 py-2">
                        <input
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your response..."
                          className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground/50"
                          onKeyDown={(e) => e.key === "Enter" && handleSendReply()}
                        />
                        <button className="text-muted-foreground hover:text-foreground">
                          <Paperclip className="h-4 w-4" />
                        </button>
                      </div>
                      <Button size="sm" onClick={handleSendReply} className="h-10 px-4">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                <Button variant="outline" onClick={() => setSelectedDispute(null)} className="w-full h-11 font-semibold">
                  Close
                </Button>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Disputes;
