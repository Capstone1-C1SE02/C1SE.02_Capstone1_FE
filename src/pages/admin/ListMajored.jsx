import React, { useEffect, useState } from "react";
import icon from "@/ultils/icon";
import { HeaderAndInput, Button, Label } from "@/components/admin";
const { BsThreeDotsVertical, FaTimes } = icon;
import axiosConfig from "@/axiosConfig";
import { addMajor } from "@/redux/apiRequestAdd";
import { editMajor } from "@/redux/apiRequestEdit";
import { deleleMajor } from "@/redux/apiRequestDelete";
import { useDispatch, useSelector } from "react-redux";
import { LearningStatusType } from "@/components/dropList";
import { ToastContainer, toast } from "react-toastify";

function ListMajored() {
  const dispatch = useDispatch();
  const dataDelete = useSelector((state) => state.deleteAction);
  const dataAdd = useSelector((state) => state.addAction);
  const dataEdit = useSelector((state) => state.editAction);
  const [learningStatusType, setLearningStatusType] = useState();
  const [render, setRender] = useState(0);
  const [majors, setMajors] = useState([]);
  useEffect(() => {
    async function fetchMajorsData() {
      try {
        const response = await axiosConfig.get("/degree/");
        console.log("response", response);
        setMajors(response.data.results.data);
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy danh sách sinh viên:", error);
      }
    }
    fetchMajorsData();
  }, [render]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const learningStatus = await LearningStatusType();
        setLearningStatusType(learningStatus.data);
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
    DEGREE_ID: "",
    DEGREE_CODE: "",
    DEGREE_NAME: "",
    DEGREE_STATUS: "",
    DESCRIPTON: "",
  });

  const [objectPayload, setObjectPayload] = useState([]);
  useEffect(() => {
    setObjectPayload(
      majors?.reduce((acc, degree) => {
        acc[degree.DEGREE_ID] = {
          DEGREE_ID: degree.DEGREE_ID,
          DEGREE_CODE: degree.DEGREE_CODE,
          DEGREE_NAME: degree.DEGREE_NAME,
          DEGREE_STATUS: degree.DEGREE_STATUS,
          DESCRIPTON: degree.DESCRIPTON,
        };
        return acc;
      }, {}),
    );
  }, [majors]);

  //add
  const handleAddANew = async () => {
    try {
      console.log("dataAdd.data.payload", payload);
      await addMajor(payload, dispatch);
      console.log("dataAdd.data", dataAdd.addAction);
      toast.success("Thêm thành công");
      showAddAction(!addAction);
      setRender(render + 1);
    } catch (error) {
      console.log("error", error);
    }
  };

  // edit
  const handleSaveInformation = async (id) => {
    await editMajor(objectPayload[id], dispatch);
    dataDelete ? toast.success("Sửa thành công") : toast.error("Sửa thất bại");
    console.log("ok131", objectPayload[id]);
    console.log("data edit", dataEdit);
    showEditAction(!editAction);
    setRender(render + 1);
  };

  //delete
  const handleDeleteMajor = async () => {
    try {
      await deleleMajor(showActionMenu.studentId, dispatch);
      toast.success("Xoá thành công");
    } catch (error) {
      toast.error("Xoá thất bại");
      console.log(error.response);
    }
    showDeleteAction(!deleteAction);
    setRender(render + 1);
  };
  // dataDelete.deleteAction.mode
  //   ? toast.success("Xoá thành công")
  //   : toast.error("Xoá thất bại");
  // showDeleteAction(!deleteAction);

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

  console.log("objectPayload", objectPayload);
  return (
    <div className="relative mx-auto flex h-full w-full flex-col gap-[10px] bg-secondary">
      {" "}
      <ToastContainer />
      <HeaderAndInput lable={"Danh sách  văn bằng"} onClick={handleAddAction} />
      <div className=" relative h-full rounded-xl bg-table-bg">
        <div className="h-full p-[-60px]">
          <table
            className={`relative block h-40 min-h-[100%] w-full border-x-[30px] border-t-[30px] border-white ${window.innerWidth >= 1600 ? "overflow-x-hidden " : "overflow-x-scroll"} `}
          >
            <thead className="flex w-full flex-col ">
              <tr className=" flex w-full items-center justify-between text-left text-[12px] font-medium uppercase text-header-text">
                <th className=" min-w-[300px] px-4 py-2">Mã văn bằng</th>
                <th className=" min-w-[300px] px-4 py-2">Tên văn bằng</th>
                <th className=" min-w-[300px] px-4 py-2">
                  Trạng thái văn bằng
                </th>
                <th className=" min-w-[500px] px-4 py-2">Mô tả</th>
                <th className=" min-w-[20px] px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="flex w-full flex-col ">
              {majors?.map((major, index) => (
                <tr
                  key={major.DEGREE_ID}
                  className="relative flex items-center justify-between border-gray-300 text-[14px] font-semibold hover:bg-gray-200 "
                >
                  <td className="w-[300px] px-4 py-2">{major.DEGREE_CODE}</td>
                  <td className="w-[300px] px-4 py-2">{major.DEGREE_NAME}</td>
                  <td className="w-[300px] px-4 py-2">{major.DEGREE_STATUS}</td>
                  <td className="w-[500px] px-4 py-2">{major.DESCRIPTON}</td>
                  <td
                    onClick={() => handleActionClick(major.DEGREE_ID)}
                    className={`relative min-w-[10px] ${
                      showActionMenu.studentId === major.DEGREE_ID &&
                      showActionMenu.isOpen &&
                      "bg-custom-bg-notActive-nav"
                    } cursor-pointer rounded-[3px] px-4 py-2 `}
                  >
                    <BsThreeDotsVertical />
                    {showActionMenu.studentId === major.DEGREE_ID &&
                      showActionMenu.isOpen && (
                        <div
                          className={`absolute right-0 z-10 flex flex-col gap-[5px] rounded border-[1px] bg-white p-[5px]`}
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
        <div className="fixed left-0 right-0 top-[20px] z-20 m-auto h-[600px] w-[870px] rounded-[10px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">Văn bằng</h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleAddAction} />
              </div>
            </div>

            <div className="border-y-[1px] border-border-body-form py-[20px]">
              <div className="mb-[10px] flex gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">Mã văn bằng</label>
                  <input
                    id="DEGREE_CODE"
                    className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    type="text"
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
                    Tên văn bằng
                  </label>
                  <input
                    id="DEGREE_NAME"
                    className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    type="text"
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
                    Trạng thái văn bằng
                  </label>
                  <select
                    id="DEGREE_STATUS"
                    className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                      <option key={item.LEARNING_STATUS_TYPE_ID}>
                        {item.LEARNING_STATUS_TYPE_NAME}
                      </option>
                    ))}
                  </select>
                </div>{" "}
              </div>
              <div className="mb-[10px] flex gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">Mô tả</label>
                  <textarea
                    id="DESCRIPTON"
                    rows="10"
                    cols="50"
                    className="block w-[810px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
        <div className="fixed left-0 right-0 top-[20px] z-20 m-auto h-[600px] w-[870px] rounded-[10px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">Văn bằng</h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleEditAction} />
              </div>
            </div>

            {majors.map(
              (major, index) =>
                showActionMenu.studentId === major.DEGREE_ID && (
                  <div
                    key={major.DEGREE_ID}
                    className="border-t-[1px] border-border-body-form py-[20px]"
                  >
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Mã văn bằng:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[major.DEGREE_ID].DEGREE_CODE
                          }
                          type="text"
                          id="DEGREE_CODE"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              major.DEGREE_ID,
                              "DEGREE_CODE",
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Tên văn bằng:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[major.DEGREE_ID].DEGREE_NAME
                          }
                          type="text"
                          id="DEGREE_NAME"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              major.DEGREE_ID,
                              "DEGREE_NAME",
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Trạng thái văn bằng:
                        </label>
                        <select
                          defaultValue={
                            objectPayload[major.DEGREE_ID].DEGREE_STATUS
                          }
                          type="text"
                          id="DEGREE_STATUS"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              major.DEGREE_ID,
                              "DEGREE_STATUS",
                            )
                          }
                        >
                          <option hidden></option>
                          {learningStatusType?.map((item) => (
                            <option key={item.LEARNING_STATUS_TYPE_ID}>
                              {item.LEARNING_STATUS_TYPE_NAME}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="mb-[10px] flex gap-[30px]">
                      {" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Mô tả:
                        </label>
                        <textarea
                          rows="10"
                          cols="50"
                          defaultValue={
                            objectPayload[major.DEGREE_ID].DESCRIPTON
                          }
                          type="text"
                          id="DESCRIPTON"
                          className="block w-[820px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              major.DEGREE_ID,
                              "DESCRIPTON",
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
                        onClick={(e) => handleSaveInformation(major.DEGREE_ID)}
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
        <div className="fixed left-0 right-0 top-[20px] z-20 m-auto h-[298px] w-[870px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">
                Bạn có muốn xoá nội dung này?
              </h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleDeleteAction} />
              </div>
            </div>
            <div className="my-[20px] rounded-[10px] border-y-[1px] border-border-body-form bg-bg-delete-form p-[20px] text-text-delete-form">
              <div>
                <span className="font-semibold">Lưu ý:</span>
                <ul className=" ml-[20px] list-disc">
                  <li>Hành động này không thể hoàn tác </li>
                  <li>Nội dung sẽ bị xóa vĩnh viễn khỏi hệ thống</li>
                </ul>
              </div>
            </div>
            <div className="mt-[30px] flex justify-end gap-[20px]">
              <Button
                text={"Huỷ"}
                justify
                bgColor={"bg-bg-button-add"}
                textColor={"text-[#16A34A] "}
                text16
                onClick={handleDeleteAction}
              />
              <Button
                text={"Xoá"}
                bgColor={"bg-custom-bg-active-nav"}
                textColor={"text-custom-text-active-nav"}
                justify
                text16
                onClick={handleDeleteMajor}
              />
            </div>
          </div>
        </div>
      )}
      {(addAction || editAction || deleteAction) && (
        <div>
          <Label onClick={handleCloseAll} />
        </div>
      )}
    </div>
  );
}

export default ListMajored;
