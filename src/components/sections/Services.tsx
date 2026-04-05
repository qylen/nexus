"use client";

import { motion } from "framer-motion";
import { Zap, Monitor, Rocket, Layers } from "lucide-react";

const SERVICES = [
  {
    title: "Brand Strategy",
    icon: Zap,
    description: "Defining the unique position and voice of your brand in the digital landscape.",
    number: "01",
  },
  {
    title: "UX/UI Design",
    icon: Monitor,
    description: "Creating immersive digital interfaces that prioritize usability and visual delight.",
    number: "02",
  },
  {
    title: "Web Development",
    icon: Rocket,
    description: "Building high-performance, accessible, and scalable digital products.",
    number: "03",
  },
  {
    title: "3D & Motion",
    icon: Layers,
    description: "Bringing brands to life through motion design and interactive 3D elements.",
    number: "04",
  },
];

export function Services() {
  return (
    <section className="py-24 md:py-40 bg-muted/5">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col gap-6 mb-16 md:mb-24 max-w-4xl">
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold">
            What We Do
          </span>
          <h2 className="text-[clamp(3rem,7vw,6rem)] font-black uppercase italic tracking-tighter leading-none">
            Digital <br />
            <span className="text-foreground/20 italic">Capabilities</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/50 font-medium leading-relaxed max-w-2xl">
            Nexus offers a full suite of digital innovation services. We partner with founders
            to architect, design, and develop industry-leading products.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-muted/20">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="group relative bg-background p-8 md:p-10 hover:bg-accent/5 transition-all duration-500"
            >
              {/* Number */}
              <span className="absolute top-6 right-6 text-[10px] font-bold text-foreground/10 group-hover:text-accent/30 transition-colors tabular-nums">
                {service.number}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 rounded-full border border-muted group-hover:border-accent/40 flex items-center justify-center mb-8 transition-all duration-500 group-hover:bg-accent/5">
                <service.icon className="w-6 h-6 text-accent group-hover:scale-110 transition-transform duration-500" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold uppercase italic tracking-tight mb-4 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-foreground/40 leading-relaxed group-hover:text-foreground/60 transition-colors">
                {service.description}
              </p>

              {/* Hover line */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-700 ease-[0.33,1,0.68,1]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
