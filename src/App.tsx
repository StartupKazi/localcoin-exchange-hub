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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
