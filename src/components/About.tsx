"use client";

import Image from "next/image";
import { Info } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 relative select-none">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="pill inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full text-gold font-heading text-[10px] font-bold tracking-[1.5px] uppercase mb-4">
              <Info className="w-3 h-3" />
              About Us
            </div>
            <h2 className="font-heading text-[32px] sm:text-[48px] font-black leading-tight tracking-[-1.5px] text-white">
              Fashion Meets Energy
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="about-text p-8 sm:p-11 bg-luxury-gray border border-gold/10 rounded-3xl relative overflow-hidden group">
            {/* Top gradient shimmer border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold to-gold-strong" />
            <p className="text-text-dim text-[15px] sm:text-[16px] leading-[1.9]">
              The Vibe Vault is Indore&apos;s premium destination for men&apos;s fashion. We blend street-ready silhouettes with elevated tailoring so you can carry energy from day to night.
            </p>
            <br />
            <p className="text-text-dim text-[15px] sm:text-[16px] leading-[1.9]">
              Every drop is curated to keep your look sharp, confident, and authentically you. From casual tees to formal blazers — we&apos;ve got your entire wardrobe covered with style that speaks.
            </p>
          </div>

          <div className="relative h-[320px] sm:h-[420px] rounded-3xl overflow-hidden border border-gold/10 hover:border-gold/20 hover:shadow-glow transition-all duration-500 group select-none">
            <Image
              src="/Pant & Shirt Combination.jpg"
              alt="The Vibe Vault Style"
              fill
              sizes="(max-width: 768px) 100vw, 550px"
              className="object-cover transition-transform duration-700 group-hover:scale-106"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <hr className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent border-none" />
    </section>
  );
}
