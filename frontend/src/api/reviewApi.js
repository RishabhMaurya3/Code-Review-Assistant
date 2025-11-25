import client from "./client";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/reviews";

export const getReviews = async () => {
  const res = await client.get("/reviews");
  return res.data;
};

export const getReviewById = async (id) => {
  const res = await client.get(`/reviews/${id}`);
  return res.data;
};

// Create review using pasted code
export const createReviewFromText = async ({ code, language }) => {
  const res = await client.post("/reviews", { code, language });
  return res.data;
};

// Create review using uploaded file
export const createReviewFromFile = async (file, language) => {
  const formData = new FormData();
  if (file) formData.append("file", file);
  if (language) formData.append("language", language);

  const token = localStorage.getItem("cra_token");

  const res = await axios.post(BASE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
  return res.data;
};
