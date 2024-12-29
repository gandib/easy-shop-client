"use client";
import { IShop } from "@/src/types";
import { useRouter } from "next/navigation";

const ShopRedirect = ({ shop }: { shop: IShop }) => {
  const router = useRouter();
  return (
    <div>
      <h4 className="mt-1 rounded text-base font-medium flex ">
        Brand:
        <p
          onClick={() => router.push(`/shop/${shop?.id}`)}
          className="cursor-pointer text-primary-500 font-bold hover:text-green-500 ml-2"
        >
          {shop?.name}
        </p>
      </h4>
    </div>
  );
};

export default ShopRedirect;
