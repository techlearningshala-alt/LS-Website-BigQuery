"use client";

import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  universitiesColumns,
  universitiesData,
} from "./universitiesData";
import { collegesColumns, collegesData } from "./collegesData";
import { autonomousColumns, autonomousData } from "./autonomousData";

const PAGE_SIZE = 200;

const NaacTable = ({ columns, rows }) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil((rows?.length || 0) / PAGE_SIZE));

  const pageRows = useMemo(() => {
    if (!rows?.length) return [];
    const start = (page - 1) * PAGE_SIZE;
    return rows.slice(start, start + PAGE_SIZE);
  }, [rows, page]);

  if (!rows?.length) {
    return (
      <p className="rounded-md border border-dashed border-gray-200 bg-gray-50 px-5 py-10 text-center text-sm text-gray-500">
        Data coming soon.
      </p>
    );
  }

  const startItem = (page - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(page * PAGE_SIZE, rows.length);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-md border border-gray-200">
        <table className="w-full min-w-max border-collapse">
          <thead>
            <tr className="bg-rose-50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="whitespace-nowrap border border-gray-200 px-5 py-4 text-left text-sm font-bold text-gray-700"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => (
              <tr
                key={row.id ?? `${row.sn}-${row.name}-${row.date}`}
                className="transition-colors last:border-b-0 hover:bg-rose-50/30"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="max-w-120 border border-gray-200 px-5 py-3 text-sm text-gray-800"
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-gray-600">
            Showing {startItem}–{endItem} of {rows.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="inline-flex h-9 items-center gap-1 rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </button>
            <span className="min-w-24 text-center text-sm font-medium text-gray-700">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="inline-flex h-9 items-center gap-1 rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const NaacData = () => {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <Tabs defaultValue="universities" className="gap-4">
        <TabsList className="h-auto w-full max-w-full justify-start gap-1 overflow-x-auto bg-rose-50/80 p-1 whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] sm:w-fit [&::-webkit-scrollbar]:hidden">
          <TabsTrigger
            value="universities"
            className="shrink-0 rounded-md px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            Universities
          </TabsTrigger>
          <TabsTrigger
            value="colleges"
            className="shrink-0 rounded-md px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            Colleges
          </TabsTrigger>
          <TabsTrigger
            value="transition"
            className="shrink-0 rounded-md px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            Transition Autonomous Colleges
          </TabsTrigger>
        </TabsList>

        <TabsContent value="universities">
          <NaacTable columns={universitiesColumns} rows={universitiesData} />
        </TabsContent>

        <TabsContent value="colleges">
          <NaacTable columns={collegesColumns} rows={collegesData} />
        </TabsContent>

        <TabsContent value="transition">
          <NaacTable columns={autonomousColumns} rows={autonomousData} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default NaacData;
