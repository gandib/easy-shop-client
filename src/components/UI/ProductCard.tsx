"use client";

import { CardBody, CardHeader, Card as NextUiCard } from "@nextui-org/react";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import SeeDetailButton from "./SeeDetailButton";
import Link from "next/link";
import StarRating from "./StarRating";
import ShowPopup from "./ShowPopup";
import { useState } from "react";
import { addToCart } from "@/src/utils/addToCart";
import { useUser } from "@/src/context/user.provider";
import { IProduct } from "@/src/types";
import ProductUpdateButton from "./ProductUpdateButton";
import ProductDeleteButton from "./ProductDeleteButton";

const ProductCard = ({
  data,
  fromShop,
  flashSale,
}: {
  data: IProduct;
  fromShop?: string;
  flashSale?: string;
}) => {
  const { user, isLoading } = useUser();
  const [warning, setWarning] = useState<{
    message: string;
    productId: string;
    shopId: string;
  } | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleShowPopup = (productId: string, shopId: string) => {
    addToCart(productId, shopId, (message, id, shop) => {
      setWarning({ message, productId: id, shopId: shop });
    });
    setShowPopup(true);
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <NextUiCard
      //   key={data.id}
      isFooterBlurred
      className="rounded-t-none shadow-xl p-4 border-1 border-t-0 rounded-md relative overflow-hidden"
      onMouseEnter={() => setHoveredId(data.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <CardHeader className="h-[230px] px-0 py-0 w-full flex justify-center relative">
        {/* Percentage Badge */}
        {data?.flashSale[0]?.percentage && flashSale && (
          <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
            {data?.flashSale[0]?.percentage}%
          </div>
        )}

        {data?.img && (
          <Image
            width={500}
            height={500}
            src={data?.img[0]}
            alt="Product image"
            className="h-full"
          />
        )}

        {user?.role === "VENDOR" && (
          <>
            <div
              className={`absolute bottom-18 left-2 transition-all duration-300 ease-in-out 
        ${hoveredId === data.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
            >
              <ProductUpdateButton id={data.id} />
            </div>
            <div
              className={`absolute bottom-14 left-2 transition-all duration-300 ease-in-out 
        ${hoveredId === data.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
            >
              <ProductDeleteButton id={data?.id} />
            </div>
          </>
        )}

        {/* ShoppingCart Button with Smooth Transition */}
        {user?.role === "USER" && (
          <button
            onClick={() => handleShowPopup(data.id, data.shopId)}
            className={`bg-white text-black absolute bottom-14 left-2 p-2 rounded-md transition-all duration-300 ease-in-out 
${hoveredId === data.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
hover:bg-secondary-500 hover:text-white`}
          >
            <ShoppingCart size={18} />
          </button>
        )}

        {/* Eye Button (SeeDetailButton) with Smooth Transition */}
        <div
          className={`absolute bottom-2 left-2 transition-all duration-300 ease-in-out 
${hoveredId === data.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <SeeDetailButton id={data?.id} fromShop={fromShop} />
        </div>
      </CardHeader>

      <CardBody>
        <div className=" w-full flex flex-col justify-center items-center">
          {/* <ShopRedirect shop={data?.shop} /> */}

          <Link
            href={`/shop/detail-product/${data?.id}`}
            className="rounded text-sm sm:text-base md:text-base font-bold"
          >
            {data?.name}
          </Link>
          <h4 className="rounded text-xl  pt-2 text-secondary-500">
            ${data?.price}
          </h4>

          <div className="pt-2 flex gap-3 items-center">
            <div className="flex ">
              <StarRating product={data} />
            </div>
            <p>({data?.rating?.length && data.rating.length})</p>
          </div>
        </div>
      </CardBody>

      {/* Popup Modal */}
      {showPopup && warning && warning.productId === data.id && (
        <ShowPopup
          setShowPopup={setShowPopup}
          setWarning={setWarning}
          warning={warning}
        />
      )}
    </NextUiCard>
  );
};

export default ProductCard;
