import axios from "axios";
import { loginFailed, loginStart, loginSuccess } from "./authSlice";

export const login = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/v1/auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch {
    dispatch(loginFailed());
  }
};
