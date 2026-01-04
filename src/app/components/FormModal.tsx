"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { JSX, useState } from "react";
// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";

const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
};

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaPurple"
      : "bg-lamaRed";

  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className="p-4 flex flex-col gap-4">
        <span className="text-center font-bold">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <div className="flex items-center justify-end gap-2 w-full flex-col">
          <button
            onClick={() => setIsOpen(false)}
            type="button"
            className="bg-gray-200 text-gray-500 px-4 py-2 rounded-md w-full cursor-pointer hover:bg-gray-300">
            Cancel
          </button>
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded-md border-none w-full cursor-pointer hover:bg-orange-700">
            Delete
          </button>
        </div>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data)
    ) : (
      "Form nout found!"
    );
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}>
        <Image src={`/${type}.png`} alt="icon" width={16} height={16} />
      </button>
      {isOpen && (
        <div
          className="w-screen h-screen fixed top-0 left-0 bg-black/60 z-50 flex items-center justify-center"
          onClick={() => setIsOpen(false)}>
          <div
            className="bg-white p-4 rounded-md relative w-90% md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]"
            onClick={(e) => e.stopPropagation()}>
            <Form />

            <div
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 cursor-pointer">
              <Image src="/close.png" alt="close" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
