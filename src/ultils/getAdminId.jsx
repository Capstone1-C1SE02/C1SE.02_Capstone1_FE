import { jwtDecode } from "jwt-decode";

const getAdminId = () => {
  const localStorageData =
    window.localStorage?.getItem("persist:auth") &&
    JSON.parse(window.localStorage.getItem("persist:auth"));
  const dataRaw = localStorageData && localStorageData?.access;
  const token = JSON.parse(dataRaw);

  const dataDecode = jwtDecode(token);
  const admin = dataDecode.user_id;
  return admin;
};

export default getAdminId;
