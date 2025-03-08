"use client";

import { useUpdateCouponById } from "@/src/hooks/couponAndFlashSale.hook";
import { ICoupon } from "@/src/types";
import { Button } from "@nextui-org/react";
import {
  Card as NextUiCard,
  CardHeader,
  CardFooter,
  CardBody,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const CouponDisplayCard = ({ coupon }: { coupon: ICoupon }) => {
  const router = useRouter();
  const { mutate: updateCategory } = useUpdateCouponById();

  //   const handleDelete = () => {
  //     const couponData = {
  //       id: coupon?.id,
  //       data: {
  //         isDeleted: true,
  //       },
  //     };
  //     updateCategory(couponData);
  //   };

  return (
    <div>
      {coupon ? (
        <NextUiCard>
          <CardHeader></CardHeader>
          <CardBody>
            <h1>Code: {coupon?.code}</h1>
            <h1>Percentage: {coupon?.percentage}</h1>
            <h1>Expiry Date: {coupon?.expiryDate}</h1>
          </CardBody>
          <CardFooter className=" bottom-0 gap-2 justify-around border-t-1 border-zinc-100/50 bg-white/30">
            <Button
              onPress={() =>
                router.push(`/vendor-dashboard/update-coupon/${coupon?.id}`)
              }
            >
              Update
            </Button>
            {/* <Button onPress={() => handleDelete()}>Delete</Button> */}
          </CardFooter>
        </NextUiCard>
      ) : (
        "No coupon"
      )}
    </div>
  );
};

export default CouponDisplayCard;
