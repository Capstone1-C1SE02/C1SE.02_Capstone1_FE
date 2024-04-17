import axios from "axios";
// require("dotenv").config();

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // gắn token vào header
    // let token =
    //   window.localStorage.getItem("persist:auth") &&
    //   JSON.parse(window.localStorage.getItem("persist:auth"))?.token?.slice(
    //     1,
    //     -1,
    //   );
    // config.headers = {
    //   authorization: token ? `Bearer ${token}` : null,
    // };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default instance;
