import Container from "@/src/components/UI/Container";
import OrderHistoryCard from "@/src/components/UI/OrderHistoryCard";
import { getAllOrder } from "@/src/services/OrderService";

const OrderHistory = async () => {
  const { data: orders } = await getAllOrder([{ name: "limit", value: 10 }]);

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      <OrderHistoryCard orders={orders} />
    </Container>
  );
};

export default OrderHistory;
