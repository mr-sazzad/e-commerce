import { MdStarBorder, MdOutlineStarPurple500 } from "react-icons/md";

const RatingToStar = ({ rating }: { rating: number }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating - filledStars >= 0.5;

  const starIcons = [];

  for (let i = 0; i < filledStars; i++) {
    starIcons.push(
      <MdOutlineStarPurple500 key={i} className="text-orange-500" />
    );
  }

  if (hasHalfStar) {
    starIcons.push(<MdStarBorder key="half" className="text-orange-500" />);
  }

  const remainingStars = 5 - starIcons.length;
  for (let i = 0; i < remainingStars; i++) {
    starIcons.push(
      <MdStarBorder key={`empty-${i}`} style={{ color: "#B0B0B0" }} />
    ); // Set color to gray
  }

  return <div className="flex">{starIcons}</div>;
};

export default RatingToStar;
