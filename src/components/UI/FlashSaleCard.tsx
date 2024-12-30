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
import { useEffect, useState } from "react";
import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/react";
import { addToCart } from "@/src/utils/addToCart";
import { toast } from "sonner";
import ShowPopup from "./ShowPopup";
import { Pagination } from "@nextui-org/react";
import { StarIcon } from "lucide-react";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

const FlashSaleCard = ({
  products,
  fromShop,
}: {
  products: { meta: IMeta; data: IProduct[] };
  fromShop?: string;
}) => {
  const [productData, setProductData] = useState<{
    meta: IMeta;
    data: IProduct[];
  }>(products);
  const { user, isLoading } = useUser();
  const [expiryDate, setExpiryDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [warning, setWarning] = useState<{
    message: string;
    productId: string;
    shopId: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(productData?.meta?.page);
  const [limit, setLimit] = useState(12);
  const [totalPage, setTotalPage] = useState(productData?.meta?.totalPage);

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

  useEffect(() => {
    setProductData(products);
  }, [products]);

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <div className="mb-10">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 grow relative">
        {products &&
          products?.data?.length > 0 &&
          products?.data?.map((data: IProduct) => (
            <NextUiCard
              key={data.id}
              isFooterBlurred
              className=" hover:shadow-2xl "
            >
              <CardHeader className="h-[150px] flex justify-center">
                {data?.img && (
                  <Image
                    width={150}
                    height={150}
                    src={data?.img}
                    alt="Product image"
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

              <CardFooter className=" bottom-0 gap-2 justify-around border-t-1 border-zinc-100/50 bg-white/30">
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
                    className="bg-primary-500 text-white"
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
          ))}
      </div>
      {products?.data?.length > 0 && fromShop !== "homeFlash" ? (
        <Pagination
          total={totalPage}
          page={currentPage}
          showControls
          onChange={(page) => setCurrentPage(page)}
          className="flex justify-center my-2"
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default FlashSaleCard;
