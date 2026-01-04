"use client"
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const TableSearch = () => {



  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();



const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {

  e.preventDefault()

  const value = (e.currentTarget[0] as HTMLInputElement).value

  const params = new URLSearchParams(searchParams.toString());
  params.set("search", value);

  router.push(`${pathname}?${params.toString()}`);
}


  return (
    <form onSubmit={handleSubmit} className="w-full flex md:w-auto items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
      <Image src="/search.png" alt="search" width={14} height={14} />
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none "
      />
    </form>
  );
};

export default TableSearch;
