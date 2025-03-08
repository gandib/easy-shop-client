import { IReview } from "@/src/types";
import ReviewResponseCard from "./ReviewResponseCard";

const AllReviewsCard = ({
  reviews,
  viewAs,
}: {
  reviews: IReview[];
  viewAs?: string;
}) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {reviews && reviews.length > 0
        ? reviews?.map((review: IReview) => (
            <ReviewResponseCard
              key={review?.id}
              review={review}
              viewAs={viewAs}
            />
          ))
        : "No review to show!"}
    </div>
  );
};

export default AllReviewsCard;
