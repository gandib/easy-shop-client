"use client";

import { IProduct } from "@/src/types";
import FlashSaleCard from "./FlashSaleCard";
import { IMeta } from "./VendorProductCard";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/src/services/ProductService";

const HomeFlashSale = () => {
  const [flashSale, setFlashSale] = useState<{
    meta: IMeta;
    data: IProduct[];
  }>({
    meta: {
      page: 0,
      limit: 0,
      total: 0,
      totalPage: 0,
    },
    data: [],
  });
  const router = useRouter();

  useEffect(() => {
    const fetchFlashSale = async () => {
      const { data: allProducts } = await getAllProducts([
        { name: "flash", value: "flash" },
      ]);
      setFlashSale(allProducts);
    };
    fetchFlashSale();
  }, [flashSale]);

  flashSale.data = flashSale?.data?.slice(0, 3);

  return (
    <div>
      <h1 className="text-2xl font-bold my-5">Flash Sale</h1>
      <FlashSaleCard products={flashSale!} fromShop="homeFlash" />
      <div className="flex justify-center items-center mb-8">
        <Button className="" onClick={() => router.push("/flash-sale")}>
          See All Flash Sale
        </Button>
      </div>
    </div>
  );
};

export default HomeFlashSale;
