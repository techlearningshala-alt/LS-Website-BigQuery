"use client";

import React, { useMemo, useState } from "react";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  FileText,
  MapPin,
  Search,
  X,
} from "lucide-react";

const PAGE_SIZE = 50;

const DETAIL_METRICS = [
  { key: "tlr", label: "TLR (100)" },
  { key: "rpc", label: "RPC (100)" },
  { key: "go", label: "GO (100)" },
  { key: "oi", label: "OI (100)" },
  { key: "perception", label: "PERCEPTION (100)" },
];

const RankingTable = ({ rows = [], categoryName = "", year = "" }) => {
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);
  const [query, setQuery] = useState("");

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;

    return rows.filter((row) => {
      const haystack = [
        row.institute_id,
        row.name,
        row.city,
        row.state,
        row.rank,
        row.score,
      ]
        .filter((value) => value != null && value !== "")
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [rows, query]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));

  const pageRows = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredRows.slice(start, start + PAGE_SIZE);
  }, [filteredRows, page]);

  if (!rows.length) {
    return (
      <p className="rounded-md border border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center text-xs text-gray-500">
        No ranking data available
        {categoryName ? ` for ${categoryName}` : ""}
        {year ? ` (${year})` : ""}.
      </p>
    );
  }

  const startItem =
    filteredRows.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(page * PAGE_SIZE, filteredRows.length);

  const getRowId = (row) => row.institute_id || `${row.rank}-${row.name}`;

  const toggleDetails = (rowId) => {
    setExpandedId((current) => (current === rowId ? null : rowId));
  };

  const handleSearchChange = (value) => {
    setQuery(value);
    setPage(1);
    setExpandedId(null);
  };

  return (
    <div className="space-y-3 text-xs">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full max-w-md">
          <span className="sr-only">Search institutes</span>
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by name, ID, city, state…"
            className="h-8 w-full rounded-md border border-gray-200 bg-white py-1.5 pl-8 pr-8 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#e62a38] focus:ring-1 focus:ring-[#e62a38]/30"
          />
          {query ? (
            <button
              type="button"
              onClick={() => handleSearchChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-400 transition hover:text-gray-700"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </label>
        <p className="shrink-0 text-xs text-gray-500">
          {filteredRows.length === rows.length
            ? `${rows.length} institutes`
            : `${filteredRows.length} of ${rows.length} institutes`}
        </p>
      </div>

      <div className="overflow-x-auto rounded-md border border-gray-200">
        <table className="w-full min-w-max border-collapse text-xs">
          <thead>
            <tr className="bg-rose-50">
              {[
                "Institute ID",
                "Name",
                "Details",
                "PDF",
                "Graph",
                "City",
                "State",
                "Score",
                "Rank",
              ].map((label) => (
                <th
                  key={label}
                  className="whitespace-nowrap border border-gray-200 px-2 py-3 text-left text-xs font-bold text-gray-700"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="border border-gray-200 px-3 py-8 text-center text-xs text-gray-500"
                >
                  No institutes match “{query.trim()}”.
                </td>
              </tr>
            ) : (
              pageRows.map((row) => {
                const rowId = getRowId(row);
                const isExpanded = expandedId === rowId;

                return (
                  <React.Fragment key={rowId}>
                    <tr className="transition-colors hover:bg-rose-50/20">
                      <td className="border border-gray-200 px-2 py-1.5 text-xs text-gray-800">
                        {row.institute_id ?? "—"}
                      </td>
                      <td className="border border-gray-200 px-2 py-2.5 text-xs font-medium text-gray-800">
                        {row.name ?? "—"}
                      </td>
                      <td className="border border-gray-200 px-2 py-1.5 text-xs">
                        <button
                          type="button"
                          onClick={() => toggleDetails(rowId)}
                          className={`inline-flex h-6 items-center gap-1 rounded px-2 text-xs font-semibold leading-none transition ${
                            isExpanded
                              ? "bg-[#e62a38] text-white hover:bg-[#d12532]"
                              : "border border-[#e62a38] bg-white text-[#e62a38] hover:bg-[#fff5f5]"
                          }`}
                        >
                          {isExpanded ? (
                            <>
                              Close
                              <X className="h-3 w-3" />
                            </>
                          ) : (
                            "Details"
                          )}
                        </button>
                      </td>
                      <td className="border border-gray-200 px-2 py-1.5 text-xs">
                        {row.pdf ? (
                          <a
                            href={row.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex text-gray-500 transition hover:text-[#e62a38]"
                            aria-label={`Open PDF for ${row.name}`}
                          >
                            <FileText className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="border border-gray-200 px-2 py-1.5 text-xs">
                        {row.graph ? (
                          <a
                            href={row.graph}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex text-gray-500 transition hover:text-[#e62a38]"
                            aria-label={`Open graph for ${row.name}`}
                          >
                            <BarChart3 className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="border border-gray-200 px-2 py-1.5 text-xs text-gray-800">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3 shrink-0 text-[#e62a38]" />
                          {row.city ?? "—"}
                        </span>
                      </td>
                      <td className="border border-gray-200 px-2 py-1.5 text-xs text-gray-800">
                        {row.state ?? "—"}
                      </td>
                      <td className="border border-gray-200 px-2 py-1.5 text-xs">
                        <span className="inline-flex min-w-10 items-center justify-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                          {row.score ?? "—"}
                        </span>
                      </td>
                      <td className="border border-gray-200 px-2 py-1.5 text-xs">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
                          {row.rank ?? "—"}
                        </span>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr>
                        <td
                          colSpan={9}
                          className="border border-gray-200 bg-white px-2 py-1.5"
                        >
                          <div className="max-w-3xl overflow-x-auto">
                            <table className="w-full border-collapse text-xs">
                              <thead>
                                <tr>
                                  {DETAIL_METRICS.map((metric) => (
                                    <th
                                      key={metric.key}
                                      className="whitespace-nowrap border border-gray-200 px-2 py-1 text-left text-xs font-bold text-gray-700"
                                    >
                                      {metric.label}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  {DETAIL_METRICS.map((metric) => (
                                    <td
                                      key={metric.key}
                                      className="border border-gray-200 px-2 py-1 text-xs text-gray-800"
                                    >
                                      {row[metric.key] ?? "—"}
                                    </td>
                                  ))}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {filteredRows.length > 0 && (
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-xs text-gray-600">
            Showing {startItem}–{endItem} of {filteredRows.length}
          </p>
          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setPage((p) => Math.max(1, p - 1));
                  setExpandedId(null);
                }}
                disabled={page === 1}
                className="inline-flex h-7 items-center gap-1 rounded-md border border-gray-200 bg-white px-2 text-xs font-medium text-gray-700 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((pageNum) => {
                  if (totalPages <= 7) return true;
                  if (pageNum === 1 || pageNum === totalPages) return true;
                  return Math.abs(pageNum - page) <= 1;
                })
                .reduce((acc, pageNum, idx, arr) => {
                  if (idx > 0 && pageNum - arr[idx - 1] > 1) {
                    acc.push("ellipsis-" + pageNum);
                  }
                  acc.push(pageNum);
                  return acc;
                }, [])
                .map((item) =>
                  typeof item === "string" ? (
                    <span
                      key={item}
                      className="px-1 text-xs text-gray-400"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setPage(item);
                        setExpandedId(null);
                      }}
                      className={`inline-flex h-7 min-w-7 items-center justify-center rounded-md border px-2 text-xs font-medium transition-colors ${
                        item === page
                          ? "border-[#e62a38] bg-[#e62a38] text-white"
                          : "border-gray-200 bg-white text-gray-700 hover:bg-rose-50"
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
              <button
                type="button"
                onClick={() => {
                  setPage((p) => Math.min(totalPages, p + 1));
                  setExpandedId(null);
                }}
                disabled={page === totalPages}
                className="inline-flex h-7 items-center gap-1 rounded-md border border-gray-200 bg-white px-2 text-xs font-medium text-gray-700 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RankingTable;
