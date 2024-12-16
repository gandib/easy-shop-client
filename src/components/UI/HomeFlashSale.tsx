"use client";

import { IProduct } from "@/src/types";
import FlashSaleCard from "./FlashSaleCard";
import { IMeta } from "./VendorProductCard";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

const HomeFlashSale = ({
  flashSale,
}: {
  flashSale: { meta: IMeta; data: IProduct[] };
}) => {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-2xl font-bold my-5">Flash Sale</h1>
      <FlashSaleCard products={flashSale} fromShop="homeFlash" />
      <div className="flex justify-center items-center mb-8">
        <Button className="" onClick={() => router.push("/flash-sale")}>
          See All Flash Sale
        </Button>
      </div>
    </div>
  );
};

export default HomeFlashSale;
