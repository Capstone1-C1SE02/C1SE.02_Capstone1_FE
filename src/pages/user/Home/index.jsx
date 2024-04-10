import { useState } from "react";

import SideBar from "@/components/user/SideBar";
import { Button } from "@/components/ui/button";

function Home() {
  const [soHieuVanBang, setSoHieuVanBang] = useState("");
  const [soVaoSo, setSoVaoSo] = useState("");
  const [hoTen, setHoTen] = useState("");
  const [maXacNhan, setMaXacNhan] = useState("");

  const inputClassName = () => {
    return "text-[16px] p-[10px] border border-[#5B6B79] focus:outline-none focus:ring-2 focus:ring-[#607180] focus:ring-opacity-50 rounded-md flex-grow leading-none";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Số hiệu văn bằng:", soHieuVanBang);
    console.log("Số vào sổ:", soVaoSo);
    console.log("Họ tên:", hoTen);
    console.log("Mã xác nhận:", maXacNhan);
  };

  return (
    <main className="flex min-h-min flex-col gap-[20px] rounded-[20px] bg-white p-[30px]">
      <h1 className="text-[30px] font-bold">Tra cứu thông tin văn bằng</h1>
      <div className="flex flex-grow items-center gap-[30px]">
        <SideBar />
        <div className="h-[100%] w-[3px] rounded-full bg-[--primaryBackgroundColor]" />
        <form
          className="flex w-full flex-col items-center space-y-[20px] p-[10px]"
          onSubmit={handleSubmit}
          method="POST"
        >
          <div className="w-full space-y-[15px]">
            <div className="flex items-center gap-[30px]">
              <label
                htmlFor="SoHieuVanBang"
                className="w-[200px] text-right font-[500]"
              >
                Số hiệu Văn bằng
              </label>
              <input
                type="text"
                name="SoHieuVanBang"
                id="SoHieuVanBang"
                value={soHieuVanBang}
                onChange={(e) => setSoHieuVanBang(e.target.value)}
                className={inputClassName()}
              />
            </div>
            <div className="flex items-center gap-[30px]">
              <label
                htmlFor="SoVaoSo"
                className="w-[200px] text-right font-[500]"
              >
                Số vào sổ
              </label>
              <input
                type="text"
                name="SoVaoSo"
                id="SoVaoSo"
                value={soVaoSo}
                onChange={(e) => setSoVaoSo(e.target.value)}
                className={inputClassName()}
              />
            </div>
            <div className="flex items-center gap-[30px]">
              <label
                htmlFor="HoTen"
                className="w-[200px] text-right font-[500]"
              >
                Họ và tên
              </label>
              <input
                type="text"
                name="HoTen"
                id="HoTen"
                value={hoTen}
                onChange={(e) => setHoTen(e.target.value)}
                className={inputClassName()}
              />
            </div>
            <div className="flex items-center gap-[30px]">
              <label
                htmlFor="MaXacNhan"
                className="w-[200px] flex-shrink text-right font-[500]"
              >
                Mã xác nhận
              </label>
              <div className="flex flex-grow items-center gap-[30px]">
                <input
                  type="text"
                  name="MaXacNhan"
                  id="MaXacNhan"
                  value={maXacNhan}
                  onChange={(e) => setMaXacNhan(e.target.value)}
                  className={inputClassName()}
                />
                <img
                  className="flex h-[100%] w-[150px] rounded-md border border-[#5B6B79] object-cover"
                  src="/images/captchaImage.png"
                  alt="Captcha"
                />
              </div>
            </div>
          </div>
          <Button
            className="hover:bg-primary-0.9 cursor-pointer bg-[--primaryBackgroundColor] px-10 py-2"
            type="submit"
            asChild
          >
            <span className="text-[20px]">Tra cứu</span>
          </Button>
        </form>
      </div>
    </main>
  );
}

export default Home;
