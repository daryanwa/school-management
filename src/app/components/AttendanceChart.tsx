"use client";

import Image from "next/image";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// #region Sample data
const data = [
  {
    name: "Monday",
    present: 40,
    absent: 20,
  },
  {
    name: "Tuesday",
    present: 30,
    absent: 18,
  },
  {
    name: "Wednesday",
    present: 20,
    absent: 90,
  },
  {
    name: "Thursday",
    present: 20,
    absent: 38,
  },
  {
    name: "Friday",
    present: 10,
    absent: 40,
  },
];

// #endregion

function AttendanceChart() {
  return (
    <div className="bg-white rounded-lg p-4 md:flex-row h-full ">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="more" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} barSize={20} data={data} responsive>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis
            axisLine={false}
            dataKey="name"
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
          />
          <YAxis width="auto" axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
          />
          <Bar
            dataKey="present"
            fill="#FAE27C"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="absent"
            fill="#C3EBFA"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AttendanceChart;
