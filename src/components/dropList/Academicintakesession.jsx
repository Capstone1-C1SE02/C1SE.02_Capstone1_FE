import axiosConfig from "@/axiosConfig";

const Academicintakesession = async () => {
  let res = [];
  try {
    res = await axiosConfig.get("academicintakesession");
  } catch (error) {
    console.log(error);
  }
  return res;
};

export default Academicintakesession;
