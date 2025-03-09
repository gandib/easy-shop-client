"use client";

import { useEffect, useState } from "react";
import { IProduct } from "@/src/types";
import ProductCard from "./Cards/ProductCard";
import Loading from "../Shared/Loading";

const HomeSmartPhoneDisplay = ({
  products,
  category,
  shopId,
  fromShop,
}: {
  products: IProduct[];
  category?: string;
  shopId?: string;
  fromShop?: string;
}) => {
  const [productData, setProductData] = useState(products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProductData(products);
    setLoading(false);
  }, [products]);

  return (
    <div className="pt-8">
      <h1 className="text-2xl font-bold mt-10 my-6">Latest Smarts Phone</h1>
      {loading && <Loading />}
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products?.length > 0 ? (
          productData
            ?.slice(0, 5)
            ?.map((data: IProduct) => (
              <ProductCard data={data} key={data.id} fromShop={fromShop} />
            ))
        ) : loading && productData?.length < 1 ? (
          <p>Loading...</p>
        ) : (
          <p>No Product available!</p>
        )}
      </div>
    </div>
  );
};

export default HomeSmartPhoneDisplay;
