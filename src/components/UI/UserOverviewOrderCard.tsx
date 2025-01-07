"use client";

import { CardBody, CardHeader, Card as NextUiCard } from "@nextui-org/react";
import { StarIcon } from "lucide-react";
import Image from "next/image";

const UserOverviewOrderCard = ({ order }: { order: any }) => {
  return (
    <div>
      <NextUiCard isFooterBlurred className=" hover:shadow-2xl ">
        <CardHeader className="h-[250px] px-0 py-0 w-full flex justify-center">
          {order?.product?.img && (
            <Image
              width={500}
              height={500}
              src={order?.product?.img[0]}
              alt="Product image"
              className="h-full"
            />
          )}
        </CardHeader>

        <CardBody>
          <div className=" w-full">
            {/* <ShopRedirect shop={data?.shop} /> */}

            <div className="pt-2 flex gap-3 items-center">
              <div className="flex ">
                <StarIcon
                  size={"16px"}
                  className={`${
                    Number(
                      order?.product?.rating?.length &&
                        (
                          order?.product?.rating.reduce(
                            (pre: any, next: { rating: any }) =>
                              pre + next.rating,
                            0
                          ) / order?.product?.rating.length
                        ).toFixed(1)
                    ) > 0
                      ? "text-yellow-400"
                      : "text-gray-400"
                  } `}
                />
                <StarIcon
                  size={"16px"}
                  className={`${
                    Number(
                      order?.product?.rating?.length &&
                        (
                          order?.product?.rating.reduce(
                            (pre: any, next: { rating: any }) =>
                              pre + next.rating,
                            0
                          ) / order?.product?.rating.length
                        ).toFixed(1)
                    ) > 1
                      ? "text-yellow-400"
                      : "text-gray-400"
                  } `}
                />
                <StarIcon
                  size={"16px"}
                  className={`${
                    Number(
                      order?.product?.rating?.length &&
                        (
                          order?.product?.rating.reduce(
                            (pre: any, next: { rating: any }) =>
                              pre + next.rating,
                            0
                          ) / order?.product?.rating.length
                        ).toFixed(1)
                    ) > 2
                      ? "text-yellow-400"
                      : "text-gray-400"
                  } `}
                />
                <StarIcon
                  size={"16px"}
                  className={`${
                    Number(
                      order?.product?.rating?.length &&
                        (
                          order?.product?.rating.reduce(
                            (pre: any, next: { rating: any }) =>
                              pre + next.rating,
                            0
                          ) / order?.product?.rating.length
                        ).toFixed(1)
                    ) > 3
                      ? "text-yellow-400"
                      : "text-gray-400"
                  } `}
                />
                <StarIcon
                  size={"16px"}
                  className={`${
                    Number(
                      order?.product?.rating?.length &&
                        (
                          order?.product?.rating.reduce(
                            (pre: any, next: { rating: any }) =>
                              pre + next.rating,
                            0
                          ) / order?.product?.rating.length
                        ).toFixed(1)
                    ) > 4
                      ? "text-yellow-400"
                      : "text-gray-400"
                  } `}
                />
              </div>
              <p>
                {order?.product?.rating?.length &&
                  (
                    order?.product?.rating.reduce(
                      (pre: any, next: { rating: any }) => pre + next.rating,
                      0
                    ) / order?.product?.rating.length
                  ).toFixed(2)}
              </p>
            </div>

            <h4 className="rounded text-sm sm:text-base md:text-base font-bold">
              {order?.product?.name}
            </h4>
            <h4 className="rounded text-xl font-bold pt-2 text-secondary-500">
              ${order?.product?.price}
            </h4>
          </div>
        </CardBody>
      </NextUiCard>
    </div>
  );
};

export default UserOverviewOrderCard;
