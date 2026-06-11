"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/cn";
import Pagination from "@/components/ui/Pagination";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  rows: any[];
  actions?: (row: any) => React.ReactNode;
  pageSize?: number;
}

export default function DataTable({ columns, rows, actions, pageSize = 10 }: DataTableProps) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = rows;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((row) =>
        columns.some((col) => {
          const val = row[col.key];
          if (val == null) return false;
          return String(val).toLowerCase().includes(q);
        })
      );
    }
    if (sortKey) {
      result = [...result].sort((a, b) => {
        const aVal = String(a[sortKey] ?? "");
        const bVal = String(b[sortKey] ?? "");
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      });
    }
    return result;
  }, [rows, search, sortKey, sortDir, columns]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full max-w-xs rounded-flat border-2 border-text-dark px-3 py-2 text-sm focus:outline-none focus:border-primary"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-flat border-2 border-text-dark">
        <table className="w-full">
          <thead>
            <tr className="bg-accent">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-4 py-3 text-left font-display text-sm font-bold cursor-pointer select-none hover:bg-accent/80 transition-colors"
                >
                  {col.label}
                  {sortKey === col.key && (
                    <span className="ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>
                  )}
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3 text-left font-display text-sm font-bold">Aksi</th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 py-8 text-center text-text-muted text-sm">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              paginated.map((row, i) => (
                <tr key={i} className="border-t-2 border-text-dark/10 hover:bg-light-base transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-sm">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">{actions(row)}</div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
