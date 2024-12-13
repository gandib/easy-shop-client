"use client";

import { getShopById } from "@/src/services/ShopService";
import { IProduct } from "@/src/types";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [cartData, setCartData] = useState<string | null>(null);
  const [products, setProducts] = useState<IProduct[] | null>(null);

  useEffect(() => {
    const storedCart = localStorage?.getItem("cart");
    setCartData(storedCart);
  }, []);

  useEffect(() => {
    const fetchShopData = async () => {
      if (!cartData) return;

      const parsedCart = JSON.parse(cartData);

      if (!parsedCart || parsedCart.length === 0) return;

      try {
        const { data: shop } = await getShopById(parsedCart[0]?.shopId);

        const matchedProducts = shop?.product.filter((product: IProduct) =>
          parsedCart.some((cartItem: any) => cartItem.productId === product.id)
        );

        setProducts(matchedProducts);
      } catch (error) {
        console.error("Error fetching shop data:", error);
      }
    };

    fetchShopData();
  }, [cartData]);

  return (
    <div>
      {products && products.length > 0 ? (
        <div>
          <h2>Products in Cart:</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        cartData && <p>Cart is empty!</p>
      )}
    </div>
  );
};

export default CartPage;
