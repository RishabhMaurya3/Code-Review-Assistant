import React from "react";
import "./ReportList.css";

const ReportList = ({ reviews, selectedId, onSelect }) => {
  if (!reviews || reviews.length === 0) {
    return <div className="no-reviews">No reviews yet. Submit some code.</div>;
  }

  return (
    <div className="review-list-container">
      {reviews.map((review) => {
        const isActive = selectedId === review._id;
        return (
          <button
            key={review._id}
            onClick={() => onSelect(review._id)}
            className={`review-list-item ${isActive ? "active" : ""}`}
          >
            <div className="review-header">
              <span className="review-title">
                {review.filename || "Pasted Code"}
              </span>
              <span className={`language-tag ${isActive ? "active-tag" : ""}`}>
                {review.language || review.detectedLanguage || "Unknown"}
              </span>
            </div>

            <p className="review-summary">
              {review.summary || review.llmResponse?.slice(0, 120) || ""}
            </p>

            <p className="review-date">
              {new Date(review.createdAt).toLocaleString()}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default ReportList;
