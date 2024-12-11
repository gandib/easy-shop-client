"use client";

import { useUser } from "@/src/context/user.provider";
import { IShop } from "@/src/types";
import { Button } from "@nextui-org/button";
import {
  Card as NextUiCard,
  CardHeader,
  CardFooter,
  CardBody,
} from "@nextui-org/card";
import Image from "next/image";

const ShopDetail = ({ shop }: { shop: IShop }) => {
  const { user, isLoading } = useUser();
  const handleRating = (productId: string) => {
    const ratingData = {
      // rating: rate,
      productId,
    };
    //   postRating(ratingData);
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  console.log(
    shop?.follow?.map((follower) => follower?.userId === user?.id)[0]
  );
  return (
    <div className="">
      {shop && (
        <NextUiCard isFooterBlurred className="  ">
          <CardHeader className="w-full flex-col items-start">
            {shop && (
              <Image
                width={100}
                height={300}
                src={shop?.logo}
                alt="Shop image"
              />
            )}

            <div className=" w-full">
              <h4 className="mt-2 rounded  p-1 text-lg sm:text-xl md:text-xl font-medium text-purple-500">
                {shop.name}
              </h4>
            </div>
            <div className="my-2 rounded  p-1 lg:text-lg font-medium flex justify-center ">
              <p>{shop?.description}</p>
            </div>
          </CardHeader>
          <CardBody></CardBody>

          <CardFooter className=" bottom-0 gap-2 justify-end border-t-1 border-zinc-100/50 bg-white/30">
            {shop?.follow?.length > 0 && user?.role === "USER" ? (
              <Button
                size="md"
                className="w-[20%] bg-green-500 text-white"
              >{`${shop?.follow?.map((follower) => follower?.userId === user?.id)[0] ? "Unfollow" : "Follow"}`}</Button>
            ) : (
              ""
            )}
          </CardFooter>
        </NextUiCard>
      )}
    </div>
  );
};

export default ShopDetail;
