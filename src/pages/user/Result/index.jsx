import { IoArrowBackOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Item from "@/components/user/Result/item";
import Row from "@/components/user/Result/row";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const levelTypes = [
    {
      ACADEMIC_LEVEL_TYPE_ID: 1,
      ACADEMIC_LEVEL_TYPE_NAME: "Đại học",
    },
    {
      ACADEMIC_LEVEL_TYPE_ID: 2,
      ACADEMIC_LEVEL_TYPE_NAME: "Cao đẳng",
    },
    {
      ACADEMIC_LEVEL_TYPE_ID: 3,
      ACADEMIC_LEVEL_TYPE_NAME: "Thạc sĩ",
    },
    {
      ACADEMIC_LEVEL_TYPE_ID: 4,
      ACADEMIC_LEVEL_TYPE_NAME: "Tiến sĩ",
    },
  ];

  const [levelType, setLevelType] = useState("");

  // Get data from the previous page
  const data = location.state?.data;

  // const [data, setData] = useState({});

  // Code below is used to redirect to the home page if there is no data
  useEffect(() => {
    if (!data) {
      navigate("/");
    }

    getLevelType(data?.MODE_OF_STUDY);
  }, [data]);

  const getLevelType = (id) => {
    const levelType = levelTypes.find((levelType) => {
      return levelType.ACADEMIC_LEVEL_TYPE_ID === id;
    });
    setLevelType(levelType?.ACADEMIC_LEVEL_TYPE_NAME);
  };

  // Test UI
  // useEffect(() => {
  //   const newData = {
  //     CERTIFICATE_NUMBER: "123456",
  //     STUDENT_NAME: "Nguyễn Văn A",
  //     NUMBER_ENTERED_INTO_THE_DEGREE_TRACKING_BOOK: "123456",
  //     BIRTH_DATE: "01/01/2000",
  //     GRADUATION_YEAR: "2020",
  //     STUDENT_ID_NUMBER: "123456",
  //     ACADEMIC_PROGRAM: {
  //       DEGREE: {
  //         DEGREE_NAME: "Cử nhân",
  //       },
  //       ACADEMIC_PROGRAM_NAME: "Kỹ thuật phần mềm",
  //     },
  //     MODE_OF_STUDY: "Chính quy",
  //     CLASSIFIED_BY_ACADEMIC_RECORDS: "Giỏi",
  //   };
  //   setData(newData);
  // }, []);

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
      <div className="flex flex-wrap gap-4 pt-10 lg:gap-5 lg:px-[70px]">
        <Row>
          <Item label="Số hiệu Văn bằng:" value={data?.CERTIFICATE_NUMBER} />
          <Item label="Họ và Tên:" value={data?.STUDENT?.STUDENT_NAME} />
        </Row>
        <Row>
          <Item
            label="Số vào Sổ:"
            value={data?.NUMBER_ENTERED_INTO_THE_DEGREE_TRACKING_BOOK}
          />
          <Item label="Ngày sinh:" value={data?.BIRTH_DATE} />
        </Row>
        <Row>
          <Item label="Năm tốt nghiệp:" value={data?.GRADUATION_YEAR} />
          <Item label="Mã Sinh Viên:" value={data?.STUDENT_ID_NUMBER} />
        </Row>
        <Row>
          <Item
            label="Ngành Đào tạo:"
            value={data?.ACADEMIC_PROGRAM?.DEGREE?.DEGREE_NAME}
          />
          <Item label="Loại hình đào tạo:" value={levelType} />
        </Row>
        <Row>
          <Item
            label="Chuyên ngành:"
            value={data?.ACADEMIC_PROGRAM?.ACADEMIC_PROGRAM_NAME}
          />
        </Row>
        <Row>
          <Item
            label="Xếp loại Tốt nghiệp:"
            value={data?.CLASSIFIED_BY_ACADEMIC_RECORDS}
          />
        </Row>
      </div>
    </main>
  );
}

export default Result;
