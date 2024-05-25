import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/user/Form/error-message";
import FormField from "@/components/user/Form/form-field";
import { searchByTextField, getCaptcha } from "@/api/user";

function SearchByText() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [soHieuVanBang, setSoHieuVanBang] = useState("");
  const [soVaoSo, setSoVaoSo] = useState("");
  const [hoTen, setHoTen] = useState("");
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
      console.log("Clicked");
      e.preventDefault();
      setLoading(true);
      try {
        setMessage("");
        if (
          soHieuVanBang === "" ||
          soVaoSo === "" ||
          hoTen === "" ||
          maXacNhan === ""
        ) {
          setMessage("Vui lòng nhập đầy đủ thông tin!");
          setLoading(false);
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
        setLoading(false);
        setMessage(error?.response?.data?.message);
      }
    },
    [soHieuVanBang, soVaoSo, hoTen, maXacNhan, loading],
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
          disabled={loading}
        />
        <FormField
          label="Số vào sổ"
          id="SoVaoSo"
          value={soVaoSo}
          setValue={setSoVaoSo}
          disabled={loading}
        />
        <FormField
          label="Họ và tên"
          id="HoTen"
          value={hoTen}
          setValue={setHoTen}
          disabled={loading}
        />
        <FormField
          label="Mã xác nhận"
          id="MaXacNhan"
          value={maXacNhan}
          setValue={setMaXacNhan}
          image={anhMaXacNhan}
          disabled={loading}
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <ErrorMessage message={message} />
        <Button
          className="ml-auto cursor-pointer bg-[--primaryBackgroundColor] px-10 py-2 text-[18px] hover:bg-primary-0.9"
          type="submit"
          disabled={loading}
        >
          Tra cứu
        </Button>
      </div>
    </form>
  );
}

export default SearchByText;
