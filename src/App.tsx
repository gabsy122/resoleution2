import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RubberSpecs from "./components/RubberSpecs";
import CustomerOrderForm from "./components/CustomerOrderForm";
import OrderSearchBar from "./components/OrderSearchBar";
import CustomerOrderView from "./components/CustomerOrderView";
import AdminDashboard from "./components/AdminDashboard";

import { ResoleOrder, OrderStatus } from "./types";
import { INITIAL_MOCK_ORDERS, MOCK_ORDERS_STORAGE_KEY } from "./constants";
import { ShieldCheck, Calendar, ArrowRight, Compass, Wrench, Mountain } from "lucide-react";

export default function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [orders, setOrders] = useState<ResoleOrder[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");

  // Load orders initially from localStorage or load custom mock files
  useEffect(() => {
    const cached = localStorage.getItem(MOCK_ORDERS_STORAGE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as ResoleOrder[];
        setOrders(parsed);
        if (parsed.length > 0) {
          setSelectedOrderId(parsed[0].id);
        }
      } catch (err) {
        console.error("Localstorage parsing error, resetting context", err);
        setOrders(INITIAL_MOCK_ORDERS);
        localStorage.setItem(MOCK_ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_MOCK_ORDERS));
        setSelectedOrderId(INITIAL_MOCK_ORDERS[0].id);
      }
    } else {
      setOrders(INITIAL_MOCK_ORDERS);
      localStorage.setItem(MOCK_ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_MOCK_ORDERS));
      setSelectedOrderId(INITIAL_MOCK_ORDERS[0].id);
    }
  }, []);

  // Sync state to local storage whenever climbing files change
  const handlePersistOrders = (newOrdersList: ResoleOrder[]) => {
    setOrders(newOrdersList);
    localStorage.setItem(MOCK_ORDERS_STORAGE_KEY, JSON.stringify(newOrdersList));
  };

  // Customer submits a brand-new free assessment file
  const handleAddOrder = (newOrder: ResoleOrder) => {
    const updatedList = [newOrder, ...orders];
    handlePersistOrders(updatedList);
    setSelectedOrderId(newOrder.id);
  };

  // Cobbler updates pricing quotes or stage status logs
  const handleUpdateOrder = (updatedOrder: ResoleOrder) => {
    const updatedList = orders.map(o => o.id === updatedOrder.id ? updatedOrder : o);
    handlePersistOrders(updatedList);
  };

  // Customer accepts the cobbler's pricing quote (Moves status -> AWAITING_SHIPMENT)
  const handleAcceptQuote = (orderId: string) => {
    const found = orders.find(o => o.id === orderId);
    if (!found) return;

    const updatedOrder: ResoleOrder = {
      ...found,
      status: OrderStatus.AWAITING_SHIPMENT,
      history: [
        ...found.history,
        {
          status: OrderStatus.AWAITING_SHIPMENT,
          timestamp: new Date().toISOString(),
          note: `Customer approved the quoted proposal of $${found.quotePrice || 55}. Order is authorized for mail-in package delivery.`
        }
      ]
    };

    handleUpdateOrder(updatedOrder);
  };

  // Smooth scroll controller
  const handleScrollToSection = (id: string) => {
    // If in Admin view, switch to Customer view first
    if (isAdmin) {
      setIsAdmin(false);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-orange-600 selection:text-white" id="app-root-wrapper">
      
      {/* Universal header Navbar */}
      <Navbar 
        isAdmin={isAdmin} 
        setIsAdmin={setIsAdmin} 
        onScrollToSection={handleScrollToSection} 
      />

      {/* Primary views selection */}
      {!isAdmin ? (
        /* CLIMBERHUB (Client / Customer View) */
        <div className="space-y-0" id="climber-hub-view">
          
          <Hero onStartRequest={() => handleScrollToSection("resole-system-section")} />
          
          <RubberSpecs />

          {/* Interactive Resoling Application Sandbox Area */}
          <div className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-stone-200/80" id="resole-system-section">
            <div className="mx-auto max-w-7xl">
              
              {/* Section Header */}
              <div className="text-center max-w-3xl mx-auto mb-14" id="tracker-system-titles">
                <span className="text-[11px] font-mono tracking-widest text-orange-600 uppercase font-black bg-orange-50 px-2.5 py-1 rounded">Interactive Sandbox</span>
                <h3 className="text-3xl font-black uppercase text-stone-900 mt-2.5 font-display">
                  Wear Assessments & Order Tracker
                </h3>
                <p className="text-xs sm:text-sm text-stone-605 mt-2 max-w-2xl mx-auto">
                  Use the left form to upload shoe pictures for free evaluation. Use the right console to view your timeline, change statuses, or test our preset tickets!
                </p>
              </div>

              {/* Main working layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="customer-desktop-layout">
                
                {/* Free Assessment Consultation Form */}
                <div className="lg:col-span-5" id="customer-form-column-wrapper">
                  <CustomerOrderForm onSubmitOrder={handleAddOrder} />
                </div>

                {/* Right side tracking view */}
                <div className="lg:col-span-7 space-y-6" id="customer-tracking-column-wrapper">
                  
                  {/* Order selector bar */}
                  <div id="tracker-section">
                    <OrderSearchBar 
                      orders={orders} 
                      selectedOrderId={selectedOrderId} 
                      onSelectOrder={(id) => setSelectedOrderId(id)} 
                    />
                  </div>

                  {/* Customer status timeline views */}
                  <CustomerOrderView 
                    order={orders.find(o => o.id === selectedOrderId) || null} 
                    onAcceptQuote={handleAcceptQuote}
                  />

                </div>

              </div>

            </div>
          </div>

          {/* Interactive Cobbler Teasing Banner */}
          <div className="bg-gradient-to-r from-orange-50/40 via-stone-50 to-orange-50/40 py-16 px-4 text-center border-t border-stone-200" id="banner-admin-tease">
            <div className="max-w-2xl mx-auto space-y-4">
              <span className="text-[10px] font-mono text-orange-600 tracking-wider font-extrabold uppercase bg-white border border-stone-205 px-2.5 py-1 rounded">
                Cobbler Testing Sandbox Mode
              </span>
              <h4 className="text-xl md:text-2xl font-extrabold text-stone-900 uppercase tracking-tight font-display">
                Want to update stages and make custom price proposals?
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Switch to the <strong className="text-orange-600 font-bold">Cobbler Portal</strong> at the top right header to simulate how Gary the Master Cobbler reviews climbing shoes, inputs pricing quotes, and advances repairs through the active staging lines.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsAdmin(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-4.5 py-2 text-xs font-bold text-white hover:bg-orange-500 transition shadow-sm hover:shadow active:scale-95 cursor-pointer"
                  id="btn-trigger-switch-banner"
                >
                  <span>Open Cobbler Workbench Panel</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* COBBLER PORTAL (Admin / Cobbler View) */
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8" id="cobbler-workbench-view">
          <AdminDashboard 
            orders={orders} 
            onUpdateOrder={handleUpdateOrder} 
          />
        </div>
      )}

      {/* Footer */}
      <footer className="bg-stone-900 border-t border-stone-800 py-12 text-center text-stone-400 text-xs" id="app-footer">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex items-center justify-center gap-2 text-stone-300">
            <Mountain className="h-4.5 w-4.5 text-orange-500" />
            <span className="font-bold tracking-widest font-mono uppercase text-xs text-stone-100">RESOLEUTION</span>
          </div>
          <p className="max-w-md mx-auto text-stone-400 text-[11px] leading-relaxed">
            Authorized mountain artisans specialized inside the premium restoration and resoling of climbing footwear. Designed utilizing 100% active React and Tailwind CSS. Clean UI structures designed for easy copy-pasting and export.
          </p>
          <div className="text-[10px] text-stone-500 font-mono">
            <span>© 2026 RESOLEUTION COBBLERS INC. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
