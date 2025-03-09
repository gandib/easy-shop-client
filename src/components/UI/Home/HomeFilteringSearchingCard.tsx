"use client";

import { useState } from "react";
import { TProductMeta } from "@/src/types";
import HomeProductsDisplayCard from "./HomeProductsDisplayCard";

const HomeFilteringSearchingCard = ({
  products,
  category,
  shopId,
  fromShop,
}: {
  products: TProductMeta;
  category?: string;
  shopId?: string;
  fromShop?: string;
}) => {
  const [productData, setProductData] = useState<TProductMeta>(products);
  const [loading, setLoading] = useState(false);

  return (
    <div className="pt-8">
      <h1 className="text-2xl font-bold mt-10 my-6">Featured Products</h1>
      <div className="">
        {productData?.data?.length > 0 ? (
          <HomeProductsDisplayCard
            products={productData?.data}
            category={category}
            fromShop={fromShop}
          />
        ) : loading && productData?.data?.length < 1 ? (
          <p>Loading...</p>
        ) : (
          <p>No Product available!</p>
        )}
      </div>
    </div>
  );
};

export default HomeFilteringSearchingCard;
