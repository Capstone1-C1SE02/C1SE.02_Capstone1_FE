import { jwtDecode } from "jwt-decode";

const getAdminId = async () => {
  const localStorageData =
    window.localStorage?.getItem("persist:auth") &&
    JSON.parse(window.localStorage.getItem("persist:auth"));
  const dataRaw = localStorageData && localStorageData?.access;
  const token = JSON.parse(dataRaw);

  const dataDecode = token && jwtDecode(token);

  const admin = dataDecode && dataDecode.user_id;
  console.log("admin ultls", admin);
  return admin;
};

export default getAdminId;
