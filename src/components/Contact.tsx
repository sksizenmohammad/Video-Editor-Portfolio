"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Send, Instagram, Youtube } from "lucide-react";

const EMAIL = "smilographer@gmail.com";
const PHONE = "+918777819463";

function openGmailCompose(name: string, senderEmail: string, project: string, message: string) {
  const subject = `Portfolio Inquiry from ${name} — ${project}`;
  const body = [
    `Name: ${name}`,
    `Reply-to: ${senderEmail}`,
    `Project type: ${project}`,
    "",
    message,
  ].join("\n");

  const gmailUrl = new URL("https://mail.google.com/mail/");
  gmailUrl.searchParams.set("view", "cm");
  gmailUrl.searchParams.set("fs", "1");
  gmailUrl.searchParams.set("to", EMAIL);
  gmailUrl.searchParams.set("su", subject);
  gmailUrl.searchParams.set("body", body);

  window.open(gmailUrl.toString(), "_blank", "noopener,noreferrer");
}

export function Contact() {
  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-elevated via-surface to-elevated"
        >
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-30"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(255,51,102,0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(0,229,255,0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(255,51,102,0.3) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="relative grid gap-12 p-8 md:grid-cols-2 md:p-12 lg:p-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl font-black text-white sm:text-5xl">
                Let&apos;s Create
                <br />
                <span className="text-gradient">Something Epic</span>
              </h2>
              <p className="mt-4 text-gray-400">
                Ready for your next documentary, wedding film, gaming montage, or
                teaser? Reach out — I respond within 24 hours.
              </p>

              <div className="mt-8 space-y-4">
                <motion.a
                  href={`mailto:${EMAIL}`}
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-4 rounded-xl border border-border bg-void/50 p-4 transition-colors hover:border-accent"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent"
                  >
                    <Mail className="h-6 w-6" />
                  </motion.div>
                  <span>
                    <p className="text-xs uppercase tracking-wider text-gray-500">Email</p>
                    <p className="font-semibold text-white">{EMAIL}</p>
                  </span>
                </motion.a>

                <motion.a
                  href={`tel:${PHONE}`}
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-4 rounded-xl border border-border bg-void/50 p-4 transition-colors hover:border-accent-secondary"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-secondary/20 text-accent-secondary"
                  >
                    <Phone className="h-6 w-6" />
                  </motion.div>
                  <span>
                    <p className="text-xs uppercase tracking-wider text-gray-500">Phone</p>
                    <p className="font-semibold text-white">{PHONE}</p>
                  </span>
                </motion.a>
              </div>

              <motion.div className="mt-8 flex gap-4">
                {[Instagram, Youtube].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-gray-400 transition-colors hover:border-accent hover:text-accent"
                    aria-label="Social link"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
                const senderEmail = (
                  form.elements.namedItem("email") as HTMLInputElement
                ).value.trim();
                const project = (form.elements.namedItem("project") as HTMLSelectElement).value;
                const message = (
                  form.elements.namedItem("message") as HTMLTextAreaElement
                ).value.trim();
                openGmailCompose(name, senderEmail, project, message);
              }}
            >
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                required
                className="rounded-xl border border-border bg-void/80 px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-accent"
              />
              <input
                name="email"
                type="email"
                placeholder="Your Email"
                required
                className="rounded-xl border border-border bg-void/80 px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-accent"
              />
              <select
                name="project"
                className="rounded-xl border border-border bg-void/80 px-4 py-3 text-white outline-none transition-colors focus:border-accent"
              >
                <option value="documentary">Documentary Style</option>
                <option value="gaming">Gaming Montage</option>
                <option value="wedding">Wedding Video</option>
                <option value="teaser">Teaser / Trailer</option>
                <option value="commercial">Commercial</option>
                <option value="other">Other</option>
              </select>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell me about your project..."
                required
                className="resize-none rounded-xl border border-border bg-void/80 px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-accent"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-shimmer flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold text-white"
              >
                <Send className="h-5 w-5" />
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
