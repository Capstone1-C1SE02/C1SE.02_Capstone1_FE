import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

instance.interceptors.request.use(
  function (config) {
    try {
      let data =
        window.localStorage?.getItem("persist:auth") &&
        JSON.parse(window.localStorage.getItem("persist:auth"));
      const dataRaw = data && data?.access;
      const token = JSON.parse(dataRaw);

      console.log("token storage TOKEN", token);
      config.headers = {
        authorization: token ? `Bearer ${token}` : "",
      };

      console.log("ok11111 ");
      return config;
    } catch (error) {
      console.log(error);
    }
  },
  function (error) {
    return Promise.reject(error, "lỗi token");
  },
);
let retryCount = 0;

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    let data =
      window.localStorage?.getItem("persist:auth") &&
      JSON.parse(window.localStorage.getItem("persist:auth"));

    const refreshRaw = data.refresh;
    const refresh = JSON.parse(refreshRaw);
    console.log("REFRESH before call api", refresh);

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      retryCount < 6
    ) {
      originalRequest._retry = true;
      retryCount++;
      try {
        const newAccessToken = await instance.post("/token/refresh/", {
          refresh,
        });
        const newAccess = newAccessToken?.data?.access;
        const newRefresh = newAccessToken?.data?.refresh;
        console.log("access after call api ", newAccess);
        console.log("refresh after call api ", newRefresh);

        const localStorageDataRaw = JSON.parse(
          localStorage.getItem("persist:auth"),
        );

        const newAccess1 = `"${newAccess}"`;
        const newRefresh1 = `"${newRefresh}"`;

        localStorageDataRaw.refresh = newRefresh1;
        localStorageDataRaw.access = newAccess1;
        console.log("localStorageData2", localStorageDataRaw.refresh);
        console.log("localStorageData3", localStorageDataRaw);
        localStorage.setItem(
          "persist:auth",
          JSON.stringify(localStorageDataRaw),
        );

        originalRequest.headers.Authorization = newAccess
          ? `Bearer ${newAccess}`
          : "";

        return instance(error.config);
      } catch (refreshError) {
        let alertShown = false;
        if (!alertShown) {
          alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại");
          alertShown = true;
        }
        window.location.href = "/login";
        localStorage.clear();
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
