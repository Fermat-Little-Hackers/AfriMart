"use client"

import WalletBar from "@/components/WalletBar";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { useAccount } from "@starknet-react/core";
import Link from "next/link";
// import { ConnectButton } from "../../connectkit";
import { SectionII } from "@/components/sections/SectionII";
import { SectionIII } from "@/components/sections/SectionIII";
import { GreatArt } from "@/components/sections/GreatArt";
import { ResourceShop } from "@/components/sections/ResourceShop";
import { GreatDesign } from "@/components/sections/GreatDesign";
import { Brands } from "@/components/sections/Brands";
import { LandingSections } from "@/components/sections/LandingSections";
import Billboard from "@/components/sections/Billboard";

export default function Home() {
  const { account, address, status } = useAccount();
  return (
    <main className="flex flex-col items-center justify-center min-h-screen  bg-[var(--black-2)] bg-grainy-pattern text-white">
      <HeroSection />
      <Billboard />
      <SectionII />
      <Brands />
      <LandingSections />
      <GreatDesign />
      <ResourceShop />
      <GreatArt />
      <SectionIII />
    </main>
  );
}
