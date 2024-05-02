import axiosConfig from "@/axiosConfig";

const Student = async () => {
  let res = [];
  try {
    res = await axiosConfig.get("student");
  } catch (error) {
    console.log(error);
  }
  return res;
};

export default Student;
