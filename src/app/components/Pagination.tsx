"use client";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Pagination = ({ page, count }: { page: number; count: number }) => {

// одна из вариаций disabled параметра кнопки вперед и назад, но я сделал это через className
  // const hasPrev = ITEM_PER_PAGE * (page - 1) > 0
  // const hasNext = ITEM_PER_PAGE * (page - 1)  + ITEM_PER_PAGE < count


  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(count / ITEM_PER_PAGE));

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="p-4 items-center justify-between flex text-gray-500">
      <button
        onClick={() => changePage(page - 1)}
        disabled={page <= 1}
        className={`py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 ${page >= totalPages ? "hover:cursor-pointer" : "disabled:cursor-not-allowed" }`}>
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageIndex = index + 1;
          return (
            <button
              onClick={() => changePage(pageIndex)}
              key={pageIndex}
              className={` hover:cursor-pointer px-2 rounded-sm ${
                page === pageIndex ? "bg-lama-sky" : ""
              }`}>
              {pageIndex}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => changePage(page + 1)}
        disabled={page >= totalPages}
        className={`py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 ${page >= totalPages ? "disabled:cursor-not-allowed" : "hover:cursor-pointer"}`}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
