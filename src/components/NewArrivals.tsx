"use client";

import ProductCard, { ProductType } from "./ProductCard";
import { productsData } from "@/data/products";
import { Sparkles } from "lucide-react";

interface NewArrivalsProps {
  onQuickView: (product: ProductType) => void;
}

export default function NewArrivals({ onQuickView }: NewArrivalsProps) {
  const newProducts = productsData.filter((p) => p.badge === "new");

  return (
    <section className="py-24 relative select-none">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="pill inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full text-gold font-heading text-[10px] font-bold tracking-[1.5px] uppercase mb-4 animate-pulse">
            <Sparkles className="w-3 h-3" />
            Fresh Drops
          </div>
          <h2 className="font-heading text-[32px] sm:text-[48px] font-black leading-tight tracking-[-1.5px] text-white">
            New Arrivals
          </h2>
          <p className="text-text-dim text-[14px] sm:text-[15px] max-w-[500px] mt-2.5">
            Elevate your streetwear drip with the latest seasonal essentials from the vault.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {newProducts.map((p) => (
            <ProductCard
              key={p.name}
              name={p.name}
              category={p.category}
              price={p.price}
              image={p.image}
              desc={p.desc}
              badge={p.badge}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
      <hr className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent border-none" />
    </section>
  );
}
