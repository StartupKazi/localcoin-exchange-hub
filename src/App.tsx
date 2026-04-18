import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/Home.tsx";
import Index from "./pages/Index.tsx";
import OneClickBuy from "./pages/OneClickBuy.tsx";
import Deposit from "./pages/Deposit.tsx";
import Withdraw from "./pages/Withdraw.tsx";
import Convert from "./pages/Convert.tsx";
import MyAds from "./pages/MyAds.tsx";
import Orders from "./pages/Orders.tsx";
import Disputes from "./pages/Disputes.tsx";
import Transactions from "./pages/Transactions.tsx";
import Contact from "./pages/Contact.tsx";
import Referral from "./pages/Referral.tsx";
import Support from "./pages/Support.tsx";
import NotFound from "./pages/NotFound.tsx";
import Profile from "./pages/Profile.tsx";
import Kyc from "./pages/Kyc.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { ActiveUsers, EmailUnverified, MobileUnverified, BannedUsers, KycUnverified, KycPending, AllUsers } from "./pages/admin/users/UserPages";
import NotificationToAll from "./pages/admin/users/NotificationToAll";
import { AllAdverts, AdLimit } from "./pages/admin/ads/AdsPages";
import { RunningTrades, ReportedTrades, CompletedTrades, AllTrades } from "./pages/admin/trades/TradePages";
import { PendingWithdrawals, ApprovedWithdrawals, RejectedWithdrawals, AllWithdrawals } from "./pages/admin/withdrawals/WithdrawalPages";
import { PendingTickets, AnsweredTickets, ClosedTickets, AllTickets } from "./pages/admin/tickets/TicketPages";
import { TransactionLog, LoginHistory, NotificationHistory } from "./pages/admin/reports/ReportPages";
import { Cryptos, FiatGateways, PaymentWindows, Deposits as AdminDeposits, Subscribers } from "./pages/admin/CatalogPages";
import { GeneralSetting, SystemConfiguration, ReferralSetting, NotificationSetting } from "./pages/admin/SettingsPages";
import UserLogin from "./pages/auth/UserLogin";
import UserRegister from "./pages/auth/UserRegister";
import UserForgotPassword from "./pages/auth/UserForgotPassword";
import AdminLogin from "./pages/auth/AdminLogin";
import AdminRegister from "./pages/auth/AdminRegister";
import AdminForgotPassword from "./pages/auth/AdminForgotPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/p2p" element={<Index />} />
          <Route path="/one-click-buy" element={<OneClickBuy />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/convert" element={<Convert />} />
          <Route path="/my-ads" element={<MyAds />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/disputes" element={<Disputes />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/support" element={<Support />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/kyc" element={<Kyc />} />

          {/* Auth */}
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/forgot-password" element={<UserForgotPassword />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users/active" element={<ActiveUsers />} />
          <Route path="/admin/users/email-unverified" element={<EmailUnverified />} />
          <Route path="/admin/users/mobile-unverified" element={<MobileUnverified />} />
          <Route path="/admin/users/banned" element={<BannedUsers />} />
          <Route path="/admin/users/kyc-unverified" element={<KycUnverified />} />
          <Route path="/admin/users/kyc-pending" element={<KycPending />} />
          <Route path="/admin/users/all" element={<AllUsers />} />
          <Route path="/admin/users/notification" element={<NotificationToAll />} />
          <Route path="/admin/ads/limit" element={<AdLimit />} />
          <Route path="/admin/ads/all" element={<AllAdverts />} />
          <Route path="/admin/trades/running" element={<RunningTrades />} />
          <Route path="/admin/trades/reported" element={<ReportedTrades />} />
          <Route path="/admin/trades/completed" element={<CompletedTrades />} />
          <Route path="/admin/trades/all" element={<AllTrades />} />
          <Route path="/admin/crypto" element={<Cryptos />} />
          <Route path="/admin/fiat" element={<FiatGateways />} />
          <Route path="/admin/payment-windows" element={<PaymentWindows />} />
          <Route path="/admin/deposits" element={<AdminDeposits />} />
          <Route path="/admin/withdrawals/pending" element={<PendingWithdrawals />} />
          <Route path="/admin/withdrawals/approved" element={<ApprovedWithdrawals />} />
          <Route path="/admin/withdrawals/rejected" element={<RejectedWithdrawals />} />
          <Route path="/admin/withdrawals/all" element={<AllWithdrawals />} />
          <Route path="/admin/tickets/pending" element={<PendingTickets />} />
          <Route path="/admin/tickets/closed" element={<ClosedTickets />} />
          <Route path="/admin/tickets/answered" element={<AnsweredTickets />} />
          <Route path="/admin/tickets/all" element={<AllTickets />} />
          <Route path="/admin/reports/transactions" element={<TransactionLog />} />
          <Route path="/admin/reports/logins" element={<LoginHistory />} />
          <Route path="/admin/reports/notifications" element={<NotificationHistory />} />
          <Route path="/admin/subscribers" element={<Subscribers />} />
          <Route path="/admin/settings/general" element={<GeneralSetting />} />
          <Route path="/admin/settings/system" element={<SystemConfiguration />} />
          <Route path="/admin/settings/referral" element={<ReferralSetting />} />
          <Route path="/admin/settings/notification" element={<NotificationSetting />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
