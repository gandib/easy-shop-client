"use client";

import { IProduct } from "@/src/types";
import { Card as NextUiCard, CardHeader, CardBody } from "@nextui-org/react";
import Image from "next/image";
import SeeDetailButton from "./SeeDetailButton";
import ProductUpdateButton from "./ProductUpdateButton";
import ProductDeleteButton from "./ProductDeleteButton";
import ProductPaginationCard from "./ProductPaginationCard";
import { useState } from "react";
import { useUser } from "@/src/context/user.provider";
import Link from "next/link";
import StarRating from "./StarRating";

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
  const { isLoading } = useUser();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 grow relative">
        {productData &&
          productData?.data?.length > 0 &&
          productData?.data?.map((data: IProduct) => (
            <NextUiCard
              key={data.id}
              isFooterBlurred
              className="rounded-t-none shadow-xl p-4 border-1 border-t-0 rounded-md relative overflow-hidden"
              onMouseEnter={() => setHoveredId(data.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <CardHeader className="h-[230px] px-0 py-0 w-full flex justify-center relative">
                {data?.img && (
                  <Image
                    width={500}
                    height={500}
                    src={data?.img[0]}
                    alt="Product image"
                    className="h-full"
                  />
                )}

                <>
                  <div
                    className={`absolute bottom-18 left-2 transition-all duration-300 ease-in-out 
        ${hoveredId === data.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                  >
                    <ProductUpdateButton id={data.id} />
                  </div>
                  <div
                    className={`absolute bottom-14 left-2 transition-all duration-300 ease-in-out 
        ${hoveredId === data.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                  >
                    <ProductDeleteButton id={data?.id} />
                  </div>
                </>

                <div
                  className={`absolute bottom-2 left-2 transition-all duration-300 ease-in-out 
        ${hoveredId === data.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                >
                  <SeeDetailButton id={data?.id} fromShop={fromShop} />
                </div>
              </CardHeader>

              <CardBody>
                <div className=" w-full flex flex-col justify-center items-center">
                  {/* <ShopRedirect shop={data?.shop} /> */}

                  <Link
                    href={`shop/detail-product/${data.id}`}
                    className="rounded text-sm sm:text-base md:text-base font-bold"
                  >
                    {data.name}
                  </Link>
                  <h4 className="rounded text-xl  pt-2 text-secondary-500">
                    ${data?.price}
                  </h4>

                  <div className="pt-2 flex gap-3 items-center">
                    <div className="flex ">
                      <StarRating product={data} />
                    </div>
                    <p>({data?.rating?.length && data.rating.length})</p>
                  </div>
                </div>
              </CardBody>
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
