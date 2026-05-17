"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "150+", label: "Projects Edited" },
  { value: "50+", label: "Happy Clients" },
  { value: "7", label: "Edit Categories" },
  { value: "24h", label: "Response Time" },
];

export function StatsBar() {
  return (
    <section className="border-y border-border bg-surface/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-center"
            >
              <motion.p
                className="font-display text-3xl font-black text-gradient sm:text-4xl"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {stat.value}
              </motion.p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
