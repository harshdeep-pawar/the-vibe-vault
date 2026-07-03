"use client";

import { Mail, MessageCircle } from "lucide-react";

export default function Newsletter() {
  const handleSubscribe = (ev: React.FormEvent) => {
    ev.preventDefault();
    alert("Vibe subscription complete! Check your email for special vault drops.");
  };

  return (
    <section className="py-24 relative select-none overflow-hidden bg-radial-gradient from-gold/[0.03] to-transparent border-t border-b border-gold/10">
      {/* Background circular light ray */}
      <div className="absolute w-[800px] h-[800px] top-[-200px] left-1/2 -translate-x-1/2 rounded-full bg-gold/[0.04] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
          <div className="pill inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full text-gold font-heading text-[10px] font-bold tracking-[1.5px] uppercase mb-4">
            <Mail className="w-3.5 h-3.5" />
            Stay Connected
          </div>
          <h2 className="font-heading text-[32px] sm:text-[48px] font-black leading-tight tracking-[-1.5px] text-white">
            Join 1000+ Fashion Lovers
          </h2>
          <p className="text-text-dim text-[14px] sm:text-[15px] max-w-[450px] mt-3">
            Subscribe to receive immediate drop alerts, exclusive members-only collections, and style codes.
          </p>

          {/* Subscription Form */}
          <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              className="flex-1 px-5 py-3.5 rounded-xl border border-gold/10 bg-luxury-gray text-white text-[14px] font-medium outline-none focus:border-gold focus:shadow-glow transition-all duration-300 placeholder-text-dim/50"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-gradient-to-r from-gold via-[#e8d5a3] to-gold bg-[length:200%_auto] text-luxury-black font-button font-bold text-[12px] uppercase tracking-[1.5px] rounded-xl hover:shadow-[0_8px_24px_rgba(201,169,97,0.25)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Subscribe
            </button>
          </form>

          {/* WhatsApp Channel CTA */}
          <div className="w-full flex items-center gap-4 my-8 text-text-dim font-heading text-[11px] font-bold tracking-[1.5px] uppercase">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-gold/15" />
            <span>or</span>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-gold/15" />
          </div>

          <a
            href="https://whatsapp.com/channel/0029VbB0SGQ1XquO75QEyQ2B"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white font-button font-bold text-[14px] uppercase tracking-[1px] hover:shadow-[0_12px_36px_rgba(37,211,102,0.35)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5 fill-white stroke-none" />
            Join WhatsApp Channel
          </a>
        </div>
      </div>
    </section>
  );
}
