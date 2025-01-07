"use client";

import { IOrder } from "@/src/types";
import moment from "moment";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const LineChartComponent = ({ data }: { data: { data: IOrder[] } }) => {
  const datas = data?.data?.map((order: IOrder) => ({
    date: moment(order.createdAt).format("MMM DD, YYYY"),
    amount: order.totalPrice,
  }));

  return (
    <div>
      <LineChart
        width={350}
        height={400}
        data={datas}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default LineChartComponent;
