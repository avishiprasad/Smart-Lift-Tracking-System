import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] pt-24">
      <div className="relative w-full flex items-center justify-center ">
          <Navbar />
      </div>
      <HeroSection />
    </main>
  );
}
