"use client";

import { IProduct } from "@/src/types";
import { useEffect, useState } from "react";
import ProductCard from "./Cards/ProductCard";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

const HomeProductsDisplayCard = ({
  products,
  category,
  fromShop,
}: {
  products: IProduct[];
  category?: string;
  fromShop?: string;
}) => {
  const [productData, setProductData] = useState(products);

  useEffect(() => {
    setProductData(products);
  }, [products]);

  return (
    <div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-4 grow relative">
        {productData &&
          productData?.length > 0 &&
          productData
            ?.slice(0, 10)
            ?.map((data: IProduct) => (
              <ProductCard data={data} key={data.id} fromShop={fromShop} />
            ))}
      </div>
    </div>
  );
};

export default HomeProductsDisplayCard;
