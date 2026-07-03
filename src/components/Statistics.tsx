"use client";

import { useEffect, useState, useRef } from "react";
import CountUp from "react-countup";
import { Users, Shirt, Star, ShieldCheck } from "lucide-react";

export default function Statistics() {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = [
    { icon: Users, number: 1000, suffix: "+", label: "Happy Customers" },
    { icon: Shirt, number: 50, suffix: "+", label: "Collections" },
    { icon: Star, number: 4.9, suffix: "★", label: "Customer Rating", isDecimal: true },
    { icon: ShieldCheck, number: 100, suffix: "%", label: "Original Products" },
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
    <section id="stats" className="py-20 relative bg-radial-gradient from-gold/[0.03] to-transparent border-t border-b border-gold/10 select-none">
      <div className="container mx-auto px-6" ref={containerRef}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 stats-grid">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="stat-card p-8 bg-luxury-gray border border-gold/10 rounded-2xl text-center relative overflow-hidden group hover:border-gold/25 hover:-translate-y-2 hover:shadow-glow-strong transition-all duration-500"
              >
                {/* Accent top border glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-gold to-gold-strong group-hover:w-[80%] transition-all duration-500" />

                <div className="text-[30px] text-gold mb-4.5 flex justify-center transition-transform duration-300 group-hover:scale-115 group-hover:rotate-5">
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
                  <span className="text-gold font-bold">{s.suffix}</span>
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
