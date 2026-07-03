"use client";

import { useState } from "react";
import ProductCard, { ProductType } from "./ProductCard";
import { productsData } from "@/data/products";
import { Grid, Eye } from "lucide-react";

interface CategoriesProps {
  searchQuery: string;
  onQuickView: (product: ProductType) => void;
}

export default function Categories({ searchQuery, onQuickView }: CategoriesProps) {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = [
    "All",
    "T-Shirts",
    "Hoodies & Sweatshirts",
    "Pants & Denim",
    "Blazers & Jackets",
    "Kurta",
  ];

  // Map subcategories
  const matchFilter = (product: ProductType, filter: string) => {
    if (filter === "All") return true;
    if (filter === "T-Shirts") return product.category === "T-Shirts" || product.category === "Polo Shirts";
    if (filter === "Hoodies & Sweatshirts") return product.category === "Hoodies" || product.category === "Sweatshirts" || product.category === "Sweaters";
    if (filter === "Pants & Denim") return product.category === "Jeans" || product.category === "Cargo Pants" || product.category === "Sweatpants" || product.category === "Dress Pants";
    if (filter === "Blazers & Jackets") return product.category === "Jackets" || product.category === "Blazers";
    if (filter === "Kurta") return product.category === "Kurta";
    return false;
  };

  const filteredProducts = productsData.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = matchFilter(product, selectedFilter);
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="categories" className="py-24 relative select-none">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="pill inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full text-gold font-heading text-[10px] font-bold tracking-[1.5px] uppercase mb-4">
              <Grid className="w-3 h-3" />
              Categories
            </div>
            <h2 className="font-heading text-[32px] sm:text-[48px] font-black leading-tight tracking-[-1.5px] text-white">
              Built For Every Vibe
            </h2>
            <p className="text-text-dim text-[14px] sm:text-[15px] max-w-[500px] mt-2.5">
              Street staples, refined classics, layered essentials — all curated under one roof.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 font-button text-[11px] font-bold uppercase tracking-[1px]">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4.5 py-2.5 rounded-full border transition-all duration-300 ${
                  selectedFilter === filter
                    ? "bg-gold text-luxury-black border-gold shadow-[0_4px_16px_rgba(201,169,97,0.25)]"
                    : "border-gold/15 text-gold hover:bg-gold/10 hover:border-gold/25"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-dim text-[16px] font-medium">
              No products found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
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
        )}
      </div>
      <hr className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent border-none" />
    </section>
  );
}
