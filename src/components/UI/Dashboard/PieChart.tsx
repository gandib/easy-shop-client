"use client";

import { IOrder } from "@/src/types";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

const PieCharts = ({ data }: { data: { data: IOrder[] } }) => {
  const datas = data?.data?.map((order: IOrder) => ({
    name: order.transactionId,
    value: order.totalPrice,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Define COLORS array

  return (
    <div>
      <PieChart width={350} height={400}>
        <Pie
          data={datas}
          dataKey="value" // Ensure this matches a key in your data objects
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data?.data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PieCharts;
