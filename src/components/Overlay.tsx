"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sparkles, Code2, Cpu, Globe } from "lucide-react";
import { PortfolioReveal } from "@/components/PortfolioReveal";

interface OverlayProps {
  containerRef?: React.RefObject<HTMLDivElement>;
}

export const Overlay: React.FC<OverlayProps> = ({ containerRef }) => {
  // Use window scroll or container scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Section 1 (0% - 20% scroll)
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.28], [1, 1, 0.6, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.28], [0, -60]);
  const scale1 = useTransform(scrollYProgress, [0, 0.25], [1, 1.25]);

  // Section 2 (25% - 50% scroll - Left aligned)
  const opacity2 = useTransform(scrollYProgress, [0.22, 0.3, 0.42, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.3, 0.5], [60, 0, -60]);

  // Section 3 (55% - 80% scroll - Right aligned)
  const opacity3 = useTransform(scrollYProgress, [0.52, 0.6, 0.72, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.52, 0.6, 0.8], [60, 0, -60]);

  // Section 4 (82% - 100% scroll - Transition to Projects)
  const opacity4 = useTransform(scrollYProgress, [0.82, 0.9, 0.98], [0, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0.82, 0.9, 0.98], [40, 0, -20]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 sm:p-12 lg:p-20">
      
      {/* --- Section 1: Hero (0% Scroll) --- */}
      <motion.div
        style={{ opacity: opacity1, y: y1, scale: scale1 }}
        className="absolute inset-0 z-10 pointer-events-none"
      >
        {/* PORTFOLIO banner positioned at TOP */}
        <div className="absolute inset-0 z-0">
          <PortfolioReveal />
        </div>

        {/* Top Pill Badge removed as requested */}

        {/* Bottom Corner Copy Layout framing the center portrait photo cleanly */}
        <div className="absolute bottom-12 sm:bottom-16 left-6 sm:left-12 right-6 sm:right-12 z-10 flex flex-col md:flex-row items-end justify-between gap-6 pointer-events-none">
          
          {/* Bottom-Left Corner Headline */}
          <div className="max-w-xl text-left glass-panel p-6 rounded-2xl border border-white/10 backdrop-blur-md bg-black/40 shadow-2xl">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Building Intelligent <br />
              Web Applications with <br />
              <span className="gradient-text glow-text">Python, Flask & AI</span>
            </h1>
          </div>

          {/* Bottom-Right Corner Subtitle & Scroll Indicator */}
          <div className="max-w-md text-right flex flex-col items-end gap-4 glass-panel p-6 rounded-2xl border border-white/10 backdrop-blur-md bg-black/40 shadow-2xl">
            <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
              Passionate about backend development, AI integration, and creating scalable web applications that solve real-world problems.
            </p>
            <div className="flex items-center gap-3 pointer-events-auto">
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">
                Scroll to explore
              </span>
              <div className="w-5 h-8 rounded-full border border-cyan-400/40 flex justify-center p-1">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  className="w-1 h-2 rounded-full bg-cyan-400"
                />
              </div>
            </div>
          </div>

        </div>
      </motion.div>

      {/* --- Section 2: Narrative (30% Scroll - Left Aligned) --- */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute left-6 sm:left-16 lg:left-24 top-1/2 -translate-y-1/2 max-w-xl text-left"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs mb-4">
          <Code2 className="w-3.5 h-3.5" />
          <span>01 / VISION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
          I build digital <br />
          <span className="text-cyan-400">experiences.</span>
        </h2>
        <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed mb-6">
          Transforming static screens into interactive canvas worlds. Dedicated to pixel perfection, 60fps animations, and responsive fluid storytelling.
        </p>

        {/* Stats Badges */}
        <div className="grid grid-cols-3 gap-3">
          <div className="glass-panel p-3 rounded-xl border border-white/10 text-center">
            <p className="text-xl sm:text-2xl font-bold text-white">Student</p>
            <p className="font-mono text-[10px] text-gray-400 uppercase">Computer Engineering</p>
          </div>
          <div className="glass-panel p-3 rounded-xl border border-white/10 text-center">
            <p className="text-xl sm:text-2xl font-bold text-cyan-400">Backend</p>
            <p className="font-mono text-[10px] text-gray-400 uppercase">REST APIs</p>
          </div>
          <div className="glass-panel p-3 rounded-xl border border-white/10 text-center">
            <p className="text-xl sm:text-2xl font-bold text-purple-400">AI</p>
            <p className="font-mono text-[10px] text-gray-400 uppercase">Gemini API</p>
          </div>
        </div>
      </motion.div>

      {/* --- Section 3: Engineering (60% Scroll - Right Aligned) --- */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute right-6 sm:right-16 lg:right-24 top-1/2 -translate-y-1/2 max-w-xl text-right flex flex-col items-end"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-xs mb-4">
          <Cpu className="w-3.5 h-3.5" />
          <span>02 / STACK</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
          Bridging design <br />
          <span className="text-purple-400">& engineering.</span>
        </h2>
        <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed mb-6">
          Architecting seamless web experiences using Next.js 14, WebGL shaders, HTML5 Canvas, and reactive animation primitives.
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap justify-end gap-2">
          {["Next.js 14", "HTML5 Canvas", "Framer Motion", "TypeScript", "Tailwind CSS", "WebGL Shaders"].map((tech) => (
            <span
              key={tech}
              className="glass-panel px-3.5 py-1.5 rounded-full text-xs font-mono text-cyan-300 border border-cyan-500/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {/* --- Section 4: Lead in to Work Grid (90% Scroll - Centered) --- */}
      <motion.div
        style={{ opacity: opacity4, y: y4 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-white font-mono text-xs tracking-wider uppercase mb-3">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>Selected Projects Ahead</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Explore Case Studies
        </h3>
        <ChevronDown className="w-6 h-6 text-cyan-400 mx-auto animate-bounce" />
      </motion.div>
    </div>
  );
};
