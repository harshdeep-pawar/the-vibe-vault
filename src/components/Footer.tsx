"use client";

import Image from "next/image";
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const footerLinks = {
  shop: [
    { label: "T-Shirts & Polos", href: "#categories" },
    { label: "Hoodies & Sweatshirts", href: "#categories" },
    { label: "Pants & Denim", href: "#categories" },
    { label: "Blazers & Jackets", href: "#categories" },
    { label: "Kurta Collection", href: "#categories" },
    { label: "New Arrivals", href: "#categories" },
  ],
  explore: [
    { label: "Lookbook", href: "#lookbook" },
    { label: "Featured Drops", href: "#featured" },
    { label: "About Us", href: "#about" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Join WhatsApp Channel", href: "https://whatsapp.com/channel/0029VbB0SGQ1XquO75QEyQ2B" },
  ],
  info: [
    { label: "Order on WhatsApp", href: "https://wa.me/9691676366" },
    { label: "Instagram Page", href: "https://instagram.com" },
    { label: "Shipping Policy", href: "#" },
    { label: "Return & Exchange", href: "#" },
    { label: "Size Guide", href: "#" },
  ],
};

const socialLinks = [
  {
    icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
    hoverColor: "hover:text-[#E1306C]",
  },
  {
    icon: FaWhatsapp,
    href: "https://wa.me/9691676366",
    label: "WhatsApp",
    hoverColor: "hover:text-[#25D366]",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative bg-[#040404] border-t border-gold/10 pt-20 pb-10 overflow-hidden select-none">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gold/[0.04] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Top Row: Brand + Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-gold/10">

          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <a href="#home" className="flex items-center gap-3 group w-fit">
              <div className="relative w-12 h-12 border-2 border-gold/25 rounded-[12px] overflow-hidden group-hover:border-gold transition-all duration-300">
                <Image
                  src="/logo.png"
                  alt="The Vibe Vault Logo"
                  fill
                  sizes="48px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="font-heading text-[13px] tracking-[2.5px] leading-tight flex flex-col text-gold">
                <span>THE VIBE</span>
                <span className="text-gold-strong">VAULT</span>
              </div>
            </a>

            <p className="text-text-dim text-[14px] leading-[1.8] max-w-[320px]">
              Indore&apos;s premium men&apos;s fashion destination. Bold streetwear, tailored layers, and everyday essentials curated to keep your vibe high.
            </p>

            {/* Contact Details */}
            <div className="flex flex-col gap-3 text-[13px] text-text-dim">
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 hover:text-gold transition-colors duration-300 group">
                <FaMapMarkerAlt className="w-3.5 h-3.5 text-gold flex-shrink-0 group-hover:scale-110 transition-transform" />
                Station Road, Rau, Indore, MP
              </a>
              <a href="tel:+919691676366" className="flex items-center gap-2.5 hover:text-gold transition-colors duration-300 group">
                <FaPhone className="w-3.5 h-3.5 text-gold flex-shrink-0 group-hover:scale-110 transition-transform" />
                +91 96916 76366
              </a>
              <a href="mailto:thevibevault@gmail.com" className="flex items-center gap-2.5 hover:text-gold transition-colors duration-300 group">
                <FaEnvelope className="w-3.5 h-3.5 text-gold flex-shrink-0 group-hover:scale-110 transition-transform" />
                thevibevault@gmail.com
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-1">
              {socialLinks.map(({ icon: Icon, href, label, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className={`w-10 h-10 rounded-xl bg-gold/[0.06] border border-gold/10 flex items-center justify-center text-gold transition-all duration-300 hover:bg-gold/15 hover:border-gold/25 hover:-translate-y-1 ${hoverColor}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-heading text-[11px] font-bold tracking-[2.5px] text-gold uppercase mb-5 pb-3 border-b border-gold/10">
              Shop
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-text-dim text-[13px] hover:text-gold transition-colors duration-300 hover:pl-1.5 inline-block transition-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-heading text-[11px] font-bold tracking-[2.5px] text-gold uppercase mb-5 pb-3 border-b border-gold/10">
              Explore
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="text-text-dim text-[13px] hover:text-gold transition-colors duration-300 hover:pl-1.5 inline-block transition-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="font-heading text-[11px] font-bold tracking-[2.5px] text-gold uppercase mb-5 pb-3 border-b border-gold/10">
              Info
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.info.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="text-text-dim text-[13px] hover:text-gold transition-colors duration-300 hover:pl-1.5 inline-block transition-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/9691676366"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 inline-flex items-center gap-2.5 px-5 py-3 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white font-button font-bold text-[12px] uppercase tracking-[1px] rounded-xl shadow-[0_8px_24px_rgba(37,211,102,0.15)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.3)] transition-shadow duration-300"
            >
              <FaWhatsapp className="w-4 h-4" />
              Order Now
            </motion.a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-text-dim font-medium">
          <p>
            &copy; {year}{" "}
            <span className="text-gold font-bold">The Vibe Vault</span>. All rights reserved.
          </p>
          <p className="text-[11px] tracking-[0.5px]">
            Crafted with energy in{" "}
            <span className="text-gold">Indore, India 🇮🇳</span>
          </p>
          <div className="flex gap-4 text-[11px]">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <span className="text-gold/20">|</span>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
