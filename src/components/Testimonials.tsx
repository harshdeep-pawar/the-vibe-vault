"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star, MessageSquare } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  const reviews = [
    {
      name: "Rahul Sharma",
      location: "Indore",
      text: "The quality is unmatched! Every piece I bought from The Vibe Vault feels premium. The fits are perfect and the fabric quality is top-notch.",
      rating: 5,
      initial: "R",
    },
    {
      name: "Arjun Patel",
      location: "Rau",
      text: "Best clothing store in Indore hands down. The collection is always fresh and trendy. Their customer service is exceptional too!",
      rating: 5,
      initial: "A",
    },
    {
      name: "Vikram Singh",
      location: "Indore",
      text: "I love how they combine street style with elegance. Got compliments every time I wear their outfits. Highly recommended!",
      rating: 5,
      initial: "V",
    },
  ];

  return (
    <section id="testimonials" className="py-24 relative select-none">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="pill inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full text-gold font-heading text-[10px] font-bold tracking-[1.5px] uppercase mb-4">
            <MessageSquare className="w-3 h-3" />
            Reviews
          </div>
          <h2 className="font-heading text-[32px] sm:text-[48px] font-black leading-tight tracking-[-1.5px] text-white">
            What Our Customers Say
          </h2>
          <p className="text-text-dim text-[14px] sm:text-[15px] max-w-[500px] mt-2.5">
            Real feedback from our Indore style community who live the vault vibe.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={24}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {reviews.concat(reviews).map((t, i) => (
              <SwiperSlide key={i} className="h-auto">
                <div className="testimonial-card h-full p-8 bg-luxury-gray border border-gold/10 rounded-2xl relative overflow-hidden group hover:border-gold/20 hover:shadow-glow hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between">
                  {/* Quote decoration */}
                  <div className="absolute top-3 right-6 font-serif text-[90px] text-gold/5 pointer-events-none select-none">
                    &ldquo;
                  </div>

                  <div>
                    <div className="flex gap-1 text-gold mb-5">
                      {Array(t.rating)
                        .fill(0)
                        .map((_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 fill-gold stroke-none" />
                        ))}
                    </div>
                    <p className="text-text-dim text-[14px] leading-relaxed italic mb-6">
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-[50px] h-[50px] rounded-full bg-gold/10 text-gold font-heading text-[18px] font-bold flex items-center justify-center border-2 border-gold/20 group-hover:border-gold group-hover:shadow-[0_0_16px_rgba(201,169,97,0.15)] group-hover:scale-105 transition-all duration-300">
                      {t.initial}
                    </div>
                    <div className="flex flex-col text-left">
                      <strong className="text-white text-[14px] font-bold block mb-0.5">{t.name}</strong>
                      <span className="text-text-dim text-[12px] flex items-center gap-1 font-medium">
                        {t.location}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <hr className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent border-none" />
    </section>
  );
}
