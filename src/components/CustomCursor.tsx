"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

type CursorState = "default" | "hover" | "click" | "loading";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 400, mass: 0.4 };
  const trailConfig = { damping: 38, stiffness: 200, mass: 0.8 };

  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  const trailSmoothX = useSpring(trailX, trailConfig);
  const trailSmoothY = useSpring(trailY, trailConfig);

  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const rippleId = useRef(0);
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerRipple = useCallback((x: number, y: number) => {
    const id = ++rippleId.current;
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onDown = (e: MouseEvent) => {
      setState("click");
      triggerRipple(e.clientX, e.clientY);
      setTimeout(() => setState("default"), 200);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a, button, [role=button], input, select, textarea, label") !== null;
      if (isInteractive) {
        setState("hover");
      } else if (state === "hover") {
        setState("default");
      }
    };

    const onLinkHoverEnd = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("a, button, [role=button], input, select, textarea, label")) {
        setState("default");
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onLinkHoverEnd);

    const timer = loadingTimer.current;
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onLinkHoverEnd);
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const dotSize = state === "hover" ? 10 : state === "click" ? 6 : 8;
  const ringSize = state === "hover" ? 48 : state === "click" ? 20 : 32;

  return (
    <>
      {/* Click ripples — fixed position absolute, no pointer events */}
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          initial={{ scale: 0, opacity: 0.7 }}
          animate={{ scale: 3.5, opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: r.x - 16,
            top: r.y - 16,
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "2px solid rgba(255,51,102,0.6)",
          }}
        />
      ))}

      {/* Trail ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          x: trailSmoothX,
          y: trailSmoothY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            borderColor:
              state === "hover"
                ? "rgba(0,229,255,0.9)"
                : state === "click"
                ? "rgba(255,209,102,0.9)"
                : "rgba(255,51,102,0.5)",
            borderWidth: state === "hover" ? 2 : 1.5,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="rounded-full border"
        />
        {/* Outer spin arc — loading feel */}
        <motion.div
          className="absolute inset-[-4px] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          style={{
            background: `conic-gradient(from 0deg, transparent 70%, ${
              state === "hover" ? "#00e5ff" : "#ff3366"
            } 100%)`,
            opacity: state === "hover" ? 0.9 : 0.4,
          }}
        />
      </motion.div>

      {/* Dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width: dotSize,
            height: dotSize,
            backgroundColor:
              state === "hover"
                ? "#00e5ff"
                : state === "click"
                ? "#ffd166"
                : "#ff3366",
            scale: state === "click" ? [1, 1.8, 1] : 1,
            boxShadow:
              state === "hover"
                ? "0 0 14px 4px rgba(0,229,255,0.7)"
                : state === "click"
                ? "0 0 18px 6px rgba(255,209,102,0.8)"
                : "0 0 8px 2px rgba(255,51,102,0.5)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="rounded-full"
        />
      </motion.div>
    </>
  );
}
