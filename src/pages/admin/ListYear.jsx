import React, { useEffect, useState } from "react";
import icon from "@/ultils/icon";
const { BsThreeDotsVertical, FaTimes } = icon;
import {
  HeaderAndInput,
  Label,
  Button,
  DeleteForm,
  AddForm,
} from "@/components/admin";
import axiosConfig from "@/axiosConfig";
import { addAcademiYear } from "@/redux/apiRequestAdd";
import { deleteAcademicYear } from "@/redux/apiRequestDelete";
import { editAcademicYear } from "@/redux/apiRequestEdit";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ListYear = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataDelete = useSelector((state) => state.deleteAction);
  const dataAdd = useSelector((state) => state.addAction);
  const dataEdit = useSelector((state) => state.editAction);
  const [count, setCount] = useState(0);
  const [years, setYears] = useState([]);
  useEffect(() => {
    async function fetchYearsData() {
      try {
        const response = await axiosConfig.get("/academicyear");
        setYears(response.data);
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy danh sách năm học:", error);
      }
    }
    fetchYearsData();
  }, [count]);

  const [showActionMenu, setShowActionMenu] = useState({
    studentId: null,
    isOpen: false,
  });

  const [idStudent, setIdStudent] = useState("");
  const [addAction, showAddAction] = useState(false);
  const [editAction, showEditAction] = useState(false);
  const [deleteAction, showDeleteAction] = useState(false);
  const [payload, setPayload] = useState({
    AcademicYearID: "",
    Year: "",
  });

  const [objectPayload, setObjectPayload] = useState();
  useEffect(() => {
    if (years.length > 0) {
      setObjectPayload(
        years.reduce((acc, year) => {
          acc[year.AcademicYearID] = {
            AcademicYearID: year.AcademicYearID,
            Year: year.Year,
          };
          return acc;
        }, {}),
      );
    }
  }, [years]);

  //add
  const handleAddNew = async () => {
    await addAcademiYear(payload, dispatch);
    dataAdd.addAction.data.message
      ? toast.success("Thêm thành công")
      : toast.error("Thêm thất bại");
    showAddAction(!addAction);
    setCount(count + 1);
  };

  //delele
  const handleDeleteYear = async () => {
    await deleteAcademicYear(showActionMenu.studentId, dispatch, navigate)
    dataDelete.deleteAction.mode
      ? toast.success("Xoá thành công")
      : toast.error("Xoá thất bại");
    showDeleteAction(!deleteAction);
    setCount(count + 1);
  };

  // edit
  const handleSaveInformation = async (id) => {
    await editAcademicYear(objectPayload[id], dispatch);
    dataEdit.editAction.mode
      ? toast.success("Sửa thành công")
      : toast.error("Sửa thất bại");
    showEditAction(!editAction);
    setCount(count + 1);
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
      <HeaderAndInput lable={"Năm học"} onClick={handleAddAction} />
      <ToastContainer />

      <div className=" relative h-full rounded-xl bg-table-bg">
        <div className="h-full p-[-60px]">
          <table
            className={`relative block h-40 min-h-[100%] w-full border-[30px] border-white ${window.innerWidth >= 1600 ? "overflow-x-hidden " : "overflow-x-scroll"} `}
          >
            <thead className="flex w-full flex-col ">
              <tr className=" w-full text-left text-[12px] font-medium uppercase text-header-text">
                <th className=" min-w-full px-4 py-2">Năm học</th>
                <th className=" min-w-[20px] px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="flex w-full flex-col ">
              {years.map((year) => (
                <tr
                  key={year.AcademicYearID}
                  className="relative flex items-center justify-between border-gray-300 text-[14px] font-semibold hover:bg-gray-200 "
                >
                  <td className="w-[1200px] px-4 py-2">{year.Year}</td>
                  <td
                    onClick={() => handleActionClick(year.AcademicYearID)}
                    className={`relative right-0 min-w-[10px] ${
                      showActionMenu.studentId === year.AcademicYearID &&
                      showActionMenu.isOpen &&
                      "bg-custom-bg-notActive-nav"
                    } cursor-pointer rounded-[3px] px-2 py-4`}
                  >
                    <BsThreeDotsVertical />
                    {showActionMenu.studentId === year.AcademicYearID &&
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
        <AddForm
          handleAddAction={handleAddAction}
          handleAddNew={handleAddNew}
          setPayload={setPayload}
        />
      )}

      {/* edit form */}
      {editAction && (
        <div className="fixed left-0 right-0 top-[20px] z-20 m-auto h-[300px] w-[460px] rounded-[10px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">Năm học</h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleEditAction} />
              </div>
            </div>

            {years.map(
              (year) =>
                showActionMenu.studentId === year.AcademicYearID && (
                  <div
                    key={year.AcademicYearID}
                    className="border-t-[1px] border-border-body-form py-[20px]"
                  >
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Năm học:
                        </label>
                        <input
                          defaultValue={objectPayload[year.AcademicYearID].Year}
                          type="text"
                          id="Year"
                          className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(e, year.AcademicYearID, "Year")
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
                          handleSaveInformation(year.AcademicYearID)
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
          handleDeleteYear={handleDeleteYear}
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
