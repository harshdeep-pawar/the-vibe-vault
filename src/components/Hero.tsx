"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [badgeVisible, setBadgeVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll-linked parallax
  const { scrollY } = useScroll();
  const headlineY = useTransform(scrollY, [0, 400], [0, -60]);
  const headlineOpacity = useTransform(scrollY, [0, 300], [1, 0.4]);

  // Spring mouse parallax for card
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const springX = useSpring(rawMouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(rawMouseY, { stiffness: 60, damping: 20 });

  // Floating image parallax (spring)
  const float1X = useSpring(useMotionValue(0), { stiffness: 40, damping: 18 });
  const float1Y = useSpring(useMotionValue(0), { stiffness: 40, damping: 18 });
  const float2X = useSpring(useMotionValue(0), { stiffness: 30, damping: 16 });
  const float2Y = useSpring(useMotionValue(0), { stiffness: 30, damping: 16 });

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

  // Badge entrance
  useEffect(() => {
    const t = setTimeout(() => setBadgeVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = (ev: React.MouseEvent) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (ev.clientX - rect.left) / rect.width - 0.5;
    const ny = (ev.clientY - rect.top) / rect.height - 0.5;
    setMouseX(nx);
    setMouseY(ny);
    rawMouseX.set(nx * 12);
    rawMouseY.set(ny * 8);
    float1X.set(nx * -22);
    float1Y.set(ny * -18);
    float2X.set(nx * 18);
    float2Y.set(ny * 22);
  };

  // Headline words for staggered reveal
  const headlineWords = ["THE", "VIBE", "VAULT"];

  // Container variant for staggered children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  // Word reveal: slide up from clip
  const wordVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
    }),
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 70, rotateY: -10 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.3 },
    },
  };

  return (
    <header
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-32 sm:pt-36 pb-20 flex items-center overflow-hidden z-10 select-none"
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] -top-[200px] -left-[200px] bg-gold/12 blur-[130px] rounded-full"
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] -bottom-[150px] -right-[100px] bg-gold/8 blur-[120px] rounded-full"
          animate={{
            x: [0, -50, 30, 0],
            y: [0, -40, 20, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 34, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        <motion.div
          className="absolute w-[200px] h-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold/5 blur-[80px] rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto grid lg:grid-cols-[1.15fr_1fr] gap-10 xl:gap-16 items-center px-4 sm:px-6 relative z-10">
        {/* Copy Column */}
        <motion.div
          className="flex flex-col text-left"
          style={{ y: headlineY, opacity: headlineOpacity }}
        >
          {/* Badge */}
          <AnimatePresence>
            {badgeVisible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2.5 px-5 py-2 w-fit bg-gold/10 border border-gold/25 rounded-full text-gold font-heading text-[10px] font-bold tracking-[1.5px] uppercase mb-6 sm:mb-8"
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-gold"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <Sparkles className="w-3 h-3 opacity-70" />
                New drop live 2026
              </motion.div>
            )}
          </AnimatePresence>

          {/* Headline — word-by-word staggered reveal */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-heading text-[44px] sm:text-[64px] md:text-[76px] lg:text-[80px] xl:text-[88px] font-black leading-[1.0] tracking-[-3px] sm:tracking-[-4px] text-white flex flex-wrap gap-x-5 overflow-hidden"
          >
            {headlineWords.map((word, i) => (
              <span key={word} className="overflow-hidden inline-block">
                <motion.span
                  variants={wordVariants}
                  className={`inline-block ${
                    word === "VIBE"
                      ? "bg-gradient-to-r from-gold via-[#f0e0b0] to-gold-strong bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer"
                      : "text-white"
                  }`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* Typing Text */}
          <motion.div
            custom={0.5}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-4 sm:mt-5 font-heading text-[16px] sm:text-[20px] md:text-[22px] text-gold-strong font-medium min-h-[28px] sm:min-h-[32px]"
          >
            {typedText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              className="text-gold ml-0.5"
            >
              |
            </motion.span>
          </motion.div>

          {/* Description */}
          <motion.p
            custom={0.65}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-5 sm:mt-6 text-text-dim text-[14px] sm:text-[15px] md:text-[16px] leading-[1.85] max-w-[480px]"
          >
            Premium men&apos;s fits curated in Indore. Bold streetwear, tailored layers,
            and everyday essentials built to keep your vibe high.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={0.82}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-7 sm:mt-9 flex flex-wrap gap-3 sm:gap-4"
          >
            {/* Primary CTA */}
            <a
              href="#categories"
              className="relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-gold via-[#e8d5a3] to-gold-strong bg-[length:200%_auto] text-luxury-black font-button font-bold text-[12px] sm:text-[13px] uppercase tracking-[1.2px] rounded-xl overflow-hidden group shadow-[0_8px_30px_rgba(201,169,97,0.25)] hover:shadow-[0_16px_44px_rgba(201,169,97,0.4)] hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Shimmer sweep on hover */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out skew-x-[-20deg]" />
              <span className="relative z-10 flex items-center gap-2.5">
                Shop Now
                <motion.span
                  className="inline-flex"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </span>
            </a>

            {/* Secondary CTA */}
            <a
              href="#featured"
              className="relative inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 border border-gold/30 text-gold font-button font-bold text-[12px] sm:text-[13px] uppercase tracking-[1.2px] rounded-xl overflow-hidden group hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Border glow pulse on hover */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 shadow-[inset_0_0_20px_rgba(201,169,97,0.12)] rounded-xl" />
              <span className="absolute inset-0 rounded-xl border border-gold/0 group-hover:border-gold/60 transition-all duration-400" />
              <span className="relative z-10 group-hover:text-gold-strong transition-colors duration-300">
                Explore Collection
              </span>
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            custom={1.0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 sm:mt-10 flex items-center gap-4 sm:gap-6"
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-luxury-black bg-gradient-to-br from-gold/40 to-gold/20 flex items-center justify-center text-[9px] font-bold text-gold"
                >
                  {["A", "R", "M", "S"][i]}
                </div>
              ))}
            </div>
            <div className="text-[12px] sm:text-[13px] text-text-dim leading-tight">
              <span className="text-gold font-semibold">500+</span> happy customers
              <br />
              <span className="text-[11px] opacity-70">⭐⭐⭐⭐⭐ Indore&apos;s finest</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Interactive Card Column */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          style={{
            rotateX: springY,
            rotateY: springX,
            transformPerspective: 1000,
          }}
          className="relative max-w-full glass rounded-3xl p-7 sm:p-9 shadow-2xl flex flex-col justify-between overflow-hidden group border border-gold/15 hover:border-gold/25 transition-colors duration-500"
        >
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,169,97,0.08)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,169,97,0.05)_0%,transparent_70%)] pointer-events-none" />

          <div className="flex flex-col items-center">
            <div className="relative w-36 sm:w-40 h-14 sm:h-16 mb-5 select-none">
              <Image
                src="/logo.png"
                alt="The Vibe Vault Logo"
                fill
                sizes="160px"
                className="object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] group-hover:scale-[1.04] transition-transform duration-400"
              />
            </div>
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-black/80 border border-gold/15 text-gold font-heading text-[11px] font-bold tracking-[2px] mb-7 sm:mb-8 select-none">
              <motion.div
                className="w-9 h-9 border-2 border-gold rounded-lg flex items-center justify-center font-black text-gold"
                whileHover={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.4 }}
              >
                VV
              </motion.div>
              <span>THE VIBE VAULT</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2 text-center">
            {[
              { label: "New Drop", sub: "Street + Tailored" },
              { label: "Indore", sub: "Station Road, Rau" },
              { label: "DM", sub: "Instagram orders" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="bg-gold/[0.04] hover:bg-gold/10 border border-gold/[0.08] hover:border-gold/25 rounded-xl p-3 sm:p-3.5 transition-all duration-300 cursor-default"
              >
                <h3 className="text-gold font-heading text-[15px] sm:text-[18px] font-extrabold leading-tight">
                  {item.label}
                </h3>
                <p className="text-text-dim text-[10px] sm:text-[11px] mt-1 font-medium">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Clothing Visuals — visible from lg */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: 8 }}
        animate={{ opacity: 0.85, scale: 1, rotate: 8 }}
        transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: float1X, y: float1Y }}
        className="hidden xl:block absolute w-[110px] h-[155px] top-[20%] right-[38%] rounded-2xl overflow-hidden shadow-2xl border border-gold/12 z-[2] select-none hover:opacity-100 hover:scale-105 transition-transform duration-300"
      >
        <Image src="/Jackets.jpg" alt="Premium Jacket" fill sizes="120px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
        animate={{ opacity: 0.85, scale: 1, rotate: -5 }}
        transition={{ delay: 1.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: float2X, y: float2Y }}
        className="hidden xl:block absolute w-[95px] h-[135px] bottom-[16%] right-[33%] rounded-2xl overflow-hidden shadow-2xl border border-gold/12 z-[2] select-none hover:opacity-100 hover:scale-105 transition-transform duration-300"
      >
        <Image src="/cargo pants.webp" alt="Street Cargo" fill sizes="100px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-dim text-[10px] tracking-[3px] uppercase font-heading font-medium select-none"
      >
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll
        </motion.span>
        <div className="relative w-[1px] h-10 overflow-hidden bg-gold/10 rounded-full">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold to-transparent rounded-full"
            animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </header>
  );
}
