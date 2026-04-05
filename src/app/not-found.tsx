"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Floating particles for 404 background
function GlitchParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 800;

  const positions = useRef(
    new Float32Array(
      Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 8)
    )
  );

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    ref.current.rotation.y = time * 0.05;
    ref.current.rotation.x = Math.sin(time * 0.03) * 0.1;
  });

  return (
    <Points ref={ref} positions={positions.current} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ccff00"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
}

export default function NotFoundPage() {
  const [glitchText, setGlitchText] = useState("404");

  // Glitch effect
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    const interval = setInterval(() => {
      const glitched = Array.from({ length: 3 }, () =>
        Math.random() > 0.7 ? chars[Math.floor(Math.random() * chars.length)] : "404"[Math.floor(Math.random() * 3)]
      ).join("");
      setGlitchText(glitched);
    }, 100);

    const resetInterval = setInterval(() => {
      setGlitchText("404");
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(resetInterval);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 4], fov: 75 }}>
          <GlitchParticles />
        </Canvas>
      </div>

      {/* Glitch Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-0 right-0 h-[1px] bg-accent/10"
            style={{ top: `${20 + i * 15}%` }}
            animate={{
              x: [-50, 50, -30, 40, -50],
              opacity: [0, 0.3, 0, 0.2, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-8"
        >
          <h1 className="text-[15vw] md:text-[12rem] font-black tracking-tighter leading-none text-accent select-none">
            {glitchText}
          </h1>
          {/* Ghost text */}
          <motion.span
            className="absolute inset-0 text-[15vw] md:text-[12rem] font-black tracking-tighter leading-none text-red-500/20 select-none"
            animate={{ x: [-3, 3, -2, 4, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          >
            {glitchText}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-[15vw] md:text-[12rem] font-black tracking-tighter leading-none text-blue-500/20 select-none"
            animate={{ x: [3, -3, 2, -4, 3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          >
            {glitchText}
          </motion.span>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold uppercase italic tracking-tighter mb-4">
            Page Not Found
          </h2>
          <p className="text-foreground/40 text-lg max-w-md mx-auto mb-12">
            Looks like you ventured into uncharted territory. The page you&apos;re looking for doesn&apos;t exist.
          </p>

          {/* CTA */}
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-sm uppercase tracking-widest font-bold border border-accent/40 px-8 py-4 rounded-full hover:bg-accent hover:text-background transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
