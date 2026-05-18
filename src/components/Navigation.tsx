"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Film, Users, Shield } from "lucide-react";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/categories", label: "Categories" },
  { href: "/latest", label: "Latest" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-void/80 backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-secondary shrink-0"
          >
            <Film className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </motion.div>
          <span className="font-display text-base sm:text-lg font-bold tracking-tight">
            <span className="text-accent">SIZEN</span>
          </span>
        </Link>

        <motion.div
          className="hidden items-center gap-6 lg:gap-8 md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs sm:text-sm text-gray-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>

        <div className="hidden items-center gap-2 sm:gap-3 md:flex">
          <Link
            href="/client"
            className="flex items-center gap-1 sm:gap-2 rounded-full border border-border px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-300 transition-all hover:border-accent-secondary hover:text-accent-secondary"
          >
            <Users className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Client Portal</span>
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-1 sm:gap-2 rounded-full bg-elevated px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-400 transition-all hover:text-white"
          >
            <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Admin</span>
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-gray-400 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-surface md:hidden"
          >
            <motion.div
              className="flex flex-col gap-3 px-4 py-4 sm:py-6"
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.07 } },
                closed: {},
              }}
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    closed: { opacity: 0, x: -20 },
                    open: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={link.href}
                    className="block text-base sm:text-lg text-gray-300 py-2"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/client"
                className="flex items-center gap-2 text-accent-secondary py-2"
                onClick={() => setOpen(false)}
              >
                <Users className="h-5 w-5" />
                Client Portal
              </Link>
              <Link
                href="/admin"
                className="flex items-center gap-2 text-gray-300 py-2"
                onClick={() => setOpen(false)}
              >
                <Shield className="h-5 w-5" />
                Admin
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
