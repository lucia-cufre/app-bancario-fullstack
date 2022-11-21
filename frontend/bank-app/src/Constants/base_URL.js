export const BASE_URL = "http://localhost:3003/ng-cash";

export const axiosConfig = {
  headers: {
    Authorization: localStorage.getItem("jwt"),
  },
};
