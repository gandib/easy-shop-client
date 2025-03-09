"use client";

import { useUser } from "@/src/context/user.provider";
import { useEffect, useState } from "react";
import {
  Pagination,
  Slider,
  RadioGroup,
  Radio,
  Input,
} from "@nextui-org/react";
import { FieldValues, useForm } from "react-hook-form";
import useDebounce from "@/src/hooks/debounce.hook";
import { SearchIcon } from "lucide-react";
import { ICategory, queryParams, TProductMeta } from "@/src/types";
import { getAllProducts } from "@/src/services/ProductService";
import { getAllCategory } from "@/src/services/CategoryService";
import AllProductsDisplayCard from "./AllProductsDisplayCard";

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
  const [limit, setLimit] = useState(8);
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { register, handleSubmit, watch } = useForm();
  const [productData, setProductData] = useState<TProductMeta>(products);
  const [totalPage, setTotalPage] = useState(products?.meta?.totalPage);
  const [categories, setCategories] = useState("");
  const [allCategories, setAllCategories] = useState<ICategory[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [sliderValue, setSliderValue] = useState<number | number[]>([]);
  const searchText = useDebounce(watch("search"));

  useEffect(() => {
    const handler = setTimeout(() => {
      setMinPrice(Array.isArray(sliderValue) ? sliderValue[0] : 0);
      setMaxPrice(Array.isArray(sliderValue) ? sliderValue[1] : 0);
    }, 500);
    return () => clearTimeout(handler);
  }, [sliderValue]);

  useEffect(() => {
    if (searchText || categories || minPrice || maxPrice) {
      setCurrentPage(1);
    }
  }, [searchText, categories, minPrice, maxPrice]);

  useEffect(() => {
    const query: queryParams[] = [];
    if (limit) query.push({ name: "limit", value: limit });
    if (sort) query.push({ name: "sort", value: sort });
    if (searchText) query.push({ name: "searchTerm", value: searchText });
    if (currentPage) query.push({ name: "page", value: currentPage });
    if (categories || category) {
      query.push({ name: "category", value: categories || category! });
    }
    if (shopId) query.push({ name: "shop", value: shopId! });
    if (minPrice || maxPrice) {
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
    if (query.length > 0) fetchData();
  }, [currentPage, searchText, sort, categories, minPrice, maxPrice]);

  const onSubmit = (data: FieldValues) => {};

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid xs:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 gap-4">
      <div className="col-span-1">
        <div className="sticky top-4 bg-default-100 rounded-lg p-4 shadow-md h-full">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Filter by Category</h2>
            <RadioGroup
              label="Categories"
              orientation="vertical"
              className="space-y-2"
              onChange={(e) => setCategories(e.target.value)}
            >
              {allCategories?.map((cat) => (
                <Radio key={cat.id} value={cat.name} className="text-sm">
                  {cat.name}
                </Radio>
              ))}
              <Radio value="" className="text-sm">
                All
              </Radio>
            </RadioGroup>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Filter by Price</h2>
            <Slider
              className="max-w-full"
              defaultValue={[100, 100000]}
              label="Price Range"
              maxValue={500000}
              minValue={0}
              step={50}
              onChange={(value) => setSliderValue(value)}
            />
            <div className="flex justify-between mt-2 text-sm">
              <span>Min: {minPrice}</span>
              <span>Max: {maxPrice}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 md:col-span-2 xs:col-span-2">
        <div className="my-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("search")}
              aria-label="Search"
              placeholder="Search Product..."
              size="lg"
              startContent={
                <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
              }
              type="text"
            />
          </form>
        </div>
        {productData?.data?.length > 0 ? (
          <AllProductsDisplayCard
            products={productData}
            category={category}
            fromShop={fromShop}
          />
        ) : (
          <p>No Product available!</p>
        )}
        {productData?.data?.length > 0 && (
          <div className="mt-5 flex justify-center items-center mb-5">
            <Pagination
              total={totalPage}
              page={currentPage}
              showControls
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProductsFilteringSearching;
