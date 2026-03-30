import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TradeNav from "@/components/TradeNav";
import P2PDashboard from "@/components/P2PDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <TradeNav />
        <div className="pt-4 pb-16">
          <P2PDashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
