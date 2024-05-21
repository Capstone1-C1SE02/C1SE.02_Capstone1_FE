import { addActionStart, addActionSuccess, addActionFailed } from "./addSlice";
import axiosConfig from "@/axiosConfig";

export const addAcademiYear = async (year, dispatch) => {
  dispatch(addActionStart());
  try {
    const res = await axiosConfig.post("/academicintakesession/", year);
    dispatch(addActionSuccess(res.data));
    console.log("res 13 ", res.data.message);
  } catch (error) {
    dispatch(addActionFailed(error.response.data.errCode));
    console.log("error.response.data.errCode", error.response.data.errCode);
  }
};

export const addStudent = async (student, dispatch) => {
  dispatch(addActionStart());
  try {
    const res = await axiosConfig.post("/student/", student);
    dispatch(addActionSuccess(res.data));
    console.log("add student 20 apiRequestAdd ", res.data.message);
  } catch (error) {
    console.log(error);
    dispatch(addActionFailed(error.response.data));
  }
};

export const addAcademicProgram = async (AcademicProgram, dispatch) => {
  dispatch(addActionStart());
  try {
    console.log("AcademicProgram", AcademicProgram);
    const res = await axiosConfig.post("/academicprogram/", AcademicProgram);
    dispatch(addActionSuccess(res.data));
    console.log("add student 31 apiRequestAdd ", res.data);
  } catch (error) {
    console.log("error from adding", error.response.data);
    dispatch(addActionFailed(error.response.data));
  }
};

export const addMajor = async (student, dispatch) => {
  dispatch(addActionStart());
  try {
    const res = await axiosConfig.post("/degree/", student);
    dispatch(addActionSuccess(res.data));
    console.log("add student 20 apiRequestAdd ", res.data.message);
  } catch {
    dispatch(addActionFailed());
  }
};

export const addCurriculum = async (data, dispatch) => {
  dispatch(addActionStart());
  try {
    const res = await axiosConfig.post("/curriculum/", data);
    dispatch(addActionSuccess(res.data));
    console.log("add student 20 apiRequestAdd ", res.data.message);
  } catch {
    dispatch(addActionFailed());
  }
};

export const addStudentAcademicIntakeSessionAcademicProgram = async (
  data,
  dispatch,
) => {
  dispatch(addActionStart());
  try {
    const res = await axiosConfig.post(
      "/studentacademicintakesessionacademicprogram/",
      data,
    );
    dispatch(addActionSuccess(res.data));
  } catch {
    dispatch(addActionFailed());
  }
};

export const addAcademicInTakeCessionAcademicProgramCurriculum = async (
  data,
  dispatch,
) => {
  dispatch(addActionStart());
  try {
    const res = await axiosConfig.post(
      "/academicintakesessionacademicprogramcurriculum/",
      data,
    );
    dispatch(addActionSuccess(res.data));
  } catch {
    dispatch(addActionFailed());
  }
};

export const addDiplopManamentProfile = async (data, dispatch) => {
  dispatch(addActionStart());
  try {
    const res = await axiosConfig.post("/diplomamanagementprofile/", data);
    dispatch(addActionSuccess(res.data));
  } catch {
    dispatch(addActionFailed());
  }
};
