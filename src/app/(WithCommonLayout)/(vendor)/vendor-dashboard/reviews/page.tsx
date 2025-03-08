import AllReviewsCard from "@/src/components/UI/Dashboard/AllReviewsCard";
import Container from "@/src/components/UI/Shared/Container";
import { getAllReview } from "@/src/services/RatingAndReviewService";

const ReviewsPage = async () => {
  const { data: allReviews } = await getAllReview();

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">Reviews</h1>
      <AllReviewsCard reviews={allReviews} />
    </Container>
  );
};

export default ReviewsPage;
