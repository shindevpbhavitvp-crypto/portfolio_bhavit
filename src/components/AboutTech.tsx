"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Zap, Code, ShieldCheck, Terminal, Award, Flame } from "lucide-react";

interface SkillCategory {
  title: string;
  skills: { name: string; level: number; highlight?: string }[];
}

const CATEGORIES: SkillCategory[] = [
  {
    title: "Backend & APIs",
    skills: [
      { name: "Python", level: 96, highlight: "Flask application design" },
      { name: "Flask", level: 95, highlight: "REST API architecture" },
      { name: "REST APIs", level: 94, highlight: "CRUD and auth flows" },
      { name: "JWT Authentication", level: 92, highlight: "Secure session handling" },
    ],
  },
  {
    title: "AI & Data",
    skills: [
      { name: "Gemini API", level: 92, highlight: "AI prompt orchestration" },
      { name: "RAG Fundamentals", level: 90, highlight: "Knowledge retrieval" },
      { name: "SQL / SQLite", level: 94, highlight: "Relational schema design" },
      { name: "Prompt Engineering", level: 91, highlight: "AI-driven workflows" },
    ],
  },
  {
    title: "Developer Tooling",
    skills: [
      { name: "Git & GitHub", level: 95, highlight: "Source control workflow" },
      { name: "VS Code", level: 96, highlight: "Developer productivity" },
      { name: "Postman", level: 90, highlight: "API testing" },
      { name: "JavaScript", level: 92, highlight: "Backend scripting & tooling" },
    ],
  },
];

export const AboutTech: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="stack" className="relative z-20 bg-[#121212] py-24 px-6 sm:px-12 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-xs mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Engineered for <span className="gradient-text">Reliable Backend Systems</span>
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg">
            Building scalable Flask APIs, data-driven services, and AI-enhanced applications with clean architecture and secure integrations.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={cat.title}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs sm:text-sm transition-all duration-300 ${
                activeTab === idx
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  : "glass-panel text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {CATEGORIES[activeTab].skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-panel p-6 rounded-2xl border border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-white text-base sm:text-lg">
                  {skill.name}
                </span>
                <span className="font-mono text-xs font-semibold text-cyan-400">
                  {skill.level}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                />
              </div>

              <span className="font-mono text-xs text-gray-400 flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-cyan-400" />
                {skill.highlight}
              </span>
            </motion.div>
          ))}
        </div>

        {/* 3 Core Engineering Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-left">
            <Flame className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Scalable API Design</h3>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              REST-first Flask services built with reusable routes, clean payload contracts, and maintainable backend patterns.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-left">
            <Terminal className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Secure Authentication</h3>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              JWT-based session handling and role-aware access control for modern web apps and administrative dashboards.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-left">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Data-First Architecture</h3>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Structured SQL and SQLite data models designed to support analytics, reporting, and reliable backend storage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
