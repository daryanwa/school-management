"use client";

import Image from "next/image";
import { useState } from "react";


const FormModal = ({table, type, data, id}: {table: "teacher" | "student" | "parent" | "subject" | "class" | "lesson" | "exam" | "assignment" | "result" | "attendance" | "event" | "announcement"; type: "create" | "update" | "delete"; data?: any, id?: number}) => {



    const [isOpen, setIsOpen] = useState(false);


    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor = type === "create" ? "bg-lamaYellow" : type === "update" ? "bg-lamaPurple" : "bg-lamaRed";


    return (
        <>
        <button onClick={() => setIsOpen(true)} className={`${size} flex items-center justify-center rounded-full ${bgColor}`}>
            <Image src={`/${type}.png`} alt="icon" width={16} height={16} />
        </button>
        {isOpen && (
            <div className="w-screen h-screen fixed top-0 left-0 bg-black/60 z-50 flex items-center justify-center" onClick={() => setIsOpen(false)}>
                <div className="bg-white p-4 rounded-md relative w-90% md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]" onClick={(e) => e.stopPropagation()}>
                    <div>Hello</div>
                    <div className="absolute top-4 right-4 cursor-pointer">
                        <Image src="/close.png" alt="close" width={14} height={14} /> 
                         </div>
                </div>
            </div>
        )}
        </>
    )
}

export default FormModal;