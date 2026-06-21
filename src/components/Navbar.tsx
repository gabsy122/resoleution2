import React from "react";
import { Mountain, Flame, Compass, Wrench, ShieldAlert } from "lucide-react";

interface NavbarProps {
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
  onScrollToSection: (id: string) => void;
}

export default function Navbar({ isAdmin, setIsAdmin, onScrollToSection }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-205 bg-white/95 backdrop-blur-md shadow-xs" id="app-header">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo / Branding */}
        <div 
          className="flex cursor-pointer items-center space-x-2.5 transition-opacity hover:opacity-90"
          onClick={() => onScrollToSection("hero-section")}
          id="nav-logo"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 shadow-md shadow-orange-500/10">
            <Mountain className="h-5.5 w-5.5 text-stone-50" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-stone-900 sm:text-xl font-display uppercase">
              RESOLEUTION
            </h1>
            <p className="hidden text-[10px] font-mono tracking-widest text-stone-500 uppercase sm:block">
              Premium Climbing Shoe Cobbler
            </p>
          </div>
        </div>

        {/* Regular navigation - hidden or adjusted in Admin view */}
        <nav className="hidden md:flex items-center space-x-8" id="main-nav-links">
          <button 
            onClick={() => onScrollToSection("how-it-works-section")}
            className="text-sm font-semibold text-stone-605 hover:text-orange-600 transition cursor-pointer"
          >
            How it Works
          </button>
          <button 
            onClick={() => onScrollToSection("rubber-specs-section")}
            className="text-sm font-semibold text-stone-605 hover:text-orange-600 transition cursor-pointer"
          >
            Secret Rubber Formula
          </button>
          <button 
            onClick={() => onScrollToSection("resole-system-section")}
            className="text-sm font-semibold text-stone-605 hover:text-orange-600 transition cursor-pointer"
          >
            Tracking & Consultations
          </button>
        </nav>

        {/* System Access Controls (Client vs Admin Toggle) */}
        <div className="flex items-center space-x-3" id="nav-actions">
          <div className="relative flex items-center rounded-full bg-stone-100 p-1 border border-stone-200">
            <button
              onClick={() => setIsAdmin(false)}
              className={`flex items-center space-x-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition duration-200 ${
                !isAdmin 
                  ? "bg-white text-orange-600 shadow-sm border border-stone-200/40" 
                  : "text-stone-500 hover:text-stone-800"
              }`}
              id="btn-switch-customer"
            >
              <Compass className="h-3.5 w-3.5" />
              <span>🧗 Climber Hub</span>
            </button>
            <button
              onClick={() => setIsAdmin(true)}
              className={`flex items-center space-x-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition duration-200 ${
                isAdmin 
                  ? "bg-orange-600 text-stone-50 shadow-sm" 
                  : "text-stone-500 hover:text-stone-800"
              }`}
              id="btn-switch-admin"
            >
              <Wrench className="h-3.5 w-3.5" />
              <span>🛠️ Cobbler Portal</span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
