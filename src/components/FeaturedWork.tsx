"use client";

import { motion } from "framer-motion";
import type { VideoEdit } from "@/types/video";
import { VideoCard } from "./VideoCard";

interface FeaturedWorkProps {
  videos: VideoEdit[];
}

export function FeaturedWork({ videos }: FeaturedWorkProps) {
  if (videos.length === 0) return null;

  return (
    <section id="work" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-4xl font-black text-white sm:text-5xl">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Hand-picked projects that showcase my editing style and creative range.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 },
              }}
            >
              <VideoCard video={video} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
