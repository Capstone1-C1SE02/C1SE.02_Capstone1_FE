import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/user/Form/error-message";
import FormField from "@/components/user/Form/form-field";
import { searchByTextField, getCaptcha } from "@/api/user";

function SearchByText() {
  const navigate = useNavigate();

  const [soHieuVanBang, setSoHieuVanBang] = useState("123");
  const [soVaoSo, setSoVaoSo] = useState("321");
  const [hoTen, setHoTen] = useState("Lê Văn Tiến");
  const [keyMaXacNhan, setKeyMaXacNhan] = useState("");
  const [maXacNhan, setMaXacNhan] = useState("");
  const [anhMaXacNhan, setAnhMaXacNhan] = useState("/images/captchaImage.png");

  const [message, setMessage] = useState("");

  useEffect(() => {
    getCaptchaImage();
  }, []);

  const getCaptchaImage = useCallback(async () => {
    try {
      const response = await getCaptcha();
      if (response.status === 200 && response.data) {
        setAnhMaXacNhan(`http://localhost:8000/${response.data.image_url}`);
        setKeyMaXacNhan(response.data.key);
      }
    } catch (error) {
      console.log("getCaptchaImage -> error", error);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setMessage("");
        if (
          soHieuVanBang === "" ||
          soVaoSo === "" ||
          hoTen === "" ||
          maXacNhan === ""
        ) {
          setMessage("Vui lòng nhập đầy đủ thông tin!");
          return;
        }
        const response = await searchByTextField({
          data: {
            CERTIFICATE_NUMBER: soHieuVanBang,
            NUMBER_ENTERED_INTO_THE_DEGREE_TRACKING_BOOK: soVaoSo,
            STUDENT_NAME: hoTen,
            CAPTCHA_KEY: keyMaXacNhan,
            CAPTCHA_RESPONSE: maXacNhan,
          },
        });
        if (response.status === 200 && response.data.data) {
          navigate("/result", {
            state: {
              data: response.data.data,
            },
          });
        } else {
          setMessage(response.data.message);
          getCaptchaImage();
        }
      } catch (error) {
        console.log("SearchByText -> error", error);
        setMessage(error.response.data.message);
      }
    },
    [soHieuVanBang, soVaoSo, hoTen, maXacNhan],
  );

  return (
    <form
      className="flex flex-grow flex-col items-end space-y-[20px] p-[10px]"
      onSubmit={handleSubmit}
      method="POST"
      autoComplete="off"
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
          image={anhMaXacNhan}
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
