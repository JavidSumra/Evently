export const API_ENDPOINT =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3008/api/v1"
    : "https://evently-backend-jiec.onrender.com/api/v1";
