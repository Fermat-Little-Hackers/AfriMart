import WalletBar from "@/components/WalletBar";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import Link from "next/link";
import ConnectButtoN from "../../connectkit";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-12">
      <Header />
      <HeroSection />
      <div>
        <Link href="/app">
            Launch App
        </Link>
        <ConnectButtoN />
      </div>
      <Footer />
    </main>
  );
}
