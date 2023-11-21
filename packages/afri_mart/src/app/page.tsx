import WalletBar from "@/components/WalletBar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-12">
      <div>
        <Link href="/app">
            Launch App
        </Link>
      </div>
    </main>
  );
}
