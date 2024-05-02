import React, { useEffect, useState } from "react";
import icon from "@/ultils/icon";
import { Button, Label, HeaderAndInput, DeleteForm } from "@/components/admin";
import {
  LearningStatusType,
  AcademicProgram,
  Student,
  Academicintakesession,
} from "@/components/dropList";
const { BsThreeDotsVertical, FaTimes } = icon;
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "@/axiosConfig";
import { addStudentAcademicIntakeSessionAcademicProgram } from "@/redux/apiRequestAdd";
import { deleleStudentAcademicIntakeSessionAcademicProgram } from "@/redux/apiRequestDelete";
import { editStudentAcademicIntakeSessionAcademicProgram } from "@/redux/apiRequestEdit";
import { ToastContainer, toast } from "react-toastify";

function StudentAcademicIntakeSessionAcademicProgram() {
  const data = useSelector((state) => state.addAction.data);
  const dataDelete = useSelector((state) => state.deleteAction);
  const dataEdit = useSelector((state) => state.EditAction);
  const dispatch = useDispatch();
  const [render, setRender] = useState(0);
  const [degreebooks, setDegreebooks] = useState([]);
  const [learningStatusType, setLearningStatusType] = useState();
  const [academicProgram, setAcademicProgram] = useState();
  const [student, setStudent] = useState();
  const [academicintakesession, setAcademicintakesession] = useState();

  const [YBAPData, setYBAPData] = useState([]);
  useEffect(() => {
    async function fetchYBAPData() {
      try {
        const response = await axiosConfig.get(
          "/studentacademicintakesessionacademicprogram",
        );
        setYBAPData(response.data.results.data);
      } catch (error) {
        console.error(
          "Đã xảy ra lỗi khi lấy danh sách chương trình học theo năm:",
          error,
        );
      }
    }
    fetchYBAPData();
  }, [render]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const learningStatus = await LearningStatusType();
        const academicProgram = await AcademicProgram();
        const student = await Student();
        const academicintakesession = await Academicintakesession();
        setLearningStatusType(learningStatus.data);
        setAcademicProgram(academicProgram.data.results.data);
        setAcademicintakesession(academicintakesession.data.results.data);
        setStudent(student.data.results.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [showActionMenu, setShowActionMenu] = useState({
    studentId: null,
    isOpen: false,
  });

  const [idStudent, setIdStudent] = useState("");
  const [addAction, showAddAction] = useState(false);
  const [editAction, showEditAction] = useState(false);
  const [deleteAction, showDeleteAction] = useState(false);
  const [payload, setPayload] = useState({
    STUDENT_ID_NUMBER: "",
    ACADEMIC_INTAKE_SESSION_ID: "",
    ACADEMIC_PROGRAM_ID: "",
    LEARNING_STATUS_TYPE_ID: "",
  });

  const [objectPayload, setObjectPayload] = useState();
  useEffect(() => {
    setObjectPayload(
      YBAPData.reduce((acc, academicprogram) => {
        acc[academicprogram.id] = {
          id: academicprogram.id,
          STUDENT_ID_NUMBER: academicprogram.STUDENT_ID_NUMBER,
          ACADEMIC_INTAKE_SESSION_ID:
            academicprogram.ACADEMIC_INTAKE_SESSION_ID,
          ACADEMIC_PROGRAM_ID: academicprogram.ACADEMIC_PROGRAM_ID,
          LEARNING_STATUS_TYPE_ID: academicprogram.LEARNING_STATUS_TYPE_ID,
        };
        return acc;
      }, {}),
    );
  }, [YBAPData]);

  console.log("objectPayload", objectPayload);
  //add
  const handleAddANew = async () => {
    await addStudentAcademicIntakeSessionAcademicProgram(payload, dispatch);
    toast.success(`${data?.message}`);
    console.log("paylod", payload);
    showAddAction(!addAction);
    setRender(render + 1);
  };

  // edit
  const handleSaveInformation = async (id) => {
    await editStudentAcademicIntakeSessionAcademicProgram(
      objectPayload[id],
      id,
      dispatch,
    );

    console.log("id123", id);
    dataEdit ? toast.success("Sửa thành công") : toast.error("Sửa thất bại");
    console.log("ok131", objectPayload[id]);
    console.log("data edit", dataEdit);
    showEditAction(!editAction);
    setRender(render + 1);
  };

  //delete
  const handleDelete = async () => {
    console.log("showActionMenu.STUDENT_ID_NUMBER", showActionMenu.studentId);
    await deleleStudentAcademicIntakeSessionAcademicProgram(
      showActionMenu.studentId,
      dispatch,
    );
    console.log("paylooad", dataDelete.data);
    dataDelete.data == 204
      ? toast.success("Xoá thành công")
      : toast.error("Xoá thất bại");
    showDeleteAction(!deleteAction);
    setRender(render + 1);
  };

  const handleAddAction = () => {
    showAddAction(!addAction);
    console.log(addAction);
  };

  const handleEditAction = () => {
    showEditAction(!editAction);
  };

  const handleDeleteAction = () => {
    showDeleteAction(!deleteAction);
  };

  const handleCloseAll = () => {
    showAddAction(false);
    showEditAction(false);
    showDeleteAction(false);
  };

  const handleActionClick = (studentId) => {
    setShowActionMenu({ studentId, isOpen: !showActionMenu.isOpen });
    setIdStudent(studentId);
  };

  const handledOnchangeEdit = (e, id, property) => {
    const newValue = e.target.value;
    setObjectPayload((pre) => ({
      ...pre,
      [id]: { ...pre[id], [property]: newValue },
    }));
  };

  return (
    <div className="relative mx-auto flex h-full w-full flex-col gap-[10px] bg-secondary">
      {" "}
      <HeaderAndInput
        lable={"Hồ sơ học tập của sinh viên trong chương trình đào tạo"}
        onClick={handleAddAction}
      />
      <div className=" relative h-full rounded-xl bg-table-bg">
        <div className="h-full p-[-60px]">
          <table
            className={`relative block h-40 min-h-[100%] w-full border-x-[30px] border-t-[30px] border-white ${window.innerWidth >= 1600 ? "overflow-x-hidden " : "overflow-x-scroll"} `}
          >
            <thead className="flex w-full flex-col ">
              <tr className=" flex w-full items-center justify-between text-left text-[12px] font-medium uppercase text-header-text">
                <th className=" min-w-[300px] px-4 py-2">Tên sinh viên</th>
                <th className=" min-w-[300px] px-4 py-2">Tên kỳ tuyển sinh</th>
                <th className=" min-w-[300px] px-4 py-2">Trạng thái</th>
                <th className=" min-w-[300px] px-4 py-2">
                  Tên chương trình đào tạo
                </th>
                <th className=" min-w-[20px] px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="flex w-full flex-col ">
              {YBAPData?.map((YBAP) => (
                <tr
                  key={YBAP.id}
                  className="relative flex items-center justify-between border-gray-300 text-[14px] font-semibold hover:bg-gray-200 "
                >
                  <td className="w-[300px] px-4 py-2">
                    {student?.map(
                      (item) =>
                        item.STUDENT_ID_NUMBER === YBAP.STUDENT_ID_NUMBER &&
                        `${item.LAST_NAME}`,
                    )}
                  </td>
                  <td className="w-[300px] px-4 py-2">
                    {academicintakesession?.map(
                      (item) =>
                        item.ACADEMIC_INTAKE_SESSION_ID ===
                          YBAP.ACADEMIC_INTAKE_SESSION_ID &&
                        `${item.ACADEMIC_INTAKE_SESSION_NAME}`,
                    )}
                  </td>
                  <td className="w-[300px] px-4 py-2">
                    {learningStatusType?.map(
                      (item) =>
                        item.LEARNING_STATUS_TYPE_ID ===
                          YBAP.LEARNING_STATUS_TYPE_ID &&
                        `${item.LEARNING_STATUS_TYPE_NAME}`,
                    )}
                  </td>
                  <td className="w-[300px] px-4 py-2">
                    {academicProgram?.map(
                      (item) =>
                        item.ACADEMIC_PROGRAM_ID === YBAP.ACADEMIC_PROGRAM_ID &&
                        `${item.ACADEMIC_PROGRAM_NAME}`,
                    )}
                  </td>
                  <td
                    onClick={() => handleActionClick(YBAP.id)}
                    className={`relative right-0 flex h-[39px] min-w-[10px] items-center ${
                      showActionMenu.studentId === YBAP.id &&
                      showActionMenu.isOpen &&
                      "bg-custom-bg-notActive-nav"
                    } cursor-pointer rounded-[3px] px-2 `}
                  >
                    <BsThreeDotsVertical />
                    {showActionMenu.studentId === YBAP.id &&
                      showActionMenu.isOpen && (
                        <div
                          className={`absolute right-0 top-[45px] z-10 flex flex-col gap-[5px] rounded border-[1px] bg-white p-[5px]`}
                        >
                          <Button
                            text={"Sửa"}
                            onClick={showEditAction}
                          ></Button>

                          <Button
                            text={"Xoá"}
                            onClick={showDeleteAction}
                            bgHover
                            textHover
                          ></Button>
                        </div>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* add form */}
      {addAction && (
        <div className="fixed left-0 right-0 top-[20px] z-20 m-auto h-[390px] w-[870px] rounded-[10px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">
                Danh sách chương trình đào tạo theo năm
              </h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleAddAction} />
              </div>
            </div>

            <div className="border-y-[1px] border-border-body-form py-[20px]">
              <div className="mb-[10px] flex gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Tên sinh viên:
                  </label>
                  <select
                    id="STUDENT_ID_NUMBER"
                    className="block h-[40px] w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    type="text"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  >
                    <option hidden></option>
                    {student?.map((item) => (
                      <option
                        key={item.STUDENT_ID_NUMBER}
                        value={item.STUDENT_ID_NUMBER}
                      >
                        {`${item.LAST_NAME} ${item.MIDDLE_NAME} ${item.FIRST_NAME}`}
                      </option>
                    ))}
                  </select>
                </div>{" "}
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Tên kỳ tuyển sinh:
                  </label>
                  <select
                    id="ACADEMIC_INTAKE_SESSION_ID"
                    className="block h-[40px] w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    type="text"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  >
                    <option hidden></option>
                    {academicintakesession?.map((item) => (
                      <option
                        key={item.ACADEMIC_INTAKE_SESSION_ID}
                        value={item.ACADEMIC_INTAKE_SESSION_ID}
                      >
                        {item.ACADEMIC_INTAKE_SESSION_NAME}
                      </option>
                    ))}
                  </select>
                </div>{" "}
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">Trạng thái:</label>
                  <select
                    id="LEARNING_STATUS_TYPE_ID"
                    className="block h-[40px] w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    type="text"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  >
                    <option hidden></option>
                    {learningStatusType?.map((item) => (
                      <option
                        key={item.LEARNING_STATUS_TYPE_ID}
                        value={item.LEARNING_STATUS_TYPE_ID}
                      >
                        {item.LEARNING_STATUS_TYPE_NAME}
                      </option>
                    ))}
                  </select>
                </div>{" "}
              </div>
              <div className="mb-[10px] flex gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Tên chương trình đào tạo
                  </label>
                  <select
                    id="ACADEMIC_PROGRAM_ID"
                    className="block h-[40px] w-[810px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    type="text"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  >
                    <option hidden></option>
                    {academicProgram?.map((item) => (
                      <option
                        key={item.ACADEMIC_PROGRAM_ID}
                        value={item.ACADEMIC_PROGRAM_ID}
                      >
                        {item.ACADEMIC_PROGRAM_NAME}
                      </option>
                    ))}
                  </select>
                </div>{" "}
              </div>
            </div>
            <div className="mt-[20px] flex justify-end gap-[20px]">
              <Button
                text={"Huỷ"}
                bgColor={"bg-white"}
                justify
                text16
                onClick={handleAddAction}
              />
              <Button
                text={"Thêm mới"}
                justify
                text16
                onClick={handleAddANew}
              />
            </div>
          </div>
        </div>
      )}
      {/* edit form */}
      {editAction && (
        <div className="fixed left-0 right-0 top-[20px] z-20 m-auto h-[390px] w-[870px] rounded-[10px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">
                Danh sách chương trình đào tạo theo năm
              </h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleEditAction} />
              </div>
            </div>

            {YBAPData.map(
              (academicprogram, index) =>
                showActionMenu.studentId === academicprogram.id && (
                  <div
                    key={academicprogram.id}
                    className="border-t-[1px] border-border-body-form py-[20px]"
                  >
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Tên sinh viên:
                        </label>
                        <select
                          defaultValue={
                            objectPayload[academicprogram.id].STUDENT_ID_NUMBER
                          }
                          type="text"
                          id="STUDENT_ID_NUMBER"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              academicprogram.id,
                              "STUDENT_ID_NUMBER",
                            )
                          }
                        >
                          <option hidden></option>
                          {student?.map((item) => (
                            <option
                              key={item.STUDENT_ID_NUMBER}
                              value={item.STUDENT_ID_NUMBER}
                            >
                              {`${item.LAST_NAME} ${item.MIDDLE_NAME} ${item.FIRST_NAME}`}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Tên kỳ tuyển sinh:
                        </label>
                        <select
                          defaultValue={
                            objectPayload[academicprogram.id]
                              .ACADEMIC_INTAKE_SESSION_ID
                          }
                          type="text"
                          id="ACADEMIC_INTAKE_SESSION_ID"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              academicprogram.id,
                              "ACADEMIC_INTAKE_SESSION_ID",
                            )
                          }
                        >
                          <option hidden></option>
                          {academicintakesession?.map((item) => (
                            <option
                              key={item.ACADEMIC_INTAKE_SESSION_ID}
                              value={item.ACADEMIC_INTAKE_SESSION_ID}
                            >
                              {item.ACADEMIC_INTAKE_SESSION_NAME}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Trạng thái:
                        </label>
                        <select
                          defaultValue={
                            objectPayload[academicprogram.id]
                              .LEARNING_STATUS_TYPE_ID
                          }
                          type="text"
                          id="LEARNING_STATUS_TYPE_ID"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              academicprogram.id,
                              "LEARNING_STATUS_TYPE_ID",
                            )
                          }
                        >
                          <option hidden></option>
                          {learningStatusType?.map((item) => (
                            <option
                              key={item.LEARNING_STATUS_TYPE_ID}
                              value={item.LEARNING_STATUS_TYPE_ID}
                            >
                              {item.LEARNING_STATUS_TYPE_NAME}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="mb-[10px] flex gap-[30px]">
                        <div className="flex flex-col gap-[5px]">
                          <label className="text-[16px] font-normal">
                            Tên chương trình đào tạo:
                          </label>
                          <select
                            defaultValue={
                              objectPayload[academicprogram.id]
                                .ACADEMIC_PROGRAM_ID
                            }
                            type="text"
                            id="ACADEMIC_PROGRAM_ID"
                            className="block w-[810px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            onChange={(e) =>
                              handledOnchangeEdit(
                                e,
                                academicprogram.id,
                                "ACADEMIC_PROGRAM_ID",
                              )
                            }
                          >
                            <option hidden></option>
                            {academicProgram?.map((item) => (
                              <option
                                key={item.ACADEMIC_PROGRAM_ID}
                                value={item.ACADEMIC_PROGRAM_ID}
                              >
                                {item.ACADEMIC_PROGRAM_NAME}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="mt-[30px] flex justify-end gap-[20px] border-t-[1px] pt-[20px]">
                      <Button
                        text={"Huỷ"}
                        bgColor={"bg-custom-bg-active-nav"}
                        textColor={"text-custom-text-active-nav"}
                        justify
                        text16
                        onClick={handleEditAction}
                      />
                      <Button
                        text={"Lưu"}
                        bgColor={"bg-bg-button-add"}
                        textColor={"text-[#16A34A] "}
                        justify
                        text16
                        onClick={(e) =>
                          handleSaveInformation(academicprogram.id)
                        }
                      />
                    </div>
                  </div>
                ),
            )}
          </div>
        </div>
      )}
      {/* delete action */}
      {deleteAction && (
        <DeleteForm
          handleDeleteAction={handleDeleteAction}
          handleDelete={handleDelete}
        />
      )}
      {(addAction || editAction || deleteAction) && (
        <div>
          <Label onClick={handleCloseAll} />
        </div>
      )}
    </div>
  );
}

export default StudentAcademicIntakeSessionAcademicProgram;
