"use client";

import React, { useState } from "react";
import Landing from "@/components/Landing";
import Chat from "@/components/chat";
import { AnimatePresence } from "framer-motion";

type View = "landing" | "chat";

export default function Home() {
  const [view, setView] = useState<View>("landing");

  return (
    <main className="min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {view === "landing" ? (
          <Landing key="landing" onStart={() => setView("chat")} />
        ) : (
          <Chat key="chat" onBack={() => setView("landing")} />
        )}
      </AnimatePresence>
    </main>
  );
}