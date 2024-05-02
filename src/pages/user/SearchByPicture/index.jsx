import { useState } from "react";

import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/user/Form/error-message";
import FormField from "@/components/user/Form/form-field";

function SearchByText() {
  const [soHieuVanBang, setSoHieuVanBang] = useState("");
  const [soVaoSo, setSoVaoSo] = useState("");
  const [hoTen, setHoTen] = useState("");
  const [maXacNhan, setMaXacNhan] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Thông tin không chính xác!");
  };

  return (
    <form
      className="flex flex-grow flex-col items-end space-y-[20px] p-[10px]"
      onSubmit={handleSubmit}
      method="POST"
    >
      <div className="w-full space-y-[15px]">
        <FormField
          label="Số hiệu Văn bằng"
          id="SoHieuVanBang"
          value={soHieuVanBang}
          setValue={setSoHieuVanBang}
        />
        <FormField
          label="Số vào sổ"
          id="SoVaoSo"
          value={soVaoSo}
          setValue={setSoVaoSo}
        />
        <FormField
          label="Họ và tên"
          id="HoTen"
          value={hoTen}
          setValue={setHoTen}
        />
        <FormField
          label="Mã xác nhận"
          id="MaXacNhan"
          value={maXacNhan}
          setValue={setMaXacNhan}
          image="/images/captchaImage.png"
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <ErrorMessage message={message} />
        <Button
          className="ml-auto cursor-pointer bg-[--primaryBackgroundColor] px-10 py-2 text-[18px] hover:bg-primary-0.9"
          type="submit"
        >
          Tra cứu
        </Button>
      </div>
    </form>
  );
}

export default SearchByText;
