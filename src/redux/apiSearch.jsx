import { searchFailed, searchStart, searchSuccess } from "@/redux/searchSlice";
import axiosConfig from "@/axiosConfig";

export const searchStudent = async (idStudent, dispatch) => {
  dispatch(searchStart());
  try {
    const res = await axiosConfig.post(
      `/search/student?studentID=${idStudent}`,
    );
    console.log(res.data.data);
    dispatch(searchSuccess(res.data.data));
  } catch {
    dispatch(searchFailed());
  }
};
