import React, { useState } from "react";
import { InputForm, Button } from "@/components/admin";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/redux/apiRequests";
import { useDispatch, useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";

import { LogIn } from "lucide-react";

const Login = () => {
  const token = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [invalidFields, setInvalidFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({
    username: "",
    password: "",
  });

  const handleSetIsloggedIn = () => {};

  const handleSubmit = async () => {
    let invalids = validate(payload);
    console.log("invalids", invalids, invalidFields);
    if (+invalids == +0) {
      setIsLoading(true);
      await login(payload, dispatch, navigate);
      setIsLoading(false);
    } else {
      console.log("no ok");
    }
  };
  const validate = (payload) => {
    let invalids = 0;
    let fields = Object.entries(payload);
    fields.forEach((item) => {
      if (item[1] === "") {
        setInvalidFields((prev) => [
          ...prev,
          {
            name: item[0],
            message: "Bạn không được bỏ trống trường này.",
          },
        ]);
        invalids++;
      }
    });
    fields.forEach((item) => {
      switch (item[0]) {
        case "password":
          if (item[1].length < 6) {
            setInvalidFields((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Mật khẩu phải có tối thiểu 6 kí tự.",
              },
            ]);
            invalids++;
          }
          break;

        default:
          break;
      }
    });
    return invalids;
  };

  return isLoading ? (
    <div className="flex min-h-screen w-full items-center justify-center bg-backLayout">
      <HashLoader
        color={"#000"}
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  ) : (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-backLayout">
      <div className="h-[396px] w-[638px] rounded-lg bg-white px-8 py-6 shadow-md dark:bg-gray-900">
        <div className="relative flex h-[66px] w-[576px] items-center">
          <img className="m-auto flex" src="/images/logo.svg" alt="logo" />
          <div className="absolute right-0 ">
            <Link className="block h-5 w-[40px] font-bold" to={"/"}>
              <LogIn />
            </Link>
          </div>
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
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
            ></InputForm>

            <InputForm
              typeInput="password"
              text={"Mật khẩu"}
              keyObject={"password"}
              setValue={setPayload}
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
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
