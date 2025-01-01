"use client";

import { Button, Input } from "@nextui-org/react";
import hero from "@/src/assets/shop.jpg";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import useDebounce from "@/src/hooks/debounce.hook";
import { Eye, SearchIcon } from "lucide-react";
import { queryParams } from "./OrderHistoryCard";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/src/services/ProductService";
import { IProduct } from "@/src/types";
import { useRouter } from "next/navigation";

type TProductMeta = {
  meta: { page: number; limit: number; total: number; totalPage: number };
  data: IProduct[];
};

const Hero = () => {
  const [productData, setProductData] = useState<TProductMeta>();
  const { register, handleSubmit, watch } = useForm();
  const searchText = useDebounce(watch("search"));
  const router = useRouter();

  useEffect(() => {
    const query: queryParams[] = [];
    query.push({ name: "limit", value: 10 });
    query.push({ name: "searchTerm", value: searchText });

    const fetchData = async () => {
      const { data: allProducts } = await getAllProducts(query);
      setProductData(allProducts);
    };

    if (searchText) {
      fetchData();
    } else {
      setProductData(undefined); // Clear the product data when search text is cleared
    }
  }, [searchText]);

  const onSubmit = (data: FieldValues) => {};

  return (
    <div
      className="h-[60vh] relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${hero.src})`,
        backgroundAttachment: "fixed", // Keeps the background fixed
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-neutral-content">
        <div className="max-w-md w-full px-4">
          <div className="flex justify-center items-center my-2">
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

          {/* Conditionally render the product display section */}
          {searchText && productData?.data && (
            <div
              className="bg-white absolute flex flex-col w-full max-w-md h-[300px] overflow-y-auto p-2"
              style={{
                top: "10rem",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              {productData.data.length > 0 ? (
                productData.data.map((product: IProduct) => (
                  <div
                    onClick={() =>
                      router.push(`shop/detail-product/${product.id}`)
                    }
                    key={product.id}
                    className="flex hover:bg-primary-100 cursor-pointer items-center justify-between py-2 border-b"
                  >
                    <p className="text-gray-800 hover:text-white  font-semibold">
                      {product.name}
                    </p>
                    <Eye className="hidden" />
                    <span className="text-gray-600 hover:text-white ">{`$${product.price}`}</span>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No products found</p>
              )}
            </div>
          )}
        </div>

        <h1 className="mb-5 text-5xl font-bold text-white">
          Shop for the Best Price
        </h1>
        <p className="mb-5 text-white">
          Find the best deals and shop at unbeatable prices.
        </p>
        <Link
          href={"/login"}
          className="btn btn-primary px-6 py-3 rounded hover:bg-primary-700 bg-primary-500 text-white"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Hero;
