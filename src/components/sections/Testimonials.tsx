"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    quote: "Nexus didn't just build us a website—they crafted an experience. Our conversion rate increased by 340% within the first quarter.",
    author: "Sarah Chen",
    role: "CEO, NeuroSphere",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&auto=format&fit=crop",
  },
  {
    quote: "The level of craft and attention to detail is unlike anything we've experienced. They truly understand the intersection of art and technology.",
    author: "Marcus Rivera",
    role: "Founder, Aura Labs",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&auto=format&fit=crop",
  },
  {
    quote: "Working with Nexus felt like a creative partnership. They challenged our assumptions and delivered something we couldn't have imagined.",
    author: "Elena Kowalski",
    role: "CMO, Vortex Motion",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&auto=format&fit=crop",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, isAutoPlaying]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <section
      className="py-24 md:py-40 bg-background"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold">Client Stories</span>
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-muted hover:border-accent flex items-center justify-center transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-muted hover:border-accent flex items-center justify-center transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative min-h-[300px] md:min-h-[250px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              className="max-w-4xl"
            >
              <Quote className="w-12 h-12 text-accent/30 mb-8" />
              <blockquote className="text-2xl md:text-4xl font-medium leading-snug mb-12 italic">
                &ldquo;{TESTIMONIALS[current].quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <img
                    src={TESTIMONIALS[current].avatar}
                    alt={TESTIMONIALS[current].author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold uppercase tracking-wider text-sm">
                    {TESTIMONIALS[current].author}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground opacity-60">
                    {TESTIMONIALS[current].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-3 mt-12">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={cn(
                "h-1 rounded-full transition-all duration-500",
                i === current
                  ? "w-12 bg-accent"
                  : "w-4 bg-muted hover:bg-muted/60"
              )}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
