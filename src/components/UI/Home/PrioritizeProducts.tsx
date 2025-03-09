"use client";

import { IProduct, queryParams } from "@/src/types";
import { IMeta } from "../Dashboard/VendorProductCard";
import { useUser } from "@/src/context/user.provider";
import AllProductsDisplayCard from "./AllProductsDisplayCard";
import { Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getAllProductsByFollowedUser } from "@/src/services/ProductService";

const PrioritizeProducts = ({
  products,
}: {
  products: { meta: IMeta; data: IProduct[] };
}) => {
  const { user, isLoading } = useUser();
  const [limit, setLimit] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(products?.meta?.totalPage);
  const [productData, setProductData] = useState<{
    meta: IMeta;
    data: IProduct[];
  }>({
    meta: { page: 1, limit: 1, total: 1, totalPage: 1 },
    data: [],
  });

  useEffect(() => {
    const query: queryParams[] = [];
    if (limit) {
      query.push({ name: "limit", value: limit });
    }

    if (currentPage) {
      query.push({ name: "page", value: currentPage });
    }

    const fetchData = async () => {
      const { data: allPrioritizeProducts } =
        await getAllProductsByFollowedUser(query);
      setProductData(allPrioritizeProducts);
      setTotalPage(allPrioritizeProducts?.meta?.totalPage);
    };

    if (query.length > 0) {
      fetchData();
    }
  }, [user, currentPage, totalPage]);

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <div className="">
      {user?.role === "USER" && products?.data?.length > 0 && (
        <div className="pt-8">
          <h1 className="text-2xl font-bold my-6">Prioritize Products</h1>
          {products?.data?.length > 0 ? (
            <AllProductsDisplayCard products={products} fromShop="prioritize" />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default PrioritizeProducts;
