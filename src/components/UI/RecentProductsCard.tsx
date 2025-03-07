"use client";

import { IProduct } from "@/src/types";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const RecentProductsCard = ({
  products,
}: {
  products: { data: IProduct[] };
}) => {
  const [cartData, setCartData] = useState<string | null>(null);

  useEffect(() => {
    const storedCart = localStorage?.getItem("recentProducts");
    setCartData(storedCart);
  }, []);

  const parsedCart = JSON.parse(cartData!);

  const matchedProducts = products?.data?.filter((product: IProduct) =>
    parsedCart?.some((cartItem: any) => cartItem.productId === product.id)
  );

  return (
    <div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-4 grow relative">
        {matchedProducts && matchedProducts?.length > 0
          ? matchedProducts?.map((data: IProduct) => (
              <ProductCard data={data} key={data.id} />
            ))
          : "No products you viewed!"}
      </div>
    </div>
  );
};

export default RecentProductsCard;
