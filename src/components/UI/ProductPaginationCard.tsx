"use client";
import { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import { queryParams } from "./OrderHistoryCard";
import { IMeta } from "./VendorProductCard";
import { IProduct } from "@/src/types";
import { getAllProductsByShopId } from "@/src/services/ProductService";

const ProductPaginationCard = ({
  productData,
  setProductData,
}: {
  productData: { meta: IMeta; data: IProduct[] };
  setProductData: any;
}) => {
  const [currentPage, setCurrentPage] = useState(productData?.meta?.page);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(productData?.meta?.totalPage);

  useEffect(() => {
    const query: queryParams[] = [];
    if (limit) {
      query.push({ name: "limit", value: limit });
    }
    if (currentPage) {
      query.push({ name: "page", value: currentPage });
    }

    const fetchData = async () => {
      const { data: allProducts } = await getAllProductsByShopId(query);
      setProductData(allProducts);
      setTotalPage(productData?.meta?.totalPage);
    };

    if (query.length > 0) {
      fetchData();
    }
  }, [currentPage, totalPage]);
  return (
    <div>
      <Pagination
        total={totalPage}
        page={currentPage}
        showControls
        onChange={(page) => setCurrentPage(page)}
        className="flex justify-center my-2"
      />
    </div>
  );
};

export default ProductPaginationCard;
