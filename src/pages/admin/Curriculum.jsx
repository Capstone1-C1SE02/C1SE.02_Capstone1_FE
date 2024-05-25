import React, { useEffect, useState } from "react";
import icon from "@/ultils/icon";
import {
  Button,
  Label,
  HeaderAndInput,
  DeleteForm,
  FooterPage,
  InputForm2,
  SelectForm,
} from "@/components/admin";
import { LearningStatusType, AcademicProgram } from "@/components/dropList";
const { BsThreeDotsVertical, FaTimes } = icon;
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "@/axiosConfig";
import { addCurriculum } from "@/redux/apiRequestAdd";
import { deleleCurriculum } from "@/redux/apiRequestDelete";
import { editCurriculum } from "@/redux/apiRequestEdit";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

function Curriculum() {
  const dispatch = useDispatch();
  const [render, setRender] = useState(0);
  const [learningStatusType, setLearningStatusType] = useState();
  const [degreebooks, setDegreebooks] = useState([]);
  const [page, setPage] = useState(1);
  const [academicProgram, setAcademicProgram] = useState();
  const statuses = [
    { id: 0, value: true, status: "Đang tiến hành" },
    { id: 1, value: false, status: "Đã hoàn thành" },
  ];
  const [panigationData, setPanigationData] = useState({
    count: "",
    page: "",
  });

  useEffect(() => {
    async function fetchDegreesData() {
      try {
        const response = await axiosConfig.get(`/curriculum?page=${page}`);
        setDegreebooks(response.data.results.data);
        setPanigationData({
          count: response.data.count,
          page: response.data.total_pages,
        });
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy danh sách năm học:", error);
      }
    }
    fetchDegreesData();
  }, [render, page]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const learningStatus = await LearningStatusType();
        const academicProgram = await AcademicProgram();
        setLearningStatusType(learningStatus.data);
        setAcademicProgram(academicProgram.data.data);
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
    CURRICULUM_ID: "",
    CURRICULUM_NAME: "",
    DESCRIPTION: "",
    CURRICULUM_STATUS_NAME: "",
    ACADEMIC_PROGRAM_ID: "",
  });
  const setPayloadAction = () => {
    setPayload({
      CURRICULUM_ID: "",
      CURRICULUM_NAME: "",
      DESCRIPTION: "",
      CURRICULUM_STATUS_NAME: "",
      ACADEMIC_PROGRAM_ID: "",
    });
  };

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
  const [invalidFields, setInvalidFields] = useState([]);
  const validate = (payload) => {
    let invalids = 0;
    let fields = Object.entries(payload);
    fields.forEach((item, index) => {
      if (index !== 0 && item[1] === "") {
        setInvalidFields((prev) => [
          ...prev,
          {
            name: item[0],
            message: "Bạn không được bỏ trống trường này.",
          },
        ]);
        invalids++;
      }
    });
    return invalids;
  };

  const { errorAdd } = useSelector((state) => state.addAction);
  const { errorEdit } = useSelector((state) => state.editAction);
  const { errorDelete } = useSelector((state) => state.deleteAction);
  const [showAlert, setShowAlert] = useState(false);
  const [count, setCount] = useState({
    countAdd: 0,
    countDelete: 0,
    countEdit: 0,
  });
  useEffect(() => {
    console.log("add action", errorAdd);
    if (showAlert) {
      if (errorAdd) {
        Swal.fire("Thông báo", "Thêm chương trình đào tạo thất bại", "error");
      } else if (!errorAdd) {
        Swal.fire(
          "Thông báo",
          "Thêm chương trình đào tạo thành công",
          "success",
        );
      }
      setShowAlert(false);
    }
  }, [count.countAdd]);
  useEffect(() => {
    if (showAlert) {
      if (errorEdit) {
        Swal.fire("Thông báo", "Sửa chương trình đào tạo thất bại", "error");
      } else if (!errorEdit) {
        Swal.fire(
          "Thông báo",
          "Sửa chương trình đào tạo thành công",
          "success",
        );
      }
      setShowAlert(false);
    }
  }, [count.countEdit]);
  useEffect(() => {
    if (showAlert) {
      if (errorDelete) {
        Swal.fire("Thông báo", "Xoá chương trình đào tạo thất bại", "error");
      } else if (!errorDelete) {
        Swal.fire(
          "Thông báo",
          "Xoá chương trình đào tạo thành công",
          "success",
        );
      }
      setShowAlert(false);
    }
  }, [count.countDelete]);
  //add
  const handleAddANew = async () => {
    const valid = validate(payload);
    if (valid > 0) {
      return;
    }
    await addCurriculum(payload, dispatch);
    setCount((pre) => ({ ...pre, countAdd: pre.countAdd + 1 }));
    showAddAction(!addAction);
    setRender(render + 1);
    setPayloadAction();
    setShowAlert(true);
  };

  // edit
  const handleSaveInformation = async (id) => {
    const valid = validate(objectPayload[id]);
    console.log("valid edit--------", valid);
    if (valid > 0) {
      return;
    }
    await editCurriculum(objectPayload[id], id, dispatch);
    setCount((pre) => ({ ...pre, countEdit: pre.countEdit + 1 }));
    showEditAction(!editAction);
    setRender(render + 1);
    setShowAlert(true);
  };

  //delele
  const handleDelete = async () => {
    await deleleCurriculum(showActionMenu.studentId, dispatch);
    showDeleteAction(!deleteAction);
    setRender(render + 1);
    setShowAlert(true);
    setCount((pre) => ({ ...pre, countDelete: pre.countDelete + 1 }));
    showEditAction(false);
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

  const showDeleteEdit = () => {
    showDeleteAction(!deleteAction);
    showEditAction(!editAction);
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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const showViewEdit = (id) => {
    setShowActionMenu({ studentId: id });
    handleEditAction();
  };

  return (
    <div className="relative mx-auto flex h-full w-full flex-col gap-[10px] bg-backLayout">
      <ToastContainer />
      <HeaderAndInput
        lable={"Danh sách chương trình đào tạo"}
        onClick={handleAddAction}
        placeholder="Nhập tên chương trình đào tạo để tìm tiếm"
      />

      <div className=" relative h-[84%]  rounded-xl bg-table-bg">
        <div className="h-full p-[-60px]">
          <table
            className={` block h-full w-full overflow-x-auto border-l-[30px] border-t-[30px] border-white`}
          >
            <thead className="flex w-full flex-col ">
              <tr className=" flex w-full items-center justify-between text-left text-[12px] font-medium uppercase text-header-text">
                <th className=" min-w-[250px] px-4 py-2">
                  Tên chương trình đào tạo
                </th>
                <th className=" min-w-[180px] px-4 py-2">Trạng thái đào tạo</th>
                <th className=" min-w-[350px] px-4 py-2">
                  Tên chuyên ngành đào tạo
                </th>
                <th className=" min-w-[350px] px-4 py-2">Mô tả</th>

                <th className=" min-w-[20px] px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className=" flex w-full flex-col justify-between">
              {degreebooks?.map((degreebook) => (
                <tr
                  key={degreebook.CURRICULUM_ID}
                  className="flex h-[58px] cursor-pointer  items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap border-gray-300 text-[14px] font-semibold hover:bg-gray-200"
                  onClick={() => showViewEdit(degreebook.CURRICULUM_ID)}
                >
                  <td className="min-w-[250px] px-4 py-2">
                    {degreebook.CURRICULUM_NAME}
                  </td>
                  <td className="min-w-[180px] px-4 py-2">
                    {statuses.map(
                      (i) =>
                        degreebook.CURRICULUM_STATUS_NAME == i.value &&
                        i.status,
                    )}
                  </td>
                  <td className="min-w-[350px] px-4 py-2">
                    {academicProgram?.length > 0 &&
                      academicProgram?.map(
                        (item) =>
                          item.ACADEMIC_PROGRAM_ID ==
                            degreebook.ACADEMIC_PROGRAM_ID &&
                          item.ACADEMIC_PROGRAM_NAME,
                      )}
                  </td>
                  <td className="w-[350px] max-w-[350px] overflow-hidden text-ellipsis whitespace-nowrap px-4 py-2">
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

      <div className="fixed bottom-2 w-full">
        <div className="flex justify-center">
          <FooterPage
            count={panigationData.page}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>

      {/* add form */}
      {addAction && (
        <div className="animation fixed left-0 right-0 top-[25%]  z-20 m-auto h-[410px] w-[870px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">
                Danh sách chương trình đào tạo
              </h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleAddAction} />
              </div>
            </div>

            <div className="border-y-[1px] border-border-body-form py-[20px]">
              <div className="flex h-[100px] gap-[30px]">
                <InputForm2
                  text={"Tên chương trình đào tạo:"}
                  setValue={setPayload}
                  keyObject={"CURRICULUM_NAME"}
                  setInvalidFields={setInvalidFields}
                  invalidFields={invalidFields}
                  w22
                />
                <SelectForm
                  text={"Trạng thái đào tạo:"}
                  setValue={setPayload}
                  keyObject={"CURRICULUM_STATUS_NAME"}
                  setInvalidFields={setInvalidFields}
                  invalidFields={invalidFields}
                  w22
                  dataNoAPI={statuses}
                />
              </div>
              <div className="flex h-[100px] gap-[30px]">
                <SelectForm
                  text={"Tên chuyên ngành đào tạo:"}
                  setValue={setPayload}
                  keyObject={"ACADEMIC_PROGRAM_ID"}
                  setInvalidFields={setInvalidFields}
                  invalidFields={invalidFields}
                  w22
                  dataAPI={academicProgram}
                  dataValue={"ACADEMIC_PROGRAM_ID"}
                  dataName={"ACADEMIC_PROGRAM_NAME"}
                />

                <InputForm2
                  text={"Mô tả:"}
                  setValue={setPayload}
                  keyObject={"DESCRIPTION"}
                  setInvalidFields={setInvalidFields}
                  invalidFields={invalidFields}
                  w22
                />
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
        <div className="animation fixed left-0 right-0 top-[25%]  z-20 m-auto h-[410px] w-[870px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">
                Danh sách chương trình đào tạo
              </h1>
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
                    <div className="flex h-[100px] gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Tên chương trình đào tạo:
                        </label>
                        <input
                          type="text"
                          id="CURRICULUM_NAME"
                          className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                          className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              student.CURRICULUM_ID,
                              "CURRICULUM_STATUS_NAME",
                            )
                          }
                        >
                          <option hidden></option>
                          {statuses.map((i) => (
                            <option key={i.id} value={i.value}>
                              {i.status}
                            </option>
                          ))}
                        </select>
                      </div>{" "}
                    </div>
                    <div className="flex h-[100px] gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Tên chuyên ngành đào tạo:
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
                        // bgColor={"bg-custom-bg-active-nav"}
                        // textColor={"text-custom-text-active-nav"}
                        justify
                        text16
                        onClick={handleEditAction}
                      />
                      <Button
                        text={"Lưu"}
                        // bgColor={"bg-bg-button-add"}
                        // textColor={"text-[#16A34A] "}
                        justify
                        text16
                        onClick={(e) =>
                          handleSaveInformation(student.CURRICULUM_ID)
                        }
                      />
                      <Button
                        text={"Xoá"}
                        // bgColor={"bg-bg-button-add"}
                        // textColor={"text-[#16A34A] "}
                        justify
                        text16
                        onClick={(e) => showDeleteEdit()}
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

export default Curriculum;
