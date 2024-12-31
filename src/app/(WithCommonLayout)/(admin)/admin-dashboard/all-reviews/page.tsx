import AllReviewsCard from "@/src/components/UI/AllReviewsCard";
import { getAllReview } from "@/src/services/RatingAndReviewService";

const AllReviews = async () => {
  const { data: allReviews } = await getAllReview();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Reviews</h1>
      <AllReviewsCard reviews={allReviews} viewAs="admin" />
    </div>
  );
};

export default AllReviews;
