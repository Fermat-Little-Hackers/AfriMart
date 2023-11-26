"use client"

import WalletBar from "@/components/WalletBar";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { useAccount } from "@starknet-react/core";
import Link from "next/link";
import { ConnectButton } from "../../connectkit";
import { SectionII } from "@/components/sections/SectionII";
import { SectionIII } from "@/components/sections/SectionIII";
import { GreatArt } from "@/components/sections/GreatArt";
import { ResourceShop } from "@/components/sections/ResourceShop";
import { GreatDesign } from "@/components/sections/GreatDesign";

export default function Home() {
  const { account, address, status } = useAccount();
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Header />
      <HeroSection />
      <SectionII />
      <div>
        <Link href="/app">
            Launch App { status + address + account }
        </Link>
      </div>
      <ConnectButton />
      <GreatDesign />
      <ResourceShop />
      <GreatArt />
      <SectionIII />
      <Footer />
    </main>
  );
}
