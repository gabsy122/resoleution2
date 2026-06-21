import { ResoleOrder, OrderStatus } from "./types";

export const MOCK_ORDERS_STORAGE_KEY = "climbing_resole_orders_resoleution";

// High-fidelity mock orders adapted to the simplified Brand-only & Secret rubber guidelines
export const INITIAL_MOCK_ORDERS: ResoleOrder[] = [
  {
    id: "RSL-2045",
    customerName: "Alex Handhold",
    customerEmail: "alex@yosemite.org",
    shoeBrand: "La Sportiva",
    randRepair: true,
    notes: "Did the Freerider again and these rands are absolutely blown out. Need strong structural repair on both toe boxes. Thanks!",
    photoUrl: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=600",
    status: OrderStatus.PENDING_ASSESSMENT,
    quotePrice: null,
    cobblerNotes: "",
    shippingAddress: "99 El Cap Meadow Rd, Yosemite Valley, CA 95389",
    trackingNumber: "",
    createdAt: "2026-06-19T10:30:00Z",
    history: [
      {
        status: OrderStatus.PENDING_ASSESSMENT,
        timestamp: "2026-06-19T10:30:00Z",
        note: "Customer submitted wear-and-tear images. Waiting for cobbler evaluation."
      }
    ]
  },
  {
    id: "RSL-1992",
    customerName: "Brooke Raboutou",
    customerEmail: "brooke.r@climbingteam.us",
    shoeBrand: "Scarpa",
    randRepair: false,
    notes: "I only wore them for 3 bouldering sessions but I scraped the toe tip on a sharp volume. Please let me know if it can be saved without replacing the rand.",
    photoUrl: "https://images.unsplash.com/photo-1564858013576-a4c88e999939?auto=format&fit=crop&q=80&w=600",
    status: OrderStatus.QUOTE_OFFERED,
    quotePrice: 55,
    cobblerNotes: "Rand looks completely intact with plenty of life left! A standard resole with our proprietary secret climbing rubber is all you need to return these to brand-new condition. No rand patches required, which keeps the toe thin and sensitive.",
    shippingAddress: "453 Boulder Hwy, Boulder, CO 80301",
    trackingNumber: "",
    createdAt: "2026-06-18T14:22:00Z",
    history: [
      {
        status: OrderStatus.PENDING_ASSESSMENT,
        timestamp: "2026-06-18T14:22:00Z",
        note: "Request uploaded with Scarpa shoes."
      },
      {
        status: OrderStatus.QUOTE_OFFERED,
        timestamp: "2026-06-18T16:05:00Z",
        note: "Cobbler examined photos: Sole resole only. Approved for $55. Waiting for Brooke to accept."
      }
    ]
  },
  {
    id: "RSL-1823",
    customerName: "Adam Ondra",
    customerEmail: "adam@silence-flatanger.cz",
    shoeBrand: "La Sportiva",
    randRepair: true,
    notes: "I tried a project in Flatanger with intense toe hooks. Small holes in both front toe sections.",
    photoUrl: "https://images.unsplash.com/photo-1601244000764-219d7063249c?auto=format&fit=crop&q=80&w=600",
    status: OrderStatus.RECEIVED_IN_PROGRESS,
    quotePrice: 75,
    cobblerNotes: "Both toes have rand holes under the sole line. We will perform a complete rand restoration and toe cap reinforcement, followed by pressing our signature high-friction compound.",
    shippingAddress: "Brno Outer Rim Way 12B, Czech Republic",
    trackingNumber: "",
    createdAt: "2026-06-14T08:11:00Z",
    history: [
      {
        status: OrderStatus.PENDING_ASSESSMENT,
        timestamp: "2026-06-14T08:11:00Z",
        note: "Submission received with La Sportiva brand."
      },
      {
        status: OrderStatus.QUOTE_OFFERED,
        timestamp: "2026-06-14T11:00:00Z",
        note: "Quote of $75 including dual toe caps proposed."
      },
      {
        status: OrderStatus.AWAITING_SHIPMENT,
        timestamp: "2026-06-14T15:30:00Z",
        note: "Adam Ondra accepted the quote & authorized shipment."
      },
      {
        status: OrderStatus.RECEIVED_IN_PROGRESS,
        timestamp: "2026-06-17T09:44:00Z",
        note: "Shoes received at workshop. Placed into active cobbler queue: Grounding old rubber."
      }
    ]
  },
  {
    id: "RSL-1751",
    customerName: "Janja Garnbret",
    customerEmail: "janja@climbchamp.si",
    shoeBrand: "Five Ten",
    randRepair: false,
    notes: "Standard gym wear. Sole needs replacement.",
    photoUrl: "",
    status: OrderStatus.SHIPPED,
    quotePrice: 60,
    cobblerNotes: "Very clean standard wear. Resoled beautifully with our secret composite compound for maximum platform power.",
    shippingAddress: "Ljubljana Central Pl 3, Slovenia",
    trackingNumber: "UPS-TRACK-JANJA-99120485",
    createdAt: "2026-06-10T09:00:00Z",
    history: [
      {
        status: OrderStatus.PENDING_ASSESSMENT,
        timestamp: "2026-06-10T09:00:00Z",
        note: "Order submitted."
      },
      {
        status: OrderStatus.QUOTE_OFFERED,
        timestamp: "2026-06-10T12:00:00Z",
        note: "Quoted $60."
      },
      {
        status: OrderStatus.AWAITING_SHIPMENT,
        timestamp: "2026-06-11T08:00:00Z",
        note: "Quote accepted, payment and shipping details entered."
      },
      {
        status: OrderStatus.RECEIVED_IN_PROGRESS,
        timestamp: "2026-06-13T10:00:00Z",
        note: "Shoes received at workshop."
      },
      {
        status: OrderStatus.COMPLETED,
        timestamp: "2026-06-15T15:00:00Z",
        note: "Resoling completed, edge bevel adjusted, and shoes freshly disinfected."
      },
      {
        status: OrderStatus.SHIPPED,
        timestamp: "2026-06-16T11:00:00Z",
        note: "Shipped back via Express Postal Service. Tracking: UPS-TRACK-JANJA-99120485"
      }
    ]
  }
];
