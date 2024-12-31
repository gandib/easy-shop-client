import AllReviewsCard from "@/src/components/UI/AllReviewsCard";
import { getAllReview } from "@/src/services/RatingAndReviewService";

const ReviewsPage = async () => {
  const { data: allReviews } = await getAllReview();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reviews</h1>
      <AllReviewsCard reviews={allReviews} />
    </div>
  );
};

export default ReviewsPage;
