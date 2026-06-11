"use client";

import { cn } from "@/lib/cn";
import { productCategories, teaTypes, origins } from "@/data/products";

interface ProductFilterSidebarProps {
  selectedCategory: string;
  selectedTeaType: string;
  selectedOrigin: string;
  onCategoryChange: (v: string) => void;
  onTeaTypeChange: (v: string) => void;
  onOriginChange: (v: string) => void;
}

function FilterGroup({
  title,
  options,
  selected,
  onChange,
}: {
  title: string;
  options: readonly string[];
  selected: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-6">
      <h3 className="font-display text-sm font-bold uppercase tracking-wider mb-3">{title}</h3>
      <div className="flex flex-col gap-1">
        <button
          onClick={() => onChange("")}
          className={cn(
            "text-left text-sm px-2 py-1.5 rounded-flat transition-colors border-2 border-transparent",
            !selected && "bg-accent border-text-dark font-bold"
          )}
        >
          Semua
        </button>
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              "text-left text-sm px-2 py-1.5 rounded-flat transition-colors border-2 border-transparent",
              selected === opt && "bg-accent border-text-dark font-bold"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProductFilterSidebar({
  selectedCategory,
  selectedTeaType,
  selectedOrigin,
  onCategoryChange,
  onTeaTypeChange,
  onOriginChange,
}: ProductFilterSidebarProps) {
  return (
    <aside className="w-full md:w-64 shrink-0">
      <h2 className="font-display text-lg font-bold mb-6">Filter</h2>
      <FilterGroup title="Kategori" options={productCategories} selected={selectedCategory} onChange={onCategoryChange} />
      <FilterGroup title="Jenis Teh" options={teaTypes} selected={selectedTeaType} onChange={onTeaTypeChange} />
      <FilterGroup title="Asal Daun" options={origins} selected={selectedOrigin} onChange={onOriginChange} />
    </aside>
  );
}
