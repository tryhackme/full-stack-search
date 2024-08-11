interface StarRatingProps {
  rating?: number;
  maxRating?: number;
}

export function StarRating({ rating = 0, maxRating = 5 }: StarRatingProps) {
  const stars = Array.from({ length: maxRating }, (_, index) => {
    const starValue = index + 1;
    const isFull = rating >= starValue;
    const isHalf = rating >= starValue - 0.5 && rating < starValue;

    return (
      <span
        key={index}
        className={`star ${isFull ? "full" : ""} ${isHalf ? "half" : ""}`}
      >
        &#9733;
      </span>
    );
  });

  return (
    <div className="star-rating">
      {stars}
      <p className="sr-only">{rating} Stars</p>
    </div>
  );
}
