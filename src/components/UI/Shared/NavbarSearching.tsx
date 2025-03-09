"use client";

import { IProduct, TProductMeta } from "@/src/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

const NavbarSearching = ({
  loading,
  productData,
  setProductData,
  setValue,
}: {
  loading: boolean;
  productData: TProductMeta;
  setProductData: Dispatch<SetStateAction<TProductMeta | undefined>>;
  setValue: UseFormSetValue<FieldValues>;
}) => {
  const router = useRouter();
  return (
    <div
      className="bg-default-100 absolute flex flex-col w-full max-w-md h-[200px] overflow-y-auto p-2 z-50" // Added z-index
      style={{
        top: "4rem", // Adjust based on your layout
        left: "50%",
        transform: "translateX(-50%)",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {loading && <p className="flex justify-center">Searching...</p>}
      {productData?.data?.length! > 0
        ? productData?.data.map((product: IProduct) => (
            <div
              onClick={() => {
                router.push(`/shop/detail-product/${product.id}`);
                setProductData(undefined);
                setValue("search", "");
              }}
              key={product.id}
              className="flex hover:bg-primary-100 cursor-pointer items-center justify-between py-2 border-b bg-default-100"
            >
              <Image
                src={product.img[0]}
                width={50}
                height={50}
                alt="product"
              />
              <p className="text-default-800 font-semibold">{product.name}</p>

              <span className="text-secondary-500 font-bold">{`$${product.price}`}</span>
            </div>
          ))
        : !loading && (
            <p className="text-center text-gray-500">No products found</p>
          )}
    </div>
  );
};

export default NavbarSearching;
