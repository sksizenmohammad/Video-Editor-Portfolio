"use client";

import { motion } from "framer-motion";
import { Play, ArrowDown, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void/50 to-void" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-elevated/80 px-4 py-2 text-sm text-gray-400 backdrop-blur-sm"
        >
          <Sparkles className="h-4 w-4 text-gold" />
          <span>Professional Video Editor & Colorist</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl font-black leading-[1.1] tracking-tight sm:text-7xl lg:text-8xl"
        >
          <span className="block text-white">Crafting</span>
          <span className="text-gradient">Visual Stories</span>
          <span className="block text-white">That Move People</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl"
        >
          Documentary narratives, gaming montages, wedding films, teasers & more —
          edited with cinematic precision and bold creative vision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="#work"
            className="btn-shimmer group flex items-center gap-2 rounded-full px-8 py-4 font-semibold text-white shadow-lg shadow-accent/30 transition-transform hover:scale-105"
          >
            <Play className="h-5 w-5 fill-white" />
            View My Work
          </Link>
          <Link
            href="#contact"
            className="flex items-center gap-2 rounded-full border-2 border-border px-8 py-4 font-semibold text-white transition-all hover:border-accent hover:bg-accent/10"
          >
            Hire Me
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20"
        >
          <motion.a
            href="#latest"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex flex-col items-center gap-2 text-gray-500 hover:text-accent"
          >
            <span className="text-xs uppercase tracking-widest">I appreciate the opportunity and would love to help bring your idea to life.</span>
            <ArrowDown className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
    </section>
  );
}
