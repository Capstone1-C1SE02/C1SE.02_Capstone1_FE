import {
  editActionStart,
  editActionSuccess,
  editActionFailed,
} from "./editSlice";
import axiosConfig from "@/axiosConfig";

export const editAcademicYear = async (year, id, dispatch) => {
  dispatch(editActionStart());
  try {
    const res = await axiosConfig.put(`/academicintakesession/${id}`, year);
    console.log(
      "year.ACADEMIC_INTAKE_SESSION_ID",
      year.ACADEMIC_INTAKE_SESSION_ID,
    );
    dispatch(editActionSuccess(res.data));
  } catch (error) {
    console.log("error", error.response.status);
    dispatch(editActionFailed(error.response.status));
  }
};

export const editStudent = async (student, dispatch) => {
  dispatch(editActionStart());
  try {
    const res = await axiosConfig.put(
      `/student/${student.STUDENT_ID_NUMBER}`,
      student,
    );
    console.log("res.data 29 ", res.data);
    console.log("res.data 30 ", res);
    dispatch(editActionSuccess(res.data));
  } catch {
    dispatch(editActionFailed());
  }
};

export const editMajor = async (major, dispatch) => {
  dispatch(editActionStart());
  try {
    const res = await axiosConfig.put(`/degree/${major.DEGREE_ID}`, major);
    console.log("res.data 29 ", res.data);
    console.log("res.data 30 ", res);
    dispatch(editActionSuccess(res.data));
  } catch {
    dispatch(editActionFailed());
  }
};

export const editCurriculum = async (item, id, dispatch) => {
  console.log(id);
  dispatch(editActionStart());
  try {
    const res = await axiosConfig.put(`/curriculum/${id}`, item);
    dispatch(editActionSuccess(res.data));
  } catch {
    dispatch(editActionFailed());
  }
};

export const editDiplopManagermentProfile = async (item, id, dispatch) => {
  dispatch(editActionStart());
  try {
    const res = await axiosConfig.put(`/diplomamanagementprofile/${id}`, item);
    console.log("res.data 29 ", res.data);
    console.log("res.data 30 ", res);
    dispatch(editActionSuccess(res.data));
  } catch {
    dispatch(editActionFailed());
  }
};

export const editAcademicProgram = async (item, dispatch) => {
  dispatch(editActionStart());
  try {
    const res = await axiosConfig.put(
      `/academicprogram/${item.ACADEMIC_PROGRAM_ID}`,
      item,
    );
    console.log("res.data 29 ", res.data);
    console.log("res.data 30 ", res);
    dispatch(editActionSuccess(res.data));
  } catch {
    dispatch(editActionFailed());
  }
};

export const editStudentAcademicIntakeSessionAcademicProgram = async (
  item,
  id,
  dispatch,
) => {
  dispatch(editActionStart());
  try {
    const res = await axiosConfig.put(
      `/studentacademicintakesessionacademicprogram/${id}`,
      item,
    );
    dispatch(editActionSuccess(res.data));
  } catch {
    dispatch(editActionFailed());
  }
};

export const editAcademicInTakeCessionAcademicProgramCurriculum = async (
  item,
  id,
  dispatch,
) => {
  dispatch(editActionStart());
  try {
    const res = await axiosConfig.put(
      `/academicintakesessionacademicprogramcurriculum/${id}`,
      item,
    );
    dispatch(editActionSuccess(res.data));
  } catch {
    dispatch(editActionFailed());
  }
};
