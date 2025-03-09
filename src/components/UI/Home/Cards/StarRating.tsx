import { averageRating } from "@/src/utils/averageRating";
import { StarIcon } from "lucide-react";

interface StarRatingProps {
  product: { rating: { rating: number }[] };
  totalStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ product, totalStars = 5 }) => {
  const ratingValue =
    product?.rating?.length > 0
      ? Number(averageRating(product?.rating ?? []))
      : 0;

  return (
    <p className="flex">
      {[...Array(totalStars)].map((_, index) => {
        return (
          <StarIcon
            key={index}
            size={16}
            className={`${
              ratingValue > index
                ? "text-yellow-400 fill-yellow-400"
                : "text-yellow-400"
            }`}
          />
        );
      })}
    </p>
  );
};

export default StarRating;
