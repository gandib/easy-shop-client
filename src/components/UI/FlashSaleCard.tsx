"use client";

import { IProduct } from "@/src/types";
import { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import ProductCard from "./ProductCard";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

const FlashSaleCard = ({
  products,
  fromShop,
}: {
  products: { meta: IMeta; data: IProduct[] };
  fromShop?: string;
}) => {
  const [productData, setProductData] = useState<{
    meta: IMeta;
    data: IProduct[];
  }>(products);
  const [currentPage, setCurrentPage] = useState(productData?.meta?.page);
  const [totalPage, setTotalPage] = useState(productData?.meta?.totalPage);

  useEffect(() => {
    setProductData(products);
  }, [products]);

  return (
    <div className="mb-10">
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-4 grow relative">
        {products &&
          products?.data?.length > 0 &&
          products?.data?.map((data: IProduct) => (
            <ProductCard
              data={data}
              key={data.id}
              fromShop={fromShop}
              flashSale="flashSale"
            />
          ))}
      </div>
      {products?.data?.length > 0 && fromShop !== "homeFlash" ? (
        <Pagination
          total={totalPage}
          page={currentPage}
          showControls
          onChange={(page) => setCurrentPage(page)}
          className="flex justify-center my-2"
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default FlashSaleCard;
