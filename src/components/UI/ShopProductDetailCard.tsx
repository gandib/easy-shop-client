"use client";

import {
  Card as NextUiCard,
  CardHeader,
  CardFooter,
  CardBody,
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
} from "lucide-react";
import { Button } from "@nextui-org/react";
import ESForm from "../form/ESForm";
import ESTextarea from "../form/FXTextarea";
import { FieldValues } from "react-hook-form";
import { IProduct } from "@/src/types";
import ProductUpdateButton from "./ProductUpdateButton";
import {
  useCreateRating,
  useCreateReview,
} from "@/src/hooks/rating-review.hook";
import { useRouter } from "next/navigation";
import RelatedProduct from "./RelatedProduct";
import { recentViewedProductsStore } from "@/src/utils/recentViewedProductsStore";

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

  return (
    <div className="">
      {product && (
        <NextUiCard isFooterBlurred className="  ">
          <CardHeader className="w-full flex-col items-start">
            {product && (
              <Image
                width={1000}
                height={300}
                src={product?.img}
                alt="Recipe image"
              />
            )}
            <h4 className="mt-1 rounded p-1 text-base md:text-lg font-medium flex ">
              Brand:
              <p
                onClick={() => router.push(`/shop/${product?.shopId}`)}
                className="cursor-pointer hover:text-green-500 ml-2"
              >
                {product?.shop?.name}
              </p>
            </h4>
            <div className=" w-full">
              <h4 className="mt-2 rounded  p-1 text-lg sm:text-xl md:text-xl font-medium text-purple-500">
                {product.name}
              </h4>
              <h4 className="mt-1 rounded  p-1 text-base md:text-base font-medium">
                Category: {product?.category?.name}
              </h4>
              <h4 className="mt-1 rounded  p-1 text-base md:text-base font-medium">
                Price: {product?.price}
              </h4>
              <h4 className="mt-1 rounded  p-1 text-base md:text-base font-medium">
                Quantity: {product?.quantity}
              </h4>
              {product?.discount > 0 && (
                <h4 className="mt-1 rounded  p-1 text-base md:text-base font-medium">
                  Discount: {product?.discount}
                </h4>
              )}
              <h4 className="mt-2 rounded flex items-center p-1 text-base md:text-base font-medium text-green-500">
                Rating: {averageRating}/5
              </h4>
            </div>
            <div className="my-2 rounded  p-1 lg:text-lg font-medium flex justify-center ">
              <p>{product?.description}</p>
            </div>

            <div>
              <p className="text-green-500"> Reviews:</p>
              {product?.review?.length < 1 && "No Reviews"}
              {product?.review &&
                product?.review?.length > 0 &&
                product?.review?.map((review) => (
                  <div key={review.id} className="my-2">
                    <p className="flex gap-2">
                      Comment as: {review?.user?.name}{" "}
                      {/* {user?.id === review.user.id && (
                        <DeleteIcon
                          className="text-red-500"
                          onClick={() => handleDeleteReview(review.id)}
                        />
                      )} */}
                    </p>
                    <p key={review.id} className="flex items-center">
                      {" "}
                      <CornerDownRight /> {review.comment}
                    </p>

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
                  </div>
                ))}
            </div>
          </CardHeader>
          <CardBody>
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

            {user?.role === "USER" &&
              product?.review?.find((review) => review?.userId === user?.id)
                ?.userId !== user?.id && (
                <div className="my-6 ">
                  <h1>Leave a review</h1>
                  <div className="">
                    <ESForm onSubmit={onSubmit}>
                      <ESTextarea label="Type a comment" name="comment" />
                      <p className="text-sm text-red-500">{commentError}</p>
                      <Button className="my-4" type="submit" variant="bordered">
                        Submit
                      </Button>
                    </ESForm>
                  </div>
                </div>
              )}
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
