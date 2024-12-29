import AllReviewsCard from "@/src/components/UI/AllReviewsCard";
import { getAllReview } from "@/src/services/RatingAndReviewService";

const ReviewsPage = async () => {
  const { data: allReviews } = await getAllReview();

  return (
    <div>
      <AllReviewsCard reviews={allReviews} />
    </div>
  );
};

export default ReviewsPage;
