// client/src/components/Reviews/reviews.jsx
import React, { useEffect, useState } from "react";
import "./reviews.css";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/services";

export const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);

  const total = totalReviews ? totalReviews : "";
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };

  const handleReadMore = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].showFullContent =
      !updatedReviews[index].showFullContent;
    setReviews(updatedReviews);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const movieReviewsData = await fetchMovieReviews(movieId);
      setTotalReviews(movieReviewsData?.length);
      setReviews(movieReviewsData.slice(0, 3));
    };

    if (movieId) {
      fetchReviews();
    }
  }, [movieId]);

  return (
    <div className="reviews-container">
      <h2 className="sectionTitle">
        <span className="review-star">★ </span>
        <span>{total} Movie Reviews</span>
      </h2>
      {totalReviews > 0 ? (
        <>
          {reviews.map((review, index) => (
            <div key={review.id} className="review">
              <div className="review-header">
                <span>Reviewed by</span>
                <span className="review-author">{review.author}</span>
                <span>
                  {new Date(review.created_at).toLocaleDateString(
                    "en-US",
                    dateOptions
                  )}
                </span>
                {review.author_details.rating ? (
                  <>
                    <span className="review-star">★</span>
                    <span className="review-rating">{`${review.author_details.rating}/10`}</span>
                  </>
                ) : (
                  <span className="review-rating">No rating</span>
                )}
              </div>
              <div className="review-content">
                {review.showFullContent
                  ? review.content
                  : `${review.content.slice(0, 100)}...`}
              </div>
              <div className="review-left">
                <span
                  className="review-read-more"
                  onClick={() => handleReadMore(index)}
                >
                  {review.showFullContent ? "Read less" : "Read more"}
                </span>
              </div>
              <div className="review-line"></div>
            </div>
          ))}
          <div className="review-center">
            <span className="review-read-more">Read more reviews</span>
          </div>
        </>
      ) : (
        <div className="no-reviews">
          <span>We don't have any reviews. Do you want to write one? </span>
          <span className="add-review-link">Click here</span>
        </div>
      )}
    </div>
  );
};
