import React, { useState } from "react";
import { 
  OrderStatus, 
  ResoleOrder 
} from "../types";
import { 
  FileSearch, 
  MapPin, 
  Layers, 
  Calendar, 
  Check, 
  Wrench, 
  Truck, 
  ShieldCheck, 
  CircleDollarSign, 
  MessageSquare,
  Sparkles,
  Info
} from "lucide-react";

interface CustomerOrderViewProps {
  order: ResoleOrder | null;
  onAcceptQuote: (orderId: string) => void;
}

export default function CustomerOrderView({ order, onAcceptQuote }: CustomerOrderViewProps) {
  const [copiedTracking, setCopiedTracking] = useState(false);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-stone-250/70 bg-stone-50 p-12 text-center text-stone-500 shadow-inner" id="empty-tracker-message">
        <FileSearch className="h-12 w-12 text-stone-400 mb-4" />
        <h4 className="text-sm font-black text-stone-900 uppercase tracking-widest font-mono">No Ticket Loaded</h4>
        <p className="text-xs text-stone-500 mt-2 max-w-sm leading-relaxed">
          Select one of the preset tickets in the left panel, or submit a new wear diagnostics consultation form above to populate the tracker.
        </p>
      </div>
    );
  }

  // Define steps in the resole journey
  const STAGES = [
    { 
      key: OrderStatus.PENDING_ASSESSMENT, 
      label: "Diagnostic Review", 
      desc: "Cobbler reviewing wear-and-tear photo" 
    },
    { 
      key: OrderStatus.QUOTE_OFFERED, 
      label: "Proposed Quote", 
      desc: "Custom price assessment offered" 
    },
    { 
      key: OrderStatus.AWAITING_SHIPMENT, 
      label: "Awaiting Mail-In", 
      desc: "Write your Order ID and ship your shoes" 
    },
    { 
      key: OrderStatus.RECEIVED_IN_PROGRESS, 
      label: "Cobbler Queue", 
      desc: "On the workbench getting signature rubber" 
    },
    { 
      key: OrderStatus.COMPLETED, 
      label: "Rebuild Finished", 
      desc: "Soling completed & disinfected" 
    },
    { 
      key: OrderStatus.SHIPPED, 
      label: "In Return Transit", 
      desc: "Shipped back via Express mail" 
    }
  ];

  // Helper to determine active step index
  const activeIndex = STAGES.findIndex(s => s.key === order.status);

  const handleTrackClick = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm" id={`order-tracker-panel-${order.id}`}>
      
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 pb-5 gap-3" id="tracker-header">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-orange-655 uppercase tracking-wider bg-orange-50 border border-orange-105 px-2.5 py-1 rounded">
              Ticket: {order.id}
            </span>
            <span className="text-xs font-mono text-stone-500 font-semibold">
              Submitted: {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h3 className="text-2xl font-black text-stone-900 mt-1.5 uppercase tracking-tight font-display">
            Shoe Brand: <span className="text-orange-605">{order.shoeBrand}</span>
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Climber: <span className="text-stone-701 font-bold">{order.customerName}</span>
          </p>
        </div>

        <div className="text-left sm:text-right" id="tracker-badge-container">
          <p className="text-[10px] font-mono text-stone-400 uppercase font-extrabold">Active Status</p>
          <span className={`inline-block text-xs font-mono font-bold uppercase tracking-wider mt-1 px-3 py-1.5 rounded-lg ${
            order.status === OrderStatus.PENDING_ASSESSMENT ? "bg-stone-100 text-stone-700 border border-stone-200" :
            order.status === OrderStatus.QUOTE_OFFERED ? "bg-sky-50 text-sky-700 border border-sky-200" :
            order.status === OrderStatus.AWAITING_SHIPMENT ? "bg-amber-50 text-amber-700 border border-amber-200" :
            order.status === OrderStatus.RECEIVED_IN_PROGRESS ? "bg-orange-50 text-orange-650 border border-orange-200 animate-pulse" :
            order.status === OrderStatus.COMPLETED ? "bg-emerald-50 text-emerald-700 border border-emerald-250" :
            "bg-stone-100 text-stone-700 border border-stone-200"
          }`}>
            {order.status.replace(/_/g, " ")}
          </span>
        </div>
      </div>

      {/* Main timeline */}
      <div className="py-8" id="tracker-master-timeline">
        <p className="text-xs font-mono text-stone-400 uppercase tracking-widest font-bold mb-6">Interactive Cobbler Workflow Stage:</p>
        
        {/* Horizontal grids representing timeline stages */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3" id="timeline-grid-container">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx < activeIndex;
            const isActive = idx === activeIndex;

            return (
              <div 
                key={stage.key} 
                className={`relative p-3 rounded-lg border text-left transition duration-300 ${
                  isActive 
                    ? "bg-stone-50 border-orange-505 shadow-sm" 
                    : isCompleted 
                      ? "bg-white border-emerald-200 text-stone-500" 
                      : "bg-white border-stone-200/60 text-stone-400"
                }`}
                id={`timeline-stage-cell-${stage.key}`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-mono font-black ${
                    isActive 
                      ? "bg-orange-600 text-white animate-pulse" 
                      : isCompleted 
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200" 
                        : "bg-stone-100 text-stone-450"
                  }`}>
                    {isCompleted ? <Check className="h-3 w-3" /> : idx + 1}
                  </div>
                  <span className={`text-[11px] font-black uppercase font-display ${
                    isActive 
                      ? "text-orange-605" 
                      : isCompleted 
                        ? "text-stone-800" 
                        : "text-stone-400"
                  }`}>
                    {stage.label}
                  </span>
                </div>
                <p className="text-[10px] text-stone-500 leading-normal">{stage.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Conditional visual dashboard panels based on order state */}
      <div className="mt-4 border-t border-stone-200 pt-6 space-y-6" id="interactive-status-action-box">
        
        {/* State: PENDING_ASSESSMENT */}
        {order.status === OrderStatus.PENDING_ASSESSMENT && (
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-5 space-y-4" id="view-pending-box">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border border-stone-200 text-orange-600 shadow-xs">
                <Wrench className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-stone-900 uppercase font-display">Analyzing Structural Integrity</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Our cobbler is inspecting your wear photos to verify if the fabric support elements are intact. Excellent resolers never press rubber onto unstable, rotted leather. We will establish a price within 24 hours.
                </p>
              </div>
            </div>

            {/* Render uploaded image in tracker if present */}
            {order.photoUrl && (
              <div className="border border-stone-200 rounded-xl p-3 bg-white flex flex-col sm:flex-row gap-4 items-center">
                <img 
                  src={order.photoUrl} 
                  alt="Shoe Diagnostic uploaded by customer" 
                  className="rounded-lg max-h-24 w-auto object-cover border border-stone-200"
                  referrerPolicy="no-referrer"
                />
                <div className="text-xs text-stone-600 space-y-1 w-full">
                  <p className="font-extrabold text-stone-900 uppercase font-mono text-[11px]">Uploaded Diagnostics File</p>
                  <p>Sole Rubber: <span className="text-orange-600 font-bold">Formula Resoleution™ (Secret)</span></p>
                  <p>Pre-Authorize Rand: <span className="font-bold text-stone-800">{order.randRepair ? "Yes (Patching authorized)" : "Sole Only (Inquiry)"}</span></p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* State: QUOTE_OFFERED */}
        {order.status === OrderStatus.QUOTE_OFFERED && (
          <div className="rounded-xl border border-orange-200 bg-orange-50/20 p-5 space-y-4" id="view-quote-box">
            <div className="flex items-start gap-4">
              <CircleDollarSign className="h-6 w-6 text-orange-605 shrink-0 mt-0.5 animate-pulse" />
              <div className="space-y-1">
                <h4 className="text-lg font-black text-orange-600 uppercase tracking-tight font-display">Cobbler's Proposal Offer</h4>
                <p className="text-xs text-stone-700 leading-relaxed">
                  A custom plan has been configured! Review our breakdown notes and click 'Accept' below to finalize reservation details of your mail-in bundle.
                </p>
              </div>
            </div>

            {/* Price breakdown and cobbler annotation */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white border border-stone-200 rounded-xl p-4 shadow-xs">
              
              <div className="md:col-span-8 space-y-1.5">
                <p className="text-[10px] uppercase font-mono text-stone-450 font-bold flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5 text-stone-400" />
                  <span>Cobbler Assessment Annotation:</span>
                </p>
                <p className="text-xs text-stone-700 leading-relaxed italic bg-stone-50/70 p-3 rounded-lg border border-stone-200">
                  "{order.cobblerNotes || 'Excellent leather integrity remains. Recommended resole sole replacement only.'}"
                </p>
              </div>

              <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-stone-150 pt-3 md:pt-0 pl-0 md:pl-4 flex flex-col justify-between" id="price-quote-calc-view">
                <div>
                  <p className="text-[10px] uppercase font-mono text-stone-450 font-bold">Price Quote Summary</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black text-stone-900 font-display">${order.quotePrice}</span>
                    <span className="text-xs text-stone-500 font-mono">USD</span>
                  </div>
                </div>

                <div className="text-[10.5px] text-stone-500 font-mono space-y-1 mt-2 md:mt-0 pt-2 border-t border-stone-100">
                  <div className="flex justify-between">
                    <span>Sole Resole:</span>
                    <span className="font-semibold text-stone-700">$55.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rand Repair:</span>
                    <span className="font-semibold text-stone-700">${order.randRepair || (order.quotePrice ?? 0) > 60 ? "20.00" : "0.00"}</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="flex justify-end gap-3 pt-1">
              <button
                onClick={() => onAcceptQuote(order.id)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-3 text-xs font-black text-white hover:from-orange-500 hover:to-orange-400 shadow-md transition transform active:scale-95 duration-200 cursor-pointer"
                id="btn-accept-proposal"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Accept Pricing & Finalize Order</span>
              </button>
            </div>
          </div>
        )}

        {/* Mail-In instructions (State: AWAITING_SHIPMENT) */}
        {order.status === OrderStatus.AWAITING_SHIPMENT && (
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-5 space-y-4" id="view-mail-in-box">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-orange-605 shrink-0 mt-0.5 animate-bounce" />
              <div>
                <h4 className="text-sm font-black text-stone-900 uppercase font-display">Authorized Mail-In Instructions</h4>
                <p className="text-xs text-stone-605 mt-1">
                  Your repair reservation is active! Please ship your shoes to our professional climbing lab as soon as possible.
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-stone-600 bg-white border border-stone-200 rounded-xl p-4 shadow-xs" id="step-by-step-shipping-list">
              <p className="font-extrabold text-stone-900 font-mono uppercase tracking-wide border-b border-stone-200 pb-2 flex items-center gap-1 text-[11px]">
                <Info className="h-4 w-4 text-orange-600" />
                <span>FOLLOW THESE PACKAGING STEPS:</span>
              </p>
              
              <ol className="list-decimal pl-4 space-y-2 mt-2 leading-relaxed text-stone-700">
                <li>
                  Clean the dirt and mud off your shoe soles using a damp cloth. (We press better adhesive on clean machinery!)
                </li>
                <li>
                  Place your climbing shoes inside any sturdy mail pouch, shipping box, or generic envelope.
                </li>
                <li>
                  <strong className="text-orange-600 font-extrabold">CRITICAL REQUIRED STEP:</strong> Write your individual ticket code <strong className="font-mono text-orange-655 font-bold bg-orange-50 border border-orange-105 px-1.5 py-0.5 rounded text-[13px]">{order.id}</strong> in thick marker on the outer surface of your mailing bag.
                </li>
                <li>
                  Address your parcel to our central mountain workshop:
                  <div className="mt-2 rounded-lg bg-stone-50 p-3 font-mono text-[11.5px] border border-stone-200 text-stone-600">
                    <p className="font-bold text-stone-900">RESOLEUTION WORKSHOP</p>
                    <p>ATTN: REPAIR DEPT - TICKET ID: {order.id}</p>
                    <p>450 Alpine Ridge Road, Suite B</p>
                    <p>Boulder, CO 80301</p>
                  </div>
                </li>
                <li>
                  No payment is processed now. Once your resole is complete, we provide secure payment links.
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* In progress details (State: RECEIVED_IN_PROGRESS) */}
        {order.status === OrderStatus.RECEIVED_IN_PROGRESS && (
          <div className="rounded-xl border border-orange-150 bg-orange-50/15 p-5 space-y-4" id="view-in-progress-box">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 border border-orange-200 text-orange-600 shrink-0 shadow-xs">
                <Wrench className="h-5.5 w-5.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-stone-900 uppercase font-display border-b border-orange-100 pb-1">Undergoing Active cobbler Rebuild!</h4>
                <p className="text-xs text-stone-600 leading-relaxed pt-1">
                  Your climbing shoes are officially at our physical lab. Our master cobbler is performing state-of-the-art soling rebuild:
                </p>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-xl p-4 text-xs space-y-3 shadow-xs">
              <div className="flex justify-between items-center text-stone-500 font-mono">
                <span>Cobbler assigned:</span>
                <span className="text-stone-800 font-extrabold">Master Cobbler (20+ yrs experience)</span>
              </div>
              <div className="flex justify-between items-center text-stone-500 font-mono">
                <span>Selected Rubber compound:</span>
                <span className="text-orange-650 font-extrabold">Formula Resoleution™ (Secret Compound)</span>
              </div>
              <div className="flex justify-between items-center text-stone-500 font-mono">
                <span>Authorized Rand repair:</span>
                <span className="text-stone-701 font-semibold">{order.randRepair ? "Dual Rand Patching" : "Sole Replacement Only"}</span>
              </div>
              <div className="flex justify-between items-center text-stone-500 font-mono pt-2 border-t border-stone-100">
                <span>Current Queue Status:</span>
                <span className="text-orange-600 font-black bg-orange-5 hover:bg-orange-10 px-2 py-0.5 rounded border border-orange-105 animate-pulse">Pressing signature rubber formula</span>
              </div>
            </div>
          </div>
        )}

        {/* Completed details (State: COMPLETED) */}
        {order.status === OrderStatus.COMPLETED && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/15 p-5 space-y-4" id="view-completed-box">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 shrink-0">
                <Sparkles className="h-5.5 w-5.5 animate-bounce" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-emerald-800 uppercase tracking-wide font-display">Resoling fully Completed!</h4>
                <p className="text-xs text-stone-600 leading-normal">
                  Your climbing shoes are looking pristine and brand new! The sole edge has been dry-chamber heat pressed and finished for microscopic footholds.
                </p>
              </div>
            </div>

            <div className="p-3 bg-white border border-stone-200 rounded-lg text-xs text-stone-500 space-y-1.5 font-mono shadow-xs">
              <p className="text-stone-800 font-extrabold">Cobbler post-check metrics:</p>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div>• Edge Profile: Beveled-Downturned</div>
                <div>• Adhesion test: Passed (Secret Compound)</div>
                <div>• Sanitization: Complete (100% Disinfected)</div>
                <div>• Structural restoration: Fully Certificated</div>
              </div>
            </div>
          </div>
        )}

        {/* Shipped details (State: SHIPPED) */}
        {order.status === OrderStatus.SHIPPED && (
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-5 space-y-4" id="view-shipped-box">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-stone-200 text-orange-600 shrink-0 shadow-xs">
                <Truck className="h-5.5 w-5.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-stone-900 uppercase font-display">Dispatched & Returning to You</h4>
                <p className="text-xs text-stone-500 leading-normal">
                  Our dispatch courier has picked up the returning box. It is heading to your designated address:
                </p>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-3 text-xs shadow-xs">
              <div>
                <p className="text-[10px] font-mono text-stone-450 uppercase font-bold">Shipping Destination Address</p>
                <p className="text-stone-800 font-extrabold mt-0.5">{order.shippingAddress}</p>
              </div>

              <div className="pt-2.5 border-t border-stone-200 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-mono text-stone-455 uppercase font-bold">Return Tracker Number</p>
                  <p className="font-mono text-sm font-black text-orange-655 mt-0.5">
                    {order.trackingNumber || "US_POST-RSL-94001112"}
                  </p>
                </div>
                <button
                  onClick={() => handleTrackClick(order.trackingNumber || "US_POST-RSL-94001112")}
                  className="rounded bg-stone-50 hover:bg-stone-100 border border-stone-205 px-3 py-1.5 text-[11px] font-mono text-stone-700 font-bold shadow-xs transition duration-200 cursor-pointer"
                >
                  {copiedTracking ? "Copied!" : "Copy Tracking #"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* History / Logs Logbook */}
        <div className="border-t border-stone-200 pt-5">
          <p className="text-xs font-mono text-stone-400 uppercase tracking-widest font-extrabold mb-2.5">Detailed Ticket Progression Logbook:</p>
          <div className="space-y-2 bg-stone-50 rounded-xl p-4 border border-stone-200 text-xs font-mono" id="timeline-progression-logs">
            {order.history.map((log, i) => (
              <div key={i} className="flex items-start justify-between border-b border-stone-100 pb-1.5 last:border-b-0 last:pb-0 gap-3">
                <div className="text-stone-700 leading-normal max-w-lg">
                  <span className="text-stone-400 font-bold">[{log.status}]</span> {log.note}
                </div>
                <div className="text-stone-450 text-[10px] shrink-0 text-right font-semibold">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
