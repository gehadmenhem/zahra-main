import React, { useState } from "react";
import "./reviews.css";

function ReviewCarousel({ reviews }) {
  const [currentIndex, setCurrentIndex] = useState(0);

 if (!reviews || reviews.length === 0) {
  return (
    <div className="review-carousel">
      <h3 className="review-title">Customer Reviews</h3>
      <div className="review-card">
        <h4 className="review-name">No Reviews</h4>
        <div className="star-rating">
          {[...Array(5)].map((_, index) => (
            <span key={index} className="star">☆</span>
          ))}
        </div>
        <p className="review-comment">"There are no reviews yet. Be the first to leave one!"</p>
        <span className="review-counter">0 / 0</span>
      </div>
    </div>
  );
}


  const { name, rating, comment, date } = reviews[currentIndex];

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="review-carousel">
      <h3 className="review-title">Customer Reviews</h3>
      <div className="review-card">
        <h4 className="review-name">{name}</h4>
        <div className="star-rating">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={index < rating ? "star filled" : "star"}
            >
              ★
            </span>
          ))}
        </div>
        <p className="review-comment">"{comment}"</p>
        {date && (
          <small className="review-date">{date.split("T")[0]}</small>
        )}
        <span className="review-counter">
          {currentIndex + 1} / {reviews.length}
        </span>
      </div>

      <div className="review-controls">
        <button className="btn" onClick={prevReview} aria-label="Previous Review">
          &lt; Prev
        </button>
        
        <button className="btn" onClick={nextReview} aria-label="Next Review">
          Next &gt;
        </button>
      </div>
    </div>
  );
}

export default ReviewCarousel;
