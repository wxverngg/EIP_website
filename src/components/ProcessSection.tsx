'use client';

import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

export default function ProcessSection() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const steps = [
    {
      num: 1,
      title: 'Consultation',
      desc: 'We listen to your needs and understand your situation.',
    },
    {
      num: 2,
      title: 'Strategy',
      desc: 'We analyze your case and design the best strategy.',
    },
    {
      num: 3,
      title: 'Execution',
      desc: 'We implement the agreed plan with precision.',
    },
    {
      num: 4,
      title: 'Results',
      desc: 'We deliver effective solutions and long-term support.',
    },
  ];

  return (
    <section className="relative bg-[#0D0D0D] py-24 px-6 lg:px-16 border-t border-white/10 z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Video Thumbnail / Panama Landmark */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80"
                alt="Panama Bridge and Skyline"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Play Button Overlay */}
              <button
                onClick={() => setVideoModalOpen(true)}
                className="absolute inset-0 flex items-center justify-center group/btn"
              >
                <div className="w-16 h-16 rounded-full bg-[#C8A04A] text-black flex items-center justify-center shadow-2xl group-hover/btn:scale-110 transition-transform duration-300">
                  <Play className="w-7 h-7 fill-black ml-1" />
                </div>
              </button>

              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-white/70">
                <span className="font-mono uppercase tracking-wider text-[11px]">FIRMA LEGAL EIP & ASSOCIATES</span>
                <span className="text-[#C8A04A] font-semibold">2:45 MIN</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Timeline Steps */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div>
              {/* Tag */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C8A04A]">
                  OUR PROCESS
                </span>
                <div className="h-[1px] w-12 bg-[#C8A04A]" />
              </div>

              {/* Heading */}
              <h2 className="font-serif text-4xl sm:text-5xl font-light text-white leading-tight">
                How We Work
              </h2>
            </div>

            {/* Timeline Steps (1 to 4) */}
            <div className="relative pt-4">
              {/* Connecting Line (Desktop) */}
              <div className="hidden sm:block absolute top-9 left-6 right-6 h-[1px] bg-white/15 z-0" />

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative z-10">
                {steps.map((step) => (
                  <div key={step.num} className="flex flex-col items-start sm:items-center text-left sm:text-center group">
                    {/* Numbered Gold Badge */}
                    <div className="w-12 h-12 rounded-full bg-[#C8A04A] text-black font-bold font-serif text-lg flex items-center justify-center shadow-lg shadow-[#C8A04A]/20 mb-4 group-hover:scale-110 transition-transform">
                      {step.num}
                    </div>

                    {/* Step Title */}
                    <h3 className="text-base font-semibold text-white group-hover:text-[#C8A04A] transition-colors mb-1.5">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs text-white/60 font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-[#141414] border border-white/10 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-center space-y-4 py-8">
              <span className="inline-block px-3 py-1 rounded-full bg-[#C8A04A]/20 text-[#C8A04A] text-xs font-mono">
                VIDEO DEL CLIENTE
              </span>
              <h3 className="font-serif text-2xl text-white">EIP & Associates Legal Firm Overview</h3>
              <div className="aspect-video bg-black/80 rounded-xl flex items-center justify-center border border-white/10">
                <p className="text-white/50 text-sm">Client video content will stream here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
