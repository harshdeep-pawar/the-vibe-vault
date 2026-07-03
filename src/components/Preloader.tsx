"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phrase, setPhrase] = useState("Curating vibes...");
  const [isHidden, setIsHidden] = useState(false);

  const preloaderPhrases = [
    "Curating vibes...",
    "Selecting premium fabrics...",
    "Stitching streetwear staples...",
    "Ready to drop..."
  ];

  useEffect(() => {
    // Run preloader percentage count
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 12 + 4);
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Set text based on percentage
    const idx = Math.floor((progress / 100) * preloaderPhrases.length);
    setPhrase(preloaderPhrases[idx] || preloaderPhrases[preloaderPhrases.length - 1]);

    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsHidden(true);
        document.body.classList.remove("loading");
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (isHidden) return null;

  return (
    <div
      id="preloader"
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050505] transition-all duration-800 cubic-bezier(0.16, 1, 0.3, 1) ${
        progress === 100 ? "opacity-0 invisible scale-[1.05]" : "opacity-100 visible scale-100"
      }`}
    >
      <div className="font-heading text-[72px] font-black text-gold tracking-[12px] animate-pulse relative drop-shadow-[0_0_60px_rgba(201,169,97,0.3)]">
        VV
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-gradient-to-r from-gold via-[#e8d5a3] to-gold rounded-full" />
      </div>
      <div className="mt-9 text-[11px] tracking-[8px] uppercase text-text-dim font-heading font-medium">
        {phrase}
      </div>
      <div className="mt-7 w-[220px] h-[2px] bg-gold/10 rounded-full overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-gold via-[#e8d5a3] to-gold transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-3.5 font-heading text-[13px] text-gold/60 font-semibold tracking-[3px]">
        {progress}%
      </div>
    </div>
  );
}
