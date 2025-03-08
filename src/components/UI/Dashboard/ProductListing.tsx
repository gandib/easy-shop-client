"use client";

import { IProduct } from "@/src/types";
import { useEffect, useState } from "react";
import ProductCard from "../Home/Cards/ProductCard";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

const ProductListing = ({
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
      <h1 className="text-2xl font-bold my-2">Product Listing</h1>
      <div className="grid lg:grid-cols-4 gap-4 grow relative">
        {productData &&
          productData?.data?.length > 0 &&
          productData?.data?.map((data: IProduct) => (
            <ProductCard data={data} key={data.id} fromShop={fromShop} />
          ))}
      </div>
    </div>
  );
};

export default ProductListing;
