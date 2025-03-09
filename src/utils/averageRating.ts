export const averageRating = (ratings: { rating: number }[]) => {
  if (!ratings || ratings.length === 0) {
    return "0/5";
  }

  const total = ratings.reduce((pre, next) => pre + (next.rating || 0), 0);
  const average = total / ratings.length;

  return `${average.toFixed(1)}/5`;
};
