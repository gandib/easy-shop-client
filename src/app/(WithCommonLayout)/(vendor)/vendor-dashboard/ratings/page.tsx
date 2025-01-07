import Container from "@/src/components/UI/Container";
import RatingCard from "@/src/components/UI/RatingCard";
import { getAllRating } from "@/src/services/RatingAndReviewService";

const RatingsPage = async () => {
  const { data: ratings } = await getAllRating();
  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">Ratings</h1>
      <RatingCard ratings={ratings} />
    </Container>
  );
};

export default RatingsPage;
