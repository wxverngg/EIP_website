'use client';

import React from 'react';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

export default function NewsSection() {
  const news = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      category: 'IMMIGRATION & VISAS',
      date: 'OCTOBER 14, 2025',
      title: 'New Tax Incentives and Residency Opportunities for Foreign Investors in Panama',
      description: 'An overview of the updated Executive Decrees regarding Qualified Investor Residencies and tax exemptions in Panama.',
      href: '#',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      category: 'CORPORATE LAW',
      date: 'SEPTEMBER 28, 2025',
      title: 'Key Regulatory Amendments for International Holding Companies Operating in Panama',
      description: 'Understanding compliance, ultimate beneficial ownership registers, and annual filing standards for Panamanian entities.',
      href: '#',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
      category: 'MARITIME & SHIPS',
      date: 'AUGUST 19, 2025',
      title: 'Panama Maritime Authority Streamlines Vessel Registration and Licensing Protocols',
      description: 'Recent updates on digital flag administration, mortgage registration, and environmental compliance for global fleets.',
      href: '#',
    },
  ];

  return (
    <section id="news" className="relative bg-[#141414] py-24 px-6 lg:px-16 border-t border-white/10 z-20">
      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C8A04A]">
                LEGAL INSIGHTS
              </span>
              <div className="h-[1px] w-12 bg-[#C8A04A]" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-white leading-tight">
              Latest Legal News
            </h2>
          </div>

          <a
            href="#"
            className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C8A04A] hover:text-white transition-colors"
          >
            <span>View All Insights</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* 3 News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <article
              key={item.id}
              className="group bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/5 hover:border-[#C8A04A]/40 transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5"
            >
              <div>
                {/* Image Placeholder */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
                  
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-[#C8A04A] uppercase tracking-wider">
                    <Tag className="w-3 h-3" />
                    <span>{item.category}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-3">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <Calendar className="w-3.5 h-3.5 text-[#C8A04A]" />
                    <span>{item.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-normal text-white group-hover:text-[#C8A04A] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-white/60 font-light leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Read More */}
              <div className="px-6 pb-6 pt-2">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C8A04A] group-hover:text-white transition-colors">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
