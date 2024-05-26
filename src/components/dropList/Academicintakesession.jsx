import axiosConfig from "@/axiosConfig";

const Academicintakesession = async () => {
  let res = [];
  try {
    res = await axiosConfig.get("academicintakesession");
    console.log("res", res);
  } catch (error) {
    console.log(error);
  }
  return res;
};

export default Academicintakesession;
