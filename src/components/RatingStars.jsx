import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const RatingStars = ({ rating }) => {
  const maxStars = 5;

  return (
    <div className="rating-stars">
      {[...Array(maxStars)].map((_, index) => (
        index < rating ? (
          <FaStar key={index} className="star filled" />
        ) : (
          <FaRegStar key={index} className="star empty" />
        )
      ))}
    </div>
  );
};

export default RatingStars;
