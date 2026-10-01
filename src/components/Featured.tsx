"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { Flame, ArrowRight } from "lucide-react";

export default function Featured() {
  const featuredItems = [
    {
      title: "Pant & Shirt Combination",
      tag: "Trending",
      image: "/Pant & Shirt Combination.jpg",
      desc: "Refined everyday urban layering",
    },
    {
      title: "T-Shirt & Jeans with Jacket",
      tag: "Best Seller",
      image: "/T-Shirt, Jeans with Jacket.jpg",
      desc: "Signature Indore streetwear look",
    },
    {
      title: "Kurta Pajama",
      tag: "Heritage Fit",
      image: "/Kurta pajama.jpg",
      desc: "Luxury handcrafted festive style",
    },
    {
      title: "Blazers & Tailored Layers",
      tag: "Premium",
      image: "/blazers.jpg",
      desc: "Sharp evening and formal statement",
    },
    {
      title: "Winter Knit Sweaters",
      tag: "Drop Exclusive",
      image: "/Sweaters.jpg",
      desc: "Warm comfort meets sharp silhouette",
    },
    {
      title: "Street Cargo & Jacket",
      tag: "Viral Fit",
      image: "/Jackets.jpg",
      desc: "Utility-inspired modern aesthetic",
    },
  ];

  return (
    <section id="featured" className="py-24 relative select-none overflow-hidden section-bg-cool">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="pill inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full text-gold font-heading text-[10px] font-bold tracking-[1.5px] uppercase mb-4">
            <Flame className="w-3.5 h-3.5" />
            Vibe Highlights
          </div>
          <h2 className="font-heading text-[32px] sm:text-[48px] font-black leading-tight tracking-[-1.5px] text-white">
            Curated Collections
          </h2>
          <p className="text-text-dim text-[14px] sm:text-[15px] max-w-[520px] mt-2.5">
            Hand-picked statement pairings engineered to elevate your visual presence instantly.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto px-2 sm:px-6">
          <Swiper
            modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1.6,
              slideShadows: false,
              scale: 0.92,
            }}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            className="featured-swiper"
          >
            {featuredItems.map((item, idx) => (
              <SwiperSlide
                key={`${item.title}-${idx}`}
                className="group relative rounded-3xl overflow-hidden border border-gold/20 bg-[#121017] flex flex-col justify-between shadow-2xl"
              >
                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="font-heading text-[10px] font-extrabold px-3.5 py-1.5 bg-black/85 backdrop-blur-md border border-gold/40 text-gold rounded-full tracking-[1.5px] uppercase shadow-lg inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    {item.tag}
                  </span>
                </div>

                {/* Main Image Container */}
                <div className="relative w-full h-[370px] overflow-hidden bg-[#0c0a11]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 290px, 340px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={idx < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121017] via-transparent to-black/30 pointer-events-none" />
                </div>

                {/* Bottom Info Bar */}
                <div className="h-[110px] px-6 py-4 flex items-center justify-between bg-[#121017] border-t border-gold/15">
                  <div className="flex-1 pr-3">
                    <span className="text-[10px] font-heading font-semibold uppercase tracking-[1.5px] text-gold/80 block mb-1">
                      Featured Look
                    </span>
                    <h4 className="font-heading font-bold text-[16px] text-white tracking-[0.3px] group-hover:text-gold transition-colors duration-300 line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-text-dim line-clamp-1 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-luxury-black transition-all duration-300 shrink-0 shadow-md">
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Controls */}
          <button
            aria-label="Previous Slide"
            className="swiper-button-prev-custom absolute left-0 sm:left-[-16px] top-[45%] -translate-y-1/2 w-12 h-12 rounded-full bg-[#070609]/90 backdrop-blur-md border border-gold/30 text-gold flex items-center justify-center z-30 shadow-[0_8px_25px_rgba(0,0,0,0.6)] hover:bg-gold hover:text-luxury-black hover:scale-110 hover:border-gold transition-all duration-300 cursor-pointer"
          >
            <span className="text-lg leading-none">&#8592;</span>
          </button>
          <button
            aria-label="Next Slide"
            className="swiper-button-next-custom absolute right-0 sm:right-[-16px] top-[45%] -translate-y-1/2 w-12 h-12 rounded-full bg-[#070609]/90 backdrop-blur-md border border-gold/30 text-gold flex items-center justify-center z-30 shadow-[0_8px_25px_rgba(0,0,0,0.6)] hover:bg-gold hover:text-luxury-black hover:scale-110 hover:border-gold transition-all duration-300 cursor-pointer"
          >
            <span className="text-lg leading-none">&#8594;</span>
          </button>
        </div>
      </div>
      <hr className="absolute bottom-0 left-0 w-full h-[1px] divider-teal border-none" />
    </section>
  );
}

