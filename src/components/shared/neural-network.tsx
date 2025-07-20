'use client'

import React, { useRef, useEffect } from 'react';

export function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const dpr = window.devicePixelRatio || 1;
    let rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    let width = canvas.width / dpr;
    let height = canvas.height / dpr;

    const nodes: { x: number; y: number; originalX: number; originalY: number; vx: number; vy: number; }[] = [];
    const numNodes = 50;
    const connectionRadius = 100;
    const primaryColor = '#BFFF00'; // Electric Lime

    for (let i = 0; i < numNodes; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      nodes.push({
        x: x,
        y: y,
        originalX: x,
        originalY: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(node => {
        // Move node
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Parallax effect
        const dxMouse = node.x - mousePos.current.x;
        const dyMouse = node.y - mousePos.current.y;
        const distMouse = Math.sqrt(dxMouse*dxMouse + dyMouse*dyMouse);
        
        const parallaxForce = Math.max(0, 50 - distMouse) / 50;
        node.x += dxMouse * 0.001 * parallaxForce;
        node.y += dyMouse * 0.001 * parallaxForce;
      });

      for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionRadius) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(191, 255, 0, ${1 - dist / connectionRadius})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = primaryColor;
        ctx.fill();
      });

      requestAnimationFrame(update);
    };

    update();
    
    const handleResize = () => {
        rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        width = canvas.width / dpr;
        height = canvas.height / dpr;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };

  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
