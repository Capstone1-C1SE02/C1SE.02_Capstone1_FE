import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import Item from "@/components/user/Result/item";
import Row from "@/components/user/Result/row";

function Result() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <main className="pb-5">
      <div className="relative w-full">
        <IoArrowBackOutline
          className="absolute top-[50%] -translate-y-2/4 cursor-pointer text-3xl text-[--primaryBackgroundColor]"
          onClick={handleClick}
        />
        <h1 className="text-center text-[30px] font-[700] text-[--primaryTextColor]">
          Thông tin văn bằng
        </h1>
      </div>
      <div className="flex flex-wrap gap-5 px-[70px] pt-10">
        <Row>
          <Item label="Số hiệu Văn bằng" value="01032002" />
          <Item label="Họ và Tên" value="Nguyễn Hữu Tuấn" />
        </Row>
        <Row>
          <Item label="Số vào Sổ" value="25/10/2024" />
          <Item label="Ngày sinh" value="01/03/2002" />
        </Row>
        <Row>
          <Item label="Ngày nhận" value="25/12/2024" />
          <Item label="Mã Sinh Viên" value="26211239001" />
        </Row>
        <Row>
          <Item label="Chuyên ngành" value="Công nghệ thông tin" />
          <Item label="Ngành Đào tạo" value="Kỹ Sư phần mềm" />
        </Row>
        <Row>
          <Item
            label="Số QĐ Công nhận Tốt nghiệp"
            value="SQĐ 0103-2002"
            size="large"
          />
        </Row>
        <Row>
          <Item label="Xếp loại Tốt nghiệp" value="Xuất sắc" size="large" />
        </Row>
      </div>
    </main>
  );
}

export default Result;
