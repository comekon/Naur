"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/cart";
import StepIndicator from "@/components/ui/StepIndicator";
import OrderSummaryCard from "@/components/ui/OrderSummaryCard";
import Accordion from "@/components/ui/Accordion";
import FlatButton from "@/components/ui/FlatButton";
import SectionContainer from "@/components/layout/SectionContainer";
import { cn } from "@/lib/cn";

const steps = ["Pengiriman", "Pembayaran", "Konfirmasi"];

const couriers = [
  { id: "jne", name: "JNE Regular", price: 12000, eta: "3-5 hari" },
  { id: "sicepat", name: "SiCepat BEST", price: 9000, eta: "2-3 hari" },
  { id: "gosend", name: "GoSend Same Day", price: 25000, eta: "Hari ini" },
];

const paymentMethods = [
  { title: "Transfer Bank", icon: "🏦" },
  { title: "Virtual Account", icon: "💳" },
  { title: "E-Wallet", icon: "📱" },
  { title: "COD", icon: "🤝" },
  { title: "QRIS", icon: "📲" },
];

export default function CheckoutPage() {
  const { items, subtotal, discount, total, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [courier, setCourier] = useState("");
  const [payment, setPayment] = useState("");
  const [address, setAddress] = useState("Jl. Merdeka No. 17, RT 05/RW 02, Menteng, Jakarta Pusat 10310");

  const courierPrice = couriers.find((c) => c.id === courier)?.price ?? 0;
  const grandTotal = total + courierPrice;

  const handlePay = () => {
    clearCart();
    router.push("/");
  };

  return (
    <SectionContainer>
      <h1 className="font-display text-4xl font-bold">Checkout</h1>

      <div className="mt-8">
        <StepIndicator current={step} steps={steps} />
      </div>

      <div className="mt-10 flex flex-col gap-8 lg:flex-row">
        {/* Left: Steps */}
        <div className="flex-1">
          {/* Step 1 — Pengiriman */}
          {step === 1 && (
            <div>
              <h2 className="font-display text-xl font-bold mb-6">Alamat Pengiriman</h2>
              <div className="rounded-flat border-2 border-text-dark p-4 mb-6">
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-flat border-2 border-text-dark px-3 py-2 text-sm font-body focus:outline-none focus:border-primary"
                />
              </div>

              <h3 className="font-display text-lg font-bold mb-4">Pilih Ekspedisi</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {couriers.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCourier(c.id)}
                    className={cn(
                      "rounded-flat border-2 border-text-dark p-4 text-left transition-colors",
                      courier === c.id ? "bg-accent" : "bg-light-base hover:bg-accent/50"
                    )}
                  >
                    <p className="font-display text-sm font-bold">{c.name}</p>
                    <p className="mt-1 font-label text-sm font-bold text-primary">
                      {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(c.price)}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">{c.eta}</p>
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <FlatButton variant="solid" color="primary" size="lg" onClick={() => setStep(2)} className={cn(!courier && "opacity-50 pointer-events-none")}>
                  Lanjut ke Pembayaran
                </FlatButton>
                {!courier && <p className="mt-2 text-xs text-text-muted">Pilih ekspedisi terlebih dahulu</p>}
              </div>
            </div>
          )}

          {/* Step 2 — Pembayaran */}
          {step === 2 && (
            <div>
              <h2 className="font-display text-xl font-bold mb-6">Metode Pembayaran</h2>
              <Accordion
                items={paymentMethods.map((m) => ({
                  title: m.title,
                  icon: <span className="text-lg">{m.icon}</span>,
                  content: (
                    <button
                      onClick={() => setPayment(m.title)}
                      className={cn(
                        "w-full rounded-flat border-2 border-text-dark px-4 py-3 font-display text-sm font-bold text-left transition-colors",
                        payment === m.title ? "bg-accent" : "bg-light-base hover:bg-accent/50"
                      )}
                    >
                      Pilih {m.title}
                    </button>
                  ),
                }))}
              />

              <div className="mt-8 flex gap-3">
                <FlatButton variant="outline" color="dark" size="lg" onClick={() => setStep(1)}>
                  Kembali
                </FlatButton>
                <FlatButton variant="solid" color="primary" size="lg" onClick={() => setStep(3)} className={cn(!payment && "opacity-50 pointer-events-none")}>
                  Konfirmasi Pesanan
                </FlatButton>
                {!payment && <p className="mt-2 text-xs text-text-muted">Pilih metode pembayaran terlebih dahulu</p>}
              </div>
            </div>
          )}

          {/* Step 3 — Konfirmasi */}
          {step === 3 && (
            <div>
              <h2 className="font-display text-xl font-bold mb-6">Konfirmasi Pesanan</h2>

              <div className="space-y-4">
                <div className="rounded-flat border-2 border-text-dark p-4">
                  <p className="font-display text-sm font-bold mb-2">Alamat Pengiriman</p>
                  <p className="text-sm text-text-muted">{address}</p>
                </div>
                <div className="rounded-flat border-2 border-text-dark p-4">
                  <p className="font-display text-sm font-bold mb-2">Ekspedisi</p>
                  <p className="text-sm text-text-muted">{couriers.find((c) => c.id === courier)?.name} — {couriers.find((c) => c.id === courier)?.eta}</p>
                </div>
                <div className="rounded-flat border-2 border-text-dark p-4">
                  <p className="font-display text-sm font-bold mb-2">Pembayaran</p>
                  <p className="text-sm text-text-muted">{payment}</p>
                </div>
                <div className="rounded-flat border-2 border-text-dark p-4">
                  <p className="font-display text-sm font-bold mb-3">Produk</p>
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm py-1">
                      <span>{item.name} x{item.quantity}</span>
                      <span className="font-label font-bold">
                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <FlatButton variant="outline" color="dark" size="lg" onClick={() => setStep(2)}>
                  Kembali
                </FlatButton>
                <FlatButton variant="solid" color="primary" size="lg" onClick={handlePay} className="flex-1">
                  Bayar Sekarang
                </FlatButton>
              </div>
            </div>
          )}
        </div>

        {/* Right: Mini Order Summary */}
        <div className="lg:w-80 shrink-0">
          <div className="lg:sticky lg:top-24">
            <OrderSummaryCard
              subtotal={subtotal}
              discount={discount}
              total={grandTotal}
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
