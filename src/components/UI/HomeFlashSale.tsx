"use client";

import { IProduct } from "@/src/types";
import FlashSaleCard from "./FlashSaleCard";
import { IMeta } from "./VendorProductCard";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/src/services/ProductService";

const HomeFlashSale = () => {
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    };
    fetchFlashSale();
  }, []);

  if (flashSale) {
    flashSale.data = flashSale?.data?.slice(0, 5);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold pt-8 my-6">Flash Sale</h1>
      {loading && <p>Loading...</p>}
      <FlashSaleCard products={flashSale!} fromShop="homeFlash" />
      <div className="flex justify-center items-center">
        {flashSale?.data?.length > 0 && (
          <Button
            className="bg-primary-500 text-white"
            onPress={() => router.push("/flash-sale")}
          >
            See All Flash Sale
          </Button>
        )}
      </div>
      {!flashSale?.data?.length && !loading && "No products to show!"}
    </div>
  );
};

export default HomeFlashSale;
