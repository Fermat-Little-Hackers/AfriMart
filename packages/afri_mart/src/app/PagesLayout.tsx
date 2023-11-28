import WalletBar from "@/components/WalletBar";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import Link from "next/link";

export default function PagesLayout({children}: any) {
  return (
    <main className="">
      <Header />
        <div>{children}</div>
      <Footer />
    </main>
  );
}
