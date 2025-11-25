import React, { useEffect, useState } from "react";
import UploadForm from "../components/UploadForm";
import ReportList from "../components/ReportList";
import ReportDetail from "../components/ReportDetail";
import { getReviews, getReviewById } from "../api/reviewApi";
import "./Dashboard.css"; // Custom CSS

const Dashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [loadingReview, setLoadingReview] = useState(false);

  const loadReviews = async () => {
    try {
      const data = await getReviews();
      setReviews(data);
      if (data.length && !selectedReviewId) {
        setSelectedReviewId(data[0]._id);
      }
    } catch (err) {
      console.error("Failed to load reviews:", err);
    }
  };

  const loadReviewDetail = async (id) => {
    try {
      setLoadingReview(true);
      const data = await getReviewById(id);
      setSelectedReview(data);
    } catch (err) {
      console.error("Failed to load review:", err);
    } finally {
      setLoadingReview(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  useEffect(() => {
    if (selectedReviewId) {
      loadReviewDetail(selectedReviewId);
    }
  }, [selectedReviewId]);

  const handleNewReview = (review) => {
    setReviews((prev) => [review, ...prev]);
    setSelectedReviewId(review._id);
    setSelectedReview(review);
  };

  return (
    <main className="dashboard-wrapper">
      <div className="left-panel">
        <UploadForm onNewReview={handleNewReview} />
        <section className="reviews-section">
          <div className="reviews-header">
            <h2>Past Reviews</h2>
            <span>{reviews.length} total</span>
          </div>
          <ReportList
            reviews={reviews}
            selectedId={selectedReviewId}
            onSelect={setSelectedReviewId}
          />
        </section>
      </div>

      <div className="right-panel">
        {loadingReview && !selectedReview ? (
          <div className="loading-box">
            <p>Loading review details...</p>
          </div>
        ) : (
          <ReportDetail review={selectedReview} />
        )}
      </div>
    </main>
  );
};

export default Dashboard;
