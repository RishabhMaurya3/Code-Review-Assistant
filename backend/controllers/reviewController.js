const Review = require("../models/Review");
const { reviewCodeWithLLM } = require("../services/llmService");
const { autoDetectLanguage } = require("../services/languageService");

// POST /api/reviews
const createReview = async (req, res, next) => {
  try {
    let code = req.body.code;
    let language = req.body.language; // may be undefined or "auto"
    let filename;

    // Check if a file was uploaded
    if (req.file) {
      filename = req.file.originalname;
      code = req.file.buffer.toString("utf-8");
    }

    // Validate input
    if (!code || code.trim().length === 0) {
      return res.status(400).json({ message: "Code is required." });
    }

    // Auto detect language if needed
    const detectedLanguage = autoDetectLanguage({
      filename,
      code,
      providedLanguage: language,
    });

    // console.log("reviewController => ",detectedLanguage,req.body)

    // Call the LLM for code review
    const { fullReview, summary } = await reviewCodeWithLLM(code, detectedLanguage);

    console.log("reviewController => ",fullReview)

    // Store the review in database
    const review = await Review.create({
      user: req.user._id,
      filename,
      language: detectedLanguage,
      code,
      llmResponse: fullReview,
      summary,
    });

    // Return detected language along with full review
    return res.status(201).json({
      ...review.toObject(),
      detectedLanguage,
    });

  } catch (err) {
    next(err);
  }
};

// GET /api/reviews (only for logged-in user)
const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

// GET /api/reviews/:id (only if owned by user)
const getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(review);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
};
