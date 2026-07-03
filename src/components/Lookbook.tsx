"use client";

import Image from "next/image";
import { Images, ArrowUpRight } from "lucide-react";

export default function Lookbook() {
  const imgs = [
    { src: "/Pant & Shirt Combination.jpg", label: "Pant & Shirt Styles" },
    { src: "/Sweaters.jpg", label: "Knit Sweaters Collection" },
    { src: "/Sweatshirts.webp", label: "Street Sweatshirts Drop" },
    { src: "/T-Shirt, Jeans with Jacket.jpg", label: "Urban Jacket Lookbook" },
    { src: "/Kurta pajama.jpg", label: "Premium Traditional Fits" },
  ];

  return (
    <section id="lookbook" className="py-24 relative select-none">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="pill inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full text-gold font-heading text-[10px] font-bold tracking-[1.5px] uppercase mb-4 animate-pulse">
            <Images className="w-3 h-3" />
            Style Showcase
          </div>
          <h2 className="font-heading text-[32px] sm:text-[48px] font-black leading-tight tracking-[-1.5px] text-white">
            Fashion Lookbook
          </h2>
          <p className="text-text-dim text-[14px] sm:text-[15px] max-w-[500px] mt-2.5">
            Carefully curated styling combinations from Indore to inspire your daily fits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[repeat(2,280px)] gap-4 select-none">
          {/* Item 1 - Big grid spanning columns & rows */}
          <div className="gallery-item relative rounded-2xl overflow-hidden border border-gold/10 lg:col-span-2 lg:row-span-2 group hover:border-gold/30 hover:shadow-glow-strong transition-all duration-500 min-h-[320px] lg:min-h-auto">
            <Image
              src={imgs[0].src}
              alt={imgs[0].label}
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <div className="gallery-overlay absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-gold font-heading text-[12px] font-bold uppercase tracking-[1.5px] flex items-center gap-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <ArrowUpRight className="w-4 h-4" />
                {imgs[0].label}
              </span>
            </div>
          </div>

          {/* Item 2 */}
          <div className="gallery-item relative rounded-2xl overflow-hidden border border-gold/10 group hover:border-gold/30 hover:shadow-glow transition-all duration-500 min-h-[200px] lg:min-h-auto">
            <Image
              src={imgs[1].src}
              alt={imgs[1].label}
              fill
              sizes="(max-width: 1024px) 100vw, 300px"
              className="object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <div className="gallery-overlay absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-gold font-heading text-[11px] font-bold uppercase tracking-[1.5px] flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {imgs[1].label}
              </span>
            </div>
          </div>

          {/* Item 3 */}
          <div className="gallery-item relative rounded-2xl overflow-hidden border border-gold/10 group hover:border-gold/30 hover:shadow-glow transition-all duration-500 min-h-[200px] lg:min-h-auto">
            <Image
              src={imgs[2].src}
              alt={imgs[2].label}
              fill
              sizes="(max-width: 1024px) 100vw, 300px"
              className="object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <div className="gallery-overlay absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-gold font-heading text-[11px] font-bold uppercase tracking-[1.5px] flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {imgs[2].label}
              </span>
            </div>
          </div>

          {/* Item 4 - Grid spanning 2 columns */}
          <div className="gallery-item relative rounded-2xl overflow-hidden border border-gold/10 lg:col-span-2 group hover:border-gold/30 hover:shadow-glow transition-all duration-500 min-h-[200px] lg:min-h-auto">
            <Image
              src={imgs[3].src}
              alt={imgs[3].label}
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <div className="gallery-overlay absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-gold font-heading text-[11px] font-bold uppercase tracking-[1.5px] flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {imgs[3].label}
              </span>
            </div>
          </div>

          {/* Item 5 */}
          <div className="gallery-item relative rounded-2xl overflow-hidden border border-gold/10 group hover:border-gold/30 hover:shadow-glow transition-all duration-500 min-h-[200px] lg:min-h-auto">
            <Image
              src={imgs[4].src}
              alt={imgs[4].label}
              fill
              sizes="(max-width: 1024px) 100vw, 300px"
              className="object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <div className="gallery-overlay absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-gold font-heading text-[11px] font-bold uppercase tracking-[1.5px] flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {imgs[4].label}
              </span>
            </div>
          </div>
        </div>
      </div>
      <hr className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent border-none" />
    </section>
  );
}
