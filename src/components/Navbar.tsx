"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Terminal, Volume2, VolumeX } from "lucide-react";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-6 sm:px-12 py-4 ${
        scrolled
          ? "bg-[#121212]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group"
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-extrabold text-white text-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-transform">
            BS
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-white text-sm tracking-wide group-hover:text-cyan-300 transition-colors">
              Bhavit Shinde
            </span>
            <span className="font-mono text-[10px] text-cyan-400 tracking-wider uppercase">
              Backend Developer
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-white/10">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-4 py-1.5 rounded-full text-xs font-mono text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            00. Canvas
          </button>
          <button
            onClick={() => scrollToSection("work")}
            className="px-4 py-1.5 rounded-full text-xs font-mono text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            01. Work
          </button>
          <button
            onClick={() => scrollToSection("stack")}
            className="px-4 py-1.5 rounded-full text-xs font-mono text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            02. Stack
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-4 py-1.5 rounded-full text-xs font-mono text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            03. Contact
          </button>
        </nav>

        {/* Right Action Widgets */}
        <div className="flex items-center gap-3">
          {/* Audio toggle simulation */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-full glass-panel text-gray-400 hover:text-cyan-300 transition-colors"
            title={soundEnabled ? "Mute Ambient Sound" : "Enable Ambient Sound"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Availability Badge */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Available for projects</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
