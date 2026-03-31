import { useState } from "react";
import Header from "@/components/Header";
import TradeNav from "@/components/TradeNav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, AlertCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const MyAds = () => {
  const [activeTab, setActiveTab] = useState<"listed" | "all">("listed");
  const [activeMode, setActiveMode] = useState(true);
  const [showPostAdModal, setShowPostAdModal] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");

  const handlePostAds = () => {
    // First show the "unable to post" modal
    setShowPostAdModal(true);
  };

  const handleUnlockTrial = () => {
    setShowPostAdModal(false);
    setShowNicknameModal(true);
  };

  const handleApplyNow = () => {
    setShowPostAdModal(false);
    setShowNicknameModal(true);
  };

  const handleConfirmNickname = () => {
    if (nickname.trim() && nickname.length <= 15) {
      setShowNicknameModal(false);
      setNickname("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <TradeNav />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Title + Post Ads */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">My Ads</h1>
          <Button
            variant="outline"
            className="border-foreground text-foreground font-semibold rounded-lg px-5"
            onClick={handlePostAds}
          >
            + Post Ads
          </Button>
        </div>

        {/* Card */}
        <div className="bg-card rounded-xl border border-border p-6">
          {/* Tabs + Active Mode */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveTab("listed")}
                className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                  activeTab === "listed"
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                Listed
              </button>
              <button
                onClick={() => setActiveTab("all")}
                className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                  activeTab === "all"
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                All Ads
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-foreground font-medium">Active Mode</span>
              <Switch
                checked={activeMode}
                onCheckedChange={setActiveMode}
              />
              <span className="text-sm text-primary font-medium cursor-pointer hover:underline">
                Automatic Inactive Mode
              </span>
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 py-3 border-b border-border text-sm text-muted-foreground">
            <span>Type</span>
            <span>ID</span>
            <span>Total Quantity / Limits</span>
            <span>Price</span>
            <span>Fee</span>
            <span>Payment Method</span>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 mb-4 flex items-center justify-center">
              <svg viewBox="0 0 80 80" className="w-20 h-20 text-muted-foreground/30">
                <rect x="15" y="10" width="50" height="60" rx="4" fill="currentColor" opacity="0.3" />
                <rect x="20" y="18" width="30" height="3" rx="1.5" fill="currentColor" opacity="0.5" />
                <rect x="20" y="26" width="35" height="3" rx="1.5" fill="currentColor" opacity="0.5" />
                <rect x="20" y="34" width="25" height="3" rx="1.5" fill="currentColor" opacity="0.5" />
                <path d="M45 45 L65 65" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                <circle cx="40" cy="50" r="12" stroke="hsl(var(--primary))" strokeWidth="2.5" fill="none" opacity="0.6" />
              </svg>
            </div>
            <p className="text-muted-foreground text-sm">
              Oops, you don't have any active ad.
            </p>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end gap-1 pt-4">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-border text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-primary bg-primary/10 text-primary font-medium text-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-border text-muted-foreground hover:text-foreground transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      <Footer />

      {/* Unable to Post Ads Modal */}
      <Dialog open={showPostAdModal} onOpenChange={setShowPostAdModal}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center pt-4">
            <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2">
              Unable to post ads. Please apply to become an advertiser.
            </h2>
            <div className="flex gap-3 w-full mt-6">
              <Button
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg h-11 font-semibold"
                onClick={handleUnlockTrial}
              >
                Unlock Trial
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-border text-foreground hover:bg-muted rounded-lg h-11 font-semibold"
                onClick={handleApplyNow}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Set Nickname Modal */}
      <Dialog open={showNicknameModal} onOpenChange={setShowNicknameModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-foreground">
              Set Nickname
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex gap-2">
              <AlertCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-foreground">
                Please note that your nickname can only be set once and can not be modified after confirmation.
              </p>
            </div>

            <p className="text-sm text-foreground">
              Please set a nickname first before posting your ad. Your nickname will be displayed on the advertisement list.
            </p>

            <Input
              placeholder="Your nickname cannot have more than 15 characters."
              value={nickname}
              onChange={(e) => {
                if (e.target.value.length <= 15) {
                  setNickname(e.target.value);
                }
              }}
              className="h-11"
            />

            <div className="flex gap-3">
              <Button
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg h-11 font-semibold"
                onClick={handleConfirmNickname}
                disabled={!nickname.trim()}
              >
                Confirm
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-border text-foreground hover:bg-muted rounded-lg h-11 font-semibold"
                onClick={() => {
                  setShowNicknameModal(false);
                  setNickname("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyAds;
