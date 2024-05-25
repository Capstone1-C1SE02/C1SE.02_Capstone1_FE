import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/user/Form/error-message";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchByPicture } from "@/api/user";
import { cn } from "@/lib/utils";

function Home() {
  const [chonAnh, setChonAnh] = useState("/images/noPicture.svg");
  const [anh, setAnh] = useState("Chưa có tệp nào được chọn");
  const [file, setFile] = useState(null);

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setMessage("");
      setFile(e.target.files[0]);
      setAnh(e.target.files[0].name);
      setChonAnh(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImageSelected = () => {
    if (chonAnh === "/images/noPicture.svg") {
      return "";
    }
    return "w-full h-full object-cover rounded-[10px]";
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      setMessage("");
      if (chonAnh === "/images/noPicture.svg") {
        setMessage("Vui lòng chọn ảnh trước khi tra cứu");
        setLoading(false);
        return;
      }
      const response = await searchByPicture({ image: file });

      navigate("/result", { state: { data: response.data.data } });
    } catch (error) {
      console.log("Home -> error", error);
      setLoading(false);
      setMessage("Ảnh không hợp lệ. Vui lòng gửi lại ảnh!");
    }
  };

  return (
    <div className="flex flex-grow flex-col gap-[15px]">
      <div className="mt-[10px] flex min-h-[180px] w-full items-center justify-center overflow-hidden rounded-[10px] bg-[#E8EBED]">
        <img src={chonAnh} alt="Picture" className={handleImageSelected()} />
      </div>
      <form
        method="POST"
        className="flex flex-col items-end gap-[20px]"
        onSubmit={handleSubmit}
      >
        <div
          className={cn(
            "flex w-full flex-col gap-2 md:flex-row md:items-center md:gap-8",
            { "cursor-none opacity-50": loading },
          )}
        >
          <label
            htmlFor="ChonAnh"
            className="font-[500] md:text-right lg:w-[150px] xl:w-[200px]"
          >
            Chọn ảnh
          </label>
          <input
            type="file"
            name="ChonAnh"
            id="ChonAnh"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <label
            htmlFor="ChonAnh"
            className="flex-grow cursor-pointer rounded-md border border-[#AEB8C2] p-[10px] text-[16px] leading-none focus:outline-none"
          >
            {anh}
          </label>
        </div>
        <div className="flex w-full flex-wrap items-center justify-between gap-2 md:flex-row md:gap-0">
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
    </div>
  );
}

export default Home;
