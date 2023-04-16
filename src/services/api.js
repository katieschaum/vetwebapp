import axios from "axios";
// import {serviceOptions} from "./services"

const api = axios.create({
  baseURL: "https://vaddb.liamgombart.com/",
  headers: {
    "Content-Type": "application/json",
    "Authentication": "simian_army_makes_chaos",
    "Accept": "application/json"
}, 
});

export default api;