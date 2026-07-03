"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import Preloader from "@/components/Preloader";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import Categories from "@/components/Categories";
import NewArrivals from "@/components/NewArrivals";
import Featured from "@/components/Featured";
import Lookbook from "@/components/Lookbook";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import About from "@/components/About";
import Footer from "@/components/Footer";
import QuickViewModal from "@/components/QuickViewModal";
import { ProductType } from "@/components/ProductCard";

// Dynamic imports for client-only components
const CursorGlow = dynamic(() => import("@/components/CursorGlow"), { ssr: false });
const ParticlesCanvas = dynamic(() => import("@/components/ParticlesCanvas"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });

export default function HomePage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState<ProductType | null>(null);

  // Apply theme class to body
  useEffect(() => {
    document.body.classList.toggle("theme-light", theme === "light");
  }, [theme]);

  const handleSearch = () => {
    setActiveSearch(searchQuery);
    const el = document.getElementById("categories");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Preloader />
      <SmoothScroll />
      <CursorGlow />
      <ParticlesCanvas />

      <AnnouncementBar />

      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />

      <main>
        <Hero />
        <Statistics />
        <Categories searchQuery={activeSearch} onQuickView={setQuickViewProduct} />
        <NewArrivals onQuickView={setQuickViewProduct} />
        <Featured />
        <Lookbook />
        <WhyChoose />
        <Testimonials />
        <About />
        <Newsletter />
      </main>

      <Footer />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
}
