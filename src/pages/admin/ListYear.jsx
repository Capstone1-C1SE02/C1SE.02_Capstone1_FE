import {
  Button,
  Label,
  HeaderAndInput,
  DeleteForm,
  FooterPage,
} from "@/components/admin";
import React, { useEffect, useState } from "react";
import icon from "@/ultils/icon";
import axiosConfig from "@/axiosConfig";
import { addAcademiYear } from "@/redux/apiRequestAdd";
import { deleteAcademicYear } from "@/redux/apiRequestDelete";
import { editAcademicYear } from "@/redux/apiRequestEdit";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { BsThreeDotsVertical, FaTimes } = icon;

const ListYear = () => {
  const dispatch = useDispatch();
  const dataDelete = useSelector((state) => state.deleteAction);
  const dataAdd = useSelector((state) => state.addAction);
  const dataEdit = useSelector((state) => state.editAction);
  const [render, setRender] = useState(0);
  const [years, setYears] = useState([]);
  const [page, setPage] = useState(1);
  const [panigationData, setPanigationData] = useState({
    count: "",
    page: "",
  });
  useEffect(() => {
    async function fetchYearsData() {
      try {
        const response = await axiosConfig.get(
          `/academicintakesession?page=${page}`,
        );
        setYears(response.data.results.data);
        setPanigationData({
          count: response.data.count,
          page: response.data.total_pages,
        });
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy danh sách năm học:", error);
      }
    }
    fetchYearsData();
  }, [render, page]);

  const [showActionMenu, setShowActionMenu] = useState({
    studentId: null,
    isOpen: false,
  });

  const [addAction, showAddAction] = useState(false);
  const [editAction, showEditAction] = useState(false);
  const [deleteAction, showDeleteAction] = useState(false);
  const [payload, setPayload] = useState({
    ACADEMIC_INTAKE_SESSION_ID: "",
    ACADEMIC_INTAKE_SESSION_NAME: "",
    START_DATE: "",
  });

  const [objectPayload, setObjectPayload] = useState();
  useEffect(() => {
    setObjectPayload(
      years.reduce((acc, year) => {
        acc[year.ACADEMIC_INTAKE_SESSION_ID] = {
          ACADEMIC_INTAKE_SESSION_ID: year.ACADEMIC_INTAKE_SESSION_ID,
          ACADEMIC_INTAKE_SESSION_NAME: year.ACADEMIC_INTAKE_SESSION_NAME,
          START_DATE: year.START_DATE,
        };
        return acc;
      }, {}),
    );
  }, [years]);

  //add
  const handleAddNew = async () => {
    await addAcademiYear(payload, dispatch);
    if (dataAdd.data === -1) {
      return toast.error("Thêm thất bại");
    } else if (dataAdd?.data?.errCode === 0) {
      return toast.success("Thêm thành công");
    }
    showAddAction(!addAction);
    setRender(render + 1);
  };

  //delele
  const handleDelete = async () => {
    await deleteAcademicYear(showActionMenu.studentId, dispatch);
    console.log(
      " showActionMenu.ACADEMIC_INTAKE_SESSION_I",
      showActionMenu.studentId,
    );
    dataDelete?.deleteAction?.mode
      ? toast.success("Xoá thành công")
      : toast.error("Xoá thất bại");
    showDeleteAction(!deleteAction);
    setRender(render + 1);
  };

  // edit
  const handleSaveInformation = async (id) => {
    await editAcademicYear(objectPayload[id], dispatch);
    dataEdit?.editAction?.mode
      ? toast.success("Sửa thành công")
      : toast.error("Sửa thất bại");
    showEditAction(!editAction);
    setRender(render + 1);
  };

  const handleAddAction = () => {
    showAddAction(!addAction);
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

  const handleActionClick = (id) => {
    setShowActionMenu({ studentId: id, isOpen: !showActionMenu.isOpen });
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
      <HeaderAndInput lable={"Năm học"} onClick={handleAddAction} />
      <ToastContainer />

      <div className=" relative h-[84%] rounded-xl bg-table-bg">
        <div className="h-full p-[-60px]">
          <table
            className={`relative block h-40 min-h-[100%] w-full border-x-[30px] border-t-[30px] border-white ${window.innerWidth >= 1600 ? "overflow-x-hidden " : "overflow-x-scroll"} `}
          >
            <thead className="flex w-full flex-col ">
              <tr className=" flex w-full items-center justify-between text-left text-[12px] font-medium uppercase text-header-text">
                <th className=" w-[400px] px-4 py-2">Tên kỳ tuyển sinh</th>
                <th className=" w-[1200px] px-4 py-2">Thời gian bắt đầu</th>
                <th className=" min-w-[20px] px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="flex w-full flex-col ">
              {years?.map((year) => (
                <tr
                  key={year.ACADEMIC_INTAKE_SESSION_ID}
                  className="relative flex items-center justify-between border-gray-300 text-[14px] font-semibold hover:bg-gray-200 "
                >
                  <td className="w-[400px] px-4 py-2">
                    {year.ACADEMIC_INTAKE_SESSION_NAME}
                  </td>
                  <td className="w-[1200px] px-4 py-2">{year.START_DATE}</td>
                  <td
                    onClick={() =>
                      handleActionClick(year.ACADEMIC_INTAKE_SESSION_ID)
                    }
                    className={`relative right-0 min-w-[10px] ${
                      showActionMenu.studentId ===
                        year.ACADEMIC_INTAKE_SESSION_ID &&
                      showActionMenu.isOpen &&
                      "bg-custom-bg-notActive-nav"
                    } cursor-pointer rounded-[3px] px-2 py-4`}
                  >
                    <BsThreeDotsVertical />
                    {showActionMenu.studentId ===
                      year.ACADEMIC_INTAKE_SESSION_ID &&
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
            count={+`${parseInt(panigationData.count / 30)}`}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>

      {/* add form */}
      {addAction && (
        <div className="fixed left-0 right-0 top-[15%] z-20 m-auto h-[300px] w-[870px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">Sinh viên</h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleAddAction} />
              </div>
            </div>

            <div className="border-y-[1px] border-border-body-form py-[20px]">
              <div className="mb-[10px] flex gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Tên kỳ tuyển sinh:
                  </label>
                  <input
                    id="ACADEMIC_INTAKE_SESSION_NAME"
                    className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                    Ngày bắt đầu:
                  </label>
                  <input
                    type="date"
                    id="START_DATE"
                    className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
              <Button text={"Thêm mới"} justify text16 onClick={handleAddNew} />
            </div>
          </div>
        </div>
      )}

      {/* edit form */}
      {editAction && (
        <div className="fixed left-0 right-0 top-[20px] z-20 m-auto h-[300px] w-[870px] rounded-[10px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">Năm học</h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleEditAction} />
              </div>
            </div>

            {years?.map(
              (year) =>
                showActionMenu.studentId ===
                  year.ACADEMIC_INTAKE_SESSION_ID && (
                  <div
                    key={year.ACADEMIC_INTAKE_SESSION_ID}
                    className="border-t-[1px] border-border-body-form py-[20px]"
                  >
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Tên kỳ tuyển sinh:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[year.ACADEMIC_INTAKE_SESSION_ID]
                              .ACADEMIC_INTAKE_SESSION_NAME
                          }
                          type="text"
                          id="ACADEMIC_INTAKE_SESSION_NAME"
                          className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              year.ACADEMIC_INTAKE_SESSION_ID,
                              "ACADEMIC_INTAKE_SESSION_NAME",
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Ngày bắt đầu:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[year.ACADEMIC_INTAKE_SESSION_ID]
                              .START_DATE
                          }
                          type="date"
                          id="START_DATE"
                          className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              year.ACADEMIC_INTAKE_SESSION_ID,
                              "START_DATE",
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
                          handleSaveInformation(year.ACADEMIC_INTAKE_SESSION_ID)
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
};

export default ListYear;
