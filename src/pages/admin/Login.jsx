import React,{ useState } from "react";
import { InputForm } from "@/components/ui";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [payload, setPayload] = useState({
    username: '',
    password: '',
    email:''
  })

     
    const handleSetIsloggedIn = () => {
        setIsLoggedIn(!isLoggedIn)
    }
  return (
        <div className="min-h-screen flex flex-col items-center justify-center w-full bg-secondary">
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 w-1/4">
        <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200 ">{ isLoggedIn ?  'Đăng nhập': 'Đăng kí'}</h1>
          
        <div>
          <InputForm text={"Địa chỉ email"}></InputForm>
          {!isLoggedIn && <InputForm text={"Tên người dùng"}></InputForm>}
          <InputForm text={"Mật khẩu"}></InputForm>
          </div>
        <div  className="flex items-center justify-between mb-4">
        {isLoggedIn && <div className="flex items-center">
					<input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none" checked/>
					<label for="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Nhớ tôi</label>
				</div>}
				<span onClick={handleSetIsloggedIn}
                      className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">{ isLoggedIn ? "Tạo tài khoản mới" : "Bạn dã có tài khoản"}</span>
                </div>
        
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-full">
                  { isLoggedIn? "Đăng nhập": "Đăng kí"}
</button>

    </div>
    </div>

  );
};

export default Login;
