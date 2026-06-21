/**
 * Types & Enums for Climbing Shoe Resoling Platform (Resoleution)
 */

export enum OrderStatus {
  PENDING_ASSESSMENT = "PENDING_ASSESSMENT",
  QUOTE_OFFERED = "QUOTE_OFFERED",
  AWAITING_SHIPMENT = "AWAITING_SHIPMENT",
  RECEIVED_IN_PROGRESS = "RECEIVED_IN_PROGRESS",
  COMPLETED = "COMPLETED",
  SHIPPED = "SHIPPED"
}

export interface OrderHistoryItem {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface ResoleOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  shoeBrand: string;
  randRepair: boolean;
  notes: string;
  photoUrl: string;
  status: OrderStatus;
  quotePrice: number | null;
  cobblerNotes: string;
  shippingAddress: string;
  trackingNumber: string;
  createdAt: string;
  history: OrderHistoryItem[];
}
