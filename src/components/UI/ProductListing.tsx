"use client";

import { IProduct } from "@/src/types";
import {
  Card as NextUiCard,
  CardHeader,
  CardFooter,
  CardBody,
} from "@nextui-org/react";
import Image from "next/image";
import SeeDetailButton from "./SeeDetailButton";
import ProductUpdateButton from "./ProductUpdateButton";
import ProductDeleteButton from "./ProductDeleteButton";
import ShopRedirect from "./ShopRedirect";
import ProductPaginationCard from "./ProductPaginationCard";
import { useEffect, useState } from "react";
import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/react";
import { addToCart } from "@/src/utils/addToCart";
import { toast } from "sonner";
import ShowPopup from "./ShowPopup";
import { ShoppingCart, StarIcon } from "lucide-react";
import Link from "next/link";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

const ProductListing = ({
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
  const [showPopup, setShowPopup] = useState(false);
  const [warning, setWarning] = useState<{
    message: string;
    productId: string;
    shopId: string;
  } | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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
      <h1 className="text-2xl font-bold my-2">Product Listing</h1>
      <div className="grid lg:grid-cols-4 gap-4 grow relative">
        {productData &&
          productData?.data?.length > 0 &&
          productData?.data?.map((data: IProduct) => (
            <NextUiCard
              key={data.id}
              isFooterBlurred
              className="rounded-t-none shadow-xl p-4 border-1 border-t-0 rounded-md"
              onMouseEnter={() => setHoveredId(data.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <CardHeader className="h-[230px] px-0 py-0 w-full flex justify-center relative">
                {data?.img && (
                  <Image
                    width={500}
                    height={500}
                    src={data?.img[0]}
                    alt="Product image"
                    className="h-full"
                  />
                )}

                {user?.role === "VENDOR" && hoveredId === data.id && (
                  <>
                    <ProductUpdateButton id={data.id} />
                    <ProductDeleteButton id={data?.id} />
                  </>
                )}

                {user?.role === "USER" && hoveredId === data.id && (
                  <button
                    onClick={() => handleShowPopup(data.id, data.shopId)}
                    className="bg-white text-black absolute bottom-14 left-2 p-2 rounded-md hover:bg-secondary-500 hover:text-white"
                  >
                    <ShoppingCart size={18} />
                  </button>
                )}

                {hoveredId === data.id && (
                  <div className="absolute bottom-2 left-2 ">
                    <SeeDetailButton id={data?.id} fromShop={fromShop} />
                  </div>
                )}
              </CardHeader>

              <CardBody>
                <div className=" w-full flex flex-col justify-center items-center">
                  {/* <ShopRedirect shop={data?.shop} /> */}

                  <Link
                    href={`shop/detail-product/${data.id}`}
                    className="rounded text-sm sm:text-base md:text-base font-bold"
                  >
                    {data.name}
                  </Link>
                  <h4 className="rounded text-xl  pt-2 text-secondary-500">
                    ${data?.price}
                  </h4>

                  <div className="pt-2 flex gap-3 items-center">
                    <div className="flex ">
                      <div className="flex">
                        {[...Array(5)].map((_, index) => {
                          const ratingValue =
                            data?.rating?.length &&
                            data.rating.reduce(
                              (pre, next) => pre + next.rating,
                              0
                            ) / data.rating.length;
                          return (
                            <StarIcon
                              key={index}
                              size={16}
                              className={`${
                                ratingValue > index
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-yellow-400"
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <p>({data?.rating?.length && data.rating.length})</p>
                  </div>
                </div>
                {/* <div className="rounded text-base font-medium flex ">
                  <div>
                    <p>
                      {data.description.slice(0, 100) +
                        `${data.description.length > 100 ? "..." : ""}`}
                    </p>
                  </div>
                </div> */}
              </CardBody>

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

export default ProductListing;
