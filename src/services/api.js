import axios from "axios";

const api = axios.create({
  baseURL: "https://vaddb.liamgombart.com/api-docs/",
});

export default api;