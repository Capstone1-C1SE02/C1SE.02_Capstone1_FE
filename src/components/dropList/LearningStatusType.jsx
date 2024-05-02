import axiosConfig from "@/axiosConfig";

const LearningStatusType = async () => {
  let res = [];
  try {
    res = await axiosConfig.get("learningstatustype");
  } catch (error) {
    console.log(error);
  }
  return res;
};

export default LearningStatusType;
