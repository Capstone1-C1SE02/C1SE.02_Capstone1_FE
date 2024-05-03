import { IoArrowBackOutline } from "react-icons/io5";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Item from "@/components/user/Result/item";
import Row from "@/components/user/Result/row";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state?.data;

  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, [data]);

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
          <Item label="Số hiệu Văn bằng" value={data?.CERTIFICATE_NUMBER} />
          <Item label="Họ và Tên" value={data?.STUDENT_NAME} />
        </Row>
        <Row>
          <Item
            label="Số vào Sổ"
            value={data?.NUMBER_ENTERED_INTO_THE_DEGREE_TRACKING_BOOK}
          />
          <Item label="Ngày sinh" value={data?.BIRTH_DATE} />
        </Row>
        <Row>
          <Item label="Năm tốt nghiệp" value={data?.GRADUATION_YEAR} />
          <Item label="Mã Sinh Viên" value={data?.STUDENT_ID_NUMBER} />
        </Row>
        <Row>
          <Item
            label="Ngành Đào tạo"
            value={data?.ACADEMIC_PROGRAM.DEGREE.DEGREE_NAME}
          />
          <Item label="Loại hình đào tạo" value={data?.MODE_OF_STUDY} />
        </Row>
        <Row>
          <Item
            label="Chuyên ngành"
            value={data?.ACADEMIC_PROGRAM.ACADEMIC_PROGRAM_NAME}
            size="large"
          />
        </Row>
        <Row>
          <Item
            label="Xếp loại Tốt nghiệp"
            value={data?.CLASSIFIED_BY_ACADEMIC_RECORDS}
            size="large"
          />
        </Row>
      </div>
    </main>
  );
}

export default Result;
