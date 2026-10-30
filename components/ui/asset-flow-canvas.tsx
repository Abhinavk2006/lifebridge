"use client";

import { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Edge {
  from: number;
  to: number;
}

interface Pulse {
  edgeIndex: number;
  progress: number; // 0 to 1
  speed: number;
}

export function AssetFlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let isVisible = true;

    // Resize canvas
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Pause when out of view
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    // Seeded Nodes Layout (24 nodes)
    const width = canvas.width;
    const height = canvas.height;
    const nodeCount = 24;
    const nodes: Node[] = [];

    // Simple pseudo-random generator for consistent positions per session
    let seed = 42;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: random() * width,
        y: random() * height,
        vx: (random() - 0.5) * 0.25,
        vy: (random() - 0.5) * 0.25,
        radius: random() * 2 + 2,
      });
    }

    // Connect nearby nodes into edges
    const edges: Edge[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < width * 0.28) {
          edges.push({ from: i, to: j });
        }
      }
    }

    // Active pulses (2-3 bright dots moving along edges)
    const pulses: Pulse[] = [];
    const createPulse = () => {
      if (edges.length === 0) return;
      const edgeIndex = Math.floor(random() * edges.length);
      pulses.push({
        edgeIndex,
        progress: 0,
        speed: 0.008 + random() * 0.006, // ~2s travel time
      });
    };

    // Initial pulses
    createPulse();
    createPulse();
    createPulse();

    let lastTime = performance.now();
    const fpsInterval = 1000 / 30; // Throttle to 30fps budget

    const render = (now: number) => {
      animFrameId = requestAnimationFrame(render);

      if (!isVisible) return;

      const elapsed = now - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = now - (elapsed % fpsInterval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Edges (thin lines in primary #0E2E52 at 6% opacity)
      ctx.lineWidth = 1;
      edges.forEach((edge) => {
        const p1 = nodes[edge.from];
        const p2 = nodes[edge.to];
        ctx.strokeStyle = "rgba(14, 46, 82, 0.08)";
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Update & Draw Nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.fillStyle = "rgba(14, 46, 82, 0.12)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update & Draw Pulses (bright gold #B8935B dots)
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;

        const edge = edges[p.edgeIndex];
        if (edge) {
          const p1 = nodes[edge.from];
          const p2 = nodes[edge.to];

          const currentX = p1.x + (p2.x - p1.x) * p.progress;
          const currentY = p1.y + (p2.y - p1.y) * p.progress;

          // Fade in and out
          const alpha = Math.sin(p.progress * Math.PI) * 0.8;

          ctx.fillStyle = `rgba(184, 147, 91, ${alpha})`;
          ctx.shadowColor = "rgba(184, 147, 91, 0.6)";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(currentX, currentY, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        if (p.progress >= 1) {
          pulses.splice(i, 1);
          createPulse(); // Replenish pulse
        }
      }
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20%" cy="30%" r="3" fill="#0E2E52" />
        <circle cx="70%" cy="40%" r="4" fill="#B8935B" />
        <line x1="20%" y1="30%" x2="70%" y2="40%" stroke="#0E2E52" strokeWidth="1" />
      </svg>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
