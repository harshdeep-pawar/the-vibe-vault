"use client";

import { useEffect, useState, useRef } from "react";
import CountUp from "react-countup";
import { Users, Shirt, Star, ShieldCheck } from "lucide-react";

export default function Statistics() {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = [
    { icon: Users, number: 1000, suffix: "+", label: "Happy Customers", accent: "#e5c158", accentBg: "rgba(229, 193, 88, 0.1)", accentGlow: "rgba(229, 193, 88, 0.25)" },
    { icon: Shirt, number: 50, suffix: "+", label: "Collections", accent: "#34d1bf", accentBg: "rgba(52, 209, 191, 0.1)", accentGlow: "rgba(52, 209, 191, 0.25)" },
    { icon: Star, number: 4.9, suffix: "★", label: "Customer Rating", isDecimal: true, accent: "#f59e0b", accentBg: "rgba(245, 158, 11, 0.1)", accentGlow: "rgba(245, 158, 11, 0.25)" },
    { icon: ShieldCheck, number: 100, suffix: "%", label: "Original Products", accent: "#a78bfa", accentBg: "rgba(167, 139, 250, 0.1)", accentGlow: "rgba(167, 139, 250, 0.25)" },
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section id="stats" className="py-20 relative border-t border-b border-gold/10 select-none section-bg-warm">
      <div className="container mx-auto px-6" ref={containerRef}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 stats-grid">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="p-8 bg-luxury-gray border border-gold/10 rounded-2xl text-center relative overflow-hidden group hover:border-gold/25 hover:-translate-y-2 transition-all duration-500"
                style={{
                  ['--stat-accent' as string]: s.accent,
                }}
              >
                {/* Accent top border glow */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[2px] group-hover:w-[80%] transition-all duration-500"
                  style={{ background: `linear-gradient(to right, ${s.accent}, transparent)` }}
                />

                {/* Hover glow shadow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ boxShadow: `0 0 45px ${s.accentGlow}` }}
                />

                <div
                  className="text-[30px] mb-4.5 flex justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                  style={{ color: s.accent }}
                >
                  <Icon className="w-8 h-8" />
                </div>

                <div className="font-heading text-[38px] sm:text-[44px] font-black text-white leading-none mb-2">
                  {inView ? (
                    <CountUp
                      end={s.number}
                      duration={2.5}
                      decimals={s.isDecimal ? 1 : 0}
                    />
                  ) : (
                    "0"
                  )}
                  <span className="font-bold" style={{ color: s.accent }}>{s.suffix}</span>
                </div>
                <div className="text-text-dim text-[12px] sm:text-[13px] font-medium tracking-[0.5px] uppercase">{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
