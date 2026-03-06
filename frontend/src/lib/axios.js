import axios from "axios";

const instance = axios.create({
  baseURL: "https://ethnic-production-manager.onrender.com/products",
});

export default instance;
