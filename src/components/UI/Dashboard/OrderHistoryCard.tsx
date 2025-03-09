"use client";
import { IOrder, queryParams } from "@/src/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { IMeta } from "./VendorProductCard";
import { useEffect, useState } from "react";
import { getAllOrder } from "@/src/services/OrderService";

const OrderHistoryCard = ({
  orders,
}: {
  orders: { meta: IMeta; data: IOrder[] };
}) => {
  const [orderData, setOrderData] = useState(orders);
  const [currentPage, setCurrentPage] = useState(orderData?.meta?.page);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(orderData?.meta?.totalPage);

  useEffect(() => {
    const query: queryParams[] = [];
    if (limit) {
      query.push({ name: "limit", value: limit });
    }
    if (currentPage) {
      query.push({ name: "page", value: currentPage });
    }

    const fetchData = async () => {
      const { data: allOrder } = await getAllOrder(query);
      setOrderData(allOrder);
      setTotalPage(orderData?.meta?.totalPage);
    };

    if (query.length > 0) {
      fetchData();
    }
  }, [currentPage, totalPage]);

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
          {orderData?.data?.map((order: IOrder) => (
            <TableRow key={order?.id}>
              <TableCell>{order?.id}</TableCell>
              <TableCell>{order?.totalPrice}</TableCell>
              <TableCell>{order?.status}</TableCell>
              <TableCell>{order?.paymentStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {orderData?.data?.length > 0 ? (
        <Pagination
          total={totalPage}
          page={currentPage}
          showControls
          onChange={(page) => setCurrentPage(page)}
          className="flex justify-center my-2"
        />
      ) : (
        "No orders to show"
      )}
    </div>
  );
};

export default OrderHistoryCard;
