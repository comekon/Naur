import type { Order } from "@/types/order";

const now = new Date();

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    userId: "u1",
    items: [
      { productId: "p1", name: "Jasmine Milk Tea", price: 28000, quantity: 2 },
      { productId: "p5", name: "Single Origin — Kerinci", price: 85000, quantity: 1 },
    ],
    total: 141000,
    paymentMethod: "Transfer Bank",
    status: "done",
    address: "Jl. Merdeka No. 17, Menteng, Jakarta Pusat",
    courier: "JNE Regular",
    timeline: [
      { status: "pending", timestamp: "2026-04-25T10:00:00", note: "Pesanan dibuat" },
      { status: "processing", timestamp: "2026-04-25T12:00:00", note: "Pembayaran diterima" },
      { status: "shipped", timestamp: "2026-04-26T08:00:00", note: "Paket dikirim — JNE REG123456" },
      { status: "done", timestamp: "2026-04-29T14:00:00", note: "Paket diterima" },
    ],
    createdAt: "2026-04-25T10:00:00",
  },
  {
    id: "ORD-002",
    userId: "u1",
    items: [
      { productId: "p3", name: "Matcha Ceremonial", price: 35000, quantity: 1 },
    ],
    total: 35000,
    paymentMethod: "E-Wallet",
    status: "shipped",
    address: "Jl. Merdeka No. 17, Menteng, Jakarta Pusat",
    courier: "SiCepat BEST",
    trackingNumber: "SCPT789012",
    timeline: [
      { status: "pending", timestamp: "2026-05-10T09:00:00", note: "Pesanan dibuat" },
      { status: "processing", timestamp: "2026-05-10T09:05:00", note: "Pembayaran diterima" },
      { status: "shipped", timestamp: "2026-05-11T10:00:00", note: "Paket dikirim" },
    ],
    createdAt: "2026-05-10T09:00:00",
  },
  {
    id: "ORD-003",
    userId: "u1",
    items: [
      { productId: "p10", name: "Tumbler Naur Fire", price: 89000, quantity: 1 },
      { productId: "p11", name: "Tote Bag Naur", price: 65000, quantity: 2 },
    ],
    total: 219000,
    paymentMethod: "QRIS",
    status: "pending",
    address: "Jl. Merdeka No. 17, Menteng, Jakarta Pusat",
    courier: "GoSend Same Day",
    timeline: [
      { status: "pending", timestamp: "2026-05-16T08:00:00", note: "Menunggu pembayaran" },
    ],
    createdAt: "2026-05-16T08:00:00",
  },
  {
    id: "ORD-004",
    userId: "u1",
    items: [
      { productId: "p15", name: "Starter Kit", price: 250000, quantity: 1 },
    ],
    total: 250000,
    paymentMethod: "Transfer Bank",
    status: "processing",
    address: "Jl. Sudirman No. 42, Senayan, Jakarta Selatan",
    courier: "JNE Regular",
    timeline: [
      { status: "pending", timestamp: "2026-05-14T14:00:00", note: "Pesanan dibuat" },
      { status: "processing", timestamp: "2026-05-14T16:00:00", note: "Sedang diproses" },
    ],
    createdAt: "2026-05-14T14:00:00",
  },
  {
    id: "ORD-005",
    userId: "u1",
    items: [
      { productId: "p7", name: "Single Origin — Puncak", price: 75000, quantity: 3 },
    ],
    total: 225000,
    paymentMethod: "COD",
    status: "cancelled",
    address: "Jl. Gatot Subroto No. 88, Jakarta Selatan",
    courier: "SiCepat BEST",
    timeline: [
      { status: "pending", timestamp: "2026-05-08T11:00:00", note: "Pesanan dibuat" },
      { status: "cancelled", timestamp: "2026-05-09T09:00:00", note: "Dibatalkan oleh pembeli" },
    ],
    createdAt: "2026-05-08T11:00:00",
  },
  {
    id: "ORD-006",
    userId: "u1",
    items: [
      { productId: "p4", name: "Cold Brew Classic", price: 30000, quantity: 5 },
    ],
    total: 150000,
    paymentMethod: "Virtual Account",
    status: "done",
    address: "Jl. Merdeka No. 17, Menteng, Jakarta Pusat",
    courier: "GoSend Same Day",
    timeline: [
      { status: "pending", timestamp: "2026-04-20T10:00:00" },
      { status: "processing", timestamp: "2026-04-20T11:00:00" },
      { status: "shipped", timestamp: "2026-04-20T13:00:00" },
      { status: "done", timestamp: "2026-04-20T15:00:00" },
    ],
    createdAt: "2026-04-20T10:00:00",
  },
  {
    id: "ORD-007",
    userId: "u1",
    items: [
      { productId: "p6", name: "Single Origin — Wonosobo", price: 85000, quantity: 1 },
      { productId: "p8", name: "Teapot Keramik Hitam", price: 150000, quantity: 1 },
    ],
    total: 235000,
    paymentMethod: "Transfer Bank",
    status: "done",
    address: "Jl. Merdeka No. 17, Menteng, Jakarta Pusat",
    courier: "JNE Regular",
    timeline: [
      { status: "pending", timestamp: "2026-04-01T08:00:00" },
      { status: "processing", timestamp: "2026-04-01T10:00:00" },
      { status: "shipped", timestamp: "2026-04-02T09:00:00" },
      { status: "done", timestamp: "2026-04-04T14:00:00" },
    ],
    createdAt: "2026-04-01T08:00:00",
  },
  {
    id: "ORD-008",
    userId: "u1",
    items: [
      { productId: "p2", name: "Oolong Latte", price: 32000, quantity: 2 },
      { productId: "p14", name: "Pin Enamel Naur", price: 25000, quantity: 3 },
    ],
    total: 139000,
    paymentMethod: "E-Wallet",
    status: "processing",
    address: "Jl. Kemang Raya No. 5, Jakarta Selatan",
    courier: "SiCepat BEST",
    timeline: [
      { status: "pending", timestamp: "2026-05-15T16:00:00" },
      { status: "processing", timestamp: "2026-05-15T17:00:00" },
    ],
    createdAt: "2026-05-15T16:00:00",
  },
];

const STORAGE_KEY = "naur-orders";

export function getOrders(): Order[] {
  if (typeof window === "undefined") return mockOrders;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return [...mockOrders, ...JSON.parse(raw)];
  } catch { /* ignore */ }
  return mockOrders;
}

export function getOrdersByUserId(userId: string): Order[] {
  return getOrders().filter((o) => o.userId === userId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getOrderById(id: string): Order | undefined {
  return getOrders().find((o) => o.id === id);
}

export function createOrder(order: Omit<Order, "id" | "timeline">): Order {
  const newOrder: Order = {
    ...order,
    id: `ORD-${String(Date.now()).slice(-6)}`,
    timeline: [{ status: "pending", timestamp: new Date().toISOString(), note: "Pesanan dibuat" }],
  };
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    existing.push(newOrder);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch { /* ignore */ }
  return newOrder;
}

export function updateOrderStatus(id: string, status: Order["status"], note?: string): void {
  const all = getOrders();
  const order = all.find((o) => o.id === id);
  if (!order) return;
  order.status = status;
  order.timeline.push({ status, timestamp: new Date().toISOString(), note });
  // Save runtime updates (only works for localStorage-sourced orders)
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const idx = existing.findIndex((o: Order) => o.id === id);
    if (idx >= 0) {
      existing[idx] = order;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    }
  } catch { /* ignore */ }
}
