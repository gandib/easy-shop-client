"use client";
import { IShop } from "@/src/types";
import { useRouter } from "next/navigation";

const ShopRedirect = ({ shop }: { shop: IShop }) => {
  const router = useRouter();
  return (
    <div>
      <h4 className="mt-1 rounded p-1 text-base md:text-xl font-medium flex ">
        Brand:
        <p
          onClick={() => router.push(`/shop/${shop?.id}`)}
          className="cursor-pointer hover:text-green-500 ml-2"
        >
          {shop?.name}
        </p>
      </h4>
    </div>
  );
};

export default ShopRedirect;
