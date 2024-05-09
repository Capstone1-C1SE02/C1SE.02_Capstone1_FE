import axiosConfig from "@/axiosConfig";

const Degree = async () => {
  let res = [];
  try {
    res = await axiosConfig.get("degree");
  } catch (error) {
    console.log(error);
  }
  return res;
};

export default Degree;
