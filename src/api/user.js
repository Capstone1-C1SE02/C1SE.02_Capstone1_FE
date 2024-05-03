import axios from "@/api/axios";

const getCaptcha = async () => {
  return await axios.get("/api/generate-captcha");
};

const searchByTextField = async ({ data }) => {
  return await axios.post("/api/informationretrievalthroughtext", data);
};

const searchByPicture = async ({ picture }) => {
  const formData = new FormData();
  formData.append("picture", picture);
  return await axios.post("/search", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { getCaptcha, searchByTextField, searchByPicture };
