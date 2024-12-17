"use client";

import { useUser } from "@/src/context/user.provider";
import { useEffect, useState, useCallback } from "react";
import { FieldValues, useForm } from "react-hook-form";
import useDebounce from "@/src/hooks/debounce.hook";
import { SearchIcon } from "lucide-react";
import { ICategory, IProduct } from "@/src/types";
import { getAllProducts } from "@/src/services/ProductService";
import { RadioGroup, Radio, Input } from "@nextui-org/react";
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
  const [sort, setSort] = useState("-createdAt");
  const [currentPage, setCurrentPage] = useState(1);
  const { register, handleSubmit, watch } = useForm();
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [resetting, setResetting] = useState(false);

  const searchText = useDebounce(watch("search"));

  const handleCategoryChange = (newCategory: string) => {
    setResetting(true);
    setCategories(newCategory);
    setCurrentPage(1);
    setProductData([]);
    setTotalPage(1);
    setTimeout(() => setResetting(false), 300);
  };

  const fetchProducts = useCallback(async () => {
    if (loading || resetting || currentPage > totalPage) return;

    setLoading(true);
    const query: queryParams[] = [];
    query.push({ name: "limit", value: limit });
    query.push({ name: "sort", value: sort });
    if (searchText) query.push({ name: "searchTerm", value: searchText });
    if (currentPage) query.push({ name: "page", value: currentPage });
    if (categories) query.push({ name: "category", value: categories });
    if (shopId) query.push({ name: "shop", value: shopId! });
    if (minPrice && maxPrice)
      query.push({ name: "price", value: `${minPrice}-${maxPrice}` });

    try {
      const { data: allProducts } = await getAllProducts(query);

      setProductData((prev) =>
        currentPage === 1 ? allProducts.data : [...prev, ...allProducts.data]
      );
      setTotalPage(allProducts.meta.totalPage);
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    searchText,
    limit,
    sort,
    categories,
    shopId,
    minPrice,
    maxPrice,
    totalPage,
    loading,
    resetting,
  ]);

  const handleScroll = useCallback(() => {
    if (resetting) return;
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 300
    ) {
      if (!loading && currentPage < totalPage) {
        setCurrentPage((prev) => prev + 1);
      }
    }
  }, [loading, resetting, currentPage, totalPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data: allCategory } = await getAllCategory();
      setAllCategories(allCategory);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories) {
      window.scrollTo(0, 0);
    }
  }, [categories]);

  const onSubmit = (data: FieldValues) => {};

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <div className="mb-10">
      <h1 className="text-2xl font-bold mt-10 mb-2">Product Listing</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3">
        <div className="col-span-1">
          <RadioGroup
            label="Select category"
            onChange={(e) => handleCategoryChange(e.target.value)}
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

          {productData?.length > 0 ? (
            <HomeProductsDisplayCard
              products={productData}
              category={category}
              fromShop={fromShop}
            />
          ) : (
            <p>No Product available!</p>
          )}

          {loading && <Loading />}
        </div>
      </div>
    </div>
  );
};

export default HomeFilteringSearchingCard;
