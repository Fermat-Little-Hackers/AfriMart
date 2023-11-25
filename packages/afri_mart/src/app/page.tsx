"use client"

import WalletBar from "@/components/WalletBar";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { useAccount } from "@starknet-react/core";
import Link from "next/link";
import { ConnectButton } from "../../connectkit";

export default function Home() {
  const { account, address, status } = useAccount();
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-12">
      <Header />
      <HeroSection />
      <div>
        <Link href="/app">
            Launch App { status + address + account }
        </Link>
      </div>
      <ConnectButton />
      <Footer />
    </main>
  );
}
