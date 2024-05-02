import axiosConfig from "@/axiosConfig";

const Curiculum = async () => {
  let res = [];
  try {
    res = await axiosConfig.get("curriculum");
    console.log("axiosConfig.get", res);
  } catch (error) {
    console.log(error);
  }
  return res;
};

export default Curiculum;
