import React, { useEffect, useState } from "react";
import icon from "@/ultils/icon";
import { Button, Label, HeaderAndInput, DeleteForm } from "@/components/admin";
import { LearningStatusType, AcademicProgram } from "@/components/dropList";
const { BsThreeDotsVertical, FaTimes } = icon;
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "@/axiosConfig";
import { addCurriculum } from "@/redux/apiRequestAdd";
import { deleleCurriculum } from "@/redux/apiRequestDelete";
import { editCurriculum } from "@/redux/apiRequestEdit";
import { ToastContainer, toast } from "react-toastify";

function DiplopmaManagementProfile() {
  const data = useSelector((state) => state.addAction.data);
  const dataDelete = useSelector((state) => state.deleteAction);
  const dataEdit = useSelector((state) => state.EditAction);
  const dispatch = useDispatch();
  const [render, setRender] = useState(0);
  const [degreebooks, setDegreebooks] = useState([]);
  const [learningStatusType, setLearningStatusType] = useState();
  const [academicProgram, setAcademicProgram] = useState();

  useEffect(() => {
    async function fetchDegreesData() {
      try {
        const response = await axiosConfig.get("/curriculum");
        setDegreebooks(response.data.results.data);
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy danh sách năm học:", error);
      }
    }
    fetchDegreesData();
  }, [render]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const learningStatus = await LearningStatusType();
        const academicProgram = await AcademicProgram();
        setLearningStatusType(learningStatus.data);
        setAcademicProgram(academicProgram.data.results.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log("degreebooks", degreebooks);
  const [showActionMenu, setShowActionMenu] = useState({
    studentId: null,
    isOpen: false,
  });
  const [idStudent, setIdStudent] = useState("");
  const [addAction, showAddAction] = useState(false);
  const [editAction, showEditAction] = useState(false);
  const [deleteAction, showDeleteAction] = useState(false);
  const [payload, setPayload] = useState({
    //     STUDENT_ID_NUMBER
    // ACADEMIC_PROGRAM_ID
    // GRADUATION_YEAR
    // MODE_OF_STUDY
    // CLASSIFEILD_BY_ACADEMIC-RECORDS
    // CERTIFICATE_NUMBER
    // NUMBER_ENTERRD_INTO_THE_DEGREE_TRACKING_BOOK
    // DATE_OF_DECISION_ANNOUNCEMENT
    // COMMENT
    // DATE_UPDATED
    // APPROVED
  });

  const [objectPayload, setObjectPayload] = useState();

  useEffect(() => {
    setObjectPayload(
      degreebooks.reduce((acc, curriculum) => {
        acc[curriculum.CURRICULUM_ID] = {
          CURRICULUM_ID: curriculum.CURRICULUM_ID,
          CURRICULUM_NAME: curriculum.CURRICULUM_NAME,
          DESCRIPTION: curriculum.DESCRIPTION,
          CURRICULUM_STATUS_NAME: curriculum.CURRICULUM_STATUS_NAME,
          ACADEMIC_PROGRAM_ID: curriculum.ACADEMIC_PROGRAM_ID,
        };
        return acc;
      }, {}),
    );
  }, [degreebooks]);

  console.log("objectPayload objectPayload", objectPayload);
  //add
  const handleAddANew = async () => {
    await addCurriculum(payload, dispatch);
    toast.success(`${data?.message}`);
    console.log("paylod", payload);
    showAddAction(!addAction);
    setRender(render + 1);
  };

  // edit
  const handleSaveInformation = async (id) => {
    await editCurriculum(objectPayload[id], dispatch);
    dataEdit ? toast.success("Sửa thành công") : toast.error("Sửa thất bại");
    console.log("ok131", objectPayload[id]);
    console.log("data edit", dataEdit);
    showEditAction(!editAction);
    setRender(render + 1);
  };

  //delele
  const handleDelete = async () => {
    console.log("showActionMenu.STUDENT_ID_NUMBER", showActionMenu.studentId);
    await deleleCurriculum(showActionMenu.studentId, dispatch);
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
      <ToastContainer />
      <HeaderAndInput
        lable={"Quản lý hồ sơ văn bằng"}
        onClick={handleAddAction}
      />

      <div className=" relative h-full rounded-xl bg-table-bg">
        <div className="h-full p-[-60px]">
          <table
            className={`relative block h-40 min-h-[100%] w-full border-x-[30px] border-t-[30px] border-white ${window.innerWidth >= 1600 ? "overflow-x-hidden " : "overflow-x-scroll"} `}
          >
            <thead className=" flex w-full flex-col justify-center ">
              <tr className="flex w-full justify-between text-left text-[12px] font-medium uppercase text-header-text">
                <th className=" min-w-[200px] px-4 py-2">Mã khoá đào tạo</th>
                <th className=" min-w-[200px] px-4 py-2">Tên khoá đào tạo</th>
                <th className=" min-w-[200px] px-4 py-2">Trạng thái đào tạo</th>
                <th className=" min-w-[350px] px-4 py-2">
                  Tên chương trình đào tạo
                </th>
                <th className=" min-w-[200px] px-4 py-2">Mô tả</th>

                <th className=" min-w-[20px] px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className=" flex w-full flex-col justify-center">
              {degreebooks?.map((degreebook, index) => (
                <tr
                  key={degreebook.CURRICULUM_ID}
                  className="flex justify-between border-gray-300 text-[14px] font-semibold hover:bg-gray-200"
                >
                  <td className="min-w-[200px] px-4 py-2">
                    {degreebook.CURRICULUM_ID}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {degreebook.CURRICULUM_NAME}
                  </td>
                  <td className="min-w-[350px] px-4 py-2">
                    {degreebook.CURRICULUM_STATUS_NAME ? "Đang" : "Chưa"}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {degreebook.ACADEMIC_PROGRAM_ID}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {degreebook.DESCRIPTION}
                  </td>

                  <td
                    onClick={() => handleActionClick(degreebook.CURRICULUM_ID)}
                    className={`relative min-w-[10px] ${
                      showActionMenu.studentId === degreebook.CURRICULUM_ID &&
                      showActionMenu.isOpen &&
                      "bg-custom-bg-notActive-nav"
                    } flex cursor-pointer items-center rounded-[3px] px-2`}
                  >
                    <BsThreeDotsVertical />
                    {showActionMenu.studentId === degreebook.CURRICULUM_ID &&
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
        <div className="fixed left-0 right-0 top-[20px] z-20 m-auto h-[380px] w-[870px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">
                Danh sách sách khoá đào tạo
              </h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleAddAction} />
              </div>
            </div>

            <div className="border-y-[1px] border-border-body-form py-[20px]">
              <div className="mb-[10px] flex gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Mã khoá đào tạo:
                  </label>
                  <input
                    type="text"
                    id="CURRICULUM_ID"
                    className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  />
                </div>{" "}
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Tên khoá đào tạo:
                  </label>
                  <input
                    type="text"
                    id="CURRICULUM_NAME"
                    className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  />
                </div>{" "}
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Trạng thái đào tạo
                  </label>
                  <select
                    type="text"
                    id="CURRICULUM_STATUS_NAME"
                    className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  >
                    <option hidden></option>
                    <option value={true}>Đang</option>
                    <option value={false}>Chưa</option>
                  </select>
                </div>{" "}
              </div>
              <div className="mb-[10px] flex gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Tên chương trình đào tạo:
                  </label>
                  <select
                    type="text"
                    id="ACADEMIC_PROGRAM_ID"
                    className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                        value={item.ACADEMIC_PROGRAM_ID}
                        key={item.ACADEMIC_PROGRAM_ID}
                      >
                        {item.ACADEMIC_PROGRAM_NAME}
                      </option>
                    ))}
                  </select>
                </div>{" "}
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">Mô tả:</label>
                  <input
                    type="text"
                    id="DESCRIPTION"
                    className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  />
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
        <div className="fixed left-0 right-0 top-[20px] z-20 m-auto h-[527px] w-[870px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">Danh sách bằng</h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleEditAction} />
              </div>
            </div>
            {degreebooks?.map(
              (student) =>
                showActionMenu.studentId === student.CURRICULUM_ID && (
                  <div
                    key={student.CURRICULUM_ID}
                    className="border-t-[1px] border-border-body-form py-[20px]"
                  >
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Mã khoá đào tạo:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[student.CURRICULUM_ID].CURRICULUM_ID
                          }
                          type="text"
                          id="CURRICULUM_ID"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              student.CURRICULUM_ID,
                              "CURRICULUM_ID",
                            )
                          }
                        />
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Tên khoá đào tạo:
                        </label>
                        <input
                          type="text"
                          id="CURRICULUM_NAME"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          defaultValue={
                            objectPayload[student.CURRICULUM_ID].CURRICULUM_NAME
                          }
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              student.CURRICULUM_ID,
                              "CURRICULUM_NAME",
                            )
                          }
                        />
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Trạng thái đào tạo
                        </label>

                        <select
                          defaultValue={
                            objectPayload[student.CURRICULUM_ID]
                              .CURRICULUM_STATUS_NAME
                          }
                          type="text"
                          id="CURRICULUM_STATUS_NAME"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              student.CURRICULUM_ID,
                              "CURRICULUM_STATUS_NAME",
                            )
                          }
                        >
                          <option hidden></option>
                          <option value={true}>Đang</option>
                          <option value={false}>Chưa</option>
                        </select>
                      </div>{" "}
                    </div>
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Tên chương trình đào tạo:
                        </label>
                        <select
                          type="text"
                          defaultValue={
                            objectPayload[student.CURRICULUM_ID]
                              .ACADEMIC_PROGRAM_ID
                          }
                          id="ACADEMIC_PROGRAM_ID"
                          className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              student.CURRICULUM_ID,
                              "ACADEMIC_PROGRAM_ID",
                            )
                          }
                        >
                          <option hidden></option>
                          {academicProgram?.map((item) => (
                            <option
                              value={item.ACADEMIC_PROGRAM_ID}
                              key={item.ACADEMIC_PROGRAM_ID}
                            >
                              {item.ACADEMIC_PROGRAM_NAME}
                            </option>
                          ))}
                        </select>
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Mô tả:
                        </label>
                        <input
                          type="text"
                          id="DESCRIPTION"
                          className="block  w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          defaultValue={
                            objectPayload[student.CURRICULUM_ID].DESCRIPTION
                          }
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              student.CURRICULUM_ID,
                              "DESCRIPTION",
                            )
                          }
                        />
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
                          handleSaveInformation(student.CURRICULUM_ID)
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

export default DiplopmaManagementProfile;
