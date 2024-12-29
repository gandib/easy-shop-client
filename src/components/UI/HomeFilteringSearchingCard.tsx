"use client";

import { useUser } from "@/src/context/user.provider";
import { useEffect, useState, useCallback } from "react";
import { FieldValues, useForm } from "react-hook-form";
import useDebounce from "@/src/hooks/debounce.hook";
import { SearchIcon } from "lucide-react";
import { ICategory, IProduct } from "@/src/types";
import { getAllProducts } from "@/src/services/ProductService";
import { RadioGroup, Radio, Input, Button } from "@nextui-org/react";
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
  const { user, isLoading } = useUser();
  const [limit, setLimit] = useState(9);
  const [sort, setSort] = useState("");
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
  // const [loadProducts, setLoadProducts] = useState(products?.data);
  const loadProducts: IProduct[] = [...products?.data];
  const searchText = useDebounce(watch("search"));

  useEffect(() => {
    if (searchText || categories) {
      setCurrentPage(1);
    }
  }, [searchText, categories, minPrice, maxPrice]);

  useEffect(() => {
    const fetchData = async () => {
      const query: queryParams[] = [];
      if (limit) query.push({ name: "limit", value: limit });
      if (sort) query.push({ name: "sort", value: sort });
      if (searchText) query.push({ name: "searchTerm", value: searchText });
      if (currentPage) query.push({ name: "page", value: currentPage });
      if (categories) query.push({ name: "category", value: categories });
      if (shopId) query.push({ name: "shop", value: shopId });
      if (minPrice && maxPrice) {
        query.push({ name: "price", value: `${minPrice}-${maxPrice}` });
      }

      try {
        setLoading(true);
        const { data: allProducts } = await getAllProducts(query);

        setProductData((prev) => ({
          meta: allProducts.meta,
          data:
            currentPage === 1
              ? allProducts.data // Replace the list on a new filter
              : [
                  ...prev.data,
                  ...allProducts.data.filter(
                    (newProduct: { id: string }) =>
                      !prev.data.some(
                        (existingProduct) =>
                          existingProduct.id === newProduct.id
                      )
                  ),
                ],
        }));

        setTotalPage(allProducts.meta.totalPage);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    const categoryFetch = async () => {
      try {
        const { data: allCategory } = await getAllCategory();
        setAllCategories(allCategory);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    categoryFetch();

    fetchData();
  }, [
    currentPage,
    searchText,
    sort,
    categories, // Trigger fetch when category changes
    minPrice,
    maxPrice,
    shopId,
    limit,
  ]);

  const onSubmit = (data: FieldValues) => {};

  if (isLoading) {
    <p>Loading...</p>;
  }

  // console.log(loadProducts);

  return (
    <div className="pt-16">
      <h1 className="text-2xl font-bold mt-10 mb-2">Product Listing</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3">
        <div className="col-span-1">
          <RadioGroup
            label="Select category"
            onChange={(e) => {
              setCategories(e.target.value); // Update selected category
              setCurrentPage(1); // Reset pagination
              setProductData({
                meta: { page: 1, limit: 9, total: 0, totalPage: 1 },
                data: [], // Clear current product list
              });
            }}
          >
            {allCategories?.map((cat: ICategory) => (
              <Radio key={cat.id} value={cat.name}>
                {cat.name}
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
      <div className="flex justify-center my-8">
        {!loading &&
        productData?.data?.length > 0 &&
        currentPage !== totalPage ? (
          <Button
            onPress={() => {
              if (currentPage < totalPage) {
                setCurrentPage((prev) => prev + 1);
              }
            }}
            className="bg-primary-500 px-6 text-white"
          >
            Load More
          </Button>
        ) : loading && productData?.data?.length > 0 ? (
          <p>Loading...</p>
        ) : (
          !loading &&
          productData?.meta?.totalPage === totalPage &&
          "No more products to show!"
        )}
      </div>
    </div>
  );
};

export default HomeFilteringSearchingCard;
