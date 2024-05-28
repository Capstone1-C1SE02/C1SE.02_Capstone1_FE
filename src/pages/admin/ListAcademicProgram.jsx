import { Button, Label } from "@/components/admin";
import React, { useEffect, useState } from "react";
import icon from "@/ultils/icon";
import {
  HeaderAndInput,
  DeleteForm,
  FooterPage,
  InputForm2,
  SelectForm,
} from "@/components/admin";
import axiosConfig from "@/axiosConfig";
import { addAcademicProgram } from "@/redux/apiRequestAdd";
import { editAcademicProgram } from "@/redux/apiRequestEdit";
import { deleteAcademicProgram } from "@/redux/apiRequestDelete";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Academicleveltype, Degree } from "@/components/dropList";
import Swal from "sweetalert2";

const { BsThreeDotsVertical, FaTimes } = icon;
import "react-toastify/dist/ReactToastify.css";
const statuses = [
  { status: "Chính quy" },
  { status: "Vừa học vừa làm" },
  { status: "Đào tạo từ xa" },
];

function ListAcademicProgram() {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const [render, setRender] = useState(0);
  const [academicleveltype, setAcademicleveltype] = useState();
  const [degree, setDegree] = useState();
  const [page, setPage] = useState(1);
  const [academicprograms, setAcademicPrograms] = useState([]);
  const [panigationData, setPanigationData] = useState({
    count: "",
    page: "",
  });
  const [searchPayload, setsearchPayload] = useState(false);
  useEffect(() => {
    async function fetchaAademicPrograms() {
      try {
        if (searchPayload == false) {
          const response = await axiosConfig.get(
            `/academicprogram?page=${page}`,
          );
          setAcademicPrograms(response.data.results.data);
          setPanigationData({
            count: response.data.count,
            page: response.data.total_pages,
          });
        } else {
          const response = await axiosConfig.post(
            `/search/academicprogram?academicprogramname=${searchValue}`,
          );
          setAcademicPrograms(response.data.data);
        }
      } catch (error) {
        console.error(
          "Đã xảy ra lỗi khi lấy danh sách Mã chuyên ngành đào tạo:",
          error,
        );
      }
    }
    fetchaAademicPrograms();
  }, [render, page, searchPayload]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const academiclevel = await Academicleveltype();
        const degree = await Degree();
        setAcademicleveltype(academiclevel.data);
        setDegree(degree.data.data);
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
  const setPayloadAction = () => {
    setPayload({
      ACADEMIC_PROGRAM_ID: "",
      ACADEMIC_PROGRAM_CODE: "",
      ACADEMIC_PROGRAM_NAME: "",
      ACADEMIC_LEVEL_TYPE_ID: "",
      MODE_OF_STUDY: "",
      DEGREE_DURATION: "",
      DESCRIPTION: "",
      DEGREE_ID: "",
    });
  };
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

  const [invalidFields, setInvalidFields] = useState([]);
  const validate = (payload) => {
    let invalids = 0;
    let fields = Object.entries(payload);
    fields.forEach((item, index) => {
      if (index !== 0 && item[0] !== "DESCRIPTION" && item[1] === "") {
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
        Swal.fire("Thông báo", "Thêm chuyên ngành đào tạo thất bại", "error");
      } else if (!errorAdd) {
        Swal.fire(
          "Thông báo",
          "Thêm chuyên ngành đào tạo thành công",
          "success",
        );
      }
      setShowAlert(false);
    }
  }, [count.countAdd]);
  useEffect(() => {
    if (showAlert) {
      if (errorEdit) {
        Swal.fire("Thông báo", "Sửa chuyên ngành đào tạo thất bại", "error");
      } else if (!errorEdit) {
        Swal.fire(
          "Thông báo",
          "Sửa chuyên ngành đào tạo thành công",
          "success",
        );
      }
      setShowAlert(false);
    }
  }, [count.countEdit]);
  useEffect(() => {
    if (showAlert) {
      if (errorDelete) {
        Swal.fire("Thông báo", "Xoá chuyên ngành đào tạo thất bại", "error");
      } else if (!errorDelete) {
        Swal.fire(
          "Thông báo",
          "Xoá chuyên ngành đào tạo thành công",
          "success",
        );
      }
      setShowAlert(false);
    }
  }, [count.countDelete]);
  //add
  const handleAddANew = async () => {
    const valid = validate(payload);
    console.log("valid", valid);
    console.log("invalidFields", invalidFields);
    if (valid > 0) {
      return;
    }
    await addAcademicProgram(payload, dispatch);
    setCount((pre) => ({ ...pre, countAdd: pre.countAdd + 1 }));
    showAddAction(!addAction);
    setRender(render + 1);
    setPayloadAction();
    setShowAlert(true);
  };

  //edit
  const handleSaveInformation = async (id) => {
    const valid = validate(objectPayload[id]);
    console.log("valid", valid);
    console.log("invalidFields", invalidFields);

    if (valid > 0) {
      return;
    }
    await editAcademicProgram(objectPayload[id], dispatch);
    setCount((pre) => ({ ...pre, countEdit: pre.countEdit + 1 }));
    showEditAction(!editAction);
    setRender(render + 1);
    setShowAlert(true);
  };

  //delele
  const handleDelete = async () => {
    await deleteAcademicProgram(showActionMenu.studentId, dispatch);
    showDeleteAction(!deleteAction);
    setRender(render + 1);
    setShowAlert(true);
    setCount((pre) => ({ ...pre, countDelete: pre.countDelete + 1 }));
    showEditAction(false);
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

  const showDeleteEdit = () => {
    showDeleteAction(!deleteAction);
    showEditAction(!editAction);
  };

  const handleCloseAll = () => {
    showAddAction(false);
    showEditAction(false);
    showDeleteAction(false);
    setInvalidFields("");
  };

  const handleActionClick = (studentId) => {
    setShowActionMenu({ studentId, isOpen: !showActionMenu.isOpen });
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
  const handleSearch = async () => {
    setsearchPayload(true);
    setRender(render + 1);
  };

  const handleEndSearch = () => {
    setsearchPayload(false);
  };
  return (
    <div className="relative mx-auto flex h-full w-full flex-col gap-[10px] bg-backLayout">
      <ToastContainer />
      <HeaderAndInput
        lable={"Danh sách chuyên ngành đào tạo"}
        placeholder="Nhập tên chuyên ngành đào tạo để tìm kiếm"
        onClick={handleAddAction}
        buttonClick={handleSearch}
        valueSearch={searchValue}
        setvalueSearch={setSearchValue}
        endSearch={handleEndSearch}
        searchOrNot
      />
      <div className=" relative h-[84%] rounded-xl bg-table-bg">
        <div className="h-full p-[-60px]">
          <table
            className={`block h-full w-full overflow-x-auto border-l-[30px] border-t-[30px] border-white`}
          >
            <thead className="flex w-full flex-col ">
              <tr className=" flex w-full items-center justify-between text-left text-[12px] font-medium uppercase text-header-text">
                <th className=" min-w-[250px] px-4 py-2">
                  Mã chuyên ngành đào tạo
                </th>
                <th className=" min-w-[400px] px-4 py-2">
                  Tên chuyên ngành đào tạo
                </th>
                <th className=" min-w-[300px] px-4 py-2">Tên ngành tạo</th>
                <th className=" min-w-[200px] px-4 py-2">Bậc đào tạo </th>
                <th className=" min-w-[200px] px-4 py-2">Loại hình đào tạo</th>
                <th className=" min-w-[200px] px-4 py-2">Thời gian đào tạo</th>
                <th className=" min-w-[300px] px-4 py-2">Mô tả</th>
                <th className=" min-w-[20px] px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className=" relative w-full">
              {academicprograms?.map((academicprogram) => (
                <tr
                  key={academicprogram.ACADEMIC_PROGRAM_ID}
                  className="flex h-[58px] cursor-pointer items-center overflow-hidden text-ellipsis whitespace-nowrap border-gray-300 text-[14px] font-semibold hover:bg-gray-200"
                  onClick={() =>
                    showViewEdit(academicprogram.ACADEMIC_PROGRAM_ID)
                  }
                >
                  <td className="min-w-[250px] px-4 py-2">
                    {academicprogram.ACADEMIC_PROGRAM_CODE}
                  </td>
                  <td className="min-w-[400px] px-4 py-2">
                    {academicprogram.ACADEMIC_PROGRAM_NAME}
                  </td>
                  <td className="min-w-[300px] px-4 py-2">
                    {degree?.length > 0 &&
                      degree?.map(
                        (degree) =>
                          degree.DEGREE_ID === academicprogram.DEGREE_ID &&
                          degree.DEGREE_NAME,
                      )}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {academicleveltype?.map(
                      (i) =>
                        academicprogram.ACADEMIC_LEVEL_TYPE_ID ==
                          i.ACADEMIC_LEVEL_TYPE_ID &&
                        i.ACADEMIC_LEVEL_TYPE_NAME,
                    )}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {academicprogram.MODE_OF_STUDY}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {`${academicprogram.DEGREE_DURATION} năm`}
                  </td>
                  <td className="min-w-[300px] px-4 py-2">
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
            count={+panigationData.page}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>

      {/* add form */}
      {addAction && (
        <div className="animation fixed left-0 right-0 top-[20%]  z-20 m-auto h-[610px] w-[870px] rounded-[10px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">
                Chuyên ngành đào tạo
              </h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleAddAction} />
              </div>
            </div>

            <div className="border-y-[1px] border-border-body-form py-[20px]">
              <div className="flex h-[100px] gap-[30px]">
                <InputForm2
                  text={"Mã chuyên ngành đào tạo"}
                  setValue={setPayload}
                  keyObject={"ACADEMIC_PROGRAM_CODE"}
                  setInvalidFields={setInvalidFields}
                  invalidFields={invalidFields}
                  w333
                />
                <SelectForm
                  text={"Bậc đào tạo tạo:"}
                  setValue={setPayload}
                  keyObject={"ACADEMIC_LEVEL_TYPE_ID"}
                  setInvalidFields={setInvalidFields}
                  invalidFields={invalidFields}
                  w333
                  dataAPI={academicleveltype}
                  dataValue={"ACADEMIC_LEVEL_TYPE_ID"}
                  dataName={"ACADEMIC_LEVEL_TYPE_NAME"}
                />
                <SelectForm
                  text={"Loại hình đào tạo:"}
                  setValue={setPayload}
                  keyObject={"MODE_OF_STUDY"}
                  setInvalidFields={setInvalidFields}
                  invalidFields={invalidFields}
                  w333
                  dataNoAPI={statuses}
                />
              </div>
              <div className="flex h-[100px] gap-[30px]">
                <InputForm2
                  text={" Tên chuyên ngành đào tạo:"}
                  setValue={setPayload}
                  keyObject={"ACADEMIC_PROGRAM_NAME"}
                  setInvalidFields={setInvalidFields}
                  w1
                  invalidFields={invalidFields}
                />
              </div>
              <div className="flex h-[100px] gap-[30px]">
                <InputForm2
                  text={" Thời gian đào tạo:"}
                  setValue={setPayload}
                  keyObject={"DEGREE_DURATION"}
                  setInvalidFields={setInvalidFields}
                  w22
                  invalidFields={invalidFields}
                />
                <SelectForm
                  text={" Tên ngành tạo:"}
                  setValue={setPayload}
                  keyObject={"DEGREE_ID"}
                  setInvalidFields={setInvalidFields}
                  dataAPI={degree}
                  dataValue={"DEGREE_ID"}
                  dataName={"DEGREE_NAME"}
                  w22
                  invalidFields={invalidFields}
                />
              </div>
              <div className="flex h-[100px] gap-[30px]">
                <InputForm2
                  text={"Mô tả:"}
                  setValue={setPayload}
                  keyObject={"DESCRIPTION"}
                  setInvalidFields={setInvalidFields}
                  w1
                  invalidFields={invalidFields}
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
        <div className="animation fixed left-0 right-0 top-[20%]  z-20 m-auto h-[610px] w-[870px] rounded-[10px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">
                Chuyên ngành đào tạo
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
                    <div className="flex h-[100px] gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Mã chuyên ngành đào tạo:
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
                          onFocus={() => setInvalidFields("")}
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              academicprogram.ACADEMIC_PROGRAM_ID,
                              "ACADEMIC_PROGRAM_CODE",
                            )
                          }
                        />
                        {invalidFields.length > 0 &&
                          invalidFields.some(
                            (item) => item.name === "ACADEMIC_PROGRAM_CODE",
                          ) && (
                            <small className="italic text-red-500">
                              {
                                invalidFields.find(
                                  (i) => i.name === "ACADEMIC_PROGRAM_CODE",
                                )?.message
                              }
                            </small>
                          )}
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
                          onFocus={() => setInvalidFields("")}
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
                        {invalidFields.length > 0 &&
                          invalidFields.some(
                            (item) => item.name === "ACADEMIC_LEVEL_TYPE_ID",
                          ) && (
                            <small className="italic text-red-500">
                              {
                                invalidFields.find(
                                  (i) => i.name === "ACADEMIC_LEVEL_TYPE_ID",
                                )?.message
                              }
                            </small>
                          )}
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
                          onFocus={() => setInvalidFields("")}
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              academicprogram.ACADEMIC_PROGRAM_ID,
                              "MODE_OF_STUDY",
                            )
                          }
                        >
                          <option hidden></option>
                          {statuses?.map((i) => (
                            <option key={i.id} value={i.status + ""}>
                              {i.status}
                            </option>
                          ))}
                        </select>
                        {invalidFields.length > 0 &&
                          invalidFields.some(
                            (item) => item.name === "MODE_OF_STUDY",
                          ) && (
                            <small className="italic text-red-500">
                              {
                                invalidFields.find(
                                  (i) => i.name === "MODE_OF_STUDY",
                                )?.message
                              }
                            </small>
                          )}
                      </div>{" "}
                    </div>
                    <div className="flex h-[100px] gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Tên chuyên ngành đào tạo:
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
                          onFocus={() => setInvalidFields("")}
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              academicprogram.ACADEMIC_PROGRAM_ID,
                              "ACADEMIC_PROGRAM_NAME",
                            )
                          }
                        />
                        {invalidFields.length > 0 &&
                          invalidFields.some(
                            (item) => item.name === "ACADEMIC_PROGRAM_NAME",
                          ) && (
                            <small className="italic text-red-500">
                              {
                                invalidFields.find(
                                  (i) => i.name === "ACADEMIC_PROGRAM_NAME",
                                )?.message
                              }
                            </small>
                          )}
                      </div>{" "}
                    </div>
                    <div className="flex h-[100px] gap-[30px]">
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
                          onFocus={() => setInvalidFields("")}
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              academicprogram.ACADEMIC_PROGRAM_ID,
                              "DEGREE_DURATION",
                            )
                          }
                        />
                        {invalidFields.length > 0 &&
                          invalidFields.some(
                            (item) => item.name === "DEGREE_DURATION",
                          ) && (
                            <small className="italic text-red-500">
                              {
                                invalidFields.find(
                                  (i) => i.name === "DEGREE_DURATION",
                                )?.message
                              }
                            </small>
                          )}
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Tên ngành tạo:
                        </label>
                        <select
                          defaultValue={
                            objectPayload[academicprogram.ACADEMIC_PROGRAM_ID]
                              .DEGREE_ID
                          }
                          type="text"
                          id="DEGREE_ID
                          "
                          className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onFocus={() => setInvalidFields("")}
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              academicprogram.ACADEMIC_PROGRAM_ID,
                              "DEGREE_ID",
                            )
                          }
                        >
                          <option hidden></option>
                          {degree?.map((item) => (
                            <option
                              key={item.DEGREE_ID}
                              value={+item.DEGREE_ID}
                            >
                              {item.DEGREE_NAME}
                            </option>
                          ))}
                        </select>
                        {invalidFields.length > 0 &&
                          invalidFields.some(
                            (item) => item.name === "DEGREE_ID",
                          ) && (
                            <small className="italic text-red-500">
                              {
                                invalidFields.find(
                                  (i) => i.name === "DEGREE_ID",
                                )?.message
                              }
                            </small>
                          )}
                      </div>{" "}
                    </div>
                    <div className="flex h-[100px] gap-[30px]">
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
                          onFocus={() => setInvalidFields("")}
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              academicprogram.ACADEMIC_PROGRAM_ID,
                              "DESCRIPTION",
                            )
                          }
                        />
                        {invalidFields.length > 0 &&
                          invalidFields.some(
                            (item) => item.name === "DESCRIPTION",
                          ) && (
                            <small className="italic text-red-500">
                              {
                                invalidFields.find(
                                  (i) => i.name === "DESCRIPTION",
                                )?.message
                              }
                            </small>
                          )}
                      </div>{" "}
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
                          handleSaveInformation(
                            academicprogram.ACADEMIC_PROGRAM_ID,
                          )
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

export default ListAcademicProgram;
