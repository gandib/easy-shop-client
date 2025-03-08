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

const AllProductsDisplayCard = ({
  products,
  category,
  fromShop,
}: {
  products: { meta: IMeta; data: IProduct[] };
  category?: string;
  fromShop?: string;
}) => {
  const [productData, setProductData] = useState(products);

  useEffect(() => {
    setProductData(products);
  }, [products]);

  return (
    <div>
      <div
        className={`grid ${fromShop === "allProducts" ? "lg:grid-cols-4 md:grid-cols-3" : "lg:grid-cols-5 md:grid-cols-3"}  gap-4 grow relative`}
      >
        {productData &&
          productData?.data?.length > 0 &&
          productData?.data?.map((data: IProduct) => (
            <ProductCard data={data} key={data.id} fromShop={fromShop} />
          ))}
      </div>
    </div>
  );
};

export default AllProductsDisplayCard;
