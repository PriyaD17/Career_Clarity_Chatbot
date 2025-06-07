import RadialPatternWithRadar from "@/components/ui/radar";
import InitialMessage from "@/components/ui/initial_msg";
import Link from "next/link";
import { ShinyButton } from "@/components/ui/shinybutton";
export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-black flex-col gap-4">
      <InitialMessage />
      <RadialPatternWithRadar />
      <Link href="/chat">
      <ShinyButton text="Get Started ✨ " />
      </Link>
    </div>
  );
}
