"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function createPanel(
  width: number,
  height: number,
  color: number,
  x: number,
  y: number,
  z: number,
  ry: number,
) {
  const group = new THREE.Group();
  const geometry = new THREE.BoxGeometry(width, height, 0.06);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.78,
  });
  const panel = new THREE.Mesh(geometry, material);
  group.add(panel);

  const border = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    new THREE.LineBasicMaterial({ color: 0x6ee7ff, transparent: true, opacity: 0.42 }),
  );
  group.add(border);

  group.position.set(x, y, z);
  group.rotation.y = ry;
  return group;
}

function createCandle(x: number, open: number, close: number, high: number, low: number) {
  const bullish = close >= open;
  const color = bullish ? 0x34d399 : 0xef4444;
  const group = new THREE.Group();
  const wick = new THREE.Mesh(
    new THREE.BoxGeometry(0.018, Math.max(0.08, high - low), 0.018),
    new THREE.MeshBasicMaterial({ color }),
  );
  wick.position.set(x, (high + low) / 2, 0.08);
  group.add(wick);

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, Math.max(0.08, Math.abs(close - open)), 0.05),
    new THREE.MeshBasicMaterial({ color }),
  );
  body.position.set(x, (open + close) / 2, 0.1);
  group.add(body);
  return group;
}

export default function TradingCockpit() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const fallbackCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const fallbackCanvas = fallbackCanvasRef.current;
    if (!mount || !fallbackCanvas) return;
    const fallbackContext = fallbackCanvas.getContext("2d");
    if (!fallbackContext) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
    camera.position.set(0, 0.7, 7.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true,
    });
    renderer.setClearColor(0x03060b, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const keyLight = new THREE.PointLight(0x64f4ff, 3.5, 16);
    keyLight.position.set(-2.2, 2.4, 4);
    scene.add(keyLight);

    const goldLight = new THREE.PointLight(0xfacc15, 1.8, 12);
    goldLight.position.set(2.4, -1.6, 2.5);
    scene.add(goldLight);
    scene.add(new THREE.AmbientLight(0x8db7ff, 0.55));

    const cockpit = new THREE.Group();
    scene.add(cockpit);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.52, 1),
      new THREE.MeshBasicMaterial({
        color: 0x67e8f9,
        wireframe: true,
        transparent: true,
        opacity: 0.95,
      }),
    );
    core.position.set(0, 0.02, 1.05);
    cockpit.add(core);

    const panels = [
      createPanel(2.45, 1.55, 0x071827, -1.55, 0.75, 0, 0.42),
      createPanel(2.1, 1.3, 0x111827, 1.45, 0.82, -0.25, -0.38),
      createPanel(1.85, 1.1, 0x0b1220, -0.85, -1.0, 0.18, 0.18),
      createPanel(1.95, 1.05, 0x10151f, 1.25, -0.95, 0.1, -0.22),
    ];

    panels.forEach((panel) => cockpit.add(panel));

    const candleData = [
      [0.0, 0.28, 0.58, 0.72, 0.18],
      [0.22, 0.56, 0.4, 0.68, 0.32],
      [0.44, 0.42, 0.82, 0.92, 0.35],
      [0.66, 0.8, 0.64, 0.98, 0.56],
      [0.88, 0.66, 1.0, 1.12, 0.58],
      [1.1, 0.98, 0.78, 1.08, 0.68],
      [1.32, 0.8, 1.16, 1.25, 0.74],
    ];

    const niftyChart = new THREE.Group();
    candleData.forEach(([x, open, close, high, low]) => {
      niftyChart.add(createCandle(x - 0.68, open - 0.6, close - 0.6, high - 0.6, low - 0.6));
    });
    niftyChart.position.set(-1.95, 0.48, 0.28);
    niftyChart.rotation.y = 0.42;
    cockpit.add(niftyChart);

    const optionChain = new THREE.Group();
    for (let row = 0; row < 5; row += 1) {
      for (let col = 0; col < 5; col += 1) {
        const isHot = (row + col) % 3 === 0;
        const cell = new THREE.Mesh(
          new THREE.BoxGeometry(0.16, 0.1, 0.025),
          new THREE.MeshBasicMaterial({
            color: isHot ? 0x22c55e : 0x0ea5e9,
            transparent: true,
            opacity: isHot ? 0.9 : 0.48,
          }),
        );
        cell.position.set(col * 0.22, row * 0.15, 0.08);
        optionChain.add(cell);
      }
    }
    optionChain.position.set(0.98, 0.45, 0.04);
    optionChain.rotation.y = -0.38;
    cockpit.add(optionChain);

    const shieldShape = new THREE.Shape();
    shieldShape.moveTo(0, 0.7);
    shieldShape.lineTo(0.52, 0.42);
    shieldShape.lineTo(0.4, -0.34);
    shieldShape.lineTo(0, -0.72);
    shieldShape.lineTo(-0.4, -0.34);
    shieldShape.lineTo(-0.52, 0.42);
    shieldShape.lineTo(0, 0.7);

    const shield = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shieldShape, { depth: 0.08, bevelEnabled: true, bevelSize: 0.025, bevelThickness: 0.025 }),
      new THREE.MeshPhysicalMaterial({
        color: 0x0f172a,
        emissive: 0x22d3ee,
        emissiveIntensity: 0.28,
        roughness: 0.16,
        metalness: 0.65,
        transparent: true,
        opacity: 0.92,
      }),
    );
    shield.position.set(0, -0.04, 0.72);
    cockpit.add(shield);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.08, 0.012, 16, 128),
      new THREE.MeshBasicMaterial({ color: 0x67e8f9, transparent: true, opacity: 0.55 }),
    );
    ring.rotation.x = Math.PI / 2.7;
    ring.position.set(0, -0.04, 0.6);
    cockpit.add(ring);

    const supportLine = new THREE.Mesh(
      new THREE.BoxGeometry(3.25, 0.018, 0.018),
      new THREE.MeshBasicMaterial({ color: 0x22c55e }),
    );
    supportLine.position.set(-0.2, -0.38, 0.55);
    cockpit.add(supportLine);

    const stopLine = new THREE.Mesh(
      new THREE.BoxGeometry(2.75, 0.018, 0.018),
      new THREE.MeshBasicMaterial({ color: 0xef4444 }),
    );
    stopLine.position.set(0.28, -0.62, 0.58);
    cockpit.add(stopLine);

    const particles = new THREE.Group();
    const dotMaterial = new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.55 });
    for (let i = 0; i < 72; i += 1) {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.014, 8, 8), dotMaterial);
      dot.position.set(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4.2,
        (Math.random() - 0.5) * 2.8,
      );
      particles.add(dot);
    }
    scene.add(particles);

    const drawFallback = (time: number) => {
      const width = fallbackCanvas.width;
      const height = fallbackCanvas.height;
      fallbackContext.clearRect(0, 0, width, height);
      const gradient = fallbackContext.createRadialGradient(
        width * 0.5,
        height * 0.48,
        30,
        width * 0.5,
        height * 0.48,
        width * 0.62,
      );
      gradient.addColorStop(0, "rgba(103, 232, 249, 0.24)");
      gradient.addColorStop(0.45, "rgba(37, 99, 235, 0.1)");
      gradient.addColorStop(1, "rgba(3, 6, 11, 0)");
      fallbackContext.fillStyle = gradient;
      fallbackContext.fillRect(0, 0, width, height);

      fallbackContext.strokeStyle = "rgba(103, 232, 249, 0.16)";
      fallbackContext.lineWidth = 1;
      for (let x = 0; x < width; x += 34) {
        fallbackContext.beginPath();
        fallbackContext.moveTo(x + Math.sin(time + x) * 2, height * 0.22);
        fallbackContext.lineTo(x - width * 0.16, height * 0.9);
        fallbackContext.stroke();
      }

      for (let i = 0; i < 42; i += 1) {
        const x = (Math.sin(time * 0.7 + i * 2.7) * 0.45 + 0.5) * width;
        const y = (Math.cos(time * 0.5 + i * 1.9) * 0.35 + 0.5) * height;
        fallbackContext.fillStyle = i % 5 === 0 ? "rgba(52, 211, 153, 0.65)" : "rgba(96, 165, 250, 0.55)";
        fallbackContext.fillRect(x, y, 2, 2);
      }
    };

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height);
      fallbackCanvas.width = width;
      fallbackCanvas.height = height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    let animationId = 0;
    const animate = () => {
      frame += 0.01;
      cockpit.rotation.y = Math.sin(frame * 0.7) * 0.12;
      cockpit.rotation.x = Math.sin(frame * 0.45) * 0.035;
      ring.rotation.z += 0.008;
      shield.rotation.y += 0.006;
      core.rotation.x += 0.006;
      core.rotation.y += 0.01;
      particles.rotation.y -= 0.002;
      supportLine.material.opacity = 0.65 + Math.sin(frame * 3) * 0.22;
      drawFallback(frame);
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      className="relative h-[420px] w-full overflow-hidden bg-[#03060b] sm:h-[520px] lg:h-[640px]"
      aria-label="Animated 3D trading cockpit with charts, option chain, and risk shield"
    >
      <canvas ref={fallbackCanvasRef} className="absolute inset-0 h-full w-full" />
      <div ref={mountRef} className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 [perspective:1100px]">
        <div className="absolute left-[8%] top-[16%] h-[34%] w-[38%] animate-[floatPanel_7s_ease-in-out_infinite] rounded-lg border border-cyan-200/30 bg-cyan-300/[0.08] p-4 shadow-[0_0_45px_rgba(34,211,238,0.22)] backdrop-blur-md [transform:rotateY(24deg)_rotateX(5deg)]">
          <div className="flex h-full items-end gap-2">
            {[42, 70, 54, 88, 62, 96, 74].map((height, index) => (
              <span
                key={index}
                className={`w-5 rounded-t-sm ${index % 2 ? "bg-red-400" : "bg-emerald-300"}`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="absolute left-4 top-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-100">
            NIFTY chart
          </div>
          <div className="absolute left-0 right-0 top-[62%] h-px bg-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.8)]" />
          <div className="absolute left-0 right-0 top-[78%] h-px bg-red-400 shadow-[0_0_18px_rgba(248,113,113,0.8)]" />
        </div>

        <div className="absolute right-[7%] top-[18%] grid h-[30%] w-[34%] animate-[floatPanel_8s_ease-in-out_infinite_reverse] grid-cols-5 gap-2 rounded-lg border border-blue-300/25 bg-blue-500/[0.07] p-4 shadow-[0_0_45px_rgba(59,130,246,0.22)] backdrop-blur-md [transform:rotateY(-26deg)_rotateX(6deg)]">
          {Array.from({ length: 25 }).map((_, index) => (
            <span
              key={index}
              className={`rounded-sm ${index % 4 === 0 ? "bg-emerald-300/85" : index % 5 === 0 ? "bg-red-400/75" : "bg-cyan-300/45"}`}
            />
          ))}
          <div className="absolute left-4 top-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-100">
            Option chain
          </div>
        </div>

        <div className="absolute bottom-[19%] left-[15%] h-[26%] w-[30%] animate-[floatPanel_9s_ease-in-out_infinite] rounded-lg border border-emerald-300/25 bg-emerald-300/[0.065] p-4 shadow-[0_0_42px_rgba(34,197,94,0.2)] backdrop-blur-md [transform:rotateY(16deg)_rotateX(-10deg)]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-100">
            Risk meter
          </div>
          <div className="mt-8 h-3 rounded-full bg-slate-900">
            <div className="h-full w-[64%] rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-500" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 text-[10px] font-semibold text-slate-200">
            <span className="rounded-md border border-white/10 bg-black/30 p-2">Risk 1R</span>
            <span className="rounded-md border border-white/10 bg-black/30 p-2">Target 2R</span>
          </div>
        </div>

        <div className="absolute bottom-[18%] right-[14%] h-[25%] w-[31%] animate-[floatPanel_6.5s_ease-in-out_infinite_reverse] rounded-lg border border-yellow-200/20 bg-yellow-300/[0.055] p-4 shadow-[0_0_42px_rgba(250,204,21,0.12)] backdrop-blur-md [transform:rotateY(-18deg)_rotateX(-9deg)]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-yellow-100">
            MCX Gold · Crude
          </div>
          <div className="mt-7 h-16 rounded-md border border-white/10 bg-[linear-gradient(135deg,rgba(250,204,21,0.18),transparent),repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0_1px,transparent_1px_18px)]" />
        </div>

        <div className="absolute left-1/2 top-1/2 grid h-36 w-36 -translate-x-1/2 -translate-y-1/2 animate-[shieldPulse_4s_ease-in-out_infinite] place-items-center rounded-[32%] border border-cyan-200/40 bg-slate-950/80 shadow-[0_0_70px_rgba(34,211,238,0.35)] [transform-style:preserve-3d]">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Double
            </p>
            <p className="mt-1 text-2xl font-semibold text-white">Hedged</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
              Shield
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
