import React, { useState } from "react";
import { InputForm, Button } from "@/components/admin";
import { useNavigate } from "react-router-dom";
import { login } from "@/redux/apiRequests";
import { useDispatch, useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const token = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleSetIsloggedIn = () => {};

  const handleSubmit = async () => {
    setIsLoading(true);
    await login(payload, dispatch, navigate);
    setIsLoading(false);
    {
      token && toast.warning("Login failed");
    }
  };

  return isLoading ? (
    <div className="flex min-h-screen w-full items-center justify-center bg-secondary">
      <ToastContainer />
      <HashLoader
        color={"#000"}
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  ) : (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-secondary">
      <ToastContainer />
      <div className="h-[396px] w-[638px] rounded-lg bg-white px-8 py-6 shadow-md dark:bg-gray-900">
        <div className="h-[66px] w-[576px]">
          <img
            className="m-auto block h-[50px] w-[170px] text-center"
            src="https://reviewedu.net/wp-content/uploads/2021/09/dai-hoc-duy-tan.png"
            alt="logo"
          />
        </div>
        <div className="flex flex-col items-center justify-center border-t-[1px]">
          <h1 className="my-[20px] text-center text-[30px] font-semibold text-[#C7383EE5]">
            Đăng nhập
          </h1>
          <div
            className={"m-auto flex w-[390px] flex-col gap-[2px] font-[16px]"}
          >
            <InputForm
              className={"!w-[390px]"}
              text={"Tên người dùng"}
              setValue={setPayload}
              keyObject={"username"}
            ></InputForm>

            <InputForm
              typeInput="password"
              text={"Mật khẩu"}
              keyObject={"password"}
              setValue={setPayload}
            ></InputForm>
          </div>
          <div className="mt-10px">
            <Button
              className={"left-0 right-0 m-auto block"}
              text={"Đăng nhập"}
              bgColor={"bg-custom-bg-active-nav"}
              textColor={"text-custom-text-active-nav"}
              justify
              onClick={handleSubmit}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
