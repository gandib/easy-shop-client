"use client";

import { IProduct } from "@/src/types";
import { IMeta } from "./VendorProductCard";
import { useUser } from "@/src/context/user.provider";
import AllProductsDisplayCard from "./AllProductsDisplayCard";

const PrioritizeProducts = ({
  products,
}: {
  products: { meta: IMeta; data: IProduct[] };
}) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    <p>Loading...</p>;
  }
  return (
    <>
      {user && (
        <div>
          <h1 className="text-2xl font-bold mb-8">Prioritize Products</h1>
          <AllProductsDisplayCard products={products} fromShop="prioritize" />
        </div>
      )}
    </>
  );
};

export default PrioritizeProducts;
