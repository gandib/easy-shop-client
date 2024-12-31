import RatingCard from "@/src/components/UI/RatingCard";
import { getAllRating } from "@/src/services/RatingAndReviewService";

const RatingsPage = async () => {
  const { data: ratings } = await getAllRating();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ratings</h1>
      <RatingCard ratings={ratings} />
    </div>
  );
};

export default RatingsPage;
