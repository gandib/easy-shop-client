"use client";

import { useUser } from "@/src/context/user.provider";
import { useOrderPayment } from "@/src/hooks/payment.hook";
import { IOrder } from "@/src/types";
import { Button } from "@nextui-org/react";

const PayNowCard = ({ order }: { order: IOrder }) => {
  const { user, isLoading } = useUser();
  const { mutate: handleOrderPayment, data } = useOrderPayment();

  if (data?.success) {
    window.location.href = data?.data?.payment_url;
  }

  const handlePayment = () => {
    const paymentData = {
      userId: user?.id,
      orderId: order?.id,
      amount: order?.totalPrice,
    };
    handleOrderPayment(paymentData);
  };

  if (isLoading) {
    <p>Loading...</p>;
  }
  return (
    <div>
      <Button onPress={() => handlePayment()}>Pay Now</Button>
    </div>
  );
};

export default PayNowCard;
