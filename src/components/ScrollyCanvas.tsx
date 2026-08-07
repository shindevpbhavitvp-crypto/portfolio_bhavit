"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";

const TOTAL_FRAMES = 150;
const BACKGROUND_COLOR = "#121212";

// Helper function to pad frame index numbers (0 -> "000", 1 -> "001", 149 -> "149")
const getFrameFilename = (index: number) => {
  const paddedIndex = String(index).padStart(3, "0");
  return `/sequence/frame_${paddedIndex}_delay-0.067s.png`;
};

interface ScrollyCanvasProps {
  children?: React.ReactNode;
}

export const ScrollyCanvas: React.FC<ScrollyCanvasProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const currentFrameRef = useRef<number>(0);

  // Framer Motion scroll tracking over the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map 0 -> 1 progress smoothly to 0 -> 149 frame index
  const frameIndexMotion = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Preload all 150 frames into memory
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameFilename(i);

      img.onload = () => {
        if (!isMounted) return;
        count++;
        setLoadProgress(Math.floor((count / TOTAL_FRAMES) * 100));

        if (count === TOTAL_FRAMES) {
          setImages(loadedImages);
          setImagesLoaded(true);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        count++;
        setLoadProgress(Math.floor((count / TOTAL_FRAMES) * 100));
        if (count === TOTAL_FRAMES) {
          setImages(loadedImages);
          setImagesLoaded(true);
        }
      };

      loadedImages.push(img);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Draw frame on Canvas using aspect-ratio 'cover' logic
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      // Clear canvas with matching background color #121212
      ctx.fillStyle = BACKGROUND_COLOR;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // object-fit: cover math algorithm
      const imgAspect = imgWidth / imgHeight;
      const canvasAspect = canvasWidth / canvasHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasAspect > imgAspect) {
        drawHeight = canvasWidth / imgAspect;
        offsetY = (canvasHeight - drawHeight) / 2;
      } else {
        drawWidth = canvasHeight * imgAspect;
        offsetX = (canvasWidth - drawWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    },
    [images]
  );

  // Resize canvas to match window dimensions with DPR support
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    // Redraw current frame on resize
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Handle Canvas Resizing
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Redraw canvas when images finish loading
  useEffect(() => {
    if (imagesLoaded) {
      drawFrame(0);
    }
  }, [imagesLoaded, drawFrame]);

  // Listen to frame index motion changes on scroll
  useMotionValueEvent(frameIndexMotion, "change", (latestIndex) => {
    const targetIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(latestIndex))
    );
    if (targetIndex !== currentFrameRef.current) {
      currentFrameRef.current = targetIndex;
      if (imagesLoaded) {
        requestAnimationFrame(() => drawFrame(targetIndex));
      }
    }
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
      {/* Sticky Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
        <canvas
          ref={canvasRef}
          className="block h-full w-full object-cover pointer-events-none"
        />

        {/* Preloader overlay while frames buffer */}
        {!imagesLoaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#121212] text-white">
            <div className="relative flex flex-col items-center">
              {/* Pulsing ring */}
              <div className="h-16 w-16 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin mb-6" />
              <p className="font-mono text-sm tracking-widest uppercase text-cyan-400">
                Loading Experience
              </p>
              <div className="mt-4 h-1.5 w-48 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ease-out"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <span className="mt-2 font-mono text-xs text-gray-400">
                {loadProgress}%
              </span>
            </div>
          </div>
        )}

        {/* Parallax Overlay Children passed in */}
        {children}
      </div>
    </div>
  );
};
