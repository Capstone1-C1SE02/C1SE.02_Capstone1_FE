import {
  editActionStart,
  editActionSuccess,
  editActionFailed,
} from "./editSlice";
import axiosConfig from "@/axiosConfig";

export const editAcademicYear = async (year, dispatch) => {
  dispatch(editActionStart());
  try {
    const res = await axiosConfig.put(
      `/academicyear/${year.AcademicYearID}`,
      year,
    );
    dispatch(editActionSuccess(res.data));
  } catch {
    dispatch(editActionFailed());
  }
};
