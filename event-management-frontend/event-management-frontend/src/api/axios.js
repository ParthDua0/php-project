import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost/event-management/index.php",
  withCredentials: true 
});

export default API;