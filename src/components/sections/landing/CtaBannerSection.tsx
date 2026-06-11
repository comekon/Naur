import Link from "next/link";
import FlatButton from "@/components/ui/FlatButton";

export default function CtaBannerSection() {
  return (
    <section className="bg-secondary">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-center gap-6 px-6 py-16 text-center md:py-24">
        <h2 className="font-display text-4xl font-bold text-text-dark md:text-6xl">
          Nyalakan harimu bersama Naur.
        </h2>
        <p className="text-lg text-text-dark/70">
          Specialty tea bar untuk jiwa yang berani menikmati.
        </p>
        <Link href="/products">
          <FlatButton variant="solid" color="dark" size="lg">
            Mulai Belanja
          </FlatButton>
        </Link>
      </div>
    </section>
  );
}
