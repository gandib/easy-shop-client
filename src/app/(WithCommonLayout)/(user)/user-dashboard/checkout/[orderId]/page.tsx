import Container from "@/src/components/UI/Shared/Container";
import PayNowCard from "@/src/components/UI/PayNowCard";
import { getOrderById } from "@/src/services/OrderService";
import { Button } from "@nextui-org/react";

type Params = Promise<{ orderId: string }>;

const CheckoutPage = async (params: { params: Params }) => {
  const orderId = (await params.params).orderId;
  const { data: order } = await getOrderById(orderId);

  return (
    <Container>
      {order && order?.paymentStatus !== "PAID" ? (
        <div>
          <h1 className="flex justify-center items-center text-2xl font-bold">
            Payment Information
          </h1>
          <div className="flex justify-between my-6 font-bold text-xl">
            <h1>Total Amount</h1>
            <h1>{order?.totalPrice}</h1>
          </div>
          <div className="flex justify-end">
            <PayNowCard order={order} />
          </div>
        </div>
      ) : (
        <p className="text-xl">No payment pending</p>
      )}
    </Container>
  );
};

export default CheckoutPage;
