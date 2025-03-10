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
  Chip,
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
      if (allOrder) {
        setOrderData(allOrder);
        setTotalPage(allOrder?.meta?.totalPage);
      }
    };

    if (query.length > 0) {
      fetchData();
    }
  }, [currentPage, totalPage]);

  type PaymentStatus = "PAID" | "CANCELLED" | "UNPAID";

  const statusColorMap: Record<PaymentStatus, any> = {
    PAID: "success",
    CANCELLED: "danger",
    UNPAID: "warning",
  };
  return (
    <div className="mb-20">
      <Table
        isStriped
        aria-label="Example static collection table"
        bottomContent={
          orderData?.data?.length > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={currentPage}
                total={totalPage}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          ) : null
        }
      >
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
              {/* <TableCell>{order?.paymentStatus}</TableCell> */}
              <TableCell>
                <Chip
                  className="capitalize border-none gap-1 text-default-600"
                  color={statusColorMap[order?.paymentStatus as PaymentStatus]}
                  size="sm"
                  variant="dot"
                >
                  {order?.paymentStatus}
                </Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {orderData?.data?.length === 0 && "No orders to show"}
    </div>
  );
};

export default OrderHistoryCard;
