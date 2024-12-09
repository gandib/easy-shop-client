import OrderHistoryCard from "@/src/components/UI/OrderHistoryCard";
import { getAllOrder } from "@/src/services/OrderService";

const OrderHistory = async () => {
  const { data: orders } = await getAllOrder();
  console.log(orders);
  return (
    <div>
      <OrderHistoryCard orders={orders} />
    </div>
  );
};

export default OrderHistory;
