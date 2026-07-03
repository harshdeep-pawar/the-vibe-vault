"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Heart, ShoppingBag, User, Sun, Moon, Menu, X, ChevronDown, Check } from "lucide-react";

interface NavbarProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}

export default function Navbar({
  theme,
  onToggleTheme,
  searchQuery,
  setSearchQuery,
  onSearch,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#categories", label: "Shop By Vibe" },
    { href: "#featured", label: "Featured" },
    { href: "#lookbook", label: "Lookbook" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 glass ${
        scrolled ? "h-16 bg-luxury-black/95 shadow-[0_4px_40px_rgba(0,0,0,0.35)] border-b-gold/5" : "h-20"
      }`}
    >
      <div className="container mx-auto h-full flex items-center justify-between gap-4 px-6">
        {/* Logo and Branding */}
        <a href="#home" className="flex items-center gap-3 font-extrabold tracking-[1.2px] text-gold group">
          <div className="relative w-11 h-11 border-2 border-gold/25 rounded-[10px] overflow-hidden group-hover:border-gold transition-all duration-300">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              sizes="44px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="font-heading text-[12px] tracking-[2px] leading-tight flex flex-col">
            <span>THE VIBE</span>
            <span className="text-gold-strong">VAULT</span>
          </div>
        </a>

        {/* Desktop Links with Mega Menu */}
        <div className="hidden lg:flex items-center gap-1 font-button text-[12px] font-semibold uppercase tracking-[1px]">
          {navLinks.map((link) => {
            if (link.label === "Shop By Vibe") {
              return (
                <div
                  key={link.label}
                  className="relative group py-2"
                  onMouseEnter={() => setMegaMenuOpen(true)}
                  onMouseLeave={() => setMegaMenuOpen(false)}
                >
                  <button className="flex items-center gap-1.5 px-4 py-2 hover:bg-gold/10 hover:text-gold rounded-[10px] transition-all duration-300 relative">
                    <span>{link.label}</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Mega Menu Dropdown */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 w-[650px] p-6 glass-card rounded-2xl shadow-2xl transition-all duration-300 grid grid-cols-3 gap-6 ${
                      megaMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div>
                      <h4 className="text-gold font-heading text-[11px] tracking-[2px] mb-3 border-b border-gold/15 pb-2">Streetwear</h4>
                      <ul className="flex flex-col gap-2 lowercase text-text-dim text-[12px] tracking-[0.5px]">
                        <li><a href="#categories" className="hover:text-gold transition-colors">👕 tees & polo fits</a></li>
                        <li><a href="#categories" className="hover:text-gold transition-colors">🔥 bold hoodies</a></li>
                        <li><a href="#categories" className="hover:text-gold transition-colors">📦 cargo & sweatpants</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-gold font-heading text-[11px] tracking-[2px] mb-3 border-b border-gold/15 pb-2">Tailored Classic</h4>
                      <ul className="flex flex-col gap-2 lowercase text-text-dim text-[12px] tracking-[0.5px]">
                        <li><a href="#categories" className="hover:text-gold transition-colors">🤵 sharp dress shirts</a></li>
                        <li><a href="#categories" className="hover:text-gold transition-colors">👖 tailored dress pants</a></li>
                        <li><a href="#categories" className="hover:text-gold transition-colors">🧥 blazers & jackets</a></li>
                      </ul>
                    </div>
                    <div className="relative rounded-xl overflow-hidden group/mega h-[150px]">
                      <Image
                        src="/Pant & Shirt Combination.jpg"
                        alt="Mega Menu Feature"
                        fill
                        sizes="200px"
                        className="object-cover group-hover/mega:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent flex flex-col justify-end p-3">
                        <span className="text-[10px] text-gold tracking-[1px] uppercase font-bold">trending drop</span>
                        <span className="text-[11px] text-white tracking-[0.5px] lowercase font-medium">pant & shirt combination</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 hover:bg-gold/10 hover:text-gold rounded-[10px] transition-all duration-300 relative after:absolute after:bottom-2 after:left-1/2 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-gold after:to-gold-strong after:-translate-x-1/2 hover:after:w-[calc(100%-32px)] after:transition-all after:duration-400"
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Search and Navigation Actions */}
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="hidden md:flex items-center bg-gold/[0.03] border border-gold/10 rounded-full px-4 py-1.5 focus-within:border-gold focus-within:bg-gold/[0.06] transition-all duration-300">
            <input
              type="text"
              placeholder="Search fits..."
              className="bg-transparent border-none outline-none text-[13px] text-white w-40 focus:w-48 transition-all duration-500 placeholder-text-dim/60"
              value={searchQuery}
              onChange={(ev) => setSearchQuery(ev.target.value)}
              onKeyDown={(ev) => ev.key === "Enter" && onSearch()}
            />
            <button
              onClick={onSearch}
              className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-luxury-black transition-all duration-300"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="w-10 h-10 rounded-full bg-gold/10 hover:bg-gold/20 text-gold flex items-center justify-center border border-gold/15 hover:border-gold hover:rotate-[30deg] hover:scale-105 transition-all duration-300 magnetic-btn"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* User Profile */}
          <button
            className="w-10 h-10 rounded-full bg-gold/10 hover:bg-gold/20 text-gold flex items-center justify-center border border-gold/15 hover:scale-105 transition-all duration-300 magnetic-btn"
            aria-label="Profile"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Wishlist */}
          <button
            className="w-10 h-10 rounded-full bg-gold/10 hover:bg-gold/20 text-gold flex items-center justify-center border border-gold/15 hover:scale-105 transition-all duration-300 magnetic-btn"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
          </button>

          {/* Cart Bag */}
          <button
            className="w-10 h-10 rounded-full bg-gold/10 hover:bg-gold/20 text-gold flex items-center justify-center border border-gold/15 hover:scale-105 transition-all duration-300 magnetic-btn relative"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-luxury-black font-semibold text-[9px] rounded-full flex items-center justify-center">
              0
            </span>
          </button>

          {/* Hamburger Menu (Mobile) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center border border-gold/15 hover:scale-105 transition-all duration-300"
            aria-label="Mobile Menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[300px] bg-luxury-black border-l border-gold/10 p-6 pt-24 z-[999] flex flex-col gap-4 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-[14px] font-semibold tracking-[1px] uppercase text-text hover:text-gold px-4 py-3 rounded-xl hover:bg-gold/10 transition-all duration-300 border border-transparent hover:border-gold/10"
          >
            {link.label}
          </a>
        ))}
      </div>
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 z-[998] backdrop-blur-sm transition-opacity duration-300"
        />
      )}
    </nav>
  );
}
