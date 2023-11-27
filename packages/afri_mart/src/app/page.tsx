import { HeroSection } from "@/components/sections/HeroSection";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-12">
      <HeroSection />
      <div>
        <Link href="/app">
            Launch App
        </Link>
      </div>
    </main>
  );
}
