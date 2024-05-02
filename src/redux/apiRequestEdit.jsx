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
      `/academicintakesession/${year.ACADEMIC_INTAKE_SESSION_ID}`,
      year,
    );
    console.log(
      "year.ACADEMIC_INTAKE_SESSION_ID",
      year.ACADEMIC_INTAKE_SESSION_ID,
    );
    dispatch(editActionSuccess(res.data));
  } catch {
    dispatch(editActionFailed());
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

export const editCurriculum = async (item, dispatch) => {
  dispatch(editActionStart());
  try {
    const res = await axiosConfig.put(
      `/curriculum/${item.CURRICULUM_ID}`,
      item,
    );
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
    console.log("res.data 89--------------- ", item.id);

    const res = await axiosConfig.put(
      `/studentacademicintakesessionacademicprogram/${id}`,
      item,
    );
    dispatch(editActionSuccess(res.data));
  } catch {
    dispatch(editActionFailed());
  }
};
