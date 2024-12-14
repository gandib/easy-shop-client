"use client";

import { getShopById } from "@/src/services/ShopService";
import { IProduct } from "@/src/types";
import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { Delete, DeleteIcon, MinusCircle, PlusCircle } from "lucide-react";

const CartPage = () => {
  const [cartData, setCartData] = useState<string | null>(null);
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [quantity, setQuantity] = useState<{ [productId: string]: number }>({});
  const [subTotal, setSubTotal] = useState<{ [productId: string]: number }>({});

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

        const initialQuantities = matchedProducts.reduce(
          (acc: { [productId: string]: number }, product: IProduct) => {
            acc[product.id] = 1;
            return acc;
          },
          {}
        );

        setQuantity(initialQuantities);

        const initialSubTotal = matchedProducts.reduce(
          (acc: { [productId: string]: number }, product: IProduct) => {
            acc[product.id] = product.price - product.discount;
            return acc;
          },
          {}
        );

        setSubTotal(initialSubTotal);

        setProducts(matchedProducts);
      } catch (error) {
        console.error("Error fetching shop data:", error);
      }
    };

    fetchShopData();
  }, [cartData]);
  console.log(products);

  const updateQuantity = (
    productId: string,
    change: number,
    basePrice: number
  ) => {
    setQuantity((prevQuantities) => {
      const currentQuantity = prevQuantities[productId] || 1;
      const newQuantity = currentQuantity + change;

      if (newQuantity < 1) return prevQuantities;

      setSubTotal((prevSubTotals) => ({
        ...prevSubTotals,
        [productId]: newQuantity * basePrice,
      }));

      return {
        ...prevQuantities,
        [productId]: newQuantity,
      };
    });
  };

  const total = useMemo(() => {
    return Object.values(subTotal).reduce((acc, curr) => acc + curr, 0);
  }, [subTotal]);

  const handleDelete = (productId: string) => {
    setProducts(
      (prevProducts) =>
        prevProducts?.filter((product) => product.id !== productId) || null
    );

    setQuantity((prevQuantities) => {
      const { [productId]: _, ...updatedQuantities } = prevQuantities;
      return updatedQuantities;
    });

    setSubTotal((prevSubTotals) => {
      const { [productId]: _, ...updatedSubTotals } = prevSubTotals;
      return updatedSubTotals;
    });

    const updatedCart = JSON.parse(cartData || "[]").filter(
      (cartItem: any) => cartItem.productId !== productId
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartData(JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    // order create korte hobe aage, tarpor checkout page e jabe
  };

  return (
    <div>
      {products && products.length > 0 ? (
        <div>
          <h2>Products in Cart:</h2>
          <div className="">
            <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Price</TableColumn>
                <TableColumn>Discount</TableColumn>
                <TableColumn>Quantity</TableColumn>
                <TableColumn>Sub Total</TableColumn>
                <TableColumn>Action</TableColumn>
              </TableHeader>
              <TableBody>
                {products?.map((product: IProduct) => (
                  <TableRow key={product?.id}>
                    <TableCell>{product?.name}</TableCell>
                    <TableCell>{product?.price}</TableCell>
                    <TableCell>{product?.discount}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MinusCircle
                          onClick={() =>
                            updateQuantity(
                              product.id,
                              -1,
                              product.price - product.discount
                            )
                          }
                          className="text-purple-500"
                        />
                        <p className="text-xl">{quantity[product.id] || 1}</p>
                        <PlusCircle
                          onClick={() =>
                            updateQuantity(
                              product.id,
                              1,
                              product.price - product.discount
                            )
                          }
                          className="text-purple-500"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{subTotal[product?.id]}</TableCell>
                    <TableCell>
                      <DeleteIcon
                        onClick={() => handleDelete(product?.id)}
                        className="text-red-500"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between p-4">
            <p>Total</p>
            <p> {total.toFixed(2)}</p>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => handleCheckout}>Proceed to Checkout</Button>
          </div>
        </div>
      ) : (
        cartData && <p>Cart is empty!</p>
      )}
    </div>
  );
};

export default CartPage;
