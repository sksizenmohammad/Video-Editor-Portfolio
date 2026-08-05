"use client";

import { motion } from "framer-motion";
import { Play, ArrowDown, Sparkles, Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16 sm:pt-20 2xl:pt-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void/50 to-void" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-3 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-elevated/80 px-3 py-1.5 text-xs sm:text-sm text-gray-400 backdrop-blur-sm"
        >
          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-gold" />
          <span className="line-clamp-1">Professional Video Editor & Colorist</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-3xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl 2xl:text-8xl"
        >
          <span className="block text-white">Crafting</span>
          <span className="text-gradient">Visual Stories</span>
          <span className="block text-white">That Move People</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 sm:mt-6 sm:text-lg lg:text-xl"
        >
          Documentary narratives, gaming montages, wedding films, teasers & more — edited with cinematic precision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:gap-4"
        >
          <Link
            href="/work"
            className="btn-shimmer group w-full sm:w-auto flex items-center justify-center gap-2 rounded-full px-6 py-3 sm:px-8 sm:py-4 font-semibold text-white text-sm sm:text-base shadow-lg shadow-accent/30 transition-transform hover:scale-105"
          >
            <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-white" />
            View My Work
          </Link>
          <Link
            href="/hire"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border-2 border-border px-6 py-3 sm:px-8 sm:py-4 font-semibold text-white text-sm sm:text-base transition-all hover:border-accent hover:bg-accent/10"
          >
            Hire Me
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 sm:mt-16"
        >
          <motion.div className="mb-6 flex justify-center gap-4 sm:gap-6">
            <motion.a
              href="https://www.instagram.com/ismilographer/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: 5 }}
              className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-border text-gray-400 transition-colors hover:border-accent hover:text-accent"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.a>
            <motion.a
              href="https://www.fiverr.com/sellers/sksizenmohammad/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: -5 }}
              className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-border text-gray-400 transition-colors hover:border-accent-secondary hover:text-accent-secondary"
              aria-label="Fiverr"
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2h3v10H2V2zm5 0h3v10H7V2zm5 0h3v10h-3V2zm5 4h3v6h-3V6z" />
                <rect x="2" y="14" width="16" height="2" />
              </svg>
            </motion.a>
          </motion.div>

          <motion.a
            href="#latest"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex flex-col items-center gap-1 sm:gap-2 text-gray-500 hover:text-accent"
          >
            <span className="text-xs uppercase tracking-widest px-2">I appreciate the opportunity to help.</span>
            <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5" />
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
