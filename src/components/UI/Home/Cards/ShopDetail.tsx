"use client";

import { useUser } from "@/src/context/user.provider";
import { useCreateFollow, useUnFollow } from "@/src/hooks/follow.hook";
import { getAllProducts } from "@/src/services/ProductService";
import { IShop } from "@/src/types";
import { Button } from "@nextui-org/react";
import {
  Card as NextUiCard,
  CardHeader,
  CardFooter,
  CardBody,
} from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ShopProducts from "../ShopProducts";

const ShopDetail = ({ shop }: { shop: IShop }) => {
  const { user, isLoading } = useUser();
  const { mutate: createFollow } = useCreateFollow();
  const { mutate: unFollow } = useUnFollow();
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const { data: allProducts } = await getAllProducts([
        { name: "shop", value: shop?.id },
        { name: "limit", value: 10 },
      ]);
      setProducts(allProducts);
    };
    fetchData();
  }, [shop]);

  const matchedFollower = shop?.follow?.find(
    (follower) => follower?.userId === user?.id
  )?.userId;

  const handleFollow = (shopId: string) => {
    const followData = {
      shopId,
    };

    if (matchedFollower !== user?.id) {
      createFollow(followData);
    }

    if (matchedFollower === user?.id) {
      unFollow(followData);
    }
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

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
            <div className="grid grid-cols-2 w-full">
              <div className=" w-full flex justify-start items-center">
                <h4 className="mt-2 rounded  p-1 text-lg sm:text-xl md:text-xl font-medium text-purple-500">
                  {shop.name}
                </h4>
              </div>
              <div className="flex justify-end items-center text-lg sm:text-xl md:text-xl font-medium text-purple-500">
                <p>Followers: {shop?.follow?.length}</p>
              </div>
            </div>
            <div className="my-2 rounded  p-1 lg:text-lg font-medium flex justify-center ">
              <p>{shop?.description}</p>
            </div>
            <div className="flex justify-end items-center text-lg sm:text-xl md:text-xl font-medium ">
              <p>
                Coupon Code:
                {shop?.coupon[0]?.code ? (
                  <span className="text-purple-500">
                    {` `}
                    {shop?.coupon[0]?.code}
                    <span className="text-black">
                      {" "}
                      use this code to get {shop?.coupon[0]?.percentage}%
                      discount
                    </span>
                  </span>
                ) : (
                  "Not Available"
                )}
              </p>
            </div>
          </CardHeader>
          <CardBody></CardBody>

          <CardFooter className=" bottom-0 gap-2 justify-end border-t-1 border-zinc-100/50 bg-white/30">
            {user?.role === "USER" ? (
              <Button
                onPress={() => handleFollow(shop?.id)}
                size="md"
                className=" bg-primary-500 text-white"
              >{`${matchedFollower === user?.id ? "Unfollow" : "Follow"}`}</Button>
            ) : (
              ""
            )}
          </CardFooter>
        </NextUiCard>
      )}

      <div className="my-4">
        <ShopProducts products={products!} shopId={shop?.id!} />
      </div>
    </div>
  );
};

export default ShopDetail;
