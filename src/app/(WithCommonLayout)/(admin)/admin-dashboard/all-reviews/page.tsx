import AllReviewsCard from "@/src/components/UI/AllReviewsCard";
import Container from "@/src/components/UI/Container";
import { getAllReview } from "@/src/services/RatingAndReviewService";

const AllReviews = async () => {
  const { data: allReviews } = await getAllReview();
  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">All Reviews</h1>
      <AllReviewsCard reviews={allReviews} viewAs="admin" />
    </Container>
  );
};

export default AllReviews;
