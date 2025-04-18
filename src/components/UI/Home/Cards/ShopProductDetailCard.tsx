"use client";

import {
  Card as NextUiCard,
  CardHeader,
  CardFooter,
  CardBody,
  Tabs,
  Tab,
  Divider,
} from "@nextui-org/react";
import Image from "next/image";
import { useUser } from "@/src/context/user.provider";
import { useState } from "react";
import { CornerDownRight, Minus, Plus, Star, StarIcon } from "lucide-react";
import { Button } from "@nextui-org/react";
import ESForm from "../../../form/ESForm";
import ESTextarea from "../../../form/FXTextarea";
import { FieldValues } from "react-hook-form";
import { IProduct, IReview } from "@/src/types";
import {
  useCreateRating,
  useCreateReview,
} from "@/src/hooks/rating-review.hook";
import { useRouter } from "next/navigation";
import RelatedProduct from "../RelatedProduct";
import { recentViewedProductsStore } from "@/src/utils/recentViewedProductsStore";
import moment from "moment";
import ShopRedirect from "../../Shared/ShopRedirect";
import { addToCart } from "@/src/utils/addToCart";
import ShowPopup from "../../Shared/ShowPopup";
import StarRating from "./StarRating";
import { toast } from "sonner";
import { averageRating } from "@/src/utils/averageRating";

const ShopProductDetailCard = ({ product }: { product: IProduct }) => {
  const { user, isLoading } = useUser();
  const { mutate: postRating } = useCreateRating();
  const { mutate: createReview } = useCreateReview();
  const [rate, setRate] = useState(0);
  const [commentError, setCommentError] = useState("");
  const router = useRouter();
  const [imgLink, setImgLink] = useState(product?.img[0]);
  const [warning, setWarning] = useState<{
    message: string;
    productId: string;
    shopId?: string;
    catId?: string;
  } | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleRating = (productId: string) => {
    if (rate === 0) {
      return toast("Please rate at least one start");
    }
    const ratingData = {
      rating: rate,
      productId,
    };
    postRating(ratingData);
  };

  const onSubmit = (data: FieldValues) => {
    if (!data.comment) {
      return setCommentError("Please provide a review!");
    }
    const reviewData = {
      comment: data.comment,
      productId: product?.id,
    };
    createReview(reviewData);
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  const rating = product?.rating || [];
  const averageRatings =
    rating.length > 0
      ? Number(averageRating(product?.rating ?? [])).toFixed(1)
      : "0";

  recentViewedProductsStore(product?.id);

  const handleShowPopup = (productId: string, shopId: string) => {
    addToCart(productId, shopId, (message, id, shop) => {
      setWarning({ message, productId: id, shopId: shop });
    });
    setShowPopup(true);
  };

  let tabs = [
    {
      id: "description",
      label: "Description",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "reviews",
      label: "Reviews",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      id: "videos",
      label: "Videos",
      content:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  return (
    <div className="">
      {product && (
        <NextUiCard isFooterBlurred className="  ">
          <CardHeader className="w-full flex-col items-start grid md:grid-cols-2 gap-4">
            <div>
              <div className="h-[420px] px-0 py-0 w-full flex justify-center">
                {product && (
                  <Image
                    width={500}
                    height={500}
                    src={imgLink}
                    alt="Recipe image"
                    className="h-full w-full"
                  />
                )}
              </div>
              <div>
                {product && product?.img?.length > 0 && (
                  <div className="flex my-4 justify-center gap-2">
                    {product?.img?.map((img, index) => (
                      <Image
                        key={index}
                        onClick={() => setImgLink(img)}
                        width={50}
                        height={50}
                        src={img}
                        alt="Recipe image"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <h4 className="mt-1 rounded p-1 text-sm font-semibold text-gray-400 flex ">
                {product?.category?.name}
              </h4>
              <div className=" w-full">
                <h4 className="mt-1 rounded text-xl font-bold">
                  <ShopRedirect shop={product?.shop} />
                </h4>
                <h4 className="mt-1 rounded text-xl font-bold">
                  {product.name}
                </h4>

                <div className="flex items-center pt-2">
                  <StarRating product={product} />
                  <p className="pl-2">({product?.rating?.length})</p>
                </div>

                <div className="flex justify-between">
                  <h4 className="mt-1 rounded  p-1 text-xl font-bold text-secondary-500">
                    ${product?.price}
                  </h4>
                  {product?.quantity > 0 ? (
                    <h4 className="mt-1 rounded  p-1 text-xl text-secondary-500 font-bold">
                      In Stock
                    </h4>
                  ) : (
                    <p className="text-danger-500 text-xl font-bold">
                      Out of Stock
                    </p>
                  )}
                </div>
                {product?.discount > 0 && (
                  <h4 className="mt-1 rounded  p-1 text-xl font-medium">
                    Discount: {product?.discount}
                  </h4>
                )}
                <h4 className="mt-1 rounded  p-1 text-xl font-medium">
                  <span className="font-bold">Short Description:</span>{" "}
                  {product?.description.slice(0, 300)}
                  {product?.description.length > 300 && "..."}
                </h4>
              </div>

              {/* Add to cart btn  */}
              <div className="flex justify-end">
                <Button
                  onPress={() => handleShowPopup(product.id, product.shopId)}
                  size="lg"
                  className="bg-primary-500 text-white font-semibold"
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardBody>
            <div className="flex w-full flex-col">
              <Tabs aria-label="Dynamic tabs" items={tabs}>
                <Tab key={"description"} title={"Description"}>
                  <div>
                    <CardBody>{product.description}</CardBody>
                  </div>
                </Tab>

                <Tab
                  key={"reviews"}
                  title={`Reviews (${product.review.length})`}
                >
                  <div>
                    <CardBody>
                      <h1 className="text-xl font-bold">
                        {product.review.length} reviews for {product.name}
                      </h1>
                      <div className="p-4">
                        {product.review.map((review: IReview) => (
                          <div key={review.id}>
                            <h1>
                              {review.user.name}-{" "}
                              {moment(review.createdAt).format("MMM DD, yyyy")}
                            </h1>
                            <p>{review.comment}</p>
                            <div className="my-1 rounded  p-1 lg:text-lg font-medium flex">
                              {review?.shopResponse[0]?.response && (
                                <p className="ml-2 flex">
                                  <span className="text-lg text-purple-500 flex">
                                    <CornerDownRight />{" "}
                                    {`${review?.shopResponse[0]?.shop?.name}: `}
                                  </span>
                                  {review?.shopResponse[0]?.response}
                                </p>
                              )}
                            </div>
                            <Divider />
                          </div>
                        ))}
                      </div>

                      {user?.role === "USER" &&
                        product?.review?.find(
                          (review) => review?.userId === user?.id
                        )?.userId !== user?.id && (
                          <div className="my-6 ">
                            <h1>Leave a review</h1>
                            <div className="">
                              <ESForm onSubmit={onSubmit}>
                                <ESTextarea
                                  label="Type a comment"
                                  name="comment"
                                />
                                <p className="text-sm text-red-500">
                                  {commentError}
                                </p>
                                <Button
                                  className="my-4"
                                  type="submit"
                                  variant="bordered"
                                >
                                  Submit
                                </Button>
                              </ESForm>
                            </div>
                          </div>
                        )}
                    </CardBody>
                  </div>
                </Tab>

                <Tab
                  key={"rating"}
                  title={`Ratings (${product.rating.length})`}
                >
                  <div>
                    <CardBody>
                      <h1 className="text-xl font-bold">
                        {product.rating.length} ratings for {product.name}
                      </h1>
                      <div className="p-4">
                        <div className="flex">
                          <h1 className="text-4xl font-bold">
                            {averageRatings}
                          </h1>
                          <div className="pt-2">
                            <div className="flex pl-2">
                              <StarRating product={product} />
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>

                      <div className="my-6 flex items-center gap-2">
                        {[...Array(5)].map((_, index) => {
                          return (
                            <StarIcon
                              key={index}
                              size={20}
                              onClick={() => setRate(index + 1)}
                              className={`${
                                rate > index
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-yellow-400"
                              }`}
                            />
                          );
                        })}

                        <Button
                          onPress={() => handleRating(product?.id)}
                          size="sm"
                          variant="flat"
                        >
                          Rate Now
                        </Button>
                      </div>
                    </CardBody>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </CardBody>

          <CardFooter className=" bottom-0 gap-2 justify-around border-t-1 border-zinc-100/50 bg-white/30">
            {/* <ProductUpdateButton id={product?.id} /> */}
            {/* <ProductDeleteButton id={recipe?._id} setLoading={setLoading} /> */}
          </CardFooter>

          {/* Popup Modal */}
          {showPopup && warning && warning.productId === product.id && (
            <ShowPopup
              setShowPopup={setShowPopup}
              setWarning={setWarning}
              warning={warning}
            />
          )}
        </NextUiCard>
      )}

      <RelatedProduct categoryName={product?.category?.name} fromShop="shop" />
    </div>
  );
};

export default ShopProductDetailCard;
