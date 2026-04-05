"use client";

import { motion } from "framer-motion";
import { Counter } from "@/components/ui/Counter";

const STATS = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 40, suffix: "+", label: "Global Clients" },
  { value: 12, suffix: "", label: "Industry Awards" },
  { value: 98, suffix: "%", label: "Client Retention" },
];

export function Stats() {
  return (
    <section className="py-24 md:py-32 bg-muted/10 border-y border-muted/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="text-center"
            >
              <div className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-accent mb-3">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
