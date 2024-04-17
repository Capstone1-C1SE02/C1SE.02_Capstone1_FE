import axios from "axios";
// require("dotenv").config();

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
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
    //   )
    config.headers = {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEzMzUyOTY5LCJpYXQiOjE3MTMzNDY5NjksImp0aSI6IjMyNWQ1OTNjMjViYjQ4MTE5MGU1MzA2NTA0YjI0YjJiIiwidXNlcl9pZCI6MX0.Rhlnq9xeETlmMJnFBDFLaANboAEN_F3nlDLKcCr72sY",
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default instance;
