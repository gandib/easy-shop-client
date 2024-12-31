"use client";

import {
  Card as NextUiCard,
  CardHeader,
  CardFooter,
  CardBody,
  Tabs,
  Tab,
  Card,
  Avatar,
  Divider,
} from "@nextui-org/react";
import Image from "next/image";
import { useUser } from "@/src/context/user.provider";
import { useState } from "react";
import {
  CornerDownRight,
  Cross,
  Delete,
  DeleteIcon,
  Minus,
  Plus,
  Star,
  StarHalf,
  StarIcon,
} from "lucide-react";
import { Button } from "@nextui-org/react";
import ESForm from "../form/ESForm";
import ESTextarea from "../form/FXTextarea";
import { FieldValues } from "react-hook-form";
import { IProduct, IReview } from "@/src/types";
import ProductUpdateButton from "./ProductUpdateButton";
import {
  useCreateRating,
  useCreateReview,
} from "@/src/hooks/rating-review.hook";
import { useRouter } from "next/navigation";
import RelatedProduct from "./RelatedProduct";
import { recentViewedProductsStore } from "@/src/utils/recentViewedProductsStore";
import moment from "moment";
import ShopRedirect from "./ShopRedirect";

const ShopProductDetailCard = ({ product }: { product: IProduct }) => {
  const { user, isLoading } = useUser();
  const { mutate: postRating } = useCreateRating();
  const { mutate: createReview } = useCreateReview();
  const [rate, setRate] = useState(5);
  const [commentError, setCommentError] = useState("");
  const router = useRouter();

  const handleRating = (productId: string) => {
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
  const averageRating =
    rating.length > 0
      ? (
          rating.reduce((pre, next) => pre + next.rating, 0) / rating.length
        ).toFixed(1)
      : "0";

  recentViewedProductsStore(product?.id);

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
          <CardHeader className="w-full flex-col items-start grid md:grid-cols-2">
            <div>
              <div>
                {product && (
                  <Image
                    width={1000}
                    height={300}
                    src={product?.img[0]}
                    alt="Recipe image"
                  />
                )}
              </div>
              <div></div>
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
                  <p className="flex">
                    <StarIcon
                      size={16}
                      className={`${Number(averageRating) > 0 ? "text-yellow-400" : "text-gray-400"}`}
                    />
                    <StarIcon
                      size={16}
                      className={`${Number(averageRating) > 1 ? "text-yellow-400" : "text-gray-400"}`}
                    />
                    <StarIcon
                      size={16}
                      className={`${Number(averageRating) > 2 ? "text-yellow-400" : "text-gray-400"}`}
                    />
                    <StarIcon
                      size={16}
                      className={`${Number(averageRating) > 3 ? "text-yellow-400" : "text-gray-400"}`}
                    />
                    <StarIcon
                      size={16}
                      className={`${Number(averageRating) > 4 ? "text-yellow-400" : "text-gray-400"}`}
                    />
                  </p>
                  <p className="pl-2">{product?.rating?.length}</p>
                </div>

                <h4 className="mt-1 rounded  p-1 text-xl font-bold text-secondary-500">
                  ${product?.price}
                </h4>
                <h4 className="mt-1 rounded  p-1 text-base md:text-base font-medium">
                  Quantity: {product?.quantity}
                </h4>
                {product?.discount > 0 && (
                  <h4 className="mt-1 rounded  p-1 text-base md:text-base font-medium">
                    Discount: {product?.discount}
                  </h4>
                )}
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
                            {averageRating}
                          </h1>
                          <div className="pt-2">
                            <p className="flex pl-2">
                              <StarIcon
                                className={`${Number(averageRating) > 0 ? "text-yellow-400" : "text-gray-400"}`}
                              />
                              <StarIcon
                                className={`${Number(averageRating) > 1 ? "text-yellow-400" : "text-gray-400"}`}
                              />
                              <StarIcon
                                className={`${Number(averageRating) > 2 ? "text-yellow-400" : "text-gray-400"}`}
                              />
                              <StarIcon
                                className={`${Number(averageRating) > 3 ? "text-yellow-400" : "text-gray-400"}`}
                              />
                              <StarIcon
                                className={`${Number(averageRating) > 4 ? "text-yellow-400" : "text-gray-400"}`}
                              />
                            </p>
                          </div>
                        </div>
                        <div></div>
                      </div>

                      <div className="my-6 flex items-center">
                        <Minus
                          onClick={() => {
                            if (rate !== 1) {
                              setRate(rate - 1);
                            }
                          }}
                          className="mr-2"
                        />
                        <p className="text-purple-500 font-bold flex justify-center items-center gap-1">
                          {rate} <Star size={"18"} />
                        </p>
                        <Plus
                          onClick={() => {
                            if (rate !== 5) {
                              setRate(rate + 1);
                            }
                          }}
                          className="mx-2"
                        />
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
        </NextUiCard>
      )}

      <RelatedProduct categoryName={product?.category?.name} fromShop="shop" />
    </div>
  );
};

export default ShopProductDetailCard;
