"use client";

import { IFlashSale } from "@/src/types";
import { Card as NextUiCard, CardHeader, CardBody } from "@nextui-org/react";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FlashSaleDisplayCard = ({ flashSale }: { flashSale: IFlashSale }) => {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
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
        <NextUiCard
          isFooterBlurred
          className="rounded-t-none shadow-xl p-4 border-1 border-t-0 rounded-md relative overflow-hidden"
          onMouseEnter={() => setHoveredId(flashSale.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <CardHeader className=" px-0 py-0 w-full flex justify-center relative"></CardHeader>

          <CardBody>
            <h1>Product Name: {flashSale?.product?.name}</h1>
            <h1>Flash Sale Percentage: {flashSale?.percentage}</h1>
            <h1>Expiry Date: {flashSale?.expiryDate}</h1>

            <div
              className={`absolute bottom-2 left-2 transition-all duration-300 ease-in-out 
        ${hoveredId === flashSale.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
            >
              <button
                className="bg-gray-100 text-black hover:bg-secondary-500 hover:text-white p-2 rounded-md"
                onClick={() =>
                  router.push(
                    `/vendor-dashboard/update-flash-sale/${flashSale?.id}`
                  )
                }
              >
                <Edit size={20} />
              </button>
            </div>
          </CardBody>
        </NextUiCard>
      ) : (
        "No coupon"
      )}
    </div>
  );
};

export default FlashSaleDisplayCard;
