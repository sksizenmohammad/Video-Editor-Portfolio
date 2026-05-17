"use client";

import { motion } from "framer-motion";
import type { VideoEdit, VideoCategory } from "@/types/video";
import { CATEGORY_LABELS, CATEGORY_DESCRIPTIONS } from "@/types/video";
import { VideoCard } from "./VideoCard";
import {
  Clapperboard,
  Gamepad2,
  Heart,
  Zap,
  Megaphone,
  Music,
  Layers,
} from "lucide-react";

const CATEGORY_ICONS: Record<VideoCategory, React.ReactNode> = {
  documentary: <Clapperboard className="h-6 w-6" />,
  gaming: <Gamepad2 className="h-6 w-6" />,
  wedding: <Heart className="h-6 w-6" />,
  teaser: <Zap className="h-6 w-6" />,
  commercial: <Megaphone className="h-6 w-6" />,
  music: <Music className="h-6 w-6" />,
  other: <Layers className="h-6 w-6" />,
};

const CATEGORY_COLORS: Record<VideoCategory, string> = {
  documentary: "from-amber-500/20 to-orange-600/20 border-amber-500/30",
  gaming: "from-purple-500/20 to-pink-600/20 border-purple-500/30",
  wedding: "from-rose-500/20 to-red-600/20 border-rose-500/30",
  teaser: "from-cyan-500/20 to-blue-600/20 border-cyan-500/30",
  commercial: "from-emerald-500/20 to-teal-600/20 border-emerald-500/30",
  music: "from-violet-500/20 to-indigo-600/20 border-violet-500/30",
  other: "from-gray-500/20 to-slate-600/20 border-gray-500/30",
};

const ALL_CATEGORIES: VideoCategory[] = [
  "documentary",
  "gaming",
  "wedding",
  "teaser",
  "commercial",
  "music",
  "other",
];

interface CategorySectionsProps {
  videosByCategory: Record<VideoCategory, VideoEdit[]>;
}

export function CategorySections({ videosByCategory }: CategorySectionsProps) {
  return (
    <section id="categories" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl font-black text-white sm:text-5xl">
            Edit <span className="text-gradient">Categories</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            From raw documentary footage to high-octane gaming montages — explore
            work organized by style.
          </p>
        </motion.div>

        <motion.div
          className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {ALL_CATEGORIES.map((cat) => (
            <motion.a
              key={cat}
              href={`#cat-${cat}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03, y: -4 }}
              className={`flex flex-col gap-3 rounded-2xl border bg-gradient-to-br p-5 transition-shadow hover:shadow-lg ${CATEGORY_COLORS[cat]}`}
            >
              <motion.div className="text-accent-secondary">{CATEGORY_ICONS[cat]}</motion.div>
              <h3 className="font-display font-bold text-white">
                {CATEGORY_LABELS[cat]}
              </h3>
              <p className="text-xs text-gray-400 line-clamp-2">
                {CATEGORY_DESCRIPTIONS[cat]}
              </p>
            </motion.a>
          ))}
        </motion.div>

        {ALL_CATEGORIES.map((category) => {
          const videos = videosByCategory[category] || [];
          if (videos.length === 0) return null;

          return (
            <motion.div
              key={category}
              id={`cat-${category}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-20 scroll-mt-28"
            >
              <div className="mb-8 flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border bg-gradient-to-br ${CATEGORY_COLORS[category]} text-accent-secondary`}
                >
                  {CATEGORY_ICONS[category]}
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {CATEGORY_LABELS[category]}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {CATEGORY_DESCRIPTIONS[category]}
                  </p>
                </div>
              </div>
              <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06 } },
                }}
              >
                {videos.map((video, i) => (
                  <motion.div
                    key={video.id}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <VideoCard video={video} index={i} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
