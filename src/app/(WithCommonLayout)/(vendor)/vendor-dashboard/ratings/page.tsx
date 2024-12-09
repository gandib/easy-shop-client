import RatingCard from "@/src/components/UI/RatingCard";
import { getAllRating } from "@/src/services/RatingAndReviewService";

const RatingsPage = async () => {
  const { data: ratings } = await getAllRating();
  return (
    <div>
      <RatingCard ratings={ratings} />
    </div>
  );
};

export default RatingsPage;
