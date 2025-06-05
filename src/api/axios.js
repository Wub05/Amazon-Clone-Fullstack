import axios from "axios";
export const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/clone-43875/us-central1/api", //localhost

  //deployed on render
  baseURL: "https://amazon-clone-backend-4jo9.onrender.com",
});
