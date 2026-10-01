"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useScroll,
} from "framer-motion";

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
  const [activeLink, setActiveLink] = useState("#home");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#categories", label: "Shop By Vibe" },
    { href: "#featured", label: "Featured" },
    { href: "#lookbook", label: "Lookbook" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  const megaMenuVariants = {
    hidden: { opacity: 0, y: -8, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
    exit: {
      opacity: 0,
      y: -6,
      scale: 0.97,
      transition: { duration: 0.15, ease: "easeIn" as const },
    },
  };

  const drawerVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.3, ease: [0.7, 0, 0.84, 0] as [number, number, number, number] },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const linkItemVariants = {
    hidden: { opacity: 0, x: 24 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    }),
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full transition-all duration-300 relative border-b ${
          scrolled
            ? "h-16 bg-[#070609]/95 backdrop-blur-2xl border-gold/25 shadow-[0_10px_35px_rgba(0,0,0,0.85)]"
            : "h-20 bg-[#070609]/90 backdrop-blur-xl border-gold/15 shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
        }`}
      >
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-gold-strong to-gold origin-left"
          style={{ scaleX }}
        />

        <div className="container mx-auto h-full flex items-center justify-between gap-4 px-4 sm:px-6">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-3 font-extrabold tracking-[1.2px] text-gold group shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 border-2 border-gold/25 rounded-[10px] overflow-hidden group-hover:border-gold transition-all duration-300">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                sizes="44px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="font-heading text-[11px] sm:text-[12px] tracking-[2.5px] leading-tight flex flex-col">
              <span className="text-text/80 group-hover:text-text transition-colors duration-300">
                THE VIBE
              </span>
              <span className="text-gold group-hover:text-gold-strong transition-colors duration-300">
                VAULT
              </span>
            </div>
          </motion.a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-0.5 font-button text-[12px] font-semibold uppercase tracking-[1px]">
            {navLinks.map((link) => {
              if (link.label === "Shop By Vibe") {
                return (
                  <div
                    key={link.label}
                    className="relative group py-2"
                    onMouseEnter={() => setMegaMenuOpen(true)}
                    onMouseLeave={() => setMegaMenuOpen(false)}
                  >
                    <button
                      className="flex items-center gap-1.5 px-4 py-2 hover:bg-gold/10 hover:text-gold rounded-[10px] transition-all duration-300 relative text-text/80"
                      onClick={() => setActiveLink(link.href)}
                    >
                      <span>{link.label}</span>
                      <motion.span
                        animate={{ rotate: megaMenuOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </motion.span>
                      {activeLink === link.href && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] h-[2px] bg-gradient-to-r from-gold to-gold-strong rounded-full"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {megaMenuOpen && (
                        <motion.div
                          variants={megaMenuVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute top-full left-1/2 -translate-x-1/2 w-[650px] p-6 glass-card rounded-2xl shadow-2xl grid grid-cols-3 gap-6 border border-gold/10"
                        >
                          <div>
                            <h4 className="text-gold font-heading text-[11px] tracking-[2px] mb-3 border-b border-gold/15 pb-2">
                              Streetwear
                            </h4>
                            <ul className="flex flex-col gap-2 lowercase text-text-dim text-[12px] tracking-[0.5px]">
                              <li>
                                <a href="#categories" className="hover:text-gold transition-colors duration-200">
                                  👕 tees &amp; polo fits
                                </a>
                              </li>
                              <li>
                                <a href="#categories" className="hover:text-gold transition-colors duration-200">
                                  🔥 bold hoodies
                                </a>
                              </li>
                              <li>
                                <a href="#categories" className="hover:text-gold transition-colors duration-200">
                                  📦 cargo &amp; sweatpants
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-gold font-heading text-[11px] tracking-[2px] mb-3 border-b border-gold/15 pb-2">
                              Tailored Classic
                            </h4>
                            <ul className="flex flex-col gap-2 lowercase text-text-dim text-[12px] tracking-[0.5px]">
                              <li>
                                <a href="#categories" className="hover:text-gold transition-colors duration-200">
                                  🤵 sharp dress shirts
                                </a>
                              </li>
                              <li>
                                <a href="#categories" className="hover:text-gold transition-colors duration-200">
                                  👖 tailored dress pants
                                </a>
                              </li>
                              <li>
                                <a href="#categories" className="hover:text-gold transition-colors duration-200">
                                  🧥 blazers &amp; jackets
                                </a>
                              </li>
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
                              <span className="text-[10px] text-gold tracking-[1px] uppercase font-bold">
                                trending drop
                              </span>
                              <span className="text-[11px] text-white tracking-[0.5px] lowercase font-medium">
                                pant &amp; shirt combination
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveLink(link.href)}
                  className="relative px-4 py-2 hover:bg-gold/10 hover:text-gold rounded-[10px] transition-all duration-300 text-text/80 group"
                >
                  <span>{link.label}</span>
                  {activeLink === link.href && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] h-[2px] bg-gradient-to-r from-gold to-gold-strong rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 group-hover:w-[calc(100%-24px)] h-[2px] bg-gold/30 rounded-full transition-all duration-300" />
                </a>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search — hidden on mobile, visible from md */}
            <div className="hidden md:flex items-center bg-gold/[0.03] border border-gold/10 rounded-full px-4 py-1.5 focus-within:border-gold/40 focus-within:bg-gold/[0.06] transition-all duration-300">
              <input
                type="text"
                placeholder="Search fits..."
                className="bg-transparent border-none outline-none text-[13px] text-white w-32 lg:w-36 focus:w-44 transition-all duration-500 placeholder-text-dim/60"
                value={searchQuery}
                onChange={(ev) => setSearchQuery(ev.target.value)}
                onKeyDown={(ev) => ev.key === "Enter" && onSearch()}
              />
              <button
                onClick={onSearch}
                className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-luxury-black transition-all duration-300"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Theme Toggle — hidden on sm */}
            <motion.button
              onClick={onToggleTheme}
              whileHover={{ scale: 1.08, rotate: 15 }}
              whileTap={{ scale: 0.92 }}
              className="hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gold/10 hover:bg-gold/20 text-gold items-center justify-center border border-gold/15 hover:border-gold transition-all duration-300"
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* User — hidden on sm */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gold/10 hover:bg-gold/20 text-gold items-center justify-center border border-gold/15 hover:border-gold transition-all duration-300"
              aria-label="Profile"
            >
              <User className="w-4 h-4" />
            </motion.button>

            {/* Wishlist */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gold/10 hover:bg-gold/20 text-gold flex items-center justify-center border border-gold/15 hover:border-gold transition-all duration-300"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
            </motion.button>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gold/10 hover:bg-gold/20 text-gold flex items-center justify-center border border-gold/15 hover:border-gold transition-all duration-300"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.8 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-luxury-black font-semibold text-[9px] rounded-full flex items-center justify-center"
              >
                0
              </motion.span>
            </motion.button>

            {/* Hamburger — mobile only */}
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center border border-gold/15 hover:border-gold hover:bg-gold/20 transition-all duration-300"
              aria-label="Mobile Menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer + Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/65 z-[998] backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 w-[300px] sm:w-[320px] bg-luxury-black border-l border-gold/12 p-6 pt-24 z-[999] flex flex-col gap-2 shadow-2xl"
            >
              {/* Mobile search */}
              <div className="flex items-center bg-gold/[0.04] border border-gold/10 rounded-full px-4 py-2 mb-4 focus-within:border-gold/40 transition-all duration-300">
                <input
                  type="text"
                  placeholder="Search fits..."
                  className="bg-transparent border-none outline-none text-[13px] text-white w-full placeholder-text-dim/60"
                  value={searchQuery}
                  onChange={(ev) => setSearchQuery(ev.target.value)}
                  onKeyDown={(ev) => ev.key === "Enter" && onSearch()}
                />
                <button
                  onClick={onSearch}
                  className="text-gold"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>

              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  custom={i}
                  variants={linkItemVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={() => {
                    setActiveLink(link.href);
                    setMobileOpen(false);
                  }}
                  className={`text-[14px] font-semibold tracking-[1px] uppercase px-4 py-3.5 rounded-xl transition-all duration-300 border flex items-center justify-between group ${
                    activeLink === link.href
                      ? "text-gold bg-gold/10 border-gold/20"
                      : "text-text hover:text-gold hover:bg-gold/8 border-transparent hover:border-gold/10"
                  }`}
                >
                  <span>{link.label}</span>
                  {activeLink === link.href && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  )}
                </motion.a>
              ))}

              {/* Mobile action buttons */}
              <div className="mt-auto flex items-center gap-3 pt-6 border-t border-gold/10">
                <button
                  onClick={onToggleTheme}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gold/8 border border-gold/12 text-gold text-[12px] font-semibold tracking-[0.5px] hover:bg-gold/15 transition-all duration-300"
                >
                  {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  <span>{theme === "light" ? "Dark" : "Light"} Mode</span>
                </button>
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-gold/8 border border-gold/12 text-gold hover:bg-gold/15 transition-all duration-300"
                  aria-label="Profile"
                >
                  <User className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
