export type OrderStatus = "pending" | "processing" | "shipped" | "done" | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  thumbnail?: string;
}

export interface TimelineEntry {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  status: OrderStatus;
  address: string;
  courier: string;
  trackingNumber?: string;
  timeline: TimelineEntry[];
  createdAt: string;
}
