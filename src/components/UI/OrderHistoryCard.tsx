"use client";
import { IOrder, IRating } from "@/src/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { IMeta } from "./VendorProductCard";

const OrderHistoryCard = ({
  orders,
}: {
  orders: { meta: { page: IMeta }; data: IOrder[] };
}) => {
  return (
    <div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>ORDER ID</TableColumn>
          <TableColumn>Total Amount</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>PAYMENT STATUS</TableColumn>
        </TableHeader>
        <TableBody>
          {orders?.data?.map((order: IOrder) => (
            <TableRow key={order?.id}>
              <TableCell>{order?.id}</TableCell>
              <TableCell>{order?.totalPrice}</TableCell>
              <TableCell>{order?.status}</TableCell>
              <TableCell>{order?.paymentStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderHistoryCard;
