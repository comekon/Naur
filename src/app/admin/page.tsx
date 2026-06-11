"use client";

import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { products } from "@/data/products";
import { mockOrders } from "@/data/orders";
import { articles } from "@/data/articles";
import { cn } from "@/lib/cn";

const fmt = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

export default function AdminDashboard() {
  const totalRevenue = mockOrders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const totalOrders = mockOrders.length;
  const totalProducts = products.length;
  const totalUsers = 2;

  // Simple line chart SVG (7 days)
  const chartData = [120000, 250000, 180000, 350000, 220000, 310000, 280000];
  const maxVal = Math.max(...chartData);
  const minVal = 0;
  const chartW = 600;
  const chartH = 200;
  const points = chartData.map((v, i) => {
    const x = (i / (chartData.length - 1)) * chartW;
    const y = chartH - ((v - minVal) / (maxVal - minVal)) * chartH;
    return `${x},${y}`;
  });

  const topProducts = products.filter((p) => p.badges.includes("bestseller")).slice(0, 4);
  const recentOrders = mockOrders.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-display text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-text-muted mt-1">
          Ringkasan data toko dan aktivitas terbaru.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Pendapatan" value={fmt(totalRevenue)} bg="primary" trend="+12% dari minggu lalu" />
        <StatCard label="Total Order" value={totalOrders} bg="secondary" />
        <StatCard label="Total Produk" value={totalProducts} bg="accent" />
        <StatCard label="Total Pengguna" value={totalUsers} bg="tertiary" />
      </div>

      {/* Revenue Chart */}
      <div className="rounded-flat border-2 border-text-dark bg-light-base p-6 shadow-flat">
        <h2 className="font-display text-lg font-bold mb-4">Pendapatan 7 Hari Terakhir</h2>
        <svg viewBox={`0 0 ${chartW + 40} ${chartH + 40}`} className="w-full h-auto">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
            <line
              key={pct}
              x1="20" y1={pct * chartH + 10}
              x2={chartW + 20} y2={pct * chartH + 10}
              stroke="#1A1A1A" strokeWidth="0.5" opacity="0.2"
            />
          ))}
          {/* Line */}
          <polyline
            points={points.map((p) => {
              const [x, y] = p.split(",").map(Number);
              return `${x + 20},${y + 10}`;
            }).join(" ")}
            fill="none"
            stroke="#E63000"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Dots */}
          {chartData.map((v, i) => {
            const x = (i / (chartData.length - 1)) * chartW + 20;
            const y = chartH - ((v - minVal) / (maxVal - minVal)) * chartH + 10;
            return <circle key={i} cx={x} cy={y} r="4" fill="#E63000" stroke="#1A1A1A" strokeWidth="2" />;
          })}
          {/* Labels */}
          {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day, i) => {
            const x = (i / (chartData.length - 1)) * chartW + 20;
            return (
              <text key={day} x={x} y={chartH + 30} textAnchor="middle" fontSize="11" fontFamily="Space Mono" fill="#757575">
                {day}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Tables */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Products */}
        <div className="rounded-flat border-2 border-text-dark bg-light-base shadow-flat overflow-hidden">
          <h2 className="font-display text-lg font-bold px-5 py-4 border-b-2 border-text-dark/10">Produk Terlaris</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-accent/30">
                <th className="px-5 py-2 text-left font-display text-xs font-bold">Produk</th>
                <th className="px-5 py-2 text-left font-display text-xs font-bold">Kategori</th>
                <th className="px-5 py-2 text-right font-display text-xs font-bold">Harga</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p) => (
                <tr key={p.id} className="border-t border-text-dark/10">
                  <td className="px-5 py-3 text-sm font-bold">{p.name}</td>
                  <td className="px-5 py-3 text-xs text-text-muted">{p.category}</td>
                  <td className="px-5 py-3 text-sm font-label font-bold text-right">{fmt(p.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Orders */}
        <div className="rounded-flat border-2 border-text-dark bg-light-base shadow-flat overflow-hidden">
          <h2 className="font-display text-lg font-bold px-5 py-4 border-b-2 border-text-dark/10">Order Terbaru</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-accent/30">
                <th className="px-5 py-2 text-left font-display text-xs font-bold">No. Order</th>
                <th className="px-5 py-2 text-left font-display text-xs font-bold">Total</th>
                <th className="px-5 py-2 text-left font-display text-xs font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-t border-text-dark/10">
                  <td className="px-5 py-3 text-sm font-label font-bold">{o.id}</td>
                  <td className="px-5 py-3 text-sm font-label font-bold">{fmt(o.total)}</td>
                  <td className="px-5 py-3"><StatusBadge status={o.status as any} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
