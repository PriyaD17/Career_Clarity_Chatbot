"use client";

import RadialPatternWithRadar from "@/components/ui/radar";
import Link from "next/link";
import { ShinyButton } from "@/components/ui/shinybutton";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, 
    },
  },
};


const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

export default function Home() {
  return (
    // Use <main> for semantic HTML and better accessibility
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black p-4">
      
      {/* A container to manage layout and animations */}
      <motion.div
        className="z-10 flex flex-col items-center text-center max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Heading */}
        <motion.h1
          className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-orange-300 to-orange-500"
          variants={itemVariants}
        >
          Navigate Your Future with C3
        </motion.h1>

        {/* Sub-heading */}
        <motion.p
          className="mb-8 text-lg text-gray-300 md:text-xl max-w-2xl"
          variants={itemVariants}
        >
          Confused about your career after 10th or 12th? The Career Clarity
          Chatbot provides personalized guidance to help you discover the perfect
          path, courses, and exams in India.
        </motion.p>
        
        {/* Call to Action Button */}
        <motion.div variants={itemVariants}>
          <Link href="/chat">
            <ShinyButton text="Get Started ✨" />
          </Link>
        </motion.div>
      </motion.div>

      {/* The radar animation now sits visually behind the text */}
      <RadialPatternWithRadar />

    </main>
  );
}