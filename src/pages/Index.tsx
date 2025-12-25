import FloatingOrbs from "@/components/FloatingOrbs";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QRGenerator from "@/components/QRGenerator";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen gradient-mesh overflow-hidden">
      <FloatingOrbs />
      <Header />
      <main>
        <Hero />
        <div id="generator">
          <QRGenerator />
        </div>
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
