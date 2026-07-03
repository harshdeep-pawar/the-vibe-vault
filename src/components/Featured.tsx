"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { Flame, ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Featured() {
  const featuredItems = [
    { title: "Pant & Shirt Combination", tag: "Trending", image: "/Pant & Shirt Combination.jpg" },
    { title: "T-Shirt & Jeans with Jacket", tag: "Best Seller", image: "/T-Shirt, Jeans with Jacket.jpg" },
    { title: "Kurta Pajama", tag: "Premium", image: "/Kurta pajama.jpg" },
  ];

  return (
    <section id="featured" className="py-24 relative select-none overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="pill inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full text-gold font-heading text-[10px] font-bold tracking-[1.5px] uppercase mb-4">
            <Flame className="w-3 h-3" />
            Vibe Highlights
          </div>
          <h2 className="font-heading text-[32px] sm:text-[48px] font-black leading-tight tracking-[-1.5px] text-white">
            Curated Collections
          </h2>
          <p className="text-text-dim text-[14px] sm:text-[15px] max-w-[500px] mt-2.5">
            Hand-picked statement pairings engineered to elevate your visual presence instantly.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto px-4">
          <Swiper
            modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            coverflowEffect={{
              rotate: 5,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            breakpoints={{
              320: { slidesPerView: 1.1 },
              640: { slidesPerView: 1.6 },
              1024: { slidesPerView: 2.2 },
            }}
            className="pb-16"
          >
            {featuredItems.concat(featuredItems).map((item, idx) => (
              <SwiperSlide
                key={idx}
                className="relative rounded-3xl overflow-hidden border border-gold/10 bg-luxury-gray h-[420px] transition-all duration-300 hover:border-gold/30 hover:shadow-glow-strong"
              >
                <span className="absolute top-4 left-4 font-heading text-[9px] font-extrabold px-3.5 py-1.5 bg-black/82 backdrop-blur-md border border-gold text-gold rounded-full tracking-[1.5px] uppercase z-10">
                  {item.tag}
                </span>
                <div className="relative w-full h-[75%]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="h-[25%] px-6 flex items-center justify-between bg-luxury-gray">
                  <h4 className="font-heading font-bold text-[16px] text-white tracking-[0.3px]">{item.title}</h4>
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-luxury-black transition-colors duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Controls */}
          <button className="swiper-button-prev-custom absolute left-[-20px] top-[40%] -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 border border-gold/10 text-gold flex items-center justify-center z-20 hover:bg-gold hover:text-luxury-black hover:scale-108 transition-all duration-300">
            &#8592;
          </button>
          <button className="swiper-button-next-custom absolute right-[-20px] top-[40%] -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 border border-gold/10 text-gold flex items-center justify-center z-20 hover:bg-gold hover:text-luxury-black hover:scale-108 transition-all duration-300">
            &#8594;
          </button>
        </div>
      </div>
      <hr className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent border-none" />
    </section>
  );
}
