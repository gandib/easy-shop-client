"use client";

import { IProduct } from "@/src/types";
import {
  Card as NextUiCard,
  CardHeader,
  CardFooter,
  CardBody,
} from "@nextui-org/card";
import Image from "next/image";
import SeeDetailButton from "./SeeDetailButton";
import ProductUpdateButton from "./ProductUpdateButton";
import ProductDeleteButton from "./ProductDeleteButton";
import ShopRedirect from "./ShopRedirect";
import ProductPaginationCard from "./ProductPaginationCard";
import { useEffect, useState } from "react";
import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/button";
import { addToCart } from "@/src/utils/addToCart";
import { toast } from "sonner";
import ShowPopup from "./ShowPopup";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

const AllProductsDisplayCard = ({
  products,
  category,
  fromShop,
}: {
  products: { meta: IMeta; data: IProduct[] };
  category?: string;
  fromShop?: string;
}) => {
  const [productData, setProductData] = useState(products);
  const { user, isLoading } = useUser();
  const [warning, setWarning] = useState<{
    message: string;
    productId: string;
    shopId: string;
  } | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = (productId: string, shopId: string) => {
    addToCart(productId, shopId, (message, id, shop) => {
      setWarning({ message, productId: id, shopId: shop });
    });
    setShowPopup(true);
  };

  const handleClosePopup = () => setShowPopup(false);

  const handleReplaceCart = () => {
    if (warning) {
      localStorage.setItem(
        "cart",
        JSON.stringify([
          { productId: warning.productId, shopId: warning.shopId },
        ])
      );
      toast("Cart replaced successfully with the new product!");
      setWarning(null);
      setShowPopup(false);
    }
  };

  const handleDismissWarning = () => {
    toast("Cart remains unchanged.");
    setWarning(null);
    setShowPopup(false);
  };

  // const handleAddToCart = (productId: string, shopId: string) => {
  //   addToCart(productId, shopId);
  // };

  useEffect(() => {
    setProductData(products);
  }, [products]);

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <div>
      <div className="grid lg:grid-cols-3 gap-2 grow relative">
        {productData &&
          productData?.data?.length > 0 &&
          productData?.data?.map((data: IProduct) => (
            <NextUiCard
              key={data.id}
              isFooterBlurred
              className=" hover:shadow-2xl"
            >
              <CardHeader className=" ">
                {data?.img && (
                  <Image
                    width={500}
                    height={200}
                    src={data?.img}
                    alt="Product image"
                  />
                )}
              </CardHeader>

              <CardBody>
                <div className=" w-full">
                  <ShopRedirect shop={data?.shop} />
                  <h4 className="mt-1 rounded  p-1 text-lg sm:text-xl md:text-xl font-medium text-purple-500">
                    {data.name}
                  </h4>
                  <h4 className="mt-1 rounded  p-1 text-base md:text-base font-medium">
                    {data?.price}
                  </h4>
                  {data.rating && data.rating.length > 0 ? (
                    <h4 className="mt-2 rounded flex items-center  p-1 text-base md:text-base font-medium text-green-500">
                      {`Rating:
                    ${
                      data?.rating?.length &&
                      (
                        data.rating.reduce(
                          (pre, next) => pre + next.rating,
                          0
                        ) / data.rating.length
                      ).toFixed(1)
                    }/5`}
                    </h4>
                  ) : (
                    <h4 className="mt-1 rounded  p-1 text-base md:text-base font-medium text-green-500">
                      Rating: 0/5
                    </h4>
                  )}
                </div>
                <div className="my-1 rounded  p-1 lg:text-lg font-medium flex ">
                  <div>
                    <p>
                      {data.description.slice(0, 150) +
                        `${data.description.length > 150 ? "..." : ""}`}
                    </p>
                  </div>
                </div>
              </CardBody>

              <CardFooter className=" bottom-0 gap-2 justify-around border-t-1 border-zinc-100/50 bg-white/30">
                {user?.role === "VENDOR" && (
                  <>
                    <ProductUpdateButton id={data.id} />
                    <ProductDeleteButton id={data?.id} />
                  </>
                )}

                {user?.role === "USER" && (
                  // <Button
                  //   size="sm"
                  //   onClick={() => handleAddToCart(data?.id, data?.shopId)}
                  // >
                  //   Add to Cart
                  // </Button>

                  <Button onClick={() => handleShowPopup(data.id, data.shopId)}>
                    Add to Cart
                  </Button>
                )}

                <SeeDetailButton id={data?.id} fromShop={fromShop} />
              </CardFooter>

              {/* Warning Overlay */}
              {/* {warning && warning.productId === data.id && (
                  <div className=" inset-0 bg-red-100 bg-opacity-50 flex flex-col items-center justify-center p-4">
                    <p className="text-red-700 text-lg font-semibold">
                      {warning.message}
                    </p>
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={handleReplaceCart}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-green-400"
                      >
                        Yes
                      </button>
                      <button
                        onClick={handleDismissWarning}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-gray-400"
                      >
                        No
                      </button>
                    </div>
                  </div>
                )} */}

              {/* Popup Modal */}
              {showPopup && warning && warning.productId === data.id && (
                <ShowPopup
                  handleReplaceCart={handleReplaceCart}
                  handleDismissWarning={handleDismissWarning}
                />
              )}
            </NextUiCard>
          ))}
      </div>
      {/* {productData?.data?.length > 0 ? (
        <ProductPaginationCard
          productData={productData}
          setProductData={setProductData}
          category={category}
        />
      ) : (
        "No products to show!"
      )} */}
    </div>
  );
};

export default AllProductsDisplayCard;
