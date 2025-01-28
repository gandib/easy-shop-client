"use client";

import { useUser } from "@/src/context/user.provider";
import { useEffect, useState, useCallback } from "react";
import { FieldValues, useForm } from "react-hook-form";
import useDebounce from "@/src/hooks/debounce.hook";
import { SearchIcon, StarIcon } from "lucide-react";
import { ICategory, IProduct } from "@/src/types";
import { getAllProducts } from "@/src/services/ProductService";
import {
  RadioGroup,
  Radio,
  Input,
  Button,
  Slider,
  Card as NextUiCard,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { getAllCategory } from "@/src/services/CategoryService";
import HomeProductsDisplayCard from "./HomeProductsDisplayCard";
import Loading from "./Loading";
import { toast } from "sonner";
import { addToCart } from "@/src/utils/addToCart";
import Image from "next/image";
import SeeDetailButton from "./SeeDetailButton";
import ShowPopup from "./ShowPopup";
import loading from "@/src/app/loading";

export type queryParams = {
  name: string;
  value: boolean | React.Key;
};

type TProductMeta = {
  meta: { page: number; limit: number; total: number; totalPage: number };
  data: IProduct[];
};

const HomeSmartPhoneDisplay = ({
  products,
  category,
  shopId,
  fromShop,
}: {
  products: IProduct[];
  category?: string;
  shopId?: string;
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
    <div className="pt-8">
      <h1 className="text-2xl font-bold mt-10 my-6">Latest Smarts Phone</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
        {products?.length > 0 ? (
          productData?.slice(0, 4)?.map((data: IProduct) => (
            <NextUiCard
              key={data.id}
              isFooterBlurred
              className=" hover:shadow-2xl"
            >
              <CardHeader className="h-[200px] px-0 py-0 w-full flex justify-center">
                {data?.img && (
                  <Image
                    width={500}
                    height={500}
                    src={data?.img[0]}
                    alt="Product image"
                    className="h-full"
                  />
                )}
              </CardHeader>

              <CardBody>
                <div className=" w-full">
                  {/* <ShopRedirect shop={data?.shop} /> */}

                  <div className="pt-2 flex gap-3 items-center">
                    <div className="flex ">
                      <StarIcon
                        size={"16px"}
                        className={`${
                          Number(
                            data?.rating?.length &&
                              (
                                data.rating.reduce(
                                  (pre, next) => pre + next.rating,
                                  0
                                ) / data.rating.length
                              ).toFixed(1)
                          ) > 0
                            ? "text-yellow-400"
                            : "text-gray-400"
                        } `}
                      />
                      <StarIcon
                        size={"16px"}
                        className={`${
                          Number(
                            data?.rating?.length &&
                              (
                                data.rating.reduce(
                                  (pre, next) => pre + next.rating,
                                  0
                                ) / data.rating.length
                              ).toFixed(1)
                          ) > 1
                            ? "text-yellow-400"
                            : "text-gray-400"
                        } `}
                      />
                      <StarIcon
                        size={"16px"}
                        className={`${
                          Number(
                            data?.rating?.length &&
                              (
                                data.rating.reduce(
                                  (pre, next) => pre + next.rating,
                                  0
                                ) / data.rating.length
                              ).toFixed(1)
                          ) > 2
                            ? "text-yellow-400"
                            : "text-gray-400"
                        } `}
                      />
                      <StarIcon
                        size={"16px"}
                        className={`${
                          Number(
                            data?.rating?.length &&
                              (
                                data.rating.reduce(
                                  (pre, next) => pre + next.rating,
                                  0
                                ) / data.rating.length
                              ).toFixed(1)
                          ) > 3
                            ? "text-yellow-400"
                            : "text-gray-400"
                        } `}
                      />
                      <StarIcon
                        size={"16px"}
                        className={`${
                          Number(
                            data?.rating?.length &&
                              (
                                data.rating.reduce(
                                  (pre, next) => pre + next.rating,
                                  0
                                ) / data.rating.length
                              ).toFixed(1)
                          ) > 4
                            ? "text-yellow-400"
                            : "text-gray-400"
                        } `}
                      />
                    </div>
                    <p>
                      {data?.rating?.length &&
                        (
                          data.rating.reduce(
                            (pre, next) => pre + next.rating,
                            0
                          ) / data.rating.length
                        ).toFixed(2)}
                    </p>
                  </div>

                  <h4 className="rounded text-sm sm:text-base md:text-base font-bold">
                    {data.name}
                  </h4>
                  <h4 className="rounded text-xl font-bold pt-2 text-secondary-500">
                    ${data?.price}
                  </h4>
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

              <CardFooter className="bottom-0 gap-2 justify-around border-t-1 border-zinc-100/50 bg-white/30">
                {user?.role === "VENDOR" && (
                  <>
                    {/* <ProductUpdateButton id={data.id} />
                <ProductDeleteButton id={data?.id} /> */}
                  </>
                )}

                {user?.role === "USER" && (
                  <Button
                    size="sm"
                    onPress={() => handleShowPopup(data.id, data.shopId)}
                    className="bg-primary-500 text-white "
                  >
                    Add to Cart
                  </Button>
                )}

                <SeeDetailButton id={data?.id} fromShop={fromShop} />
              </CardFooter>

              {/* Popup Modal */}
              {showPopup && warning && warning.productId === data.id && (
                <ShowPopup
                  handleReplaceCart={handleReplaceCart}
                  handleDismissWarning={handleDismissWarning}
                />
              )}
            </NextUiCard>
          ))
        ) : isLoading && productData?.length < 1 ? (
          <p>Loading...</p>
        ) : (
          <p>No Product available!</p>
        )}
      </div>
      {/* <div className="flex justify-center my-8">
        {!loading &&
        productData?.data?.length > 0 &&
        currentPage !== totalPage ? (
          <Button
            onPress={() => {
              if (currentPage < totalPage) {
                setCurrentPage((prev) => prev + 1);
              }
            }}
            className="bg-primary-500 px-6 text-white"
          >
            Load More
          </Button>
        ) : loading && productData?.data?.length > 0 ? (
          <p>Loading...</p>
        ) : (
          !loading &&
          productData?.meta?.totalPage === totalPage &&
          "No more products to show!"
        )}
      </div> */}
    </div>
  );
};

export default HomeSmartPhoneDisplay;
