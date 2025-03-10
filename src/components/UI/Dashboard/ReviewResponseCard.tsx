"use client";
import {
  Card as NextUiCard,
  CardHeader,
  CardFooter,
  CardBody,
} from "@nextui-org/react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import ESForm from "../../form/ESForm";
import ESTextarea from "../../form/FXTextarea";
import { Button } from "@nextui-org/react";
import { IReview } from "@/src/types";
import { usecreateReviewResponse } from "@/src/hooks/rating-review.hook";

const ReviewResponseCard = ({
  review,
  viewAs,
}: {
  review: IReview;
  viewAs?: string;
}) => {
  const [commentError, setCommentError] = useState("");
  const [response, setResponse] = useState("");
  const { mutate: createResponse } = usecreateReviewResponse();

  const onSubmit = (data: FieldValues) => {
    if (!data.response) {
      return setCommentError("Please provide a reply!");
    }
    const responseData = {
      response: data.response,
      reviewId: review?.id,
    };
    createResponse(responseData);
  };

  return (
    <div>
      <NextUiCard
        isFooterBlurred
        className="rounded-t-none shadow-xl p-4 border-1 border-t-0 rounded-md relative overflow-hidden"
      >
        <CardHeader className="w-full flex-col items-start ">
          <h4 className="mt-1 rounded p-1 text-base md:text-lg font-medium flex ">
            <p className="cursor-pointer hover:text-green-500 ml-2">
              Product: {review?.product?.name}
            </p>
          </h4>

          <div className="my-2 rounded  p-1 lg:text-lg font-medium flex justify-center ">
            <p>{review?.comment}</p>
          </div>
          <div className="my-1 rounded  p-1 lg:text-lg font-medium flex justify-center ">
            {review?.shopResponse[0]?.response && (
              <p className="ml-2">
                <span className="text-lg text-purple-500">Responsed:</span>{" "}
                {review?.shopResponse[0].response}
              </p>
            )}
          </div>
        </CardHeader>
        {!viewAs && (
          <CardBody>
            {!review?.shopResponse[0]?.response && (
              <div className="my-6 ">
                <h1>Leave a Reply</h1>
                <div className="">
                  <ESForm onSubmit={onSubmit}>
                    <ESTextarea
                      label="Type a response"
                      name="response"
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                    />
                    <p className="text-sm text-red-500">{commentError}</p>
                    <Button className="my-4" type="submit" variant="bordered">
                      Submit
                    </Button>
                  </ESForm>
                </div>
              </div>
            )}
          </CardBody>
        )}

        <CardFooter className=" bottom-0 gap-2 justify-around border-t-1 border-zinc-100/50 bg-white/30">
          {/* <ProductUpdateButton id={product?.id} /> */}
          {/* <ProductDeleteButton id={recipe?._id} setLoading={setLoading} /> */}
        </CardFooter>
      </NextUiCard>
    </div>
  );
};

export default ReviewResponseCard;
