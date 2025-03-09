"use client";

import { IProduct, queryParams } from "@/src/types";
import { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import { getAllProducts } from "@/src/services/ProductService";
import ProductCard from "./Cards/ProductCard";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

const ShopProducts = ({
  products,
  shopId,
}: {
  products: { meta: IMeta; data: IProduct[] };
  shopId: string;
}) => {
  const [productData, setProductData] = useState(products);
  const [currentPage, setCurrentPage] = useState(productData?.meta?.page);
  const [limit, setLimit] = useState(12);
  const [totalPage, setTotalPage] = useState(productData?.meta?.totalPage);

  useEffect(() => {
    const query: queryParams[] = [];
    if (limit) {
      query.push({ name: "limit", value: limit });
    }
    if (currentPage) {
      query.push({ name: "page", value: currentPage });
    }
    query.push({ name: "shop", value: shopId });

    const fetchData = async () => {
      const { data: allProducts } = await getAllProducts(query);
      setProductData(allProducts);
      setTotalPage(allProducts?.meta?.totalPage);
    };

    fetchData();
  }, [currentPage, totalPage]);

  return (
    <div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-4 grow relative">
        {productData &&
          productData?.data.length > 0 &&
          productData?.data?.map((data: IProduct) => (
            <ProductCard data={data} key={data.id} fromShop="fromShop" />
          ))}
      </div>
      <div>
        {productData?.data?.length > 0 ? (
          <Pagination
            total={totalPage}
            page={currentPage}
            showControls
            onChange={(page) => setCurrentPage(page)}
            className="flex justify-center my-2"
          />
        ) : (
          "No products to show!"
        )}
      </div>
    </div>
  );
};

export default ShopProducts;
