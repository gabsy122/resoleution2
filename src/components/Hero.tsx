import React from "react";
import { Camera, ClipboardList, Send, Sparkles, AlertCircle, ShieldCheck } from "lucide-react";

interface HeroProps {
  onStartRequest: () => void;
}

export default function Hero({ onStartRequest }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-white text-stone-900 border-b border-stone-100" id="hero-section">
      {/* Decorative blurred climbing wallpaper backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50/40 via-stone-50/50 to-white pointer-events-none" />
      
      {/* Top Banner announcing quality service */}
      <div className="relative bg-orange-50/60 border-b border-orange-100/70 px-4 py-2.5 text-center" id="hero-top-banner">
        <p className="flex items-center justify-center gap-2 text-xs font-semibold text-orange-900">
          <Sparkles className="h-3.5 w-3.5 text-orange-600" />
          <span>Equipped with authentic Italian pressing rigs & elite proprietary vulcanization rubber formulas.</span>
        </p>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-20 sm:pb-24 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Hero text section */}
          <div className="space-y-6 lg:col-span-7" id="hero-text-block">
            <div className="inline-flex items-center space-x-2 rounded-full bg-stone-100 px-3 py-1.5 text-xs font-mono text-stone-700 border border-stone-200">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span>Accepting National Mail-In Orders</span>
            </div>
            
            <h2 className="text-4xl font-black tracking-tight text-stone-900 sm:text-5xl lg:text-5xl uppercase leading-tight sm:leading-none font-display">
              Save Your Shoes.<br />
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent text-5xl sm:text-6xl tracking-tight block mt-2">
                RESOLEUTION.
              </span>
            </h2>
            
            <p className="text-base text-stone-605 sm:text-lg leading-relaxed max-w-2xl font-sans">
              Don't throw away that perfect, broken-in fit. Our premium cobbler lab specializes in expert bouldering shoe restoration. Upload wear-and-tear photos of your shoe brand, get a direct custom price quote, and track the repair stage in our interactive status panel.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={onStartRequest}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-orange-500/10 hover:from-orange-500 hover:to-orange-400 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                id="hero-cta-button"
              >
                Start Free Photo Assessment
              </button>
              
              <div className="flex items-center gap-2.5 text-xs text-stone-500 font-mono">
                <ShieldCheck className="h-5 w-5 text-orange-600 shrink-0" />
                <span>Zero charge until you approve the price proposal.</span>
              </div>
            </div>

            {/* Quick value badges */}
            <div className="grid grid-cols-3 gap-4 border-t border-stone-200/80 pt-8" id="hero-badges-grid">
              <div>
                <p className="text-2xl font-extrabold text-stone-900 font-display">24hr</p>
                <p className="text-xs text-stone-500">Diagnosis Window</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-orange-600 font-display">NDA PROTECTED</p>
                <p className="text-xs text-stone-500 font-sans">Secret Friction Formula</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-stone-900 font-display">100%</p>
                <p className="text-xs text-stone-500 font-mono">Hand-finished edges</p>
              </div>
            </div>
          </div>

          {/* Graphical Display Element representing premium repair */}
          <div className="relative lg:col-span-12 xl:col-span-5" id="hero-graphic-block">
            <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-stone-50 p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-stone-200" />
                  <div className="h-3 w-3 rounded-full bg-stone-250" />
                  <div className="h-3 w-3 rounded-full bg-stone-300" />
                </div>
                <span className="font-mono text-xs text-stone-400">RESOLE_FEASIBILITY_DIAGNOSTIC.PHP</span>
              </div>

              <div className="space-y-4">
                <div className="aspect-video relative rounded-lg bg-stone-100 border border-stone-200 overflow-hidden flex items-center justify-center group">
                  <img 
                    src="https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=600" 
                    alt="Climbing shoe repair illustration"
                    className="object-cover w-full h-full opacity-90 group-hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-stone-950/20" />
                  <div className="absolute inset-x-4 bottom-4 bg-white/95 border border-stone-200 shadow-sm rounded-lg p-3">
                    <p className="text-[11px] font-mono text-orange-600 font-extrabold uppercase tracking-wider">Example assessment view</p>
                    <p className="text-xs text-stone-800 mt-1 font-semibold">"Sole rubber worn thin. Active edge holding but right rand requires split patching ($20 extra)."</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-stone-500">Diagnosis Accuracy</span>
                    <span className="text-orange-600 font-bold">100% Secure</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-stone-200 overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-orange-600 to-amber-500 rounded-full" />
                  </div>
                </div>

                <div className="rounded-xl bg-orange-50/60 border border-orange-100/80 p-3 flex items-start gap-2.5">
                  <AlertCircle className="h-4.5 w-4.5 text-orange-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-orange-900 leading-normal">
                    <strong>Avoid further climbing</strong> once your leather/synthetic rand rubber layers start peeling! Catching it early saves you on split rand patches.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Step-by-Step Flow Explanation */}
        <div className="mt-20 border-t border-stone-200 pt-16" id="how-it-works-section">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-2xl font-black uppercase tracking-tight text-stone-900 sm:text-3xl font-display">
              THE MAIL-IN RESOLING SYSTEM
            </h3>
            <p className="text-stone-500 mt-2 text-sm sm:text-base">
              Four streamlined steps to fresh, high-performance climbing rubber.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4" id="how-it-works-steps-grid">
            
            {/* Step 1 */}
            <div className="relative group rounded-xl p-5 bg-stone-50 border border-stone-205/65 hover:border-orange-500/20 transition duration-300 shadow-xs hover:shadow-sm">
              <div className="absolute top-4 right-4 text-3xl font-black font-mono text-stone-200 group-hover:text-stone-300 transition">01</div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 border border-orange-100 text-orange-605">
                <Camera className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-stone-900 text-sm font-display">1. Upload Diagnostics Photo</h4>
              <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                Snap high-contrast photos of the worn edges. Register your footwear brand in our Resoleution portal.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative group rounded-xl p-5 bg-stone-50 border border-stone-205/65 hover:border-orange-500/20 transition duration-300 shadow-xs hover:shadow-sm">
              <div className="absolute top-4 right-4 text-3xl font-black font-mono text-stone-200 group-hover:text-stone-300 transition">02</div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 border border-amber-100 text-amber-605">
                <ClipboardList className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-stone-900 text-sm font-display">2. Receive Clean Proposal</h4>
              <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                Our master repair team evaluates materials. If repairable, we assign an attractive price quote to your ticket.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative group rounded-xl p-5 bg-stone-50 border border-stone-205/65 hover:border-orange-500/20 transition duration-300 shadow-xs hover:shadow-sm">
              <div className="absolute top-4 right-4 text-3xl font-black font-mono text-stone-200 group-hover:text-stone-300 transition">03</div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 border border-orange-100 text-orange-605">
                <Send className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-stone-900 text-sm font-display">3. Mail in Footwear</h4>
              <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                Once agreed, pack your boots and write your unique Ticket ID visible on the package back-surface.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative group rounded-xl p-5 bg-stone-50 border border-stone-205/65 hover:border-orange-500/20 transition duration-300 shadow-xs hover:shadow-sm">
              <div className="absolute top-4 right-4 text-3xl font-black font-mono text-stone-200 group-hover:text-stone-300 transition">04</div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 border border-amber-100 text-amber-605">
                <Sparkles className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-stone-900 text-sm font-display">4. Stage Tracking Status</h4>
              <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                Watch live as we grind down old rubber, apply our secret chemical adhesive layer, and press fresh rubber!
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
