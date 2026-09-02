'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Alexander Sterling',
      company: 'Sterling Capital Group (London)',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      comment:
        'EIP & Associates handled our complex corporate restructuring in Panama with exemplary speed and discretion. Their legal mastery in cross-border wealth protection is unmatched.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Elena Rostova',
      company: 'Global Maritime Holdings (Geneva)',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      comment:
        'Registering our maritime fleet under the Panamanian flag required deep regulatory expertise. The partners at EIP provided personal, 24/7 dedicated attention throughout.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Carlos Mendoza',
      company: 'Mendoza Tech & Logistics (Miami)',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      comment:
        'Securing our investor residency visas and establishing our regional hub in Panama City was effortless thanks to EIP & Associates. Highest level of professionalism.',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="relative bg-[#0D0D0D] py-24 px-6 lg:px-16 border-t border-white/10 z-20">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-8 bg-[#C8A04A]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C8A04A]">
              CLIENT TESTIMONIALS
            </span>
            <div className="h-[1px] w-8 bg-[#C8A04A]" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-white leading-tight">
            Trusted by Leaders & Global Enterprises
          </h2>
          <p className="text-sm text-white/60 font-light">
            Read what international executives, investors, and high-net-worth clients say about our services.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="group bg-[#1A1A1A] rounded-2xl p-8 border border-white/5 hover:border-[#C8A04A]/40 transition-all duration-500 flex flex-col justify-between space-y-6 hover:-translate-y-1.5 shadow-xl relative"
            >
              {/* Quote Icon Background */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5 group-hover:text-[#C8A04A]/10 transition-colors pointer-events-none" />

              <div className="space-y-4">
                {/* 5 Gold Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#C8A04A] text-[#C8A04A]"
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm text-white/80 font-light leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              {/* Author Photo, Name, Company */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#C8A04A]/40 shadow-md"
                />
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#C8A04A] transition-colors">
                    {t.name}
                  </h4>
                  <p className="text-xs text-white/50 font-light">
                    {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
