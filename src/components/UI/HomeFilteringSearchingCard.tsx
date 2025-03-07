"use client";

import { useUser } from "@/src/context/user.provider";
import { useEffect, useState, useCallback } from "react";
import { FieldValues, useForm } from "react-hook-form";
import useDebounce from "@/src/hooks/debounce.hook";
import { SearchIcon } from "lucide-react";
import { ICategory, IProduct } from "@/src/types";
import { getAllProducts } from "@/src/services/ProductService";
import { RadioGroup, Radio, Input, Button, Slider } from "@nextui-org/react";
import { getAllCategory } from "@/src/services/CategoryService";
import HomeProductsDisplayCard from "./HomeProductsDisplayCard";
import Loading from "./Loading";

export type queryParams = {
  name: string;
  value: boolean | React.Key;
};

type TProductMeta = {
  meta: { page: number; limit: number; total: number; totalPage: number };
  data: IProduct[];
};

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
