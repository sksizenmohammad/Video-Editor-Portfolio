"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Plus,
  Trash2,
  LogOut,
  Film,
  ArrowLeft,
  Upload,
} from "lucide-react";
import type { VideoCategory, VideoAudience, VideoEdit } from "@/types/video";
import { CATEGORY_LABELS } from "@/types/video";
import type { Client } from "@/types/client";

const CATEGORIES: VideoCategory[] = [
  "documentary",
  "gaming",
  "wedding",
  "teaser",
  "commercial",
  "music",
  "other",
];

const emptyForm = {
  title: "",
  description: "",
  category: "documentary" as VideoCategory,
  audience: "public" as VideoAudience,
  youtubeId: "",
  clientId: "",
  featured: false,
  isLatest: true,
};

interface AdminPanelProps {
  clients: Client[];
}

export function AdminPanel({ clients }: AdminPanelProps) {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [videos, setVideos] = useState<VideoEdit[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const authHeader = () => ({ Authorization: `Bearer ${password}` });

  const loadVideos = async () => {
    const res = await fetch("/api/videos");
    if (res.ok) setVideos(await res.json());
  };

  useEffect(() => {
    if (authenticated) loadVideos();
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length >= 4) {
      setAuthenticated(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const selectedClient = clients.find((c) => c.id === form.clientId);
    const video: Omit<VideoEdit, "id"> = {
      ...form,
      uploadedAt: new Date().toISOString().split("T")[0],
      clientId: form.audience === "client" ? form.clientId : undefined,
      clientName:
        form.audience === "client" ? selectedClient?.name : undefined,
    };

    const res = await fetch("/api/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify(video),
    });

    setLoading(false);
    if (res.ok) {
      setMessage("Video added! Redeploy on Vercel for changes to go live in production.");
      setForm(emptyForm);
      loadVideos();
    } else {
      const data = await res.json();
      setMessage(data.error || "Failed to add video. Check your admin password.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this video?")) return;
    const res = await fetch(`/api/videos?id=${id}`, {
      method: "DELETE",
      headers: authHeader(),
    });
    if (res.ok) {
      loadVideos();
      setMessage("Video deleted.");
    }
  };

  if (!authenticated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-screen items-center justify-center bg-void px-4"
      >
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-3xl border border-border bg-elevated p-8"
        >
          <Shield className="mx-auto mb-4 h-12 w-12 text-accent" />
          <h1 className="text-center font-display text-2xl font-bold text-white">
            Admin Login
          </h1>
          <p className="mt-2 text-center text-sm text-gray-500">
            Enter your ADMIN_PASSWORD (set in Vercel env vars)
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="mt-6 w-full rounded-xl border border-border bg-void px-4 py-3 text-white outline-none focus:border-accent"
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-accent py-3 font-semibold text-white"
          >
            Login
          </button>
          <Link
            href="/"
            className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>
        </form>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-void">
      <header className="border-b border-border bg-surface px-4 py-4">
        <motion.div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Film className="h-6 w-6 text-accent" />
            <h1 className="font-display text-xl font-bold text-white">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-gray-400 hover:text-white">
              View Site
            </Link>
            <button
              type="button"
              onClick={() => setAuthenticated(false)}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-accent"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </motion.div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-2xl border border-accent/30 bg-accent/5 p-4 text-sm text-gray-300"
        >
          <Upload className="mb-2 h-5 w-5 text-accent" />
          <strong>Daily upload workflow:</strong> Add your latest edit below with
          &quot;Mark as Latest&quot; checked. Use your YouTube video ID from the URL
          (e.g. <code className="text-accent-secondary">dQw4w9WgXcQ</code> from
          youtube.com/watch?v=<strong>dQw4w9WgXcQ</strong>).
        </motion.div>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 rounded-xl border border-accent-secondary/30 bg-accent-secondary/10 p-4 text-sm text-accent-secondary"
          >
            {message}
          </motion.p>
        )}

        <form
          onSubmit={handleSubmit}
          className="mb-12 rounded-2xl border border-border bg-elevated p-6"
        >
          <h2 className="mb-6 flex items-center gap-2 font-display text-lg font-bold text-white">
            <Plus className="h-5 w-5 text-accent" />
            Add New Edit
          </h2>

          <motion.div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              placeholder="Video title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="rounded-xl border border-border bg-void px-4 py-3 text-white outline-none focus:border-accent sm:col-span-2"
            />
            <textarea
              required
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="resize-none rounded-xl border border-border bg-void px-4 py-3 text-white outline-none focus:border-accent sm:col-span-2"
            />
            <input
              required
              placeholder="YouTube Video ID"
              value={form.youtubeId}
              onChange={(e) => setForm({ ...form, youtubeId: e.target.value })}
              className="rounded-xl border border-border bg-void px-4 py-3 text-white outline-none focus:border-accent"
            />
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value as VideoCategory })
              }
              className="rounded-xl border border-border bg-void px-4 py-3 text-white outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
            <select
              value={form.audience}
              onChange={(e) =>
                setForm({ ...form, audience: e.target.value as VideoAudience })
              }
              className="rounded-xl border border-border bg-void px-4 py-3 text-white outline-none"
            >
              <option value="public">Public Portfolio</option>
              <option value="client">Client Only</option>
            </select>
            {form.audience === "client" && (
              <select
                required
                value={form.clientId}
                onChange={(e) => setForm({ ...form, clientId: e.target.value })}
                className="rounded-xl border border-border bg-void px-4 py-3 text-white outline-none focus:border-accent sm:col-span-2"
              >
                <option value="">Select registered client</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.email})
                  </option>
                ))}
              </select>
            )}
          </motion.div>

          <motion.div className="mt-4 flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm text-gray-400">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="accent-accent"
              />
              Featured work
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-400">
              <input
                type="checkbox"
                checked={form.isLatest}
                onChange={(e) => setForm({ ...form, isLatest: e.target.checked })}
                className="accent-accent"
              />
              Mark as Latest (daily upload)
            </label>
          </motion.div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            className="mt-6 flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white disabled:opacity-50"
          >
            <Plus className="h-5 w-5" />
            {loading ? "Saving..." : "Add Video"}
          </motion.button>
        </form>

        <h2 className="mb-4 font-display text-lg font-bold text-white">
          All Videos ({videos.length})
        </h2>
        <div className="space-y-3">
          {videos.map((v) => (
            <motion.div
              key={v.id}
              layout
              className="flex items-center justify-between rounded-xl border border-border bg-elevated p-4"
            >
              <div>
                <p className="font-medium text-white">{v.title}</p>
                <p className="text-xs text-gray-500">
                  {CATEGORY_LABELS[v.category]} · {v.audience}
                  {v.clientId && ` · ${v.clientId}`} · {v.uploadedAt}
                  {v.isLatest && " · Latest"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(v.id)}
                className="rounded-lg p-2 text-gray-500 hover:bg-accent/20 hover:text-accent"
                aria-label={`Delete ${v.title}`}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
