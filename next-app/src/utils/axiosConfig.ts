import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

Axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      //? Operation if successfully ....
    }
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("Unauthorized. Please log in.");
          break;
        case 403:
          console.error("Forbidden. You don't have permission");
          break;
        case 404:
          console.error("Not Found. The resource doesn't exist.");
          break;
        default:
          console.error("Server responded with error:", error.response.data);
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default Axios;
