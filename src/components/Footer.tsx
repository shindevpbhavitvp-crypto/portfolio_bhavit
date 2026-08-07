"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Copy, Check, Mail, Github, Twitter, Linkedin, Award, Clock } from "lucide-react";

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("bhavit.shinde@example.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative z-20 bg-[#121212] pt-24 pb-12 px-6 sm:px-12 lg:px-20 border-t border-white/10 overflow-hidden">
      {/* Background glow circle */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Main CTA Box */}
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-white/10 mb-16 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-3 inline-block">
              GET IN TOUCH
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Have a project in mind? <br />
              <span className="gradient-text">Let&apos;s build something impactful.</span>
            </h2>
            <p className="text-gray-400 font-light text-base">
              Available for backend development, REST API architecture, AI integration, and scalable web application projects.
            </p>
          </div>

          {/* Email Copy Box */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm hover:brightness-110 transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] group"
            >
              <Mail className="w-4 h-4" />
              <span>bhavit.shinde@example.com</span>
              {copied ? (
                <Check className="w-4 h-4 text-emerald-300" />
              ) : (
                <Copy className="w-4 h-4 text-white/70 group-hover:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Links & Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10 border-t border-b border-white/5 text-sm">
          {/* Brand Col */}
          <div>
            <span className="font-bold text-white text-lg block mb-2">Bhavit Shinde</span>
            <p className="text-gray-400 text-xs leading-relaxed">
              Computer Engineering student focused on backend development, AI integration, and scalable web applications.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <span className="font-mono text-xs text-gray-500 uppercase tracking-widest block mb-4">Navigation</span>
            <ul className="space-y-2 text-gray-300 font-mono text-xs">
              <li>
                <button onClick={scrollToTop} className="hover:text-cyan-400 transition-colors">
                  00. Top Canvas
                </button>
              </li>
              <li>
                <a href="#work" className="hover:text-cyan-400 transition-colors">
                  01. Work Showcase
                </a>
              </li>
              <li>
                <a href="#stack" className="hover:text-cyan-400 transition-colors">
                  02. Tech Stack
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <span className="font-mono text-xs text-gray-500 uppercase tracking-widest block mb-4">Connect</span>
            <div className="flex items-center gap-4 text-gray-400">
              <a href="https://github.com/bhavit-shinde" target="_blank" rel="noreferrer" className="p-2 rounded-lg glass-panel hover:text-cyan-400 transition-colors" title="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/bhavit-shinde" target="_blank" rel="noreferrer" className="p-2 rounded-lg glass-panel hover:text-cyan-400 transition-colors" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://example.com/bhavit-shinde-resume.pdf" target="_blank" rel="noreferrer" className="p-2 rounded-lg glass-panel hover:text-cyan-400 transition-colors" title="Resume">
                <Award className="w-4 h-4" />
              </a>
              <a href="mailto:bhavit.shinde@example.com" className="p-2 rounded-lg glass-panel hover:text-cyan-400 transition-colors" title="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Local Time Widget */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-gray-500 uppercase tracking-widest block mb-2">Local Time</span>
              <div className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20">
                <Clock className="w-3.5 h-3.5" />
                <span>{timeString || "12:00:00 PM"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <p>© 2026 Bhavit Shinde. All Rights Reserved. Built with Next.js 14 & Canvas.</p>
          
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:text-white transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
