"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import type { VideoEdit } from "@/types/video";
import { VideoCard } from "./VideoCard";

interface LatestUploadsProps {
  videos: VideoEdit[];
}

export function LatestUploads({ videos }: LatestUploadsProps) {
  if (videos.length === 0) return null;

  return (
    <section id="latest" className="relative py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-3 flex items-center gap-2 text-accent">
              <Zap className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-widest">
                Fresh Cuts
              </span>
            </div>
            <h2 className="font-display text-4xl font-black text-white sm:text-5xl">
              Latest <span className="text-gradient">Uploads</span>
            </h2>
            <p className="mt-2 max-w-xl text-gray-400">
              Updated daily — my newest edits land here first. Check back often for
              fresh work.
            </p>
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="rounded-full border border-accent/50 bg-accent/10 px-4 py-2 text-sm font-medium text-accent"
          >
            ● Live portfolio feed
          </motion.div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
