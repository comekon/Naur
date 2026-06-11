import MarqueeTicker from "@/components/ui/MarqueeTicker";

export default function MarqueeSection() {
  return (
    <MarqueeTicker
      items={["JASMINE", "OOLONG", "GREEN TEA", "MILK TEA", "COLD BREW", "SINGLE ORIGIN"]}
      speed="normal"
    />
  );
}
