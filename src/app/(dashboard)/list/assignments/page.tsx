import Announcements from "@/app/components/Announcements";
import BigCalendar from "@/app/components/BigCalender";
import EventCalendar from "@/app/components/EventCalendar";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { Assignment, Class, Prisma, Subject, Teacher } from "@/generated/prisma/client";
import { assignmentsData, examsData } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ListAssignments = Assignment & {
  lesson: {
    subject: Subject,
    class: Class,
    teacher: Teacher
  }
}

const columns = [
  { header: "Subject Name", accessor: "name" },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Due Date",
    accessor: "dueDate",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
  },

  {
    header: "Action",
    accessor: "actions",
  },
];

const createRenderRow = (role: string | undefined) => (item: ListAssignments) => {
  return (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
      <td>{item.lesson.class.name}</td>
      <td className="hidden md:table-cell">{item.lesson.teacher.name + " " + item.lesson.teacher.surname}</td>
      {new Intl.DateTimeFormat("en-US").format(item.dueDate)}

      <td>
        <div className="flex items-center gap-2">
          <Link href="/list/teachers/${item.id}">
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/edit.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
              <Image src="/delete.png" alt="" width={16} height={16} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

const AssignmentsListPage = async({searchParams} : {searchParams: {[key: string]: string | undefined}}) => {

  // console.log(searchParams)

  const {page, ...queryParams} = searchParams

  const p = page ? parseInt(page) : 1

  const user = await currentUser()
  const role = user?.publicMetadata?.role as string | undefined

  // url params conditiob

  const query: Prisma.AssignmentWhereInput = {}

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lesson = { classId : parseInt(value)};
            break;
          case "teacherId":
            query.lesson = { teacherId : value};
            break;
          case "search":
            query.lesson = { subject : {
              name: { contains: value, mode: "insensitive" },
            } };
            break;
          default:
            break;
        }
      }
    }
  }


  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
            class: { select: { name: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.assignment.count({ where: query }),
  ]);
  



  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Assignments
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="filter" width={14} height={14} />
            </button>
            {role === "admin" && (
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <Image src="/plus.png" alt="filter" width={14} height={14} />
              </button>
            )}
          </div>
        </div>
      </div>
      {/* list */}
      <Table columns={columns} renderRow={createRenderRow(role)} data={data} />
      <div className=""></div>
      {/* pagination */}
      <div className="">
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default AssignmentsListPage;
