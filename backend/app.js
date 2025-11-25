const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const reviewRoutes = require("./routes/reviewRoutes");
const authRoutes = require("./routes/authRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Code Review Assistant API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
