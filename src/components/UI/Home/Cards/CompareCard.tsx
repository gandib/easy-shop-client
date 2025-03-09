"use client";
import { IProduct } from "@/src/types";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getProductById } from "@/src/services/ProductService";
import CompareTableCard from "./CompareTableCard";

const CompareCard = () => {
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [firstProductId, setFirstProductId] = useState({ id: "", catId: "" });
  const [secondProductId, setSecondProductId] = useState({ id: "", catId: "" });
  const [thirdProductId, setThirdProductId] = useState({ id: "", catId: "" });
  const [cartData, setCartData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCart = localStorage?.getItem("compare");
    setCartData(storedCart);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!cartData) {
        setLoading(false);
        return;
      }

      const parsedCart = JSON.parse(cartData);
      if (!parsedCart || parsedCart.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const productPromises = parsedCart.map((item: { productId: string }) =>
          getProductById(item.productId)
        );

        const productResponses = await Promise.all(productPromises);
        const products = productResponses.map((res) => res.data);

        setProductData(products);

        if (products.length > 0) {
          setFirstProductId({
            id: products[0]?.id || "",
            catId: products[0]?.categoryId || "",
          });
          setSecondProductId({
            id: products[1]?.id || "",
            catId: products[1]?.categoryId || "",
          });
          setThirdProductId({
            id: products[2]?.id || "",
            catId: products[2]?.categoryId || "",
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [cartData]);

  const removeCompare = (productId: string) => {
    const updatedCart = JSON.parse(cartData || "[]").filter(
      (cartItem: any) => cartItem.productId !== productId
    );

    localStorage.setItem("compare", JSON.stringify(updatedCart));
    setCartData(JSON.stringify(updatedCart));
  };

  const firstProduct = productData.find(
    (product) => product?.id === firstProductId?.id
  );
  const secondProduct = productData.find(
    (product) => product?.id === secondProductId?.id
  );
  const thirdProduct = productData.find(
    (product) => product?.id === thirdProductId?.id
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Compare Products</h1>
      <div className="grid sm:grid-cols-3 mb-2">
        {[firstProductId, secondProductId, thirdProductId].map(
          (selected, index) => (
            <Select
              key={index}
              className="max-w-xs"
              label="Select Product"
              selectedKeys={selected.id ? [selected.id] : []}
            >
              {productData.map((product) => (
                <SelectItem
                  onPress={() => {
                    if (index === 0)
                      setFirstProductId({
                        id: product.id,
                        catId: product.categoryId,
                      });
                    if (index === 1)
                      setSecondProductId({
                        id: product.id,
                        catId: product.categoryId,
                      });
                    if (index === 2)
                      setThirdProductId({
                        id: product.id,
                        catId: product.categoryId,
                      });
                  }}
                  key={product.id}
                >
                  {product.name}
                </SelectItem>
              ))}
            </Select>
          )
        )}
      </div>

      <CompareTableCard
        firstProduct={firstProduct || undefined}
        secondProduct={secondProduct || undefined}
        thirdProduct={thirdProduct || undefined}
        loading={loading}
      />
    </div>
  );
};

export default CompareCard;
