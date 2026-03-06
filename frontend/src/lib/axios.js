import axios from "axios";

const instance = axios.create({
  baseURL: "https://ethnic-production-manager.onrender.com",
});

export default instance;
