'use client';

import React from 'react';
import {
  Globe,
  Building2,
  Calculator,
  Ship,
  Award,
  IdCard,
  Home,
  ArrowRight,
} from 'lucide-react';

export default function ServicesBar() {
  const services = [
    {
      id: 'immigration',
      icon: Globe,
      title: 'Immigration',
      description: 'Visas, residency and immigration solutions',
    },
    {
      id: 'corporations',
      icon: Building2,
      title: 'Corporations',
      description: 'Company formation and corporate services',
    },
    {
      id: 'accounting',
      icon: Calculator,
      title: 'Accounting',
      description: 'Accounting, tax and financial advisory',
    },
    {
      id: 'maritime',
      icon: Ship,
      title: 'Maritime',
      description: 'Maritime legal advice and vessel registration',
    },
    {
      id: 'naturalization',
      icon: Award,
      title: 'Naturalization',
      description: 'Panamanian citizenship by law',
    },
    {
      id: 'work-permits',
      icon: IdCard,
      title: 'Work Permits',
      description: 'Work permits and labor legal support',
    },
    {
      id: 'real-estate',
      icon: Home,
      title: 'Real Estate',
      description: 'Real estate transactions and legal due diligence',
    },
  ];

  return (
    <section id="services" className="relative bg-[#0D0D0D] py-12 border-t border-b border-white/10 z-20">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        
        {/* 7 Practice Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative bg-[#141414] hover:bg-[#1A1A1A] border border-white/5 hover:border-[#C8A04A]/40 rounded-xl p-5 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg hover:shadow-xl hover:shadow-[#C8A04A]/5 cursor-pointer"
              >
                <div>
                  {/* Minimal Gold Icon */}
                  <div className="w-10 h-10 rounded-lg bg-[#C8A04A]/10 border border-[#C8A04A]/20 flex items-center justify-center mb-4 text-[#C8A04A] group-hover:bg-[#C8A04A] group-hover:text-black transition-all duration-300">
                    <Icon className="w-5 h-5 stroke-[1.7]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-sans font-semibold text-base text-white group-hover:text-[#C8A04A] transition-colors mb-1.5">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Subtle Arrow on hover */}
                <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-[#C8A04A] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-medium tracking-wider">Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
