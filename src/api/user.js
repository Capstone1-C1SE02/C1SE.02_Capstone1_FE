import axios from "@/api/axios";

const getCaptcha = async () => {
  return await axios.get("/api/generate-captcha");
};

const searchByTextField = async ({ data }) => {
  return await axios.post("/api/informationretrievalthroughtext", data);
};

const searchByPicture = async ({ image }) => {
  if (!image) {
    throw new Error("No image provided");
  }

  const formData = new FormData();
  formData.append("image", image);

  try {
    return axios.post("/api/informationretrievalthroughimage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error in searchByPicture:", error);
    throw error;
  }
};

export { getCaptcha, searchByTextField, searchByPicture };
