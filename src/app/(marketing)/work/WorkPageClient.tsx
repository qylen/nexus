"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Branding", "Web Design", "Motion", "SaaS"];

const PROJECTS = [
  {
    id: "01",
    title: "NeuroSphere",
    category: "Branding",
    categories: ["Branding", "Web Design"],
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop",
    year: "2024",
    slug: "neurosphere",
  },
  {
    id: "02",
    title: "Aura Labs",
    category: "Web Design",
    categories: ["Branding", "Web Design"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    year: "2023",
    slug: "aura-labs",
  },
  {
    id: "03",
    title: "Vortex Motion",
    category: "Motion",
    categories: ["Motion"],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    year: "2023",
    slug: "vortex-motion",
  },
  {
    id: "04",
    title: "Zephyr Cloud",
    category: "SaaS",
    categories: ["SaaS", "Web Design"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    year: "2024",
    slug: "zephyr-cloud",
  },
  {
    id: "05",
    title: "Pulse Analytics",
    category: "Web Design",
    categories: ["SaaS", "Web Design"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    year: "2024",
    slug: "pulse-analytics",
  },
  {
    id: "06",
    title: "Flux Studio",
    category: "Branding",
    categories: ["Branding", "Motion"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=1200&auto=format&fit=crop",
    year: "2023",
    slug: "flux-studio",
  },
];

export default function WorkPageClient() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.categories.includes(activeFilter));

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="pt-40 md:pt-52 pb-16 md:pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold mb-6 block">
              Our Portfolio
            </span>
            <h1 className="text-[clamp(3rem,9vw,8rem)] font-black uppercase italic tracking-tighter leading-none">
              Selected <br />
              <span className="text-foreground/20 italic">Work</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <nav className="flex flex-wrap gap-3" aria-label="Project filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  "px-5 py-2 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 border",
                  activeFilter === cat
                    ? "bg-accent text-background border-accent"
                    : "border-muted text-foreground/40 hover:border-accent/40 hover:text-accent"
                )}
                aria-pressed={activeFilter === cat}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24 md:pb-40">
        <div className="container mx-auto px-6 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                  className="group cursor-pointer"
                >
                  <Link href={`/work/${project.slug}`}>
                    <div className="relative overflow-hidden bg-muted mb-5">
                      <ParallaxImage
                        src={project.image}
                        alt={project.title}
                        aspectRatio="aspect-[4/5]"
                        className="grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 right-4 w-11 h-11 bg-accent text-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="flex items-start justify-between border-b border-muted/50 pb-4 group-hover:border-accent/30 transition-colors">
                      <div>
                        <h3 className="text-xl font-bold uppercase italic tracking-tighter mb-1 transition-colors group-hover:text-accent">
                          {project.title}
                        </h3>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-medium">
                          {project.category}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold text-foreground/20 mt-1 tabular-nums">
                        {project.year}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
