import { Button, Label } from "@/components/admin";
import React, { useEffect, useState } from "react";
import icon from "@/ultils/icon";
import { HeaderAndInput, DeleteForm, FooterPage } from "@/components/admin";
import axiosConfig from "@/axiosConfig";
import { addAcademicProgram } from "@/redux/apiRequestAdd";
import { editAcademicProgram } from "@/redux/apiRequestEdit";
import { deleteAcademicProgram } from "@/redux/apiRequestDelete";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Academicleveltype } from "@/components/dropList";

const { BsThreeDotsVertical, FaTimes } = icon;
import "react-toastify/dist/ReactToastify.css";

function ListAcademicProgram() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.addAction.data);
  const dataDelete = useSelector((state) => state.deleteAction);
  const dataEdit = useSelector((state) => state.EditAction);
  const [render, setRender] = useState(0);
  const [academicleveltype, setAcademicleveltype] = useState();
  const [page, setPage] = useState(1);
  const [academicprograms, setAcademicPrograms] = useState([]);
  const [panigationData, setPanigationData] = useState({
    count: "",
    page: "",
  });
  useEffect(() => {
    async function fetchaAademicPrograms() {
      try {
        const response = await axiosConfig.get(`/academicprogram?page=${page}`);
        setAcademicPrograms(response.data.results.data);
        setPanigationData({
          count: response.data.count,
          page: response.data.total_pages,
        });
      } catch (error) {
        console.error(
          "Đã xảy ra lỗi khi lấy danh sách Mã chương trình đào tạo:",
          error,
        );
      }
    }
    fetchaAademicPrograms();
  }, [render, page]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const academiclevel = await Academicleveltype();
        setAcademicleveltype(academiclevel.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log("academicprogramsasdasd", academicprograms);
  console.log("setAcademicleveltype", academicleveltype);
  const [showActionMenu, setShowActionMenu] = useState({
    studentId: null,
    isOpen: false,
  });

  const [idStudent, setIdStudent] = useState("");
  const [addAction, showAddAction] = useState(false);
  const [editAction, showEditAction] = useState(false);
  const [deleteAction, showDeleteAction] = useState(false);
  const [payload, setPayload] = useState({
    ACADEMIC_PROGRAM_ID: "",
    ACADEMIC_PROGRAM_CODE: "",
    ACADEMIC_PROGRAM_NAME: "",
    ACADEMIC_LEVEL_TYPE_ID: "",
    MODE_OF_STUDY: "",
    DEGREE_DURATION: "",
    DESCRIPTION: "",
    DEGREE_ID: "",
  });

  const [objectPayload, setObjectPayload] = useState();
  useEffect(() => {
    setObjectPayload(
      academicprograms.reduce((acc, academicprogram) => {
        acc[academicprogram.ACADEMIC_PROGRAM_ID] = {
          ACADEMIC_PROGRAM_ID: academicprogram.ACADEMIC_PROGRAM_ID,
          ACADEMIC_PROGRAM_CODE: academicprogram.ACADEMIC_PROGRAM_CODE,
          ACADEMIC_PROGRAM_NAME: academicprogram.ACADEMIC_PROGRAM_NAME,
          ACADEMIC_LEVEL_TYPE_ID: academicprogram.ACADEMIC_LEVEL_TYPE_ID,
          MODE_OF_STUDY: academicprogram.MODE_OF_STUDY,
          DEGREE_DURATION: academicprogram.DEGREE_DURATION,
          DESCRIPTION: academicprogram.DESCRIPTION,
          DEGREE_ID: academicprogram.DEGREE_ID,
        };
        return acc;
      }, {}),
    );
  }, [academicprograms]);

  //add
  const handleAddANew = async () => {
    await addAcademicProgram(payload, dispatch);
    toast.success(`${data?.message}`);
    console.log("paylooad", payload);
    console.log("paylooad data.addAction", data);
    showAddAction(!addAction);
    setRender(render + 1);
  };

  // edit
  const handleSaveInformation = async (id) => {
    console.log("ok131", objectPayload[id]);
    await editAcademicProgram(objectPayload[id], dispatch);
    dataEdit ? toast.success("Sửa thành công") : toast.error("Sửa thất bại");
    console.log("data edit", dataEdit);
    showEditAction(!editAction);
    setRender(render + 1);
  };

  //delele
  const handleDelete = async () => {
    console.log("showActionMenu.ACADEMIC_PROGRAM_ID", showActionMenu.studentId);
    await deleteAcademicProgram(showActionMenu.studentId, dispatch);
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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="relative mx-auto flex h-full w-full flex-col gap-[10px] bg-secondary">
      <ToastContainer />
      <HeaderAndInput
        lable={"Danh sách chương trình đào tạo"}
        onClick={handleAddAction}
      />
      <div className=" relative h-[84%] rounded-xl bg-table-bg">
        <div className="h-full p-[-60px]">
          <table
            className={`relative block h-40 min-h-[100%] w-full border-x-[30px] border-t-[30px] border-white ${window.innerWidth >= 1600 ? "overflow-x-hidden " : "overflow-x-scroll"} `}
          >
            <thead className="flex w-full flex-col ">
              <tr className=" flex w-full items-center justify-between text-left text-[12px] font-medium uppercase text-header-text">
                <th className=" min-w-[200px] px-4 py-2">
                  Mã chương trình đào tạo
                </th>
                <th className=" min-w-[400px] px-4 py-2">
                  Tên chương trình đào tạo
                </th>
                <th className=" min-w-[200px] px-4 py-2">Bậc đào tạo </th>
                <th className=" min-w-[200px] px-4 py-2">Loại hình đào tạo</th>
                <th className=" min-w-[200px] px-4 py-2">Thời gian đào tạo</th>
                <th className=" min-w-[200px] px-4 py-2">Mô tả</th>
                <th className=" min-w-[20px] px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="flex w-full flex-col ">
              {academicprograms?.map((academicprogram) => (
                <tr
                  key={academicprogram.ACADEMIC_PROGRAM_ID}
                  className="relative flex items-center justify-between border-gray-300 text-[14px] font-semibold hover:bg-gray-200 "
                >
                  <td className="w-[200px] px-4 py-2">
                    {academicprogram.ACADEMIC_PROGRAM_CODE}
                  </td>
                  <td className="w-[400px] px-4 py-2">
                    {academicprogram.ACADEMIC_PROGRAM_NAME}
                  </td>
                  <td className="w-[200px] px-4 py-2">
                    {academicprogram.ACADEMIC_LEVEL_TYPE_ID}
                  </td>
                  <td className="w-[200px] px-4 py-2">
                    {academicprogram.MODE_OF_STUDY}
                  </td>
                  <td className="w-[200px] px-4 py-2">
                    {academicprogram.DEGREE_DURATION}
                  </td>
                  <td className="w-[200px] px-4 py-2">
                    {academicprogram.DESCRIPTION}
                  </td>
                  <td
                    onClick={() =>
                      handleActionClick(academicprogram.ACADEMIC_PROGRAM_ID)
                    }
                    className={`relative right-0 flex h-[39px] min-w-[10px] items-center ${
                      showActionMenu.studentId ===
                        academicprogram.ACADEMIC_PROGRAM_ID &&
                      showActionMenu.isOpen &&
                      "bg-custom-bg-notActive-nav"
                    } cursor-pointer rounded-[3px] px-2 `}
                  >
                    <BsThreeDotsVertical />
                    {showActionMenu.studentId ===
                      academicprogram.ACADEMIC_PROGRAM_ID &&
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
            count={+`${parseInt(panigationData.count / 94)}`}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>

      {/* add form */}
      {addAction && (
        <div className="fixed left-0 right-0 top-[20px] z-20 m-auto h-[530px] w-[870px] rounded-[10px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">
                Chương trình đào tạo
              </h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleAddAction} />
              </div>
            </div>

            <div className="border-y-[1px] border-border-body-form py-[20px]">
              <div className="mb-[10px] flex gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Mã chương trình đào tạo
                  </label>
                  <input
                    id="ACADEMIC_PROGRAM_CODE"
                    className="block h-[40px] w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    type="text"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Bậc đào tạo tạo
                  </label>
                  <select
                    id="ACADEMIC_LEVEL_TYPE_ID"
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
                    {academicleveltype &&
                      academicleveltype?.map((item) => (
                        <option
                          value={item.ACADEMIC_LEVEL_TYPE_ID}
                          key={item.ACADEMIC_LEVEL_TYPE_ID}
                        >
                          {item.ACADEMIC_LEVEL_TYPE_NAME}
                        </option>
                      ))}
                  </select>
                </div>{" "}
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Loại hình đào tạo
                  </label>
                  <select
                    id="MODE_OF_STUDY"
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
                    <option value={0}>Chính quy</option>
                    <option value={1}>Cao đẳng</option>
                  </select>
                </div>{" "}
              </div>
              <div className="mb-[10px] flex gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Tên chương trình đào tạo
                  </label>
                  <input
                    id="ACADEMIC_PROGRAM_NAME"
                    className="block h-[40px] w-[810px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    type="text"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  />
                </div>{" "}
              </div>
              <div className="mb-[10px] flex gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Thời gian đào tạo
                  </label>
                  <input
                    id="DEGREE_DURATION"
                    className="block h-[40px] w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    type="text"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">Mã bằng cấp</label>
                  <input
                    id="DEGREE_ID"
                    className="block h-[40px] w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    type="text"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="mb-[10px] flex gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">Mô tả</label>
                  <input
                    id="DESCRIPTION"
                    className="block h-[40px] w-[810px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    type="text"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  />
                </div>
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
        <div className="fixed left-0 right-0 top-[20px] z-20 m-auto h-[530px] w-[870px] rounded-[10px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">
                Chương trình đào tạo
              </h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleEditAction} />
              </div>
            </div>

            {academicprograms?.map(
              (academicprogram) =>
                showActionMenu.studentId ===
                  academicprogram.ACADEMIC_PROGRAM_ID && (
                  <div
                    key={academicprogram.ACADEMIC_PROGRAM_ID}
                    className="border-t-[1px] border-border-body-form py-[20px]"
                  >
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Mã chương trình đào tạo:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[academicprogram.ACADEMIC_PROGRAM_ID]
                              .ACADEMIC_PROGRAM_CODE
                          }
                          type="text"
                          id="ACADEMIC_PROGRAM_CODE
                          "
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              academicprogram.ACADEMIC_PROGRAM_ID,
                              "ACADEMIC_PROGRAM_CODE",
                            )
                          }
                        />
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Bậc đào tạo:
                        </label>
                        <select
                          defaultValue={
                            objectPayload[academicprogram.ACADEMIC_PROGRAM_ID]
                              .ACADEMIC_LEVEL_TYPE_ID
                          }
                          type="text"
                          id="ACADEMIC_LEVEL_TYPE_ID
                          "
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              academicprogram.ACADEMIC_PROGRAM_ID,
                              "ACADEMIC_LEVEL_TYPE_ID",
                            )
                          }
                        >
                          <option hidden></option>
                          {academicleveltype &&
                            academicleveltype?.map((item) => (
                              <option
                                value={item.ACADEMIC_LEVEL_TYPE_ID}
                                key={item.ACADEMIC_LEVEL_TYPE_ID}
                              >
                                {item.ACADEMIC_LEVEL_TYPE_NAME}
                              </option>
                            ))}
                        </select>
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Loại hình đào tạo:
                        </label>
                        <select
                          defaultValue={
                            objectPayload[academicprogram.ACADEMIC_PROGRAM_ID]
                              .MODE_OF_STUDY
                          }
                          type="text"
                          id="MODE_OF_STUDY
                          "
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              academicprogram.ACADEMIC_PROGRAM_ID,
                              "MODE_OF_STUDY",
                            )
                          }
                        >
                          <option hidden></option>
                          <option value={0}>Chính quy</option>
                          <option value={1}>Cao đẳng</option>
                        </select>
                      </div>{" "}
                    </div>
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Tên chương trình đào tạo:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[academicprogram.ACADEMIC_PROGRAM_ID]
                              .ACADEMIC_PROGRAM_NAME
                          }
                          type="text"
                          id="ACADEMIC_PROGRAM_NAME
                          "
                          className="block w-[810px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              academicprogram.ACADEMIC_PROGRAM_ID,
                              "ACADEMIC_PROGRAM_NAME",
                            )
                          }
                        />
                      </div>{" "}
                    </div>
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Thời gian đào tạo:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[academicprogram.ACADEMIC_PROGRAM_ID]
                              .DEGREE_DURATION
                          }
                          type="text"
                          id="DEGREE_DURATION
                          "
                          className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              academicprogram.ACADEMIC_PROGRAM_ID,
                              "DEGREE_DURATION",
                            )
                          }
                        />
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Mã bằng cấp:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[academicprogram.ACADEMIC_PROGRAM_ID]
                              .DEGREE_ID
                          }
                          type="text"
                          id="DEGREE_ID
                          "
                          className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              academicprogram.ACADEMIC_PROGRAM_ID,
                              "DEGREE_ID",
                            )
                          }
                        />
                      </div>{" "}
                    </div>
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Mô tả:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[academicprogram.ACADEMIC_PROGRAM_ID]
                              .DESCRIPTION
                          }
                          type="text"
                          id="DESCRIPTION
                          "
                          className="block w-[810px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              academicprogram.ACADEMIC_PROGRAM_ID,
                              "DESCRIPTION",
                            )
                          }
                        />
                      </div>{" "}
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
                          handleSaveInformation(
                            academicprogram.ACADEMIC_PROGRAM_ID,
                          )
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

export default ListAcademicProgram;
