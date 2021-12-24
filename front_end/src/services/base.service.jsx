import axios from "axios";
const API_URL = "https://ltwnc-final.herokuapp.com/api";

export default axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});
