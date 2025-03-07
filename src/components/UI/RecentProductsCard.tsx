"use client";

import { IProduct } from "@/src/types";
import { useEffect, useState } from "react";
import { Card as NextUiCard, CardHeader, CardBody } from "@nextui-org/react";
import Image from "next/image";
import SeeDetailButton from "./SeeDetailButton";
import ShowPopup from "./ShowPopup";
import { useUser } from "@/src/context/user.provider";
import { addToCart } from "@/src/utils/addToCart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import StarRating from "./StarRating";

const RecentProductsCard = ({
  products,
}: {
  products: { data: IProduct[] };
}) => {
  const [cartData, setCartData] = useState<string | null>(null);
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

  useEffect(() => {
    const storedCart = localStorage?.getItem("recentProducts");
    setCartData(storedCart);
  }, []);

  const parsedCart = JSON.parse(cartData!);

  const matchedProducts = products?.data?.filter((product: IProduct) =>
    parsedCart?.some((cartItem: any) => cartItem.productId === product.id)
  );

  if (isLoading) {
    <p>Loading...</p>;
  }
  return (
    <div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-4 grow relative">
        {matchedProducts && matchedProducts?.length > 0
          ? matchedProducts?.map((data: IProduct) => (
              <NextUiCard
                key={data.id}
                isFooterBlurred
                className="rounded-t-none shadow-xl p-4 border-1 border-t-0 rounded-md relative overflow-hidden"
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

                  {user?.role === "USER" && (
                    <button
                      onClick={() => handleShowPopup(data.id, data.shopId)}
                      className={`bg-white text-black absolute bottom-14 left-2 p-2 rounded-md hover:bg-secondary-500 hover:text-white transition-all duration-300 ease-in-out 
        ${hoveredId === data.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                    >
                      <ShoppingCart size={18} />
                    </button>
                  )}

                  <div
                    className={`absolute bottom-2 left-2 transition-all duration-300 ease-in-out 
        ${hoveredId === data.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                  >
                    <SeeDetailButton id={data?.id} fromShop={"fromShop"} />
                  </div>
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
            ))
          : "No products you viewed!"}
      </div>
    </div>
  );
};

export default RecentProductsCard;
