'use client';

import React from 'react';
import { ArrowRight, Users, Globe, Briefcase, Award } from 'lucide-react';

interface AboutSectionProps {
  onOpenConsultation?: () => void;
}

export default function AboutSection({ onOpenConsultation }: AboutSectionProps) {
  const stats = [
    {
      icon: Users,
      number: '15+',
      label: 'Years of Experience',
    },
    {
      icon: Globe,
      number: '1,000+',
      label: 'Clients Worldwide',
    },
    {
      icon: Briefcase,
      number: '7',
      label: 'Practice Areas',
    },
    {
      icon: Award,
      number: '100%',
      label: 'Commitment',
    },
  ];

  return (
    <section id="about" className="relative bg-[#F8F9FA] text-[#1A1A1A] py-24 px-6 lg:px-16 z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: About Text Content */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          {/* Label */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C8A04A]">
              ABOUT US
            </span>
            <div className="h-[2px] w-10 bg-[#C8A04A]" />
          </div>

          {/* Heading */}
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#0D0D0D] leading-[1.15]">
            Excellence in Legal Services
          </h2>

          {/* Paragraph */}
          <p className="text-base text-gray-600 font-sans leading-relaxed font-normal">
            EIP & Associates is a Panamanian law firm that offers a full range of legal, corporate, immigration and accounting services with the highest standards of quality, ethics and professionalism.
          </p>

          {/* Button */}
          <div className="pt-2">
            <button
              onClick={onOpenConsultation}
              className="group px-7 py-3.5 rounded-xl border border-gray-300 hover:border-[#C8A04A] bg-white hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-white font-semibold text-xs uppercase tracking-[0.15em] transition-all duration-300 shadow-sm hover:shadow-xl flex items-center gap-3"
            >
              <span>LEARN MORE ABOUT US</span>
              <ArrowRight className="w-4 h-4 text-[#C8A04A] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: 4 Elevated White Stat Cards (2x2 Grid) */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 text-center shadow-lg shadow-gray-200/60 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center space-y-3 group"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#C8A04A]/10 flex items-center justify-center text-[#C8A04A] group-hover:bg-[#C8A04A] group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>

                {/* Number */}
                <span className="font-serif text-4xl sm:text-5xl font-light text-[#0D0D0D] tracking-tight group-hover:text-[#C8A04A] transition-colors">
                  {stat.number}
                </span>

                {/* Label */}
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
