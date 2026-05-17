"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Calendar } from "lucide-react";
import type { VideoEdit } from "@/types/video";
import { CATEGORY_LABELS } from "@/types/video";
import { getYoutubeThumbnail } from "@/lib/videos";

interface VideoCardProps {
  video: VideoEdit;
  index?: number;
}

export function VideoCard({ video, index = 0 }: VideoCardProps) {
  const [playing, setPlaying] = useState(false);
  const thumbnail =
    video.thumbnailUrl ||
    (video.youtubeId ? getYoutubeThumbnail(video.youtubeId) : null);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="video-card-glow group relative overflow-hidden rounded-2xl border border-border bg-elevated"
      >
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="relative block aspect-video w-full overflow-hidden"
          aria-label={`Play ${video.title}`}
        >
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <motion.div
              className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/30 to-accent-secondary/30"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Play className="h-16 w-16 text-white/80" />
            </motion.div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-void/40 opacity-0 transition-opacity group-hover:opacity-100"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-accent shadow-lg shadow-accent/50"
            >
              <Play className="ml-1 h-7 w-7 fill-white text-white" />
            </motion.div>
          </motion.div>
          {video.isLatest && (
            <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Latest
            </span>
          )}
        </button>

        <motion.div
          className="p-5"
          initial={false}
          whileHover={{ backgroundColor: "rgba(255, 51, 102, 0.05)" }}
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-medium text-accent">
              {CATEGORY_LABELS[video.category]}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              {new Date(video.uploadedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <h3 className="font-display text-lg font-bold text-white">{video.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-400">{video.description}</p>
        </motion.div>
      </motion.article>

      <AnimatePresence>
        {playing && video.youtubeId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-void/95 p-4 backdrop-blur-md"
            onClick={() => setPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setPlaying(false)}
                className="absolute -top-12 right-0 rounded-full p-2 text-gray-400 hover:text-white"
                aria-label="Close player"
              >
                <X className="h-8 w-8" />
              </button>
              <motion.div
                className="aspect-video overflow-hidden rounded-2xl border border-border shadow-2xl shadow-accent/20"
                layoutId={`video-${video.id}`}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </motion.div>
              <h3 className="mt-4 text-center font-display text-xl font-bold">{video.title}</h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
