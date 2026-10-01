import { Gem, Zap, Tag, MapPin, Crown } from "lucide-react";

export default function WhyChoose() {
  const whyUs = [
    {
      icon: Gem,
      title: "Premium Quality",
      text: "Curated premium fabrics and precise tailorings for lasting comfort and style.",
      accent: "#a78bfa",
      accentBg: "rgba(167, 139, 250, 0.10)",
      accentGlow: "rgba(167, 139, 250, 0.20)",
    },
    {
      icon: Zap,
      title: "Trendy Styles",
      text: "Energy-packed street and classic drops refreshed weekly to keep fits modern.",
      accent: "#34d1bf",
      accentBg: "rgba(52, 209, 191, 0.10)",
      accentGlow: "rgba(52, 209, 191, 0.20)",
    },
    {
      icon: Tag,
      title: "Affordable Luxury",
      text: "Carry premium luxury clothing statements without paying the premium markup.",
      accent: "#e5c158",
      accentBg: "rgba(229, 193, 88, 0.10)",
      accentGlow: "rgba(229, 193, 88, 0.20)",
    },
    {
      icon: MapPin,
      title: "Trusted Local Store",
      text: "Indore-based, community-loved, and serving fashion fits since day one.",
      accent: "#e85d75",
      accentBg: "rgba(232, 93, 117, 0.10)",
      accentGlow: "rgba(232, 93, 117, 0.20)",
    },
  ];

  return (
    <section className="py-24 relative select-none section-bg-violet">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="pill inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full text-gold font-heading text-[10px] font-bold tracking-[1.5px] uppercase mb-4">
            <Crown className="w-3 h-3" />
            Our Creed
          </div>
          <h2 className="font-heading text-[32px] sm:text-[48px] font-black leading-tight tracking-[-1.5px] text-white">
            Dress With Energy
          </h2>
          <p className="text-text-dim text-[14px] sm:text-[15px] max-w-[500px] mt-2.5">
            Every layer from The Vibe Vault is engineered to project luxury fits and bold visual presence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="feature flex flex-col items-center text-center p-8 bg-luxury-gray border border-gold/10 rounded-2xl relative overflow-hidden group hover:border-gold/20 hover:-translate-y-2 transition-all duration-500"
              >
                {/* Border glowing wrapper */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at center, ${item.accentGlow}, transparent 70%)` }}
                />

                {/* Hover glow shadow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ boxShadow: `0 0 30px ${item.accentGlow}` }}
                />

                <div
                  className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    background: item.accentBg,
                    color: item.accent,
                    boxShadow: `0 8px 24px transparent`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = item.accent;
                    (e.currentTarget as HTMLElement).style.color = '#070609';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${item.accentGlow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = item.accentBg;
                    (e.currentTarget as HTMLElement).style.color = item.accent;
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px transparent';
                  }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <strong className="text-white text-[16px] font-bold tracking-[0.5px] block mb-2">{item.title}</strong>
                <p className="text-text-dim text-[13px] leading-relaxed">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
      <hr className="absolute bottom-0 left-0 w-full h-[1px] divider-violet border-none" />
    </section>
  );
}
