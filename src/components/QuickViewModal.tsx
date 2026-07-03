"use client";

import { useState } from "react";
import Image from "next/image";
import { X, MessageCircle, Heart, ShieldCheck, Undo2, Truck } from "lucide-react";
import { ProductType } from "./ProductCard";

interface QuickViewModalProps {
  product: ProductType | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Neutral Gold");
  const [liked, setLiked] = useState(false);

  if (!product) return null;

  const waMessage = `Hi! I want to order the ${product.name} (Size: ${selectedSize}, Color: ${selectedColor}) from The Vibe Vault website. Please check availability.`;
  const waLink = `https://wa.me/9691676366?text=${encodeURIComponent(waMessage)}`;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/85 backdrop-blur-md z-[1100] flex items-center justify-center p-4 animate-fade-in"
    >
      <div
        onClick={(ev) => ev.stopPropagation()}
        className="relative bg-luxury-gray border border-gold/15 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-9 shadow-2xl grid md:grid-cols-2 gap-8 text-left selection:bg-gold/25"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-gold hover:text-luxury-black text-white flex items-center justify-center transition-all duration-300 z-10"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Visual */}
        <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border border-gold/10 bg-luxury-black select-none">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 450px"
            className="object-cover"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 font-heading text-[9px] font-extrabold px-3.5 py-1.5 bg-gold text-luxury-black rounded-full tracking-[1.5px] uppercase">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Details Form */}
        <div className="flex flex-col justify-between py-2">
          <div>
            <div className="pill inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/15 rounded-full text-gold font-heading text-[10px] font-bold tracking-[1.5px] uppercase mb-4">
              {product.category}
            </div>
            <h3 className="font-heading text-[24px] sm:text-[30px] font-black leading-tight text-white mb-2.5">
              {product.name}
            </h3>
            <div className="font-heading text-[22px] font-extrabold text-gold mb-4">
              {product.price}
            </div>
            <p className="text-text-dim text-[13px] sm:text-[14px] leading-relaxed mb-6">
              {product.desc || "Clean tailoring, premium materials, bold visual statements. Rebuild your fashion vibe from the vault."}
            </p>

            {/* Colors */}
            <div className="mb-5">
              <span className="text-[10px] uppercase font-bold tracking-[1px] text-[#aaaaaa] block mb-2">Color</span>
              <div className="flex gap-2">
                {["Neutral Gold", "Luxury Charcoal", "Vibe White"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 text-[11px] font-medium border rounded-lg transition-all ${
                      selectedColor === c
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-gold/10 text-text-dim hover:bg-gold/5"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <span className="text-[10px] uppercase font-bold tracking-[1px] text-[#aaaaaa] block mb-2">Select Size</span>
              <div className="flex gap-2">
                {["S", "M", "L", "XL", "XXL"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-10 h-10 rounded-xl font-button font-bold text-[12px] border transition-all ${
                      selectedSize === s
                        ? "border-gold bg-gold/15 text-gold shadow-glow"
                        : "border-gold/10 text-white hover:bg-gold/5"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-gold via-[#e8d5a3] to-gold bg-[length:200%_auto] text-luxury-black font-button font-bold text-[13px] uppercase tracking-[1px] rounded-xl hover:shadow-[0_8px_24px_rgba(201,169,97,0.25)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 fill-luxury-black" />
              Order on WhatsApp
            </a>
            
            <button
              onClick={() => setLiked(!liked)}
              className={`px-5 py-3.5 border rounded-xl flex items-center justify-center gap-2 text-[12px] uppercase font-bold tracking-[0.5px] transition-all ${
                liked
                  ? "border-red-500/20 bg-red-500/10 text-red-500"
                  : "border-gold/15 text-gold hover:bg-gold/5"
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-red-500" : ""}`} />
              {liked ? "Wishlisted" : "Add to Wishlist"}
            </button>
          </div>

          {/* Quick Info Bar */}
          <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-gold/10 text-center text-text-dim text-[10px] tracking-[0.5px] uppercase font-semibold">
            <div className="flex flex-col items-center gap-1.5">
              <Truck className="w-4 h-4 text-gold" />
              <span>Pan-India Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Undo2 className="w-4 h-4 text-gold" />
              <span>7-Day Returns</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span>Secure Orders</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
