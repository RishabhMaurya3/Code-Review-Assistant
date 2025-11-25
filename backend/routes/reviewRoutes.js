const express = require("express");
const multer = require("multer");
const {
  createReview,
  getAllReviews,
  getReviewById
} = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use(protect); // all routes below require JWT

router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.post("/", upload.single("file"), createReview);

module.exports = router;
