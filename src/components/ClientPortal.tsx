"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Users, KeyRound } from "lucide-react";
import type { VideoEdit } from "@/types/video";
import { VideoCard } from "./VideoCard";

const CLIENT_ACCESS_CODE =
  process.env.NEXT_PUBLIC_CLIENT_CODE || "smilo2026";

interface ClientPortalProps {
  videos: VideoEdit[];
}

export function ClientPortal({ videos }: ClientPortalProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === CLIENT_ACCESS_CODE) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Invalid access code. Contact your editor for credentials.");
    }
  };

  if (!authenticated) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full rounded-3xl border border-border bg-elevated p-8 shadow-2xl"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-secondary/30 to-accent/30"
          >
            <Lock className="h-8 w-8 text-accent-secondary" />
          </motion.div>
          <h1 className="text-center font-display text-3xl font-bold text-white">
            Client Portal
          </h1>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your private access code to view client-only deliverables.
          </p>
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <motion.div className="relative">
              <KeyRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Access code"
                className="w-full rounded-xl border border-border bg-void py-3 pl-12 pr-4 text-white outline-none focus:border-accent-secondary"
              />
            </motion.div>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-accent"
              >
                {error}
              </motion.p>
            )}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-xl bg-gradient-to-r from-accent-secondary to-accent py-3 font-semibold text-white"
            >
              Enter Portal
            </motion.button>
          </form>
          <p className="mt-6 text-center text-xs text-gray-600">
            Need access? Email{" "}
            <a href="mailto:smilographer@gmail.com" className="text-accent-secondary">
              smilographer@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <motion.div
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-secondary/30 bg-accent-secondary/10 px-4 py-2 text-sm text-accent-secondary"
          animate={{ boxShadow: ["0 0 0px rgba(0,229,255,0)", "0 0 20px rgba(0,229,255,0.3)", "0 0 0px rgba(0,229,255,0)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Users className="h-4 w-4" />
          Client Area — Private Deliverables
        </motion.div>
        <h1 className="font-display text-4xl font-black text-white sm:text-5xl">
          Your <span className="text-gradient">Projects</span>
        </h1>
        <p className="mt-2 text-gray-400">
          Review drafts, finals, and revisions shared exclusively with you.
        </p>
      </motion.div>

      {videos.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border border-dashed border-border p-12 text-center text-gray-500"
        >
          No client projects yet. Your editor will add deliverables here soon.
        </motion.p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, i) => (
            <div key={video.id}>
              {video.clientName && (
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-accent-secondary">
                  {video.clientName}
                </p>
              )}
              <VideoCard video={video} index={i} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
