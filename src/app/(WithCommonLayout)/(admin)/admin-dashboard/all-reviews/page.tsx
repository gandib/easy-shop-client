import AllReviewsCard from "@/src/components/UI/AllReviewsCard";
import { getAllReview } from "@/src/services/RatingAndReviewService";

const AllReviews = async () => {
  const { data: allReviews } = await getAllReview();
  return (
    <div>
      <AllReviewsCard reviews={allReviews} viewAs="admin" />
    </div>
  );
};

export default AllReviews;
