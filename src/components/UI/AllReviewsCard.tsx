import { IReview } from "@/src/types";
import ReviewResponseCard from "./ReviewResponseCard";

const AllReviewsCard = ({ reviews }: { reviews: IReview[] }) => {
  console.log(reviews);

  return (
    <div className="grid grid-cols-2 gap-2">
      {reviews &&
        reviews?.map((review: IReview) => (
          <ReviewResponseCard key={review?.id} review={review} />
        ))}
    </div>
  );
};

export default AllReviewsCard;
