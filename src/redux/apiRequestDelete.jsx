import {
  deleteActionStart,
  deleteActionSuccess,
  deleteActionFailed,
} from "./deleteSlice";
import axiosConfig from "@/axiosConfig";

export const deleteAcademicYear = async (year, dispatch, navigate) => {
  dispatch(deleteActionStart());
  try {
    const res = await axiosConfig.delete(`/academicyear/${year}`);
    dispatch(deleteActionSuccess(res.data));
    console.log("13 res.data", res.data);
  } catch {
    dispatch(deleteActionFailed());
  }
};

// export const addStudent =

export const deleleMajor = async (MajorID, dispatch, navigate) => {
  dispatch(deleteActionStart());
  try {
    const res = await axiosConfig.delete(`/major/${MajorID}`);
    console.log("25 res.data", res.data);
    dispatch(deleteActionSuccess(res.status));
  } catch {
    dispatch(deleteActionFailed());
  }
};
