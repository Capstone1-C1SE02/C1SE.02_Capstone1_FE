import {
  Button,
  Label,
  HeaderAndInput,
  DeleteForm,
  FooterPage,
  InputForm2,
  ImportFile,
} from "@/components/admin";
import React, { useEffect, useState } from "react";
import icon from "@/ultils/icon";
import axiosConfig from "@/axiosConfig";
import { addAcademiYear } from "@/redux/apiRequestAdd";
import { deleteAcademicYear } from "@/redux/apiRequestDelete";
import { editAcademicYear } from "@/redux/apiRequestEdit";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
const { BsThreeDotsVertical, FaTimes } = icon;

const ListYear = () => {
  const dispatch = useDispatch();
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
  const [importFile, setImportFile] = useState(false);
  const [payload, setPayload] = useState({
    ACADEMIC_INTAKE_SESSION_NAME: "",
    START_DATE: "",
  });

  const setPayloadAction = () => {
    setPayload({
      ACADEMIC_INTAKE_SESSION_NAME: "",
      START_DATE: "",
    });
  };
  const [objectPayload, setObjectPayload] = useState();
  useEffect(() => {
    setObjectPayload(
      years.reduce((acc, year) => {
        acc[year.ACADEMIC_INTAKE_SESSION_ID] = {
          ACADEMIC_INTAKE_SESSION_NAME: year.ACADEMIC_INTAKE_SESSION_NAME,
          START_DATE: year.START_DATE,
        };
        return acc;
      }, {}),
    );
  }, [years]);

  const [invalidFields, setInvalidFields] = useState([]);
  const validate = (payload) => {
    let invalids = 0;
    let fields = Object.entries(payload);
    fields.forEach((item) => {
      if (item[1] === "") {
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
  const [countAdd, setCountAdd] = useState(0);
  const [countDelete, setCountDelete] = useState(0);
  const [countEdit, setCountEdit] = useState(0);

  useEffect(() => {
    console.log("add action", errorAdd);
    if (showAlert) {
      if (errorAdd) {
        Swal.fire("Thông báo", "Thêm năm học thất bại", "error");
      } else if (!errorAdd) {
        Swal.fire("Thông báo", "Thêm năm học thành công", "success");
      }
      setShowAlert(false);
    }
  }, [countAdd]);
  useEffect(() => {
    if (showAlert) {
      if (errorEdit) {
        Swal.fire("Thông báo", "Sửa năm học thất bại", "error");
      } else if (!errorEdit) {
        Swal.fire("Thông báo", "Sửa năm học thành công", "success");
      }
      setShowAlert(false);
    }
  }, [countEdit]);
  useEffect(() => {
    if (showAlert) {
      if (errorDelete) {
        Swal.fire("Thông báo", "Xoá năm học thất bại", "error");
      } else if (!errorDelete) {
        Swal.fire("Thông báo", "Xoá năm học thành công", "success");
      }
      setShowAlert(false);
    }
  }, [countDelete]);
  //add
  const handleAddNew = async () => {
    const valid = validate(payload);
    if (valid > 0) {
      return;
    }
    await addAcademiYear(payload, dispatch);
    showAddAction(!addAction);
    setRender(render + 1);
    setPayloadAction();
    setShowAlert(true);
    setCountAdd(countAdd + 1);
  };
  //delele
  const handleDelete = async () => {
    await deleteAcademicYear(showActionMenu.studentId, dispatch);
    showDeleteAction(!deleteAction);
    setRender(render + 1);
    setShowAlert(true);
    setCountDelete(countDelete + 1);
    showEditAction(false);
  };

  // edit
  const handleSaveInformation = async (id) => {
    const valid = validate(objectPayload[id]);
    if (valid > 0) {
      return;
    }
    await editAcademicYear(objectPayload[id], id, dispatch);

    showEditAction(!editAction);
    setRender(render + 1);
    setShowAlert(true);
    setCountEdit(countEdit + 1);
  };

  //import
  const handleImport = async () => {};

  const handleAddAction = () => {
    showAddAction(!addAction);
  };

  const handleEditAction = () => {
    showEditAction(!editAction);
  };

  const handleDeleteAction = () => {
    showDeleteAction(!deleteAction);
  };

  const handleImportFile = () => {
    setImportFile(!importFile);
  };

  const handleCloseAll = () => {
    showAddAction(false);
    showEditAction(false);
    showDeleteAction(false);
    setImportFile(false);
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

  const showViewEdit = (id) => {
    setShowActionMenu({ studentId: id });
    handleEditAction();
  };

  return (
    <div className="relative mx-auto flex h-full w-full flex-col gap-[10px] bg-backLayout">
      <HeaderAndInput
        lable={"Năm học"}
        onClick={handleAddAction}
        placeholder="Nhập tên năm học để tìm kiếm"
      />
      <div className=" relative h-[84%] rounded-xl bg-table-bg">
        <div className="h-full p-[-60px]">
          <table
            className={`relative block h-40 min-h-[100%] w-full border-l-[30px] border-t-[30px] border-white ${window.innerWidth >= 1600 ? "overflow-x-hidden " : "overflow-x-scroll"} `}
          >
            <thead className="flex w-full flex-col ">
              <tr className=" flex w-full items-center justify-between text-left text-[12px] font-medium uppercase text-header-text">
                <th className=" w-[400px] px-4 py-2">Tên kỳ tuyển sinh</th>
                <th className=" w-[1200px] px-4 py-2">Thời gian bắt đầu</th>
                <th className=" min-w-[20px] px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="flex w-full cursor-pointer flex-col ">
              {years?.map((year) => (
                <tr
                  key={year.ACADEMIC_INTAKE_SESSION_ID}
                  className="relative flex h-[58px] items-center justify-between border-gray-300 text-[14px] font-semibold hover:bg-gray-200 "
                  onClick={() => showViewEdit(year.ACADEMIC_INTAKE_SESSION_ID)}
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
            count={+`${panigationData.page}`}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>

      {/* add form */}
      {addAction && (
        <div className="animation fixed left-0 right-0 top-[25%]  z-20 m-auto h-[300px] w-[870px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">Năm học</h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleAddAction} />
              </div>
            </div>

            <div className="border-y-[1px] border-border-body-form py-[20px]">
              <div className="flex h-[100px] gap-[30px]">
                <InputForm2
                  text={"Tên kì tuyển sinh"}
                  setValue={setPayload}
                  keyObject={"ACADEMIC_INTAKE_SESSION_NAME"}
                  setInvalidFields={setInvalidFields}
                  invalidFields={invalidFields}
                  w22
                />
                <InputForm2
                  typeInput={"date"}
                  text={"Thời gian bắt đầu"}
                  setValue={setPayload}
                  keyObject={"START_DATE"}
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
              <Button text={"Thêm mới"} justify text16 onClick={handleAddNew} />
            </div>
          </div>
        </div>
      )}

      {/* edit form */}
      {editAction && (
        <div className="animation fixed left-0 right-0 top-[25%]  z-20 m-auto h-[320px] w-[870px] rounded-[10px] bg-[white]">
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
                    <div className="flex h-[100px] gap-[30px]">
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
                          onFocus={() => setInvalidFields("")}
                        />
                        {invalidFields.length > 0 &&
                          invalidFields.some(
                            (item) =>
                              item.name === "ACADEMIC_INTAKE_SESSION_NAME",
                          ) && (
                            <small className="italic text-red-500">
                              {
                                invalidFields.find(
                                  (i) =>
                                    i.name === "ACADEMIC_INTAKE_SESSION_NAME",
                                )?.message
                              }
                            </small>
                          )}
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
                          onFocus={() => setInvalidFields("")}
                        />
                        {invalidFields.length > 0 &&
                          invalidFields.some(
                            (item) => item.name === "START_DATE",
                          ) && (
                            <small className="italic text-red-500">
                              {
                                invalidFields.find(
                                  (i) => i.name === "START_DATE",
                                )?.message
                              }
                            </small>
                          )}
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
                          handleSaveInformation(year.ACADEMIC_INTAKE_SESSION_ID)
                        }
                      />
                      <Button
                        text={"Xoá"}
                        // bgColor={"bg-bg-button-add"}
                        // textColor={"text-[#16A34A] "}
                        justify
                        text16
                        onClick={(e) => showDeleteAction(!deleteAction)}
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

      {importFile && (
        <ImportFile
          text={"Năm tuyển sinh"}
          handleImportAction={handleImportFile}
          handleImport={handleImport}
        />
      )}

      {(addAction || editAction || deleteAction || importFile) && (
        <div>
          <Label onClick={handleCloseAll} />
        </div>
      )}
    </div>
  );
};

export default ListYear;
