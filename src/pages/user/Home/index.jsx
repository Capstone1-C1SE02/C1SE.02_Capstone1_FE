import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/user/Form/error-message";
import { useState } from "react";

function Home() {
  const [chonAnh, setChonAnh] = useState("/images/noPicture.svg");
  const [tenAnh, setTenAnh] = useState("Chưa có tệp nào được chọn");

  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setTenAnh(e.target.files[0].name);
      setChonAnh(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImageSelected = () => {
    if (chonAnh === "/images/noPicture.svg") {
      return "";
    }
    return "w-full h-full object-cover rounded-[10px]";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Thông tin không chính xác!");
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
        <div className="flex w-full items-center gap-[30px]">
          <label htmlFor="ChonAnh" className="w-[200px] text-right font-[500]">
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
            {tenAnh}
          </label>
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
    </div>
  );
}

export default Home;
