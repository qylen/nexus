"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onLoadingComplete?: () => void;
}

export function Preloader({ onLoadingComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => onLoadingComplete?.(), 600);
          return 100;
        }
        // Variable speed for organic feel
        const increment = Math.random() * 8 + 2;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  const counterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const slideUp = {
    hidden: { y: 0 },
    visible: {
      y: "-100%",
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[10001] bg-background flex flex-col items-center justify-center"
          exit={slideUp}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 bg-accent rounded-sm rotate-45" />
              <span className="font-display font-bold text-3xl tracking-tighter uppercase">
                Nexus
              </span>
            </motion.div>

            {/* Progress counter */}
            <motion.div
              variants={counterVariants}
              initial="hidden"
              animate="visible"
              className="text-8xl md:text-9xl font-black tracking-tighter text-accent tabular-nums"
            >
              {Math.round(progress)}
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 md:w-64 h-[2px] bg-muted overflow-hidden mt-4">
              <motion.div
                className="h-full bg-accent"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mt-4"
            >
              Loading Experience
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
