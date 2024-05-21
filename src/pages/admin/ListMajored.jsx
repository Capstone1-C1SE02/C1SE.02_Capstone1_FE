import React, { useEffect, useState } from "react";
import icon from "@/ultils/icon";
import {
  HeaderAndInput,
  Button,
  Label,
  FooterPage,
  InputForm2,
  SelectForm,
  ImportFile,
} from "@/components/admin";
const { BsThreeDotsVertical, FaTimes } = icon;
import axiosConfig from "@/axiosConfig";
import { addMajor } from "@/redux/apiRequestAdd";
import { editMajor } from "@/redux/apiRequestEdit";
import { deleleMajor } from "@/redux/apiRequestDelete";
import { useDispatch, useSelector } from "react-redux";
import { LearningStatusType } from "@/components/dropList";
import Swal from "sweetalert2";

const statuses = [
  { id: 0, value: true, status: "Đang tiến hành" },
  { id: 1, value: false, status: "Đã huỷ" },
];
function ListMajored() {
  const dispatch = useDispatch();
  const [learningStatusType, setLearningStatusType] = useState();
  const [render, setRender] = useState(0);
  const [majors, setMajors] = useState([]);
  const [page, setPage] = useState(1);
  const [panigationData, setPanigationData] = useState({
    count: "",
    page: "",
  });
  useEffect(() => {
    async function fetchMajorsData() {
      try {
        console.log("page tesst", page);
        const response = await axiosConfig.get(`/degree?page=${page}`);
        console.log("response", response);
        setMajors(response.data.results.data);
        setPanigationData({
          count: response.data.count,
          page: response.data.total_pages,
        });
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy danh sách sinh viên:", error);
      }
    }
    fetchMajorsData();
  }, [render, page]);

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

  const [addAction, showAddAction] = useState(false);
  const [editAction, showEditAction] = useState(false);
  const [deleteAction, showDeleteAction] = useState(false);
  const [importFile, setImportFile] = useState(false);

  const [payload, setPayload] = useState({
    DEGREE_ID: "",
    DEGREE_CODE: "",
    DEGREE_NAME: "",
    DEGREE_STATUS: "",
    DESCRIPTON: "",
  });

  const setPayloadAction = () => {
    setPayload({
      DEGREE_ID: "",
      DEGREE_CODE: "",
      DEGREE_NAME: "",
      DEGREE_STATUS: "",
      DESCRIPTON: "",
    });
  };

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
        Swal.fire("Thông báo", "Thêm ngành đào tạo thất bại", "error");
      } else if (!errorAdd) {
        Swal.fire("Thông báo", "Thêm ngành đào tạo thành công", "success");
      }
      setShowAlert(false);
    }
  }, [count.countAdd]);
  useEffect(() => {
    if (showAlert) {
      if (errorEdit) {
        Swal.fire("Thông báo", "Sửa ngành đào tạo thất bại", "error");
      } else if (!errorEdit) {
        Swal.fire("Thông báo", "Sửa ngành đào tạo thành công", "success");
      }
      setShowAlert(false);
    }
  }, [count.countEdit]);
  useEffect(() => {
    if (showAlert) {
      if (errorDelete) {
        Swal.fire("Thông báo", "Xoá ngành đào tạo thất bại", "error");
      } else if (!errorDelete) {
        Swal.fire("Thông báo", "Xoá ngành đào tạo thành công", "success");
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
    await addMajor(payload, dispatch);
    setCount((pre) => ({ ...pre, countAdd: pre.countAdd + 1 }));
    showAddAction(!addAction);
    setRender(render + 1);
    setPayloadAction();
    setShowAlert(true);
  };

  //edit
  const handleSaveInformation = async (id) => {
    const valid = validate(objectPayload[id]);
    console.log("valid edit--------", valid);
    if (valid > 0) {
      return;
    }
    await editMajor(objectPayload[id], dispatch);
    setCount((pre) => ({ ...pre, countEdit: pre.countEdit + 1 }));
    showEditAction(!editAction);
    setRender(render + 1);
    setShowAlert(true);
  };

  //delete
  const handleDeleteMajor = async () => {
    await deleleMajor(showActionMenu.studentId, dispatch);
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

  const handleImportFile = () => {
    setImportFile(!importFile);
  };

  const handleCloseAll = () => {
    showAddAction(false);
    showEditAction(false);
    showDeleteAction(false);
    setInvalidFields("");
    setImportFile(false);
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

  const handleImport = async () => {};

  return (
    <div className="relative mx-auto flex h-full w-full flex-col gap-[10px] bg-backLayout">
      <HeaderAndInput
        lable={"Danh sách ngành đào tạo"}
        onClick={handleAddAction}
        onClickImportFile={handleImportFile}
        placeholder="Nhập tên ngành đào tạo để tìm kiếm"
      />
      <div className="h-[84%] rounded-xl bg-table-bg">
        <div className="h-full p-[-60px]">
          <table
            className={`block h-full w-full overflow-x-auto border-l-[30px] border-t-[30px] border-white`}
          >
            <thead className="relative flex w-full flex-col justify-between">
              <tr className=" flex w-full items-center justify-between text-left text-[12px] font-medium uppercase text-header-text">
                <th className=" min-w-[300px] px-4 py-2">Mã ngành đào tạo</th>
                <th className=" min-w-[300px] px-4 py-2">Tên ngành đào tạo</th>
                <th className=" min-w-[300px] px-4 py-2">
                  Trạng thái ngành đào tạo
                </th>
                <th className=" min-w-[500px] px-4 py-2">Mô tả</th>
                <th className=" min-w-[20px] px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="relative flex w-full flex-col justify-between ">
              {majors?.map((major) => (
                <tr
                  key={major.DEGREE_ID}
                  className="flex max-h-[38px] items-center  justify-between overflow-hidden text-ellipsis whitespace-nowrap border-gray-300 text-[14px] font-semibold hover:bg-gray-200"
                  onClick={() => showViewEdit(major.DEGREE_ID)}
                >
                  <td className="w-[300px] px-4 py-2">{major.DEGREE_CODE}</td>
                  <td className="w-[300px] px-4 py-2">{major.DEGREE_NAME}</td>
                  <td className="w-[300px] px-4 py-2">
                    {statuses.map(
                      (item) => item.id == major.DEGREE_STATUS && item.status,
                    )}
                  </td>
                  <td className="w-[500px] px-4 py-2">{major.DESCRIPTON}</td>
                  <td
                    onClick={() => handleActionClick(major.DEGREE_ID)}
                    className={`w-[10px] ${
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
      <div className="fixed bottom-2 w-full">
        <div className="flex justify-center">
          <FooterPage
            count={`${panigationData.page}`}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
      {/* add form */}
      {addAction && (
        <div className="animation fixed left-0 right-0 top-[25%]  z-20 m-auto h-[420px] w-[870px] rounded-[10px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">Ngành đào tạo</h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleAddAction} />
              </div>
            </div>

            <div className="border-y-[1px] border-border-body-form py-[20px]">
              <div className="flex h-[100px] gap-[30px]">
                <InputForm2
                  text={"Mã ngành đào tạo"}
                  setValue={setPayload}
                  keyObject={"DEGREE_CODE"}
                  setInvalidFields={setInvalidFields}
                  invalidFields={invalidFields}
                  w333
                />
                <InputForm2
                  text={"Tên ngành đào tạo:"}
                  setValue={setPayload}
                  keyObject={"DEGREE_NAME"}
                  setInvalidFields={setInvalidFields}
                  w333
                  invalidFields={invalidFields}
                />
                <SelectForm
                  text={"Trạng thái ngành đào tạo:"}
                  setValue={setPayload}
                  keyObject={"DEGREE_STATUS"}
                  setInvalidFields={setInvalidFields}
                  dataNoAPI={statuses}
                  w333
                  invalidFields={invalidFields}
                />
              </div>
              <div className="flex h-[100px] gap-[30px]">
                <InputForm2
                  typeInput="tex"
                  text={"Mô tả:"}
                  setValue={setPayload}
                  keyObject={"DESCRIPTON"}
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
        <div className="animation fixed left-0 right-0 top-[25%]  z-20 m-auto h-[420px] w-[870px] rounded-[10px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">Ngành đào tạo</h1>
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
                    <div className="flex h-[100px] gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Mã ngành đào tạo:
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
                          onFocus={() => setInvalidFields("")}
                        />
                        {invalidFields.length > 0 &&
                          invalidFields.some(
                            (item) => item.name === "DEGREE_CODE",
                          ) && (
                            <small className="italic text-red-500">
                              {
                                invalidFields.find(
                                  (i) => i.name === "DEGREE_CODE",
                                )?.message
                              }
                            </small>
                          )}
                      </div>
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Tên ngành đào tạo:
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
                          onFocus={() => setInvalidFields("")}
                        />{" "}
                        {invalidFields.length > 0 &&
                          invalidFields.some(
                            (item) => item.name === "DEGREE_NAME",
                          ) && (
                            <small className="italic text-red-500">
                              {
                                invalidFields.find(
                                  (i) => i.name === "DEGREE_NAME",
                                )?.message
                              }
                            </small>
                          )}
                      </div>
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Trạng thái ngành đào tạo:
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
                          onFocus={() => setInvalidFields("")}
                        >
                          <option hidden></option>
                          {statuses?.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.status}
                            </option>
                          ))}
                        </select>{" "}
                        {invalidFields.length > 0 &&
                          invalidFields.some(
                            (item) => item.name === "DEGREE_STATUS",
                          ) && (
                            <small className="italic text-red-500">
                              {
                                invalidFields.find(
                                  (i) => i.name === "DEGREE_STATUS",
                                )?.message
                              }
                            </small>
                          )}
                      </div>
                    </div>
                    <div className="flex h-[100px] gap-[30px]">
                      {" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Mô tả:
                        </label>
                        <input
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
                          onFocus={() => setInvalidFields("")}
                        />{" "}
                        {invalidFields.length > 0 &&
                          invalidFields.some(
                            (item) => item.name === "DESCRIPTON",
                          ) && (
                            <small className="italic text-red-500">
                              {
                                invalidFields.find(
                                  (i) => i.name === "DESCRIPTON",
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
                        onClick={(e) => handleSaveInformation(major.DEGREE_ID)}
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
      {importFile && (
        <ImportFile
          text={"ngành đào tạo"}
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
}

export default ListMajored;
