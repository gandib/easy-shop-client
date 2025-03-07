"use client";

import { CardBody, CardHeader, Card as NextUiCard } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import SeeDetailButton from "./SeeDetailButton";
import Link from "next/link";

const UserOverviewOrderCard = ({ order }: { order: any }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div>
      <NextUiCard
        key={order?.product?.id}
        isFooterBlurred
        className="rounded-t-none shadow-xl p-4 border-1 border-t-0 rounded-md"
        onMouseEnter={() => setHoveredId(order?.product?.id)}
        onMouseLeave={() => setHoveredId(null)}
      >
        <CardHeader className="h-[230px] px-0 py-0 w-full flex justify-center relative">
          {order?.product?.img && (
            <Image
              width={500}
              height={500}
              src={order?.product?.img[0]}
              alt="Product image"
              className="h-full"
            />
          )}

          {hoveredId === order?.product?.id && (
            <div className="absolute bottom-2 left-2 ">
              <SeeDetailButton id={order?.product?.id} fromShop={"fromShop"} />
            </div>
          )}
        </CardHeader>

        <CardBody>
          <div className=" w-full flex flex-col justify-center items-center">
            {/* <ShopRedirect shop={data?.shop} /> */}

            <Link
              href={`shop/detail-product/${order?.product?.id}`}
              className="rounded text-sm sm:text-base md:text-base font-bold"
            >
              {order?.product?.name}
            </Link>
            <h4 className="rounded text-xl  pt-2 text-secondary-500">
              ${order?.product?.price}
            </h4>
          </div>
        </CardBody>
      </NextUiCard>
    </div>
  );
};

export default UserOverviewOrderCard;
