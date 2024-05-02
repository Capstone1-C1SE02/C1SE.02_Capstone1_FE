import {
  deleteActionStart,
  deleteActionSuccess,
  deleteActionFailed,
} from "./deleteSlice";
import axiosConfig from "@/axiosConfig";

export const deleteAcademicYear = async (year, dispatch) => {
  dispatch(deleteActionStart());
  try {
    const res = await axiosConfig.delete(`/academicintakesession/${year}`);
    dispatch(deleteActionSuccess(res.data));
    console.log("13 res.data", res.data);
  } catch {
    dispatch(deleteActionFailed());
  }
};

// export const addStudent =

export const deleleMajor = async (MajorID, dispatch) => {
  dispatch(deleteActionStart());
  try {
    const res = await axiosConfig.delete(`/degree/${MajorID}`);
    console.log("25 res.data", res.data);
    dispatch(deleteActionSuccess(res.status));
  } catch {
    dispatch(deleteActionFailed());
  }
};

export const deleleStudent = async (StudentId, dispatch) => {
  dispatch(deleteActionStart());
  try {
    const res = await axiosConfig.delete(`/student/${StudentId}`);
    console.log("36 res.data", res);
    console.log("36 res.status", res.status);
    dispatch(deleteActionSuccess(res.status));
  } catch {
    dispatch(deleteActionFailed());
  }
};

export const deleleCurriculum = async (id, dispatch) => {
  dispatch(deleteActionStart());
  try {
    const res = await axiosConfig.delete(`/diplomamanagementprofile/${id}`);
    console.log("36 res.data", res);
    console.log("36 res.status", res.status);
    dispatch(deleteActionSuccess(res.status));
  } catch {
    dispatch(deleteActionFailed());
  }
};

export const deleteAcademicProgram = async (id, dispatch) => {
  dispatch(deleteActionStart());
  try {
    const res = await axiosConfig.delete(`/academicprogram/${id}`);
    console.log("36 res.data", res);
    console.log("36 res.status", res.status);
    dispatch(deleteActionSuccess(res.status));
  } catch {
    dispatch(deleteActionFailed());
  }
};

export const deleleStudentAcademicIntakeSessionAcademicProgram = async (
  id,
  dispatch,
) => {
  dispatch(deleteActionStart());
  try {
    const res = await axiosConfig.delete(
      `/studentacademicintakesessionacademicprogram/${id}`,
    );
    console.log("36 res.data", res);
    console.log("36 res.status", res.status);
    dispatch(deleteActionSuccess(res.status));
  } catch {
    dispatch(deleteActionFailed());
  }
};

export const deleleAcademicInTakeCessionAcademicProgramCurriculum = async (
  id,
  dispatch,
) => {
  dispatch(deleteActionStart());
  try {
    const res = await axiosConfig.delete(
      `/academicintakesessionacademicprogramcurriculum/${id}`,
    );
    console.log("36 res.data", res);
    console.log("36 res.status", res.status);
    dispatch(deleteActionSuccess(res.status));
  } catch {
    dispatch(deleteActionFailed());
  }
};
