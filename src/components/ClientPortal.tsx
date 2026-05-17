"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Lock, Users, KeyRound, Mail, LogOut, Loader as Loader2 } from "lucide-react";
import type { VideoEdit } from "@/types/video";
import type { ClientSession } from "@/types/client";
import { VideoCard } from "./VideoCard";

const STORAGE_KEY = "client_portal_token";

interface AuthResponse {
  token: string;
  client: ClientSession;
  videos: VideoEdit[];
}

export function ClientPortal() {
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [client, setClient] = useState<ClientSession | null>(null);
  const [videos, setVideos] = useState<VideoEdit[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const applySession = useCallback((data: AuthResponse) => {
    sessionStorage.setItem(STORAGE_KEY, data.token);
    setClient(data.client);
    setVideos(data.videos);
    setError("");
  }, []);

  const restoreSession = useCallback(async () => {
    const token = sessionStorage.getItem(STORAGE_KEY);
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/client-session", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        sessionStorage.removeItem(STORAGE_KEY);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setClient(data.client);
      setVideos(data.videos);
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/client-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          accessCode: accessCode.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed. Check your Gmail and access code.");
        return;
      }

      applySession(data as AuthResponse);
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setClient(null);
    setVideos([]);
    setEmail("");
    setAccessCode("");
  };

  if (loading) {
    return (
      <motion.div
        className="flex min-h-[70vh] items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Loader2 className="h-10 w-10 animate-spin text-accent-secondary" />
      </motion.div>
    );
  }

  if (!client) {
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
            Sign in with your registered Gmail and the access code from your editor.
            You will only see your own project videos.
          </p>
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@gmail.com"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-border bg-void py-3 pl-12 pr-4 text-white outline-none focus:border-accent-secondary"
              />
            </div>
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Access code"
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-border bg-void py-3 pl-12 pr-4 text-white outline-none focus:border-accent-secondary"
              />
            </div>
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
              disabled={submitting}
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-secondary to-accent py-3 font-semibold text-white disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                "View My Projects"
              )}
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
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <motion.div
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-secondary/30 bg-accent-secondary/10 px-4 py-2 text-sm text-accent-secondary"
            animate={{
              boxShadow: [
                "0 0 0px rgba(0,229,255,0)",
                "0 0 20px rgba(0,229,255,0.3)",
                "0 0 0px rgba(0,229,255,0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Users className="h-4 w-4" />
            Private — {client.name}
          </motion.div>
          <h1 className="font-display text-4xl font-black text-white sm:text-5xl">
            Your <span className="text-gradient">Projects</span>
          </h1>
          <p className="mt-2 text-gray-400">
            Signed in as <span className="text-white">{client.email}</span>
          </p>
        </div>
        <motion.button
          type="button"
          onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 self-start rounded-xl border border-border px-4 py-2 text-sm text-gray-400 transition-colors hover:border-accent hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </motion.button>
      </div>

      {videos.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border border-dashed border-border p-12 text-center text-gray-500"
        >
          No videos shared with you yet. Your editor will add deliverables here soon.
        </motion.p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
