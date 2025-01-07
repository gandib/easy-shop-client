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
  // const { user, isLoading } = useUser();
  // const [limit, setLimit] = useState(8);
  // const [sort, setSort] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const { register, handleSubmit, watch } = useForm();
  const [productData, setProductData] = useState<TProductMeta>(products);
  // const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // const [categories, setCategories] = useState("");
  // const [allCategories, setAllCategories] = useState([]);
  // const [minPrice, setMinPrice] = useState(0);
  // const [maxPrice, setMaxPrice] = useState(0);
  // // const [loadProducts, setLoadProducts] = useState(products?.data);
  // const loadProducts: IProduct[] = [...products?.data];
  // const searchText = useDebounce(watch("search"));
  // const [sliderValue, setSliderValue] = useState<number | number[]>([]);
  // const [debouncedValue, setDebouncedValue] = useState<number | number[]>(
  //   sliderValue
  // );

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedValue(sliderValue);
  //   }, 500);
  //   return () => clearTimeout(handler);
  // }, [sliderValue]);

  // useEffect(() => {
  //   setMinPrice(Array.isArray(debouncedValue) ? debouncedValue[0] : 0);
  //   setMaxPrice(Array.isArray(debouncedValue) ? debouncedValue[1] : 0);
  // }, [debouncedValue]);

  // useEffect(() => {
  //   if (searchText || categories || minPrice || maxPrice) {
  //     setCurrentPage(1);
  //   }
  // }, [searchText, categories, minPrice, maxPrice]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const query: queryParams[] = [];
  //     if (limit) query.push({ name: "limit", value: limit });
  //     if (sort) query.push({ name: "sort", value: sort });
  //     if (searchText) query.push({ name: "searchTerm", value: searchText });
  //     if (currentPage) query.push({ name: "page", value: currentPage });
  //     if (categories) query.push({ name: "category", value: categories });
  //     if (shopId) query.push({ name: "shop", value: shopId });
  //     if (minPrice || maxPrice) {
  //       query.push({ name: "price", value: `${minPrice}-${maxPrice}` });
  //     }

  //     try {
  //       setLoading(true);
  //       const { data: allProducts } = await getAllProducts(query);

  //       setProductData((prev) => ({
  //         meta: allProducts.meta,
  //         data:
  //           currentPage === 1
  //             ? allProducts.data // Replace the list on a new filter
  //             : [
  //                 ...prev.data,
  //                 ...allProducts.data.filter(
  //                   (newProduct: { id: string }) =>
  //                     !prev.data.some(
  //                       (existingProduct) =>
  //                         existingProduct.id === newProduct.id
  //                     )
  //                 ),
  //               ],
  //       }));

  //       setTotalPage(allProducts.meta.totalPage);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const categoryFetch = async () => {
  //     try {
  //       const { data: allCategory } = await getAllCategory();
  //       setAllCategories(allCategory);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   };

  //   categoryFetch();

  //   fetchData();
  // }, [
  //   currentPage,
  //   searchText,
  //   sort,
  //   categories, // Trigger fetch when category changes
  //   minPrice,
  //   maxPrice,
  //   shopId,
  //   limit,
  // ]);

  // const onSubmit = (data: FieldValues) => {};

  // if (isLoading) {
  //   <p>Loading...</p>;
  // }

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
      {/* <div className="flex justify-center my-8">
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
      </div> */}
    </div>
  );
};

export default HomeFilteringSearchingCard;
