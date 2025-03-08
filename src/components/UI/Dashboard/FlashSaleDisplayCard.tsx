"use client";

import { IFlashSale } from "@/src/types";
import { Button } from "@nextui-org/react";
import {
  Card as NextUiCard,
  CardHeader,
  CardFooter,
  CardBody,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const FlashSaleDisplayCard = ({ flashSale }: { flashSale: IFlashSale }) => {
  const router = useRouter();
  //   const { mutate: updateFlashSale } = useUpdateFlshSaleById;

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
      {flashSale ? (
        <NextUiCard>
          <CardHeader></CardHeader>
          <CardBody>
            <h1>Product Name: {flashSale?.product?.name}</h1>
            <h1>Flash Sale Percentage: {flashSale?.percentage}</h1>
            <h1>Expiry Date: {flashSale?.expiryDate}</h1>
          </CardBody>
          <CardFooter className=" bottom-0 gap-2 justify-around border-t-1 border-zinc-100/50 bg-white/30">
            <Button
              onPress={() =>
                router.push(
                  `/vendor-dashboard/update-flash-sale/${flashSale?.id}`
                )
              }
            >
              Update
            </Button>
            {/* <Button onClick={() => handleDelete()}>Delete</Button> */}
          </CardFooter>
        </NextUiCard>
      ) : (
        "No coupon"
      )}
    </div>
  );
};

export default FlashSaleDisplayCard;
