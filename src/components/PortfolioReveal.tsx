"use client";

import React, { useEffect, useRef, useState } from "react";

export const PortfolioReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Motion, Idle & Velocity refs for authentic liquid ink spread
  const targetPosRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const targetRadiusRef = useRef(0);
  const currentRadiusRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isMouseMovingRef = useRef(false);
  const morphIntensityRef = useRef(1);
  const mouseIdleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const timeRef = useRef(0);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch / mobile devices for graceful fallback
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.innerWidth < 768
      );
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  // Ensure video playback
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  // Global cursor boundary check: strict collapse if cursor leaves PORTFOLIO text
  useEffect(() => {
    if (isTouchDevice) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!textContainerRef.current) return;
      const rect = textContainerRef.current.getBoundingClientRect();
      const padding = 15; // Strict margin around PORTFOLIO headline

      const isInside =
        e.clientX >= rect.left - padding &&
        e.clientX <= rect.right + padding &&
        e.clientY >= rect.top - padding &&
        e.clientY <= rect.bottom + padding;

      if (!isInside && isHoveredRef.current) {
        isHoveredRef.current = false;
        isMouseMovingRef.current = false;
        targetRadiusRef.current = 0;
      }
    };

    const handleWindowMouseLeave = () => {
      isHoveredRef.current = false;
      isMouseMovingRef.current = false;
      targetRadiusRef.current = 0;
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    document.addEventListener("mouseleave", handleWindowMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      document.removeEventListener("mouseleave", handleWindowMouseLeave);
    };
  }, [isTouchDevice]);

  // Organic Ink Spread Path Generator (16 control points + velocity stretch + motion damping)
  const generateInkSpreadPath = (
    cx: number,
    cy: number,
    r: number,
    t: number,
    vx: number,
    vy: number,
    intensity: number
  ): string => {
    const numPoints = 16;
    const points: { x: number; y: number }[] = [];

    for (let i = 0; i < numPoints; i++) {
      const angle = (i * 2 * Math.PI) / numPoints;

      // Multi-harmonic ink ripple frequencies scaled by motion intensity
      const h1 = Math.sin(t * 3.2 + i * 1.9) * 0.20 * intensity;
      const h2 = Math.cos(t * 2.1 - i * 2.5) * 0.14 * intensity;
      const h3 = Math.sin(t * 4.1 + i * 0.8) * 0.08 * intensity;
      const h4 = Math.cos(t * 1.2 + i * 3.4) * 0.10 * intensity;

      // Directional ink droplet stretch in velocity direction
      const dot = (Math.cos(angle) * vx + Math.sin(angle) * vy) * 0.015 * intensity;
      const stretch = Math.max(-0.25, Math.min(0.4, dot));

      const pointRadius = r * (1 + h1 + h2 + h3 + h4 - stretch);
      points.push({
        x: cx + Math.cos(angle) * pointRadius,
        y: cy + Math.sin(angle) * pointRadius,
      });
    }

    // Convert points to smooth closed Catmull-Rom cubic Bezier path
    const tension = 0.27;
    let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;

    for (let i = 0; i < numPoints; i++) {
      const pPrev = points[(i - 1 + numPoints) % numPoints];
      const pCurr = points[i];
      const pNext = points[(i + 1) % numPoints];
      const pAfter = points[(i + 2) % numPoints];

      const cp1x = pCurr.x + (pNext.x - pPrev.x) * tension;
      const cp1y = pCurr.y + (pNext.y - pPrev.y) * tension;

      const cp2x = pNext.x - (pAfter.x - pCurr.x) * tension;
      const cp2y = pNext.y - (pAfter.y - pCurr.y) * tension;

      d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(
        2
      )} ${cp2y.toFixed(2)}, ${pNext.x.toFixed(2)} ${pNext.y.toFixed(2)}`;
    }

    return d + " Z";
  };

  // Main rAF animation loop for fluid ink motion
  useEffect(() => {
    if (isTouchDevice) return;

    let animationFrameId: number;

    const animate = () => {
      const targetIntensity = isHoveredRef.current && isMouseMovingRef.current ? 1 : 0.1;
      morphIntensityRef.current += (targetIntensity - morphIntensityRef.current) * 0.1;

      timeRef.current += 0.02 * morphIntensityRef.current;

      const lerpFactor = 0.12; // Fast responsive hide/show lerp
      const prevX = currentPosRef.current.x;
      const prevY = currentPosRef.current.y;

      // Position interpolation
      currentPosRef.current.x += (targetPosRef.current.x - currentPosRef.current.x) * lerpFactor;
      currentPosRef.current.y += (targetPosRef.current.y - currentPosRef.current.y) * lerpFactor;

      // Velocity tracking
      velocityRef.current.x = currentPosRef.current.x - prevX;
      velocityRef.current.y = currentPosRef.current.y - prevY;

      // Radius interpolation (collapses to 0 immediately when not hovering text)
      currentRadiusRef.current += (targetRadiusRef.current - currentRadiusRef.current) * lerpFactor;

      const r = currentRadiusRef.current;
      const cx = currentPosRef.current.x;
      const cy = currentPosRef.current.y;
      const t = timeRef.current;
      const vx = velocityRef.current.x;
      const vy = velocityRef.current.y;
      const intensity = morphIntensityRef.current;

      if (pathRef.current) {
        if (r > 1 && isHoveredRef.current) {
          const d = generateInkSpreadPath(cx, cy, r, t, vx, vy, intensity);
          pathRef.current.setAttribute("d", d);
        } else {
          pathRef.current.setAttribute("d", "");
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouchDevice]);

  // Mouse event handlers strictly on PORTFOLIO text headline
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    targetPosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    isHoveredRef.current = true;
    isMouseMovingRef.current = true;
    targetRadiusRef.current = Math.min(rect.width * 0.22, 220);

    if (mouseIdleTimerRef.current) {
      clearTimeout(mouseIdleTimerRef.current);
    }

    mouseIdleTimerRef.current = setTimeout(() => {
      isMouseMovingRef.current = false;
    }, 180);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const initialX = e.clientX - rect.left;
    const initialY = e.clientY - rect.top;

    targetPosRef.current = { x: initialX, y: initialY };
    currentPosRef.current = { x: initialX, y: initialY };

    isHoveredRef.current = true;
    isMouseMovingRef.current = true;
    targetRadiusRef.current = Math.min(rect.width * 0.22, 220);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    isHoveredRef.current = false;
    isMouseMovingRef.current = false;
    targetRadiusRef.current = 0;

    if (mouseIdleTimerRef.current) {
      clearTimeout(mouseIdleTimerRef.current);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-start justify-center pt-2 sm:pt-4 md:pt-6 pointer-events-none select-none overflow-hidden"
    >
      {/* SVG Ink ClipPath & Fractal Turbulence Filter */}
      {!isTouchDevice && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <filter id="ink-bleed-filter">
              <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <clipPath id="portfolio-reveal-blob-clip" clipPathUnits="userSpaceOnUse">
              <path ref={pathRef} filter="url(#ink-bleed-filter)" d="" />
            </clipPath>
          </defs>
        </svg>
      )}

      {/* Layer 1: Base Dark PORTFOLIO Typography (Positioned strictly ABOVE photo) */}
      <div
        ref={textContainerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 flex items-center justify-center w-full px-4 text-center cursor-pointer pointer-events-auto"
      >
        <h1 className="font-black uppercase tracking-tighter text-[9.5vw] sm:text-[10.5vw] lg:text-[11vw] leading-none text-[#1e1e24] transition-colors duration-500 drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
          PORTFOLIO
        </h1>
      </div>

      {/* Layer 2: Revealed Video & Glowing White Typography clipped by Ink Spread */}
      {!isTouchDevice && (
        <div
          className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
          style={{
            clipPath: "url(#portfolio-reveal-blob-clip)",
            WebkitClipPath: "url(#portfolio-reveal-blob-clip)",
          }}
        >
          {/* Revealed Background Video */}
          <video
            ref={videoRef}
            src="/videos/portfolio-reveal.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-105"
          />

          {/* Contrast Darkening Overlay */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] pointer-events-none" />

          {/* Glowing White PORTFOLIO Typography inside Revealed Ink Spread */}
          <div className="relative z-10 flex items-start justify-center pt-2 sm:pt-4 md:pt-6 w-full h-full px-4 text-center">
            <h1 className="font-black uppercase tracking-tighter text-[9.5vw] sm:text-[10.5vw] lg:text-[11vw] leading-none text-white drop-shadow-[0_0_35px_rgba(6,182,212,0.85)]">
              PORTFOLIO
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};
