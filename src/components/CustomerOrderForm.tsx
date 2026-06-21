import React, { useState, useRef } from "react";
import { Camera, Upload, AlertCircle, Sparkles, CheckCircle2, RefreshCw } from "lucide-react";
import { ResoleOrder, OrderStatus } from "../types";

interface CustomerOrderFormProps {
  onSubmitOrder: (newOrder: ResoleOrder) => void;
}

// Some high-fidelity demo climbing shoe images
const DEMO_SHOE_IMAGES = [
  "https://images.unsplash.com/photo-1601244000764-219d7063249c?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1564858013576-a4c88e999939?auto=format&fit=crop&q=80&w=600"
];

export default function CustomerOrderForm({ onSubmitOrder }: CustomerOrderFormProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    shoeBrand: "",
    randRepair: false,
    notes: "",
    shippingAddress: ""
  });

  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [submittedId, setSubmittedId] = useState<string>("");
  const [errorWord, setErrorWord] = useState<string>("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Convert uploaded image to DataURL
  const processFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const loadDemoPhoto = () => {
    const randomIdx = Math.floor(Math.random() * DEMO_SHOE_IMAGES.length);
    setPhotoUrl(DEMO_SHOE_IMAGES[randomIdx]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorWord("");

    // Minimal validation
    if (!formData.customerName || !formData.customerEmail || !formData.shoeBrand || !formData.shippingAddress) {
      setErrorWord("Please fill in all required fields to register your resole inquiry.");
      return;
    }

    if (!photoUrl) {
      setErrorWord("Please attach or load a diagnostic wear photo so we can assess repairability.");
      return;
    }

    // Generate random order ID
    const randomId = `RSL-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: ResoleOrder = {
      id: randomId,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      shoeBrand: formData.shoeBrand,
      randRepair: formData.randRepair,
      notes: formData.notes,
      photoUrl: photoUrl || "https://images.unsplash.com/photo-1601244000764-219d7063249c?auto=format&fit=crop&q=80&w=600",
      status: OrderStatus.PENDING_ASSESSMENT,
      quotePrice: null,
      cobblerNotes: "",
      shippingAddress: formData.shippingAddress,
      trackingNumber: "",
      createdAt: new Date().toISOString(),
      history: [
        {
          status: OrderStatus.PENDING_ASSESSMENT,
          timestamp: new Date().toISOString(),
          note: "Wear diagnostics submitted on Resoleution. Our master cobbler will assess structural wear and set the repair price."
        }
      ]
    };

    onSubmitOrder(newOrder);
    setSubmittedId(randomId);
    
    // Reset form
    setFormData({
      customerName: "",
      customerEmail: "",
      shoeBrand: "",
      randRepair: false,
      notes: "",
      shippingAddress: ""
    });
    setPhotoUrl("");
  };

  return (
    <div className="rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-8 shadow-sm" id="customer-order-form-container">
      {submittedId ? (
        <div className="text-center py-10 space-y-6" id="order-success-panel">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 border border-emerald-250 text-emerald-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          
          <div className="space-y-2">
            <h4 className="text-2xl font-black text-stone-900 uppercase tracking-tight font-display">diagnostics registered!</h4>
            <p className="text-sm text-stone-500 max-w-lg mx-auto">
              Your Resoleution inquiry is registered under key ID:
            </p>
            <div className="inline-block rounded-xl bg-stone-50 px-6 py-3 border border-stone-200 my-2">
              <span className="font-mono text-xl font-bold text-orange-600 tracking-wider font-mono">{submittedId}</span>
            </div>
          </div>

          <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
            Our Master Cobbler is analyzing your climbing shoes. We will post a custom repair quote and precise notes inside our <span className="text-orange-600 font-bold">Resole Tracker</span> status section below. Keep hold of your ID!
          </p>

          <button
            onClick={() => {
              setSubmittedId("");
              // Scroll to tracker
              const el = document.getElementById("tracker-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="rounded-xl bg-stone-100 border border-stone-200 hover:bg-stone-200 px-5 py-2.5 text-xs font-bold text-stone-700 transition duration-200 cursor-pointer"
            id="btn-dismiss-success"
          >
            Go To Tracking Terminal
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" id="customer-consultation-form">
          <div className="border-b border-stone-200 pb-5">
            <h4 className="text-xl font-black text-stone-900 uppercase tracking-tight flex items-center gap-2 font-display">
              <Camera className="h-5 w-5 text-orange-600" />
              <span>Step 1: Upload Wear Pictures</span>
            </h4>
            <p className="text-xs text-stone-550 mt-1">
              Provide basic contact details, select your footwear brand, and upload a clear picture of the toe box so we can determine repairability.
            </p>
          </div>

          {errorWord && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-3.5 flex items-start gap-2 text-xs text-red-900" id="form-error-panel">
              <AlertCircle className="h-4.5 w-4.5 text-red-650 shrink-0 mt-0.5" />
              <span>{errorWord}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="customer-form-client-fields">
            {/* Contact Name */}
            <div>
              <label htmlFor="customerName" className="block text-xs font-mono font-bold text-stone-500 uppercase mb-1.5">
                Your Full Name <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                required
                value={formData.customerName}
                onChange={handleTextChange}
                placeholder="Alex Handhold"
                className="w-full rounded-lg bg-white border border-stone-250 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/20"
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="customerEmail" className="block text-xs font-mono font-bold text-stone-500 uppercase mb-1.5">
                Email Address <span className="text-orange-500">*</span>
              </label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                required
                value={formData.customerEmail}
                onChange={handleTextChange}
                placeholder="alex@freerider.org"
                className="w-full rounded-lg bg-white border border-stone-250 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="customer-form-shoe-fields">
            {/* Shoe Brand */}
            <div>
              <label htmlFor="shoeBrand" className="block text-xs font-mono font-bold text-stone-500 uppercase mb-1.5">
                Shoe Brand <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                id="shoeBrand"
                name="shoeBrand"
                required
                value={formData.shoeBrand}
                onChange={handleTextChange}
                placeholder="e.g. La Sportiva, Scarpa, Tenaya"
                className="w-full rounded-lg bg-white border border-stone-250 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/20"
              />
            </div>

            {/* Rand wear precheck */}
            <div className="flex flex-col justify-center">
              <span className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">Rand Assessment (Optional)</span>
              <label className="relative flex items-start gap-3 rounded-lg border border-stone-200 bg-stone-50 p-2.5 hover:border-stone-300 transition cursor-pointer">
                <div className="flex h-5 items-center">
                  <input
                    id="randRepair"
                    name="randRepair"
                    type="checkbox"
                    checked={formData.randRepair}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-stone-300 bg-white text-orange-600 focus:ring-orange-500"
                  />
                </div>
                <div className="text-xs">
                  <span className="font-extrabold text-stone-800 block">Pre-Authorize Rand Repair</span>
                  <span className="text-[11px] text-stone-500">Select if the rand rubber is also worn thin or has micro-holes.</span>
                </div>
              </label>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <label htmlFor="shippingAddress" className="block text-xs font-mono font-bold text-stone-500 uppercase mb-1.5">
              Your Shipping Return Address <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              id="shippingAddress"
              name="shippingAddress"
              required
              value={formData.shippingAddress}
              onChange={handleTextChange}
              placeholder="123 Beta Edge Blvd, Seattle, WA 98101"
              className="w-full rounded-lg bg-white border border-stone-250 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/20"
            />
          </div>

          {/* Wear description */}
          <div>
            <label htmlFor="notes" className="block text-xs font-mono font-bold text-stone-500 uppercase mb-1.5">
              Specific Wear Notes & Observations
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleTextChange}
              placeholder="E.g., Left toe is completely through, worn on plastic volumes, needs stitching, or general repairs."
              className="w-full rounded-lg bg-white border border-stone-250 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/20 resize-none"
            />
          </div>

          {/* Photo diagnostics upload */}
          <div>
            <span className="block text-xs font-mono font-bold text-stone-500 uppercase mb-2">
              Shoe Diagnostics Photo <span className="text-orange-500 font-bold lowercase">(Mandatory)</span>
            </span>

            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition ${
                dragActive 
                  ? "border-orange-500 bg-orange-50/40" 
                  : photoUrl 
                    ? "border-emerald-500 bg-emerald-50/10" 
                    : "border-stone-250 bg-stone-50"
              }`}
              id="photo-drag-upload-zone"
            >
              {photoUrl ? (
                <div className="space-y-4" id="uploaded-photo-preview-element">
                  <div className="relative mx-auto h-32 w-48 overflow-hidden rounded-lg border border-stone-200 bg-stone-105 shadow-inner">
                    <img src={photoUrl} alt="Your Shoe diagnostics" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    <button
                      type="button"
                      onClick={() => setPhotoUrl("")}
                      className="absolute right-1.5 top-1.5 rounded bg-stone-900/90 hover:bg-stone-950 px-2.5 py-1 text-[11px] font-bold text-red-400 hover:text-red-300 backdrop-blur-xs transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <p className="text-xs text-stone-600 font-semibold">File successfully attached!</p>
                    <button
                      type="button"
                      onClick={loadDemoPhoto}
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-orange-605 hover:text-orange-500"
                    >
                      <RefreshCw className="h-3 w-3" /> Swap sample
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3" id="empty-photo-uploader-element">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white border border-stone-200 shadow-xs text-stone-500">
                    <Upload className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-600">
                      Drag and drop your shoe image here, or{" "}
                      <span 
                        onClick={() => fileInputRef.current?.click()}
                        className="text-orange-600 font-extrabold underline hover:text-orange-500 cursor-pointer"
                      >
                        browse files
                      </span>
                    </p>
                    <p className="text-[11px] text-stone-450 mt-1">PNG, JPG, JPEG up to 6MB</p>
                  </div>
                  
                  <div className="pt-2">
                    <span className="text-stone-500 text-[10px] uppercase font-mono block font-bold">Testing quickly? Attach mockup shoe:</span>
                    <button
                      type="button"
                      onClick={loadDemoPhoto}
                      className="mt-1.5 inline-flex items-center gap-1.5 rounded-lg bg-white border border-stone-250 px-3.5 py-1.5 text-xs font-mono font-bold text-orange-600 hover:border-orange-500/50 hover:bg-orange-50/20 hover:text-orange-700 shadow-xs active:scale-95 transition duration-200 cursor-pointer"
                      id="btn-load-demo-photo"
                    >
                      <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                      <span>Attach Worn Shoe Demo Photo</span>
                    </button>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3.5 text-sm font-black text-white hover:bg-orange-500 transition shadow-md hover:shadow-lg hover:shadow-orange-500/10 active:scale-98 transition duration-200 cursor-pointer"
            id="btn-submit-consultation"
          >
            Submit Shoe for Inspection
          </button>
        </form>
      )}
    </div>
  );
}
