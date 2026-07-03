"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Search, ShoppingBag } from "lucide-react";

export interface ProductType {
  name: string;
  category: string;
  price: string;
  image: string;
  desc: string;
  badge?: "sale" | "new" | "limited" | null;
}

interface ProductCardProps extends ProductType {
  onQuickView: (product: ProductType) => void;
}

export default function ProductCard({
  name,
  category,
  price,
  image,
  desc,
  badge,
  onQuickView,
}: ProductCardProps) {
  const [liked, setLiked] = useState(false);

  const handleQuickView = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    onQuickView({ name, category, price, image, desc, badge });
  };

  const getBadgeClass = () => {
    if (badge === "sale") return "bg-red-500 text-white";
    if (badge === "new") return "bg-green-500 text-white";
    if (badge === "limited") return "bg-gold text-luxury-black";
    return "";
  };

  return (
    <div className="card visible opacity-100 transform-none select-none group">
      {/* Image & Overlay Wrapper */}
      <div className="card-image-wrapper relative">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-cover transition-transform duration-700 group-hover:scale-112"
          loading="lazy"
        />
        <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Wishlist Heart Icon */}
        <button
          onClick={(ev) => {
            ev.stopPropagation();
            setLiked(!liked);
          }}
          className={`card-wishlist absolute top-3.5 right-3.5 w-10 h-10 rounded-full flex items-center justify-center border border-white/5 bg-black/65 backdrop-blur-md transition-all duration-300 hover:scale-110 ${
            liked ? "text-red-500 bg-red-500/10 scale-100 opacity-100" : "text-white opacity-0 group-hover:opacity-100 translate-y-[-8px] group-hover:translate-y-0"
          }`}
          aria-label="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-red-500" : ""}`} />
        </button>

        {/* Custom Badge */}
        {badge && (
          <span className={`badge absolute top-3.5 left-3.5 font-heading text-[9px] font-extrabold px-3 py-1.5 rounded-full tracking-[1.5px] uppercase ${getBadgeClass()}`}>
            {badge}
          </span>
        )}

        {/* Quick View Button Overlay */}
        <button
          onClick={handleQuickView}
          className="card-quickview absolute bottom-4 left-1/2 -translate-x-1/2 px-5.5 py-2.5 bg-black/90 hover:bg-gold text-gold hover:text-luxury-black font-heading text-[10px] font-bold tracking-[1.5px] uppercase border border-gold/25 rounded-full opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
        >
          Quick View
        </button>
      </div>

      {/* Card Details */}
      <div className="card-body p-5 grid gap-2.5">
        <h4 className="font-heading font-semibold text-[15px] leading-tight text-white group-hover:text-gold transition-colors duration-300">
          {name}
        </h4>
        <div className="flex items-center justify-between">
          <span className="font-heading font-extrabold text-[14px] text-gold tracking-[0.5px]">
            {price}
          </span>
          <div className="chip flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 text-gold text-[10px] font-bold rounded-lg tracking-[0.5px] group-hover:bg-gold/15 transition-all">
            <ShoppingBag className="w-3 h-3" />
            <span>{category}</span>
          </div>
        </div>

        {/* View details action */}
        <button
          onClick={handleQuickView}
          className="view-btn flex items-center gap-2 mt-2 px-4 py-2 border border-[#d4af37]/10 text-white hover:bg-[#d4af37]/5 hover:border-[#d4af37] hover:text-[#d4af37] rounded-lg font-heading text-[10px] font-bold tracking-[1px] uppercase transition-all duration-300 w-fit"
        >
          <span>View Details</span>
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}
