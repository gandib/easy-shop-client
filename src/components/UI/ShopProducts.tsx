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
import {
  Button,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { queryParams } from "./OrderHistoryCard";
import { getAllProducts } from "@/src/services/ProductService";
import { useUser } from "@/src/context/user.provider";
import { toast } from "sonner";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { addToCart } from "@/src/utils/addToCart";
import ShowPopup from "./ShowPopup";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

const ShopProducts = ({
  products,
  shopId,
}: {
  products: { meta: IMeta; data: IProduct[] };
  shopId: string;
}) => {
  const [productData, setProductData] = useState(products);
  const [currentPage, setCurrentPage] = useState(productData?.meta?.page);
  const [limit, setLimit] = useState(9);
  const [totalPage, setTotalPage] = useState(productData?.meta?.totalPage);
  const { user, isLoading } = useUser();
  const [showPopup, setShowPopup] = useState(false);
  const [warning, setWarning] = useState<{
    message: string;
    productId: string;
    shopId: string;
  } | null>(null);

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
    const query: queryParams[] = [];
    if (limit) {
      query.push({ name: "limit", value: limit });
    }
    if (currentPage) {
      query.push({ name: "page", value: currentPage });
    }

    const fetchData = async () => {
      const { data: allProducts } = await getAllProducts([
        { name: "shop", value: shopId },
      ]);
      setProductData(allProducts);
    };
    fetchData();
  }, [currentPage, totalPage]);

  // const handleAddToCart = (productId: string, shopId: string) => {
  //   addToCart(productId, shopId);
  // };

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2 grow relative">
        {productData &&
          productData?.data.length > 0 &&
          productData?.data?.map((data: IProduct) => (
            <NextUiCard
              key={data.id}
              isFooterBlurred
              className=" hover:shadow-2xl "
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
                    {/* <ProductUpdateButton id={data.id} />
                    <ProductDeleteButton id={data?.id} /> */}
                  </>
                )}

                {user?.role === "USER" && (
                  <Button
                    size="sm"
                    onClick={() => handleShowPopup(data.id, data.shopId)}
                  >
                    Add to Card
                  </Button>
                )}

                <SeeDetailButton id={data?.id} fromShop="shop" />
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
      <div>
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
    </div>
  );
};

export default ShopProducts;
