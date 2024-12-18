"use client";

import { useUser } from "@/src/context/user.provider";
import { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import { FieldValues, useForm } from "react-hook-form";
import useDebounce from "@/src/hooks/debounce.hook";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import { ICategory, IProduct } from "@/src/types";
import { getAllProducts } from "@/src/services/ProductService";
import { RadioGroup, Radio } from "@nextui-org/react";
import AllProductsDisplayCard from "./AllProductsDisplayCard";
import { getAllCategory } from "@/src/services/CategoryService";

export type queryParams = {
  name: string;
  value: boolean | React.Key;
};

type TProductMeta = {
  meta: { page: number; limit: number; total: number; totalPage: number };
  data: IProduct[];
};

const AllProductsFilteringSearching = ({
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
  const { user, isLoading } = useUser();
  const [limit, setLimit] = useState(9);
  const [sort, setSort] = useState("-upvote");
  const [currentPage, setCurrentPage] = useState(1);
  const { register, handleSubmit, watch } = useForm();
  const [productData, setProductData] = useState<TProductMeta>({
    meta: { page: 1, limit: 1, total: 1, totalPage: 1 },
    data: [],
  });
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const searchText = useDebounce(watch("search"));

  useEffect(() => {
    if (searchText || categories) {
      setCurrentPage(1);
    }
  }, [searchText, categories, minPrice, maxPrice]);

  useEffect(() => {
    const query: queryParams[] = [];
    if (limit) {
      query.push({ name: "limit", value: limit });
    }
    if (sort) {
      query.push({ name: "sort", value: sort });
    }
    if (searchText) {
      query.push({ name: "searchTerm", value: searchText });
    }
    if (currentPage) {
      query.push({ name: "page", value: currentPage });
    }
    if (category || categories) {
      if (categories) {
        query.push({ name: "category", value: categories });
      } else {
        query.push({ name: "category", value: category! });
      }
    }
    if (shopId) {
      query.push({ name: "shop", value: shopId! });
    }

    if (minPrice && maxPrice) {
      query.push({ name: "price", value: `${minPrice}-${maxPrice}` });
    }

    const fetchData = async () => {
      const { data: allProducts } = await getAllProducts(query);
      setProductData(allProducts);
      setTotalPage(allProducts?.meta?.totalPage);
    };

    const categoryFetch = async () => {
      const { data: allCategory } = await getAllCategory();
      setAllCategories(allCategory);
    };
    categoryFetch();

    if (query.length > 0) {
      fetchData();
    }
  }, [
    user,
    currentPage,
    searchText,
    sort,
    totalPage,
    loading,
    category,
    shopId,
    categories,
    minPrice,
    maxPrice,
  ]);

  const onSubmit = (data: FieldValues) => {};

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3">
      <div className="col-span-1">
        <RadioGroup
          label="Select category"
          onChange={(e) => setCategories(e.target.value)}
        >
          {allCategories &&
            allCategories?.length > 0 &&
            allCategories?.map((cat: ICategory) => (
              <Radio key={cat?.id} value={cat?.name}>
                {cat?.name}
              </Radio>
            ))}
          <Radio value="">All</Radio>
        </RadioGroup>

        <div className="my-2">
          <p>Enter Price Range</p>
          <input
            className="border-1 rounded p-1 my-1"
            type="text"
            placeholder="Min Price"
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          <input
            className="border-1 rounded p-1 my-1"
            type="text"
            placeholder="Max Price"
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="lg:col-span-3 md:col-span-2">
        <div className="my-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-1">
              <Input
                {...register("search")}
                aria-label="Search"
                classNames={{
                  inputWrapper: "bg-default-100",
                  input: "text-sm",
                }}
                placeholder="Search Product..."
                size="lg"
                startContent={
                  <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
                }
                type="text"
              />
            </div>
          </form>
        </div>

        {products?.data?.length > 0 || productData?.data?.length > 0 ? (
          <AllProductsDisplayCard
            products={productData || products}
            // setLoading={setLoading}
            category={category}
            fromShop={fromShop}
          />
        ) : (
          <p>No Product available!</p>
        )}

        {productData?.data?.length > 0 || products?.data?.length > 0 ? (
          <div className="mt-5 flex justify-center items-center">
            {productData?.data?.length > 0 && (
              <Pagination
                total={totalPage}
                page={currentPage}
                showControls
                onChange={(page) => setCurrentPage(page)}
              />
            )}
          </div>
        ) : (
          ""
        )}
        {products?.data?.length < 1 ||
          (productData?.data?.length < 1 && <p>No Product available!</p>)}
      </div>
    </div>
  );
};

export default AllProductsFilteringSearching;
