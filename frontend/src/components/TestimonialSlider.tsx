// components/TestimonialSlider.tsx
import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi",
    avatar: "👩",
    text: "The AR experience at Hundru Falls was magical! I could see historical information overlay while enjoying the waterfall. Made our trip unforgettable.",
    rating: 5
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Mumbai",
    avatar: "👨",
    text: "Booked a homestay in Netarhat through this platform. The host was wonderful and the AI recommendations for nearby attractions were spot on!",
    rating: 5
  },
  {
    id: 3,
    name: "Sonia Murmu",
    location: "Ranchi",
    avatar: "👩",
    text: "As a local, I'm impressed by how well they've captured our tribal culture. The marketplace helped me sell my Dokra art globally!",
    rating: 5
  },
  {
    id: 4,
    name: "Amit Kumar",
    location: "Bangalore",
    avatar: "👨",
    text: "GIS navigation made our road trip so easy. Real-time alerts about eco-sensitive zones and crowd density were very helpful.",
    rating: 4
  }
]

export default function TestimonialSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      autoplay={{ delay: 5000 }}
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }}
      className="testimonial-slider pb-12"
    >
      {testimonials.map((t) => (
        <SwiperSlide key={t.id}>
          <div className="bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col">
            {/* Rating */}
            <div className="flex gap-1 text-accent mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < t.rating ? '★' : '☆'}</span>
              ))}
            </div>
            
            {/* Quote */}
            <p className="text-gray-600 italic mb-6 flex-1">"{t.text}"</p>
            
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-2xl">
                {t.avatar}
              </div>
              <div>
                <h4 className="font-bold text-primary">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.location}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}