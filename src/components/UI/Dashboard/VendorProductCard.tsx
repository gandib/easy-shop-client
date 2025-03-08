"use client";

import { IProduct } from "@/src/types";
import ProductPaginationCard from "../Shared/ProductPaginationCard";
import { useState } from "react";
import ProductCard from "../Home/Cards/ProductCard";

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

  return (
    <div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 grow relative">
        {productData &&
          productData?.data?.length > 0 &&
          productData?.data?.map((data: IProduct) => (
            <ProductCard data={data} key={data.id} fromShop={fromShop} />
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
