"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, X, Layers, Sparkles, Code, Cpu } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullStory: string;
  tags: string[];
  metrics: string;
  year: string;
  gradient: string;
  demoUrl: string;
  githubUrl: string;
}

const PROJECTS: Project[] = [
  {
    id: "ai-trading-journal",
    title: "AI Trading Journal",
    category: "AI-Powered Finance",
    description: "An AI-powered trading journal that records trades, analyzes psychology, tracks performance, and generates weekly reports.",
    fullStory: "Built with Python, Flask, JavaScript, and SQLite, this trading journal captures trade entries, evaluates performance, provides Gemini AI coaching, and delivers actionable weekly summaries.",
    tags: ["Python", "Flask", "SQLite", "Gemini API", "JavaScript"],
    metrics: "AI Coaching Workflow",
    year: "2026",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    demoUrl: "#",
    githubUrl: "https://github.com/bhavit-shinde/ai-trading-journal",
  },
  {
    id: "student-notice-board",
    title: "Student Notice Board System",
    category: "Education Dashboard",
    description: "A secure notice board where administrators manage updates and students access announcements through an intuitive dashboard.",
    fullStory: "This web application uses Python, Flask, SQL, HTML, CSS, and JavaScript to deliver a reliable notice system for students, including admin controls, authentication, and structured content delivery.",
    tags: ["Python", "Flask", "SQL", "JavaScript", "HTML", "CSS"],
    metrics: "Secure Student Access",
    year: "2025",
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    demoUrl: "#",
    githubUrl: "https://github.com/bhavit-shinde/student-notice-board",
  },
];

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="relative z-20 bg-[#121212] py-24 px-6 sm:px-12 lg:px-20 border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Featured Projects <span className="text-cyan-400">&</span> Case Studies
            </h2>
          </div>
          <p className="text-gray-400 max-w-md text-sm sm:text-base font-light">
            A curated selection of interactive web applications, high-performance canvas engine implementations, and creative developer tools.
          </p>
        </div>

        {/* Project 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onClick={() => setSelectedProject(project)}
              className="group relative cursor-pointer rounded-2xl glass-panel glass-panel-hover p-8 overflow-hidden flex flex-col justify-between min-h-[380px]"
            >
              {/* Card Gradient Background Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              {/* Top metadata */}
              <div className="relative z-10 flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase bg-cyan-500/10 px-3 py-1 rounded-md border border-cyan-500/20">
                  {project.category}
                </span>
                <span className="font-mono text-xs text-gray-500">{project.year}</span>
              </div>

              {/* Title & Description */}
              <div className="relative z-10 my-auto">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                  {project.title}
                  <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-cyan-400" />
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light mb-6 line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Bottom Tags & Metrics */}
              <div className="relative z-10 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] text-[11px] font-mono text-gray-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-xs font-semibold text-cyan-400 bg-cyan-400/10 px-2.5 py-1 rounded">
                  {project.metrics}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- Case Study Modal --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl rounded-3xl glass-panel bg-[#1a1a1a]/95 border border-white/15 p-6 sm:p-10 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="inline-block font-mono text-xs text-cyan-400 tracking-wider uppercase mb-3 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">
                {selectedProject.category} • {selectedProject.year}
              </span>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                {selectedProject.title}
              </h3>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light mb-6">
                {selectedProject.fullStory}
              </p>

              <div className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs text-gray-400 uppercase">Performance Benchmark</span>
                <span className="font-mono text-sm font-bold text-cyan-400">{selectedProject.metrics}</span>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <h4 className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-3">Technologies Employed</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((t) => (
                    <span key={t} className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-300 font-mono text-xs border border-cyan-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={selectedProject.demoUrl}
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm hover:brightness-110 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  <span>Launch Live Project</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={selectedProject.githubUrl}
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-panel text-gray-300 hover:text-white font-semibold text-sm transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
