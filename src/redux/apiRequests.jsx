import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
} from "./authSlice";
import axiosConfig from "@/axiosConfig";

export const login = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axiosConfig.post("/login", user);
    dispatch(loginSuccess(res.data["token:"]));
    navigate("/");
  } catch {
    dispatch(loginFailed());
  }
};

export const logout = async (dispatch, navigate) => {
  dispatch(logOutStart());
  try {
    dispatch(logOutSuccess());
    navigate("/login");
  } catch {
    dispatch(logOutFailed());
  }
};
