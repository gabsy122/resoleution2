import React, { useState } from "react";
import { Search, Compass, AlertCircle, Sparkles } from "lucide-react";
import { ResoleOrder } from "../types";

interface OrderSearchBarProps {
  orders: ResoleOrder[];
  selectedOrderId: string;
  onSelectOrder: (orderId: string) => void;
}

export default function OrderSearchBar({ orders, selectedOrderId, onSelectOrder }: OrderSearchBarProps) {
  const [searchVal, setSearchVal] = useState("");
  const [errorWord, setErrorWord] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorWord("");

    const term = searchVal.trim().toUpperCase();
    if (!term) return;

    const found = orders.find(o => o.id === term || o.customerName.toUpperCase().includes(term));
    if (found) {
      onSelectOrder(found.id);
      setErrorWord("");
    } else {
      setErrorWord(`No climbing shoe order files found matching "${term}". Try another ID.`);
    }
  };

  return (
    <div className="space-y-6" id="order-search-bar-component">
      
      {/* Real-time search panel */}
      <div className="rounded-2xl bg-white border border-stone-200 p-5 shadow-sm">
        <h4 className="text-sm font-black text-stone-900 uppercase tracking-widest font-display mb-3 flex items-center gap-2">
          <Compass className="h-4.5 w-4.5 text-orange-600" />
          <span>Interactive Progress Terminal</span>
        </h4>

        <form onSubmit={handleSearch} className="relative flex items-center gap-2" id="search-bar-form">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-stone-400" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search by Code (e.g. RSL-2045) or Name..."
              className="w-full rounded-xl bg-white border border-stone-250 pl-10 pr-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/20"
              id="search-input"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-stone-100 hover:bg-stone-200 px-5 py-3 text-xs font-bold text-orange-655 border border-stone-205 transition active:scale-95 shrink-0 animate-pulse duration-200 cursor-pointer"
            id="btn-trigger-search"
          >
            Locate Code
          </button>
        </form>

        {errorWord && (
          <p className="text-red-700 text-xs mt-3 flex items-center gap-1" id="search-error-element">
            <AlertCircle className="h-4.5 w-4.5 shrink-0 text-red-650" />
            <span>{errorWord}</span>
          </p>
        )}
      </div>

      {/* Demo Selector Quick-rail */}
      <div className="rounded-2xl bg-white border border-stone-200/90 p-5 shadow-xs" id="quick-demo-test-panel">
        <div className="flex items-center gap-1.5 mb-3">
          <Sparkles className="h-4 w-4 text-orange-600" />
          <span className="text-xs font-mono font-bold text-stone-700 uppercase">One-Click Demonstration Tickets</span>
        </div>
        <p className="text-xs text-stone-500 mb-4 leading-normal font-sans">
          Click any preset climbing file below to test tracking statuses from different stages of our cobbler's workflow:
        </p>

        <div className="space-y-2.5" id="demo-tickets-container">
          {orders.map((ord) => {
            const isSelected = selectedOrderId === ord.id;
            return (
              <button
                key={ord.id}
                onClick={() => {
                  onSelectOrder(ord.id);
                  setErrorWord("");
                }}
                className={`w-full text-left p-3 rounded-lg border text-xs flex justify-between items-center transition cursor-pointer ${
                  isSelected 
                    ? "bg-stone-50 border-orange-500 text-stone-900 shadow-xs font-bold" 
                    : "bg-white border-stone-200 text-stone-500 hover:border-stone-400 hover:bg-stone-50/50"
                }`}
                id={`btn-demo-select-${ord.id}`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-extrabold text-orange-600">{ord.id}</span>
                    <span className="text-stone-800 font-extrabold font-display">{ord.customerName}</span>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-0.5">Brand: {ord.shoeBrand}</p>
                </div>

                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded shrink-0 ${
                  ord.status === "PENDING_ASSESSMENT" ? "bg-stone-105 text-stone-600 border border-stone-200/50" :
                  ord.status === "QUOTE_OFFERED" ? "bg-blue-50 text-blue-650 border border-blue-150/40" :
                  ord.status === "AWAITING_SHIPMENT" ? "bg-amber-50 text-amber-700 border border-amber-150/40" :
                  ord.status === "RECEIVED_IN_PROGRESS" ? "bg-orange-50 text-orange-655 border border-orange-150/40 animate-pulse" :
                  ord.status === "COMPLETED" ? "bg-emerald-50 text-emerald-700 border border-emerald-150/40" :
                  "bg-stone-100 text-stone-605"
                }`}>
                  {ord.status.replace(/_/g, " ")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
