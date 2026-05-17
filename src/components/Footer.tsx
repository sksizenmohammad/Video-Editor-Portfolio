"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Film } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-12">
      <motion.div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Film className="h-5 w-5 text-accent" />
            <span className="font-display font-bold">
              Smilo<span className="text-accent">Graph</span>
            </span>
          </div>
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Smilographer. All rights reserved.
          </p>
          <motion.div className="flex gap-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-white">
              Portfolio
            </Link>
            <Link href="/client" className="hover:text-accent-secondary">
              Client Portal
            </Link>
            <Link href="/admin" className="hover:text-gray-300">
              Admin
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
