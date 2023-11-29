import WalletBar from "@/components/WalletBar";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import Link from "next/link";

export default function PagesLayout({children}: any) {
  return (
    <main className="bg-grainy-pattern bg-[var(--sand)]">
      <Header />
        <div className="p-0 m-0 ">{children}</div>
      <Footer />
    </main>
  );
}
