import { loginFailed, loginStart, loginSuccess } from "./authSlice";
import axiosConfig from "@/axiosConfig";

export const login = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axiosConfig.post("/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch {
    dispatch(loginFailed());
  }
};
