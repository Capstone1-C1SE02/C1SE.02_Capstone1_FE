import axiosConfig from "@/axiosConfig";

const AcademicProgram = async () => {
  let res = [];
  try {
    res = await axiosConfig.get("academicprogram");
  } catch (error) {
    console.log(error);
  }
  return res;
};

export default AcademicProgram;
