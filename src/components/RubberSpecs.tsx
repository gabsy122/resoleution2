import React from "react";
import { Sparkles, Shield, Lock, Footprints, Flame } from "lucide-react";

export default function RubberSpecs() {
  return (
    <section className="bg-stone-50 border-t border-b border-stone-200/80 px-4 py-16 sm:px-6 lg:px-8 text-stone-900 relative" id="rubber-specs-section">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-50/20 via-stone-50/50 to-white/45 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl">
        
        {/* Title and Intro */}
        <div className="mb-12 text-center md:text-left md:flex md:items-end md:justify-between border-b border-stone-200 pb-8">
          <div className="max-w-xl">
            <span className="text-[11px] font-mono tracking-widest text-orange-600 uppercase font-black bg-orange-50 px-2.5 py-1 rounded">Classified Chemistry</span>
            <h3 className="text-3xl font-black tracking-tight text-stone-900 uppercase mt-3 font-display">
              THE FORMULA RESOLEUTION™
            </h3>
            <p className="text-stone-600 mt-2 text-sm leading-relaxed font-sans">
              We do not disclose the exact compounds or brands of rubber utilized in our workshop. Our vulcanized compounds are kept strictly confidential to protect our industry-leading friction metrics.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2 justify-center md:justify-start">
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-stone-605 shadow-xs">
              <Lock className="h-4 w-4 text-orange-600" />
              <span className="font-mono text-orange-650 font-bold">RESTRICTED INGREDIENTS</span>
            </span>
          </div>
        </div>

        {/* Dynamic selector and spec panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Left panel: Myth and Quality assurance info */}
          <div className="space-y-6 flex flex-col justify-between rounded-2xl bg-white border border-stone-205/85 p-6 sm:p-8 shadow-xs" id="rubber-secret-intro">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 border border-orange-100 mb-5">
                <Flame className="h-6 w-6 text-orange-605" />
              </div>
              <h4 className="text-xl font-black text-stone-900 uppercase font-display">UNRIVALED STICKINESS</h4>
              <p className="text-stone-600 text-sm mt-3 leading-relaxed">
                By blending custom elastomeric rubber polymers at exact micro-temperatures, we achieve a compound that balances high edge sensitivity with phenomenal friction. 
              </p>
              <p className="text-stone-605 text-sm mt-3 leading-relaxed">
                Whether you are standing on microscopic limestone chips or smearing on low-profile dual-texture gym slopers, Formula Resoleution™ adapts dynamically to the pressure applied.
              </p>
            </div>
            
            <div className="pt-6 border-t border-stone-150 mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Footprints className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-black text-stone-900 uppercase font-display">Thickness</h5>
                  <p className="text-[11px] text-stone-500 font-mono mt-0.5 font-semibold">Optimized 4.2mm</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-black text-stone-900 uppercase font-display">Durability</h5>
                  <p className="text-[11px] text-stone-500 font-mono mt-0.5 font-semibold">Dual vulcanization</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Live Compound Specification Dashboard */}
          <div className="rounded-2xl bg-white border border-stone-205/85 p-6 sm:p-8 shadow-xs relative overflow-hidden flex flex-col justify-between" id="rubber-specification-details-card">
            <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-orange-50/50 to-transparent pointer-events-none" />
            
            <div>
              <div className="flex items-start justify-between border-b border-stone-100 pb-4 mb-5">
                <div>
                  <span className="text-[10px] text-orange-600 font-mono tracking-widest uppercase font-extrabold">The Resoleution Promise</span>
                  <h4 className="text-xl font-black text-stone-900 mt-1 uppercase font-display">Proprietary Compound</h4>
                </div>
                <Sparkles className="h-5 w-5 text-orange-600 shrink-0" />
              </div>

              <div className="space-y-4 text-sm text-stone-600 leading-relaxed">
                <p>
                  To protect the intellectual property of our workshop, we signed an exclusive non-disclosure agreement with our rubber compound formulation laboratory.
                </p>
                <blockquote className="border-l-2 border-orange-500 bg-orange-50/30 px-4 py-2.5 my-3 italic text-stone-700 text-xs sm:text-sm rounded-r-lg">
                  "The rubber selected delivers phenomenal sticky properties while maintaining high resistance to sheer stresses. This results in standard longevity which exceeds traditional climbing rubber options."
                </blockquote>
                <p>
                  So when you send your shoes to <strong className="text-stone-900 font-semibold">Resoleution</strong>, feel assured that they receive a secret, military-grade adhesive and composite application to return them to direct climbing shape.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-stone-100 text-[11px] text-stone-500 font-mono flex items-center gap-1.5">
              <Lock className="h-4 w-4 text-stone-405 shrink-0" />
              <span>We do not list materials on receipts or online orders. Kept completely anonymous.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
