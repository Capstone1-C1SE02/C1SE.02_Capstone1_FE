import axiosConfig from "@/axiosConfig";

const Academicleveltype = async () => {
  let res = [];
  try {
    res = await axiosConfig.get("academicleveltype");
  } catch (error) {
    console.log(error);
  }
  return res;
};

export default Academicleveltype;
