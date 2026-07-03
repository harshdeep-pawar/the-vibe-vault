"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);

  const phrases = [
    "Streetwear Energy",
    "Tailored Modern Fits",
    "Premium Indore Quality",
    "Bold Wardrobe Drops",
  ];

  // Typing effect
  useEffect(() => {
    let pi = 0;
    let ci = 0;
    let deleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const phrase = phrases[pi];
      if (!deleting) {
        ci++;
        setTypedText(phrase.substring(0, ci));
        if (ci === phrase.length) {
          deleting = true;
          timeoutId = setTimeout(type, 2000);
          return;
        }
        timeoutId = setTimeout(type, 70);
      } else {
        ci--;
        setTypedText(phrase.substring(0, ci));
        if (ci === 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
          timeoutId = setTimeout(type, 500);
          return;
        }
        timeoutId = setTimeout(type, 35);
      }
    };

    timeoutId = setTimeout(type, 1500);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleMouseMove = (ev: React.MouseEvent) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMousePos({
      x: (ev.clientX - rect.left) / rect.width - 0.5,
      y: (ev.clientY - rect.top) / rect.height - 0.5,
    });
  };

  return (
    <header
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-28 pb-20 flex items-center overflow-hidden z-10 select-none"
    >
      {/* Background Animated Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[600px] h-[600px] -top-[150px] -left-[150px] bg-gold/15 blur-[120px] rounded-full animate-float-1" />
        <div className="absolute w-[500px] h-[500px] -bottom-[120px] -right-[80px] bg-gold/10 blur-[120px] rounded-full animate-float-2" />
      </div>

      <div className="container mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center px-6 relative z-10">
        {/* Copy Column */}
        <div className="flex flex-col text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 w-fit bg-gold/10 border border-gold/20 rounded-full text-gold font-heading text-[10px] font-bold tracking-[1.5px] uppercase mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
            New drop live 2025
          </motion.div>

          <h1 className="font-heading text-[48px] sm:text-[68px] lg:text-[80px] font-black leading-[1.02] tracking-[-3px] text-white">
            THE{" "}
            <span className="bg-gradient-to-r from-gold via-[#e8d5a3] to-gold bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer">
              VIBE
            </span>{" "}
            VAULT
          </h1>

          <div className="mt-4 font-heading text-[18px] sm:text-[22px] text-gold-strong font-medium min-h-[30px]">
            {typedText}
            <span className="text-gold animate-pulse">|</span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-text-dim text-[15px] sm:text-[16px] leading-[1.8] max-w-[520px]"
          >
            Premium men&apos;s fits curated in Indore. Bold streetwear, tailored layers, and everyday essentials built to keep your vibe high.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#categories"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-gold via-[#e8d5a3] to-gold bg-[length:200%_auto] text-luxury-black font-button font-bold text-[13px] uppercase tracking-[1px] rounded-xl hover:shadow-[0_14px_40px_rgba(201,169,97,0.35)] hover:-translate-y-1 transition-all duration-300 magnetic-btn group"
            >
              Shop Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
            <a
              href="#featured"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-gold/25 hover:border-gold hover:bg-gold hover:text-luxury-black text-gold font-button font-bold text-[13px] uppercase tracking-[1px] rounded-xl hover:-translate-y-1 transition-all duration-300 magnetic-btn"
            >
              Explore Collection
            </a>
          </motion.div>
        </div>

        {/* 3D Interactive Card Column */}
        <motion.div
          initial={{ opacity: 0, x: 80, rotateY: -8 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          style={{
            transform: `perspective(1000px) rotateX(${mousePos.y * 8}deg) rotateY(${-mousePos.x * 8}deg)`,
            transition: "transform 0.15s ease-out",
          }}
          className="relative max-w-full glass rounded-3xl p-8 sm:p-9 shadow-2xl flex flex-col justify-between overflow-hidden group border-gold/15"
        >
          {/* Decorative radial gradient */}
          <div className="absolute inset-0 bg-radial-gradient from-gold/5 via-transparent to-transparent pointer-events-none" />

          <div className="flex flex-col items-center">
            <div className="relative w-40 h-16 mb-4 select-none">
              <Image
                src="/logo.png"
                alt="The Vibe Vault Logo"
                fill
                sizes="160px"
                className="object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] group-hover:scale-[1.03] transition-transform duration-300"
              />
            </div>
            <div className="inline-flex items-center gap-3 px-4.5 py-3 rounded-xl bg-black/80 border border-gold/15 text-gold font-heading text-[11px] font-bold tracking-[2px] mb-8 select-none">
              <div className="w-[38px] h-[38px] border-2 border-gold rounded-lg flex items-center justify-center font-black">
                VV
              </div>
              <span>THE VIBE VAULT</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div className="bg-gold/[0.04] hover:bg-gold/10 border border-gold/[0.08] hover:border-gold/20 rounded-xl p-3.5 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-gold font-heading text-[18px] font-extrabold">New Drop</h3>
              <p className="text-text-dim text-[11px] mt-1 font-medium">Street + Tailored</p>
            </div>
            <div className="bg-gold/[0.04] hover:bg-gold/10 border border-gold/[0.08] hover:border-gold/20 rounded-xl p-3.5 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-gold font-heading text-[18px] font-extrabold">Indore</h3>
              <p className="text-text-dim text-[11px] mt-1 font-medium">Station Road, Rau</p>
            </div>
            <div className="bg-gold/[0.04] hover:bg-gold/10 border border-gold/[0.08] hover:border-gold/20 rounded-xl p-3.5 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-gold font-heading text-[18px] font-extrabold">DM</h3>
              <p className="text-text-dim text-[11px] mt-1 font-medium">Instagram orders</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Clothing Visuals */}
      <div
        className="hidden xl:block absolute w-[120px] h-[160px] top-[20%] right-[38%] rounded-2xl overflow-hidden shadow-2xl border border-gold/10 transition-transform duration-300 ease-out z-[2] select-none opacity-80 hover:opacity-100"
        style={{ transform: `rotate(8deg) translateY(${mousePos.y * -20}px)` }}
      >
        <Image src="/Jackets.jpg" alt="Premium Jacket" fill sizes="120px" className="object-cover" />
      </div>
      <div
        className="hidden xl:block absolute w-[100px] h-[140px] bottom-[15%] right-[32%] rounded-2xl overflow-hidden shadow-2xl border border-gold/10 transition-transform duration-300 ease-out z-[2] select-none opacity-80 hover:opacity-100"
        style={{ transform: `rotate(-5deg) translateY(${mousePos.y * 20}px)` }}
      >
        <Image src="/cargo pants.webp" alt="Street Cargo" fill sizes="100px" className="object-cover" />
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-dim text-[10px] tracking-[3px] uppercase font-heading font-medium opacity-80 animate-bounce select-none">
        <span>Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </header>
  );
}
