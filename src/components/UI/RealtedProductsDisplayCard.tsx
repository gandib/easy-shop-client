"use client";

import { IProduct } from "@/src/types";
import {
  Card as NextUiCard,
  CardHeader,
  CardFooter,
  CardBody,
  Pagination,
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
import { queryParams } from "./OrderHistoryCard";
import { getAllProducts } from "@/src/services/ProductService";
import { StarIcon } from "lucide-react";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

const RealtedProductsDisplayCard = ({
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
  const [currentPage, setCurrentPage] = useState(productData?.meta?.page);
  const [limit, setLimit] = useState(12);
  const [totalPage, setTotalPage] = useState(productData?.meta?.totalPage);

  useEffect(() => {
    const query: queryParams[] = [];
    if (limit) {
      query.push({ name: "limit", value: limit });
    }
    if (currentPage) {
      query.push({ name: "page", value: currentPage });
    }
    if (category) {
      query.push({ name: "category", value: category! });
    }

    const fetchRelatedProducts = async () => {
      try {
        const { data } = await getAllProducts(query);
        setProductData(data);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      }
    };

    fetchRelatedProducts();
  }, [currentPage, totalPage, category]);

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

  if (isLoading) {
    <p>Loading...</p>;
  }
  return (
    <div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-2 grow relative">
        {productData &&
          productData?.data?.length > 0 &&
          productData?.data?.map((data: IProduct) => (
            <NextUiCard
              key={data.id}
              isFooterBlurred
              className=" hover:shadow-2xl "
            >
              <CardHeader className="h-[250px] px-0 py-0 w-full flex justify-center">
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
      {productData?.data?.length > 0 ? (
        <Pagination
          total={totalPage}
          page={currentPage}
          showControls
          onChange={(page) => setCurrentPage(page)}
          className="flex justify-center my-2"
        />
      ) : (
        "No products to show!"
      )}
    </div>
  );
};

export default RealtedProductsDisplayCard;
