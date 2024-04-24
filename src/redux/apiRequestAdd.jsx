import { addActionStart, addActionSuccess, addActionFailed } from "./addSlice";
import axiosConfig from "@/axiosConfig";

export const addAcademiYear = async (year, dispatch) => {
  dispatch(addActionStart());
  try {
    const res = await axiosConfig.post("/academicyear/", year);
    dispatch(addActionSuccess(res.data));
    console.log("res 13 ", res.data.message);
  } catch {
    dispatch(addActionFailed());
  }
};

export const addStudent = async (student, dispatch) => {
  dispatch(addActionStart());
  try {
    const res = await axiosConfig.post("/student/", student);
    dispatch(addActionSuccess(res.data));
    console.log("add student 20 apiRequestAdd ", res.data.message);
  } catch {
    dispatch(addActionFailed());
  }
};

export const addAcademicProgram = async (AcademicProgram, dispatch) => {
  dispatch(addActionStart());
  try {
    const res = await axiosConfig.post("/academicprogram/", AcademicProgram);
    dispatch(addActionSuccess(res.data));
    console.log("add student 31 apiRequestAdd ", res.data.message);
  } catch {
    dispatch(addActionFailed());
  }
};

export const addMajor = async (Major, dispatch) => {
  dispatch(addActionStart());
  try {
    const res = await axiosConfig.post("/major", Major);
    dispatch(addActionSuccess(res.data));
    console.log("add student 42 apiRequestAdd ", res.data.message);
  } catch {
    dispatch(addActionFailed());
  }
};
