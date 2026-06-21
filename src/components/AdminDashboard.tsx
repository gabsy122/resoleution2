import React, { useState } from "react";
import { 
  OrderStatus, 
  ResoleOrder 
} from "../types";
import { 
  Wrench, 
  Search, 
  CheckCircle2, 
  ClipboardList, 
  Inbox, 
  Hammer, 
  Truck, 
  AlertTriangle,
  FileText,
  DollarSign,
  ChevronRight,
  ShieldCheck,
  Send,
  Camera,
  History,
  Activity
} from "lucide-react";

interface AdminDashboardProps {
  orders: ResoleOrder[];
  onUpdateOrder: (updatedOrder: ResoleOrder) => void;
}

export default function AdminDashboard({ orders, onUpdateOrder }: AdminDashboardProps) {
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || "");
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Edit states for the Assessment Form
  const [assessmentNotes, setAssessmentNotes] = useState<string>("");
  const [assessmentPrice, setAssessmentPrice] = useState<number>(55);
  const [assessmentRand, setAssessmentRand] = useState<boolean>(false);

  // Edit states for Stage Transition Form
  const [nextStage, setNextStage] = useState<OrderStatus>(OrderStatus.RECEIVED_IN_PROGRESS);
  const [stageTrackingNumber, setStageTrackingNumber] = useState<string>("");
  const [stageLogNote, setStageLogNote] = useState<string>("");

  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  // Count helper functions for statistics board
  const countPending = orders.filter(o => o.status === OrderStatus.PENDING_ASSESSMENT).length;
  const countQuotes = orders.filter(o => o.status === OrderStatus.QUOTE_OFFERED).length;
  const countAwaitingShip = orders.filter(o => o.status === OrderStatus.AWAITING_SHIPMENT).length;
  const countInProgress = orders.filter(o => o.status === OrderStatus.RECEIVED_IN_PROGRESS).length;
  const countShipped = orders.filter(o => o.status === OrderStatus.SHIPPED || o.status === OrderStatus.COMPLETED).length;

  // Filter orders according to selection tab and search query
  const filteredOrders = orders.filter(o => {
    // Tab filtering
    if (activeTab === "PENDING" && o.status !== OrderStatus.PENDING_ASSESSMENT) return false;
    if (activeTab === "QUOTES" && o.status !== OrderStatus.QUOTE_OFFERED) return false;
    if (activeTab === "AWAITING" && o.status !== OrderStatus.AWAITING_SHIPMENT) return false;
    if (activeTab === "ACTIVE" && o.status !== OrderStatus.RECEIVED_IN_PROGRESS) return false;
    if (activeTab === "COMPLETED" && o.status !== OrderStatus.SHIPPED && o.status !== OrderStatus.COMPLETED) return false;

    // Search query filtering
    if (searchQuery) {
      const q = searchQuery.toUpperCase();
      const matchesId = o.id.toUpperCase().includes(q);
      const matchesName = o.customerName.toUpperCase().includes(q);
      const matchesBrand = o.shoeBrand.toUpperCase().includes(q);
      return matchesId || matchesName || matchesBrand;
    }

    return true;
  });

  const handleSelectOrder = (order: ResoleOrder) => {
    setSelectedOrderId(order.id);
    // Sync review inputs to selected order
    setAssessmentNotes(order.cobblerNotes || "");
    setAssessmentPrice(order.quotePrice || 55);
    setAssessmentRand(order.randRepair);
    
    // Set next status suggestion logically
    if (order.status === OrderStatus.AWAITING_SHIPMENT) {
      setNextStage(OrderStatus.RECEIVED_IN_PROGRESS);
    } else if (order.status === OrderStatus.RECEIVED_IN_PROGRESS) {
      setNextStage(OrderStatus.COMPLETED);
    } else if (order.status === OrderStatus.COMPLETED) {
      setNextStage(OrderStatus.SHIPPED);
    } else {
      setNextStage(order.status);
    }
    
    setStageTrackingNumber(order.trackingNumber || "");
    setStageLogNote("");
  };

  // Submit diagnostic assessment (Move PENDING_ASSESSMENT -> QUOTE_OFFERED)
  const handlePublishAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    const baseNote = assessmentNotes.trim() || `Approved for resoling! Shoes look sturdy, standard outsole wear with excellent rands. Handled using Formula Resoleution™ Secret Compound.`;
    
    const updatedOrder: ResoleOrder = {
      ...selectedOrder,
      status: OrderStatus.QUOTE_OFFERED,
      quotePrice: assessmentPrice,
      randRepair: assessmentRand,
      cobblerNotes: baseNote,
      history: [
        ...selectedOrder.history,
        {
          status: OrderStatus.QUOTE_OFFERED,
          timestamp: new Date().toISOString(),
          note: `Cobbler assessment complete: Approved. Processed with secret elastomeric Formula Resoleution™. Quoted: $${assessmentPrice}. Cobbler Notes: "${baseNote}"`
        }
      ]
    };

    onUpdateOrder(updatedOrder);
    setStageLogNote("");
  };

  // Submit status update change (e.g. change stages)
  const handleUpdateStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    let historyMessage = stageLogNote.trim();
    if (!historyMessage) {
      if (nextStage === OrderStatus.RECEIVED_IN_PROGRESS) {
        historyMessage = "Shoes successfully arrived at our main laboratory. Placed into the active cobbler grinding queue.";
      } else if (nextStage === OrderStatus.COMPLETED) {
        historyMessage = "Resoling complete. Outsole edges dry-chamber heat pressed, beveled to perfect specifications, and sanitized.";
      } else if (nextStage === OrderStatus.SHIPPED) {
        historyMessage = `Shoes returning via shipper. Air bill tracking number updated: ${stageTrackingNumber || 'US_POST-RSL-94001112'}`;
      } else {
        historyMessage = `Order status transitioned to ${nextStage.replace(/_/g, " ")}.`;
      }
    }

    const updatedOrder: ResoleOrder = {
      ...selectedOrder,
      status: nextStage,
      trackingNumber: nextStage === OrderStatus.SHIPPED ? stageTrackingNumber : selectedOrder.trackingNumber,
      history: [
        ...selectedOrder.history,
        {
          status: nextStage,
          timestamp: new Date().toISOString(),
          note: historyMessage
        }
      ]
    };

    onUpdateOrder(updatedOrder);
    setStageLogNote("");
  };

  return (
    <div className="space-y-6 text-stone-900" id="admin-workbench-master">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 pb-5 gap-3">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-orange-600 uppercase font-black bg-orange-50 px-2.5 py-1 rounded">ADMIN COBBLER INTERFACE</span>
          <h2 className="text-3xl font-black uppercase text-stone-900 tracking-tight mt-3 font-display">
            REPAIR QUEUES & <span className="text-orange-600">DIAGNOSTICS BOARD</span>
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            Resoleution Master Cobbler secure access console to evaluate shoe brands, pre-authorize rand repair, build custom pricing, and adjust live order statuses.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-stone-100 border border-stone-200 px-3 py-1.5 rounded-lg shrink-0">
          <Activity className="h-4.5 w-4.5 text-orange-600" />
          <span className="text-xs font-mono text-stone-700 font-bold">Cobbler Session: ACTIVE</span>
        </div>
      </div>

      {/* Statistics board Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4" id="stats-dashboard-grid">
        
        {/* Stat item */}
        <div className="rounded-xl border border-stone-205/85 bg-white p-4 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-mono uppercase font-semibold">
            <span>Diagnostics Review</span>
            <Inbox className="h-4 w-4 text-stone-400" />
          </div>
          <p className="text-2xl font-black text-stone-900 mt-1.5 font-mono">{countPending}</p>
          <p className="text-[10px] text-stone-500 font-sans mt-0.5">Brand photo uploads pending</p>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-stone-200" />
        </div>

        {/* Stat item */}
        <div className="rounded-xl border border-stone-205/85 bg-white p-4 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-mono uppercase font-semibold">
            <span>Quotes Offered</span>
            <DollarSign className="h-4 w-4 text-rose-500 font-bold" />
          </div>
          <p className="text-2xl font-black text-rose-600 mt-1.5 font-mono">{countQuotes}</p>
          <p className="text-[10px] text-stone-500 font-sans mt-0.5">Awaiting customer acceptance</p>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-rose-500/30" />
        </div>

        {/* Stat item */}
        <div className="rounded-xl border border-stone-205/85 bg-white p-4 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-mono uppercase font-semibold">
            <span>Awaiting Mail-In</span>
            <ClipboardList className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-600 mt-1.5 font-mono">{countAwaitingShip}</p>
          <p className="text-[10px] text-stone-500 font-sans mt-0.5">Accepted, waiting parcel arrival</p>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-amber-500/30" />
        </div>

        {/* Stat item */}
        <div className="rounded-xl border border-stone-205/85 bg-white p-4 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-mono uppercase font-semibold">
            <span>Active Workbench</span>
            <Wrench className="h-4 w-4 text-orange-600" />
          </div>
          <p className="text-2xl font-black text-orange-650 mt-1.5 font-mono">{countInProgress}</p>
          <p className="text-[10px] text-stone-500 font-sans mt-0.5 font-semibold">Formula Secret Process</p>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-orange-500/30" />
        </div>

        {/* Stat item */}
        <div className="rounded-xl border border-stone-205/85 bg-white p-4 relative overflow-hidden col-span-2 lg:col-span-1 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-mono uppercase font-semibold">
            <span>Dispatched Back</span>
            <Truck className="h-4 w-4 text-emerald-605" />
          </div>
          <p className="text-2xl font-black text-emerald-600 mt-1.5 font-mono">{countShipped}</p>
          <p className="text-[10px] text-stone-500 font-sans mt-0.5">Shipped and completed shoes</p>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-emerald-555/30" />
        </div>

      </div>

      {/* Main split workspace layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="split-admin-workbench">
        
        {/* Left column: Ticket list with filters */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4" id="admin-orders-list-block">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-stone-900 font-display">
              Active Climbing Repair Intake
            </h3>
            
            {/* Live Search bar */}
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                aria-label="Search all resole files"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ticket code or name..."
                className="w-full rounded-md bg-white border border-stone-250 pl-9 pr-3 py-1.5 text-xs text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Intake Filter tabs */}
          <div className="flex flex-wrap gap-1.5 border-b border-stone-200 pb-3" id="admin-tab-bar">
            {[
              { id: "ALL", label: "All Cases" },
              { id: "PENDING", label: `Reviews (${countPending})` },
              { id: "QUOTES", label: "Quoted" },
              { id: "AWAITING", label: "Awaiting Arrival" },
              { id: "ACTIVE", label: "On Workbenches" },
              { id: "COMPLETED", label: "Shipped Back" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2.5 py-1 text-[11px] font-mono font-bold rounded-md transition cursor-pointer ${
                  activeTab === tab.id 
                    ? "bg-orange-600 text-white shadow-xs" 
                    : "bg-stone-50 border border-stone-200 text-stone-500 hover:text-stone-850"
                }`}
                id={`admin-tab-${tab.id.toLowerCase()}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Orders table */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-xs font-mono uppercase font-bold" id="empty-filtered-orders">
              No matching climbing repair files found.
            </div>
          ) : (
            <div className="overflow-x-auto" id="orders-intake-table-container">
              <table className="w-full text-left" id="orders-intake-table">
                <thead>
                  <tr className="border-b border-stone-200 text-[10.5px] font-mono uppercase text-stone-400 font-black">
                    <th className="py-2.5 px-3">Ticket ID</th>
                    <th className="py-2.5 px-2">Climber</th>
                    <th className="py-2.5 px-2">Footwear Brand</th>
                    <th className="py-2.5 px-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs">
                  {filteredOrders.map((ord) => {
                    const isSelected = ord.id === selectedOrderId;
                    return (
                      <tr
                        key={ord.id}
                        onClick={() => handleSelectOrder(ord)}
                        className={`hover:bg-stone-50 cursor-pointer transition ${
                          isSelected ? "bg-stone-105 text-stone-900 font-extrabold border-l-2 border-orange-500" : "text-stone-605"
                        }`}
                        id={`row-order-${ord.id}`}
                      >
                        <td className="py-3 px-3 font-mono font-bold text-orange-655">
                          {ord.id}
                        </td>
                        <td className="py-3 px-2">
                          <p className="text-stone-900 font-bold">{ord.customerName}</p>
                          <p className="text-[10px] text-stone-500 font-mono">{ord.customerEmail}</p>
                        </td>
                        <td className="py-3 px-2">
                          <p className="text-stone-900 font-bold">{ord.shoeBrand}</p>
                          <p className="text-[10px] text-stone-500">Compound: Formula Resoleution™</p>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <span className={`inline-block text-[9.5px] font-mono leading-none py-1.5 px-2.5 rounded ${
                            ord.status === "PENDING_ASSESSMENT" ? "bg-stone-105 text-stone-600 font-bold" :
                            ord.status === "QUOTE_OFFERED" ? "bg-blue-50 text-blue-650 font-bold" :
                            ord.status === "AWAITING_SHIPMENT" ? "bg-amber-50 text-amber-700 font-bold" :
                            ord.status === "RECEIVED_IN_PROGRESS" ? "bg-orange-50 text-orange-655 font-bold animate-pulse" :
                            ord.status === "COMPLETED" ? "bg-emerald-50 text-emerald-700 font-bold" :
                            "bg-stone-100 text-stone-500 font-bold"
                          }`}>
                            {ord.status.replace(/_/g, " ")}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right column: Action detailed workstation panel */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-5" id="admin-workstation-editor-block">
          
          {selectedOrder ? (
            <div className="space-y-5" id="workbench-active-case-editor">
              
              {/* Profile Card Summary */}
              <div className="border-b border-stone-205 pb-4">
                <span className="text-[10px] font-mono text-orange-600 font-extrabold uppercase">Selected active file:</span>
                <div className="flex justify-between items-start mt-1">
                  <div>
                    <h4 className="text-xl font-black uppercase text-stone-905 font-display">{selectedOrder.shoeBrand}</h4>
                    <p className="text-xs text-stone-500 font-semibold">Climber: {selectedOrder.customerName}</p>
                  </div>
                  <span className="font-mono text-sm font-bold text-orange-655 bg-orange-50 border border-orange-105 px-2.5 py-1 rounded">
                    {selectedOrder.id}
                  </span>
                </div>
              </div>

              {/* Shoe Diagnostics Photo displayed to cobbler */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2.5" id="workbench-photo-diagnostics">
                <p className="text-[10px] font-mono text-stone-500 uppercase tracking-widest font-extrabold flex items-center gap-1.5">
                  <Camera className="h-4 w-4 text-orange-600" />
                  <span>Submitted Wear Photo & Client Comments</span>
                </p>

                {selectedOrder.photoUrl ? (
                  <div className="aspect-video relative overflow-hidden rounded-lg border border-stone-200 bg-stone-105">
                    <img 
                      src={selectedOrder.photoUrl} 
                      alt="Customer submitted shoe profile" 
                      className="h-full w-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="h-24 flex items-center justify-center rounded-lg bg-stone-50 border border-stone-200 text-stone-400 text-xs font-mono font-bold">
                    No Diagnostics Picture Attached
                  </div>
                )}

                <div className="bg-white p-3 rounded-lg border border-stone-200 text-xs shadow-xs">
                  <p className="font-bold text-stone-800 uppercase font-mono text-[10px] mb-1">Customer's Comment Log:</p>
                  <p className="text-stone-600 leading-normal italic select-all">
                    "{selectedOrder.notes || 'None provided.'}"
                  </p>
                </div>
              </div>

              {/* WORKFLOW VIEW 1: COBBLER DIAGNOSIS EVALUATION (Status: PENDING_ASSESSMENT) */}
              {selectedOrder.status === OrderStatus.PENDING_ASSESSMENT ? (
                <div className="rounded-xl border border-orange-200 bg-orange-50/20 p-4 space-y-4" id="status-pending-assessment-decision-panel">
                  <h4 className="text-xs font-bold text-orange-655 uppercase tracking-widest font-mono flex items-center gap-1.5">
                    <ClipboardList className="h-4 w-4" />
                    <span>Diagnostics Review & Quote Proposal</span>
                  </h4>

                  <form onSubmit={handlePublishAssessment} className="space-y-3">
                    {/* Compound is classified */}
                    <div>
                      <p className="text-[10.5px] font-mono text-stone-500 uppercase mb-1 font-bold">Assessed Rubber Compound</p>
                      <div className="bg-white rounded-lg border border-stone-200 px-3 py-2 text-xs text-stone-700">
                        Formula Resoleution™ (NDA Protected Secret Compound)
                      </div>
                    </div>

                    {/* Pre-authorize / Decide on rand repair */}
                    <div className="flex items-center justify-between py-1 border-t border-b border-stone-100 my-2">
                      <div className="text-[11px]">
                        <span className="font-extrabold text-stone-800 block">Requires Rand Repair patches?</span>
                        <span className="text-stone-500 font-sans text-xs">Adds $20.00 to proposal quote</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={assessmentRand}
                        onChange={(e) => {
                          setAssessmentRand(e.target.checked);
                          setAssessmentPrice(prev => e.target.checked ? 75 : 55); 
                        }}
                        className="h-4.5 w-4.5 rounded border-stone-300 bg-white text-orange-600 focus:ring-orange-500 cursor-pointer"
                        id="assessmentRand"
                      />
                    </div>

                    {/* Pricing input cost */}
                    <div>
                      <label htmlFor="assessmentPrice" className="block text-[10.5px] font-mono text-stone-500 uppercase mb-1 font-bold">
                        Est. Price Quote Proposal ($ USD)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-xs text-stone-400 font-bold">$</span>
                        <input
                          type="number"
                          id="assessmentPrice"
                          value={assessmentPrice}
                          onChange={(e) => setAssessmentPrice(Number(e.target.value))}
                          placeholder="55"
                          className="w-full font-mono text-xs rounded-lg bg-white border border-stone-250 pl-7 pr-3 py-2.5 text-stone-900 placeholder-stone-300 focus:border-orange-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Cobbler notes to customer explaining sole condition */}
                    <div>
                      <label htmlFor="assessmentNotes" className="block text-[10.5px] font-mono text-stone-500 uppercase mb-1 font-bold">
                        Wear diagnosis Annotation notes to Climber
                      </label>
                      <textarea
                        id="assessmentNotes"
                        rows={3}
                        value={assessmentNotes}
                        onChange={(e) => setAssessmentNotes(e.target.value)}
                        placeholder="e.g. Shoes look perfect for resoling. We will perform our hand-shaped composite formulation."
                        className="w-full text-xs rounded-lg bg-white border border-stone-250 px-3 py-2 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none resize-none leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-orange-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-orange-500 transition cursor-pointer shadow-xs"
                      id="btn-publish-diagnostics"
                    >
                      <Send className="h-4 w-4" />
                      <span>Publish Custom Diagnostic Offer</span>
                    </button>
                  </form>
                </div>
              ) : (
                
                /* WORKFLOW VIEW 2: REPAIR PROGRESS STATUS MANAGER */
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-4" id="status-stage-machine-panel">
                  <h4 className="text-xs font-bold text-stone-700 uppercase tracking-widest font-mono flex items-center gap-1.5">
                    <History className="h-4 w-4 text-orange-605 font-bold" />
                    <span>Active Workflow Stage Manager</span>
                  </h4>

                  <div className="bg-white p-3 rounded-lg border border-stone-200 text-xs text-stone-500 space-y-1.5 shadow-xs">
                    <p>Current Stage: <span className="text-orange-655 font-bold uppercase">{selectedOrder.status}</span></p>
                    <p>Agreed pricing quote: <span className="text-stone-900 font-extrabold">${selectedOrder.quotePrice} USD</span></p>
                    <p>Cobbler notes published: <span className="italic text-stone-605">"{selectedOrder.cobblerNotes}"</span></p>
                  </div>

                  <form onSubmit={handleUpdateStage} className="space-y-3">
                    
                    {/* Next step slider select dropdown */}
                    <div>
                      <label htmlFor="nextStage" className="block text-[10.5px] font-mono text-stone-450 uppercase mb-1 font-bold">
                        Move to next tracking Stage
                      </label>
                      <select
                        id="nextStage"
                        value={nextStage}
                        onChange={(e) => setNextStage(e.target.value as OrderStatus)}
                        className="w-full text-xs rounded-lg bg-white border border-stone-250 px-2.5 py-2 text-stone-900 focus:border-orange-500 focus:outline-none cursor-pointer font-semibold"
                      >
                        <option value={OrderStatus.AWAITING_SHIPMENT}>Awaiting Shipment (Registered ID)</option>
                        <option value={OrderStatus.RECEIVED_IN_PROGRESS}>Received & In Progress (Workbench)</option>
                        <option value={OrderStatus.COMPLETED}>Completed (Aesthetic Polish complete)</option>
                        <option value={OrderStatus.SHIPPED}>Shipped Back (Dispatched returning)</option>
                      </select>
                    </div>

                    {/* Consign return tracking number if step is SHIPPED */}
                    {nextStage === OrderStatus.SHIPPED && (
                      <div>
                        <label htmlFor="stageTrackingNumber" className="block text-[10.5px] font-mono text-stone-455 uppercase mb-1 font-bold">
                          Consign Dispatch Return Tracking #
                        </label>
                        <input
                          type="text"
                          id="stageTrackingNumber"
                          required
                          value={stageTrackingNumber}
                          onChange={(e) => setStageTrackingNumber(e.target.value)}
                          placeholder="e.g. US_POST-RSL-94001112"
                          className="w-full text-xs font-mono rounded-lg bg-white border border-stone-250 px-2.5 py-2 text-stone-900 focus:border-orange-500 focus:outline-none"
                        />
                      </div>
                    )}

                    {/* Step log note update */}
                    <div>
                      <label htmlFor="stageLogNote" className="block text-[10.5px] font-mono text-stone-455 uppercase mb-1 font-bold">
                        Detail log entry (Appends to Customer Tracker Log)
                      </label>
                      <textarea
                        id="stageLogNote"
                        rows={2}
                        value={stageLogNote}
                        onChange={(e) => setStageLogNote(e.target.value)}
                        placeholder="Leave blank to use pre-written stage templates."
                        className="w-full text-xs rounded-lg bg-white border border-stone-250 px-2.5 py-1.5 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none resize-none leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-1 text-xs rounded-lg bg-orange-600 hover:bg-orange-500 px-4 py-2.5 text-white font-bold transition duration-200 cursor-pointer shadow-xs"
                      id="btn-update-stage-submit"
                    >
                      <Wrench className="h-4 w-4" />
                      <span>Commit Stage & Log Transition</span>
                    </button>
                  </form>
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-12 text-stone-400 text-xs font-mono uppercase font-bold" id="workstation-no-order-loaded">
              No active climbing file is highlighted on the left board.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
