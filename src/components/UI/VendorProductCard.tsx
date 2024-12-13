"use client";

import { IProduct } from "@/src/types";
import {
  Card as NextUiCard,
  CardHeader,
  CardFooter,
  CardBody,
} from "@nextui-org/card";
import Image from "next/image";
import SeeDetailButton from "./SeeDetailButton";
import ProductUpdateButton from "./ProductUpdateButton";
import ProductDeleteButton from "./ProductDeleteButton";
import ShopRedirect from "./ShopRedirect";
import ProductPaginationCard from "./ProductPaginationCard";
import { useState } from "react";
import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/button";
import { addToCart } from "@/src/utils/addToCart";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

const VendorProductCard = ({
  products,
  category,
  fromShop,
}: {
  products: { meta: IMeta; data: IProduct[] };
  category?: string;
  fromShop?: string;
}) => {
  const [productData, setProductData] = useState(products);
  const { user, isLoading } = useUser();

  const handleAddToCart = (productId: string, shopId: string) => {
    addToCart(productId, shopId);
  };

  if (isLoading) {
    <p>Loading...</p>;
  }
  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-2 grow">
        {productData &&
          productData?.data?.length > 0 &&
          productData?.data?.map((data: IProduct) => (
            <NextUiCard
              key={data.id}
              isFooterBlurred
              className=" hover:shadow-2xl "
            >
              <CardHeader className=" ">
                {data?.img && (
                  <Image
                    width={500}
                    height={200}
                    src={data?.img}
                    alt="Product image"
                  />
                )}
              </CardHeader>

              <CardBody>
                <div className=" w-full">
                  <ShopRedirect shop={data?.shop} />
                  <h4 className="mt-1 rounded  p-1 text-lg sm:text-xl md:text-xl font-medium text-purple-500">
                    {data.name}
                  </h4>
                  <h4 className="mt-1 rounded  p-1 text-base md:text-base font-medium">
                    {data?.price}
                  </h4>
                  {data.rating && data.rating.length > 0 ? (
                    <h4 className="mt-2 rounded flex items-center  p-1 text-base md:text-base font-medium text-green-500">
                      {`Rating:
                    ${
                      data?.rating?.length &&
                      (
                        data.rating.reduce(
                          (pre, next) => pre + next.rating,
                          0
                        ) / data.rating.length
                      ).toFixed(1)
                    }/5`}
                    </h4>
                  ) : (
                    <h4 className="mt-1 rounded  p-1 text-base md:text-base font-medium text-green-500">
                      Rating: 0/5
                    </h4>
                  )}
                </div>
                <div className="my-1 rounded  p-1 lg:text-lg font-medium flex ">
                  <div>
                    <p>
                      {data.description.slice(0, 150) +
                        `${data.description.length > 150 ? "..." : ""}`}
                    </p>
                  </div>
                </div>
              </CardBody>

              <CardFooter className=" bottom-0 gap-2 justify-around border-t-1 border-zinc-100/50 bg-white/30">
                {user?.role === "VENDOR" && (
                  <>
                    <ProductUpdateButton id={data.id} />
                    <ProductDeleteButton id={data?.id} />
                  </>
                )}

                {user?.role === "USER" && (
                  <Button
                    onClick={() => handleAddToCart(data?.id, data?.shopId)}
                  >
                    Add to Cart
                  </Button>
                )}

                <SeeDetailButton id={data?.id} fromShop={fromShop} />
              </CardFooter>
            </NextUiCard>
          ))}
      </div>
      {productData?.data?.length > 0 ? (
        <ProductPaginationCard
          productData={productData}
          setProductData={setProductData}
          category={category}
        />
      ) : (
        "No products to show!"
      )}
    </div>
  );
};

export default VendorProductCard;
