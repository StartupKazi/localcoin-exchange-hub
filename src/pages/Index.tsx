import Header from "@/components/Header";
import Footer from "@/components/Footer";
import P2PDashboard from "@/components/P2PDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <P2PDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
