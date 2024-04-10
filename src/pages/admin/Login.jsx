import React, { useState } from "react";
import { InputForm } from "@/components/admin";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [payload, setPayload] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleSetIsloggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-secondary">
      <div className="w-1/4 rounded-lg bg-white px-8 py-6 shadow-md dark:bg-gray-900">
        <h1 className="mb-4 text-center text-2xl font-bold dark:text-gray-200 ">
          {isLoggedIn ? "Đăng nhập" : "Đăng kí"}
        </h1>

        <div>
          <InputForm text={"Địa chỉ email"}></InputForm>
          {!isLoggedIn && <InputForm text={"Tên người dùng"}></InputForm>}
          <InputForm text={"Mật khẩu"}></InputForm>
        </div>
        <div className="mb-4 flex items-center justify-between">
          {isLoggedIn && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:outline-none focus:ring-indigo-500"
                checked
              />
              <label
                for="remember"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                Nhớ tôi
              </label>
            </div>
          )}
          <span
            onClick={handleSetIsloggedIn}
            className="cursor-pointer text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isLoggedIn ? "Tạo tài khoản mới" : "Bạn dã có tài khoản"}
          </span>
        </div>

        <button class="w-full rounded border border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          {isLoggedIn ? "Đăng nhập" : "Đăng kí"}
        </button>
      </div>
    </div>
  );
};

export default Login;
