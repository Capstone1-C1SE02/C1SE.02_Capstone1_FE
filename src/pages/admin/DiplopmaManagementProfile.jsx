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
  ImportFile,
} from "@/components/admin";
import {
  Student,
  AcademicProgram,
  Academicleveltype,
} from "@/components/dropList";
const { BsThreeDotsVertical, FaTimes } = icon;
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "@/axiosConfig";
import { addDiplopManamentProfile } from "@/redux/apiRequestAdd";
import { deleleDiplopManagermentProfile } from "@/redux/apiRequestDelete";
import { editDiplopManagermentProfile } from "@/redux/apiRequestEdit";
import getAdminId from "@/ultils/getAdminId";
import Swal from "sweetalert2";

function DiplopmaManagementProfile() {
  const [adminId, setadminId] = useState();

  console.log("admin id admin", adminId);
  const dispatch = useDispatch();
  const [render, setRender] = useState(0);
  const [degreebooks, setDegreebooks] = useState([]);
  const [students, setStudent] = useState();
  const [academicleveltype, setAcademicleveltype] = useState();
  const statuses = [
    { id: 0, value: true, status: "Đã khoá" },
    { id: 1, value: false, status: "Chưa khoá" },
  ];

  console.log(statuses);
  const [page, setPage] = useState(1);
  const [academicProgram, setAcademicProgram] = useState();
  const [panigationData, setPanigationData] = useState({
    count: "",
    page: "",
  });

  useEffect(() => {
    async function fetchDegreesData() {
      try {
        const response = await axiosConfig.get(
          `/diplomamanagementprofile?page=${page}`,
        );
        console.log("response", response);
        setDegreebooks(response.data.results.data);
        setPanigationData({
          count: response.data.count,
          page: response.data.total_pages,
        });
        const idAdmin = await getAdminId();
        setadminId(idAdmin);
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy danh sách văn bằng:", error);
      }
    }
    fetchDegreesData();
  }, [render, page]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };
  const handleImport = async () => {
    try {
      if (!selectedFile) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "File không tồn tại",
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axiosConfig.post("/upload-diploma", formData);
      Swal.fire({
        icon: "success",
        title: "Import danh sách bằng cấp thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      setImportFile(false);
      setRender(render + 1);
    } catch (error) {
      let errorMessage = Object.entries(error.response.data)[0][1];
      for (let i = 0; i < errorMessage.length; i++) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage[i].error,
        });
      }
      error = "";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const academicProgram = await AcademicProgram();
        const student = await Student();
        setAcademicProgram(academicProgram.data.data);
        setStudent(student.data.data);
        const academicleveltype = await Academicleveltype();
        setAcademicleveltype(academicleveltype.data);
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
  const [importFile, setImportFile] = useState(false);

  const [payload, setPayload] = useState();

  useEffect(() => {
    setPayload({
      STUDENT_ID_NUMBER: "",
      GRADUATION_YEAR: "",
      MODE_OF_STUDY: "",
      ACADEMIC_PROGRAM_ID: "",
      CLASSIFIED_BY_ACADEMIC_RECORDS: "",
      NUMBER_ENTERED_INTO_THE_DEGREE_TRACKING_BOOK: "",
      CERTIFICATE_NUMBER: "",
      DATE_OF_DECISION_ANNOUNCEMENT: "",
      DATE_UPDATED: "",
      APPROVED: "",
      COMMENT: "",
      user: adminId,
    });
  }, [adminId]);

  const setPayloadAction = () => {
    setPayload({
      STUDENT_ID_NUMBER: "",
      GRADUATION_YEAR: "",
      MODE_OF_STUDY: "",
      ACADEMIC_PROGRAM_ID: "",
      CLASSIFIED_BY_ACADEMIC_RECORDS: "",
      NUMBER_ENTERED_INTO_THE_DEGREE_TRACKING_BOOK: "",
      CERTIFICATE_NUMBER: "",
      DATE_OF_DECISION_ANNOUNCEMENT: "",
      DATE_UPDATED: "",
      APPROVED: "",
      COMMENT: "",
      user: adminId,
    });
  };

  const [objectPayload, setObjectPayload] = useState();

  useEffect(() => {
    setObjectPayload(
      degreebooks.reduce((acc, diplopmaMP) => {
        acc[diplopmaMP.DIPLOMA_MANAGEMENT_PROFILE_ID] = {
          STUDENT_ID_NUMBER: diplopmaMP.STUDENT_ID_NUMBER,
          GRADUATION_YEAR: diplopmaMP.GRADUATION_YEAR,
          MODE_OF_STUDY: diplopmaMP.MODE_OF_STUDY,
          ACADEMIC_PROGRAM_ID: diplopmaMP.ACADEMIC_PROGRAM_ID,
          CLASSIFIED_BY_ACADEMIC_RECORDS:
            diplopmaMP.CLASSIFIED_BY_ACADEMIC_RECORDS,

          NUMBER_ENTERED_INTO_THE_DEGREE_TRACKING_BOOK:
            diplopmaMP.NUMBER_ENTERED_INTO_THE_DEGREE_TRACKING_BOOK,
          CERTIFICATE_NUMBER: diplopmaMP.CERTIFICATE_NUMBER,
          DATE_OF_DECISION_ANNOUNCEMENT:
            diplopmaMP.DATE_OF_DECISION_ANNOUNCEMENT,
          DATE_UPDATED: diplopmaMP.DATE_UPDATED,
          APPROVED: diplopmaMP.APPROVED,
          COMMENT: diplopmaMP.COMMENT,
          user: adminId,
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
      console.log("item", item[0] === "APPROVED");
      if (item[1] === "" && item[0] != "APPROVED") {
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
        Swal.fire("Thông báo", "Thêm văn bằng thất bại", "error");
      } else if (!errorAdd) {
        Swal.fire("Thông báo", "Thêm văn bằng thành công", "success");
      }
      setShowAlert(false);
    }
  }, [count.countAdd]);
  useEffect(() => {
    if (showAlert) {
      if (errorEdit) {
        Swal.fire("Thông báo", "Sửa văn bằng thất bại", "error");
      } else if (!errorEdit) {
        Swal.fire("Thông báo", "Sửa văn bằng thành công", "success");
      }
      setShowAlert(false);
    }
  }, [count.countEdit]);
  useEffect(() => {
    if (showAlert) {
      if (errorDelete) {
        Swal.fire("Thông báo", "Xoá văn bằng thất bại", "error");
      } else if (!errorDelete) {
        Swal.fire("Thông báo", "Xoá văn bằng thành công", "success");
      }
      setShowAlert(false);
    }
  }, [count.countDelete]);
  //add
  const handleAddANew = async () => {
    console.log("add payload", payload);
    console.log("ok vali1");
    console.log(invalidFields);
    const valid = validate(payload);
    if (valid > 0) {
      return;
    }
    console.log("ok vali2");
    await addDiplopManamentProfile(payload, dispatch);
    setCount((pre) => ({ ...pre, countAdd: pre.countAdd + 1 }));
    showAddAction(!addAction);
    setRender(render + 1);
    setPayloadAction();
    setShowAlert(true);
  };

  // edit
  const handleSaveInformation = async (id) => {
    const valid = validate(objectPayload[id]);
    if (valid > 0) {
      return;
    }
    await editDiplopManagermentProfile(objectPayload[id], id, dispatch);
    setCount((pre) => ({ ...pre, countEdit: pre.countEdit + 1 }));
    showEditAction(!editAction);
    setRender(render + 1);
    setShowAlert(true);
  };

  //delele
  const handleDelete = async () => {
    await deleleDiplopManagermentProfile(showActionMenu.studentId, dispatch);
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
    setImportFile(false);
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
    console.log("id: " + id);
    handleEditAction();
  };

  const searchStudent = () => {};
  return (
    <div className=" flex h-full w-full flex-col gap-[10px] overflow-x-auto bg-backLayout">
      <HeaderAndInput
        lable={"Quản lý bằng cấp"}
        onClick={handleAddAction}
        placeholder="Nhập tên bằng cấp để tìm kiếm"
        onClickImportFile={handleImportFile}
      />
      <div className=" relative h-[84%]  rounded-xl bg-table-bg">
        <div className="h-full p-[-60px]">
          <table
            className={` block h-full w-full overflow-x-auto border-x-[30px] border-t-[30px] border-white`}
          >
            <thead className=" relative w-full">
              <tr className="relavite block w-full text-left text-[12px] font-medium uppercase text-header-text">
                <th className=" min-w-[200px] px-4 py-2">Tên </th>
                <th className=" min-w-[200px] px-4 py-2">Mã sinh viên</th>
                <th className=" min-w-[400px] px-4 py-2">
                  chuyên ngành đào tạo
                </th>
                <th className=" min-w-[200px] px-4 py-2">Năm tốt nghiệp</th>
                <th className=" min-w-[200px] px-4 py-2">Loại đào tạo</th>
                <th className=" min-w-[200px] px-4 py-2">Xếp loại</th>
                <th className=" min-w-[200px] px-4 py-2">Số hiệu bằng</th>
                <th className=" min-w-[200px] px-4 py-2">Số vào sổ</th>
                <th className=" min-w-[200px] px-4 py-2">Ngày tốt nghiệp</th>
                <th className=" min-w-[200px] px-4 py-2">Ghi chú</th>
                <th className=" min-w-[200px] px-4 py-2">Ngày sửa đổi</th>
                <th className=" min-w-[200px] px-4 py-2">Trạng thái</th>
                <th className=" min-w-[20px] px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className=" relative  w-full ">
              {degreebooks?.map((student, index) => (
                <tr
                  key={index}
                  className="flex h-[58px] cursor-pointer items-center border-gray-300 text-[14px] font-semibold hover:bg-gray-200"
                  onClick={() =>
                    showViewEdit(student.DIPLOMA_MANAGEMENT_PROFILE_ID)
                  }
                >
                  <td className="min-w-[200px] px-4 py-2">
                    {students?.map(
                      (i) =>
                        i.STUDENT_ID_NUMBER == student.STUDENT_ID_NUMBER &&
                        i.LAST_NAME + " " + i.MIDDLE_NAME + " " + i.FIRST_NAME,
                    )}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.STUDENT_ID_NUMBER}
                  </td>
                  <td className="min-w-[400px] px-4 py-2">
                    {academicProgram?.map(
                      (i) =>
                        student.ACADEMIC_PROGRAM_ID == i.ACADEMIC_PROGRAM_ID &&
                        i.ACADEMIC_PROGRAM_NAME,
                    )}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.GRADUATION_YEAR}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.MODE_OF_STUDY}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.CLASSIFIED_BY_ACADEMIC_RECORDS}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.CERTIFICATE_NUMBER}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.NUMBER_ENTERED_INTO_THE_DEGREE_TRACKING_BOOK}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.DATE_OF_DECISION_ANNOUNCEMENT}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">{student.COMMENT}</td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.DATE_UPDATED}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {statuses.map(
                      (i) => i.value == student.APPROVED && i.status,
                    )}
                  </td>

                  <td
                    onClick={() =>
                      handleActionClick(student.DIPLOMA_MANAGEMENT_PROFILE_ID)
                    }
                    className={`relative min-w-[10px] ${
                      showActionMenu.studentId ===
                        student.DIPLOMA_MANAGEMENT_PROFILE_ID &&
                      showActionMenu.isOpen &&
                      "bg-custom-bg-notActive-nav"
                    } cursor-pointer rounded-[3px] px-2 `}
                  >
                    <BsThreeDotsVertical />
                    {showActionMenu.studentId ===
                      student.DIPLOMA_MANAGEMENT_PROFILE_ID &&
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
            count={panigationData.page}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>

      {/* add form */}
      {addAction && (
        <div className="animation fixed left-0 right-0  z-20 m-auto h-[700px] w-[870px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">Quản lý bằng cấp</h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleAddAction} />
              </div>
            </div>
            <div className="border-y-[1px] border-border-body-form py-[20px]">
              <div className="flex h-[100px] gap-[30px]">
                <InputForm2
                  text={"Mã sinh viên:"}
                  setValue={setPayload}
                  keyObject={"STUDENT_ID_NUMBER"}
                  setInvalidFields={setInvalidFields}
                  invalidFields={invalidFields}
                  w333
                  searchStudent={searchStudent}
                />
                <InputForm2
                  text={"Năm tốt nghiệp:"}
                  setValue={setPayload}
                  keyObject={"GRADUATION_YEAR"}
                  setInvalidFields={setInvalidFields}
                  invalidFields={invalidFields}
                  w333
                />
                <SelectForm
                  text={"Loại đào tạo:"}
                  setValue={setPayload}
                  keyObject={"MODE_OF_STUDY"}
                  setInvalidFields={setInvalidFields}
                  dataAPI={academicleveltype}
                  dataValue={"ACADEMIC_LEVEL_TYPE_ID"}
                  dataName={"ACADEMIC_LEVEL_TYPE_NAME"}
                  w333
                  invalidFields={invalidFields}
                />
              </div>
              <div className="flex h-[100px] gap-[30px]">
                <SelectForm
                  text={"Chuyên ngành đào tạo:"}
                  setValue={setPayload}
                  keyObject={"ACADEMIC_PROGRAM_ID"}
                  setInvalidFields={setInvalidFields}
                  dataAPI={academicProgram}
                  dataValue={"ACADEMIC_PROGRAM_ID"}
                  dataName={"ACADEMIC_PROGRAM_NAME"}
                  w12
                  invalidFields={invalidFields}
                />
                <InputForm2
                  text={"Xếp loại:"}
                  setValue={setPayload}
                  keyObject={"CLASSIFIED_BY_ACADEMIC_RECORDS"}
                  setInvalidFields={setInvalidFields}
                  w333
                  invalidFields={invalidFields}
                />
              </div>
              <div className="flex h-[100px] gap-[30px]">
                <InputForm2
                  text={"Số hiệu bằng:"}
                  setValue={setPayload}
                  keyObject={"CERTIFICATE_NUMBER"}
                  setInvalidFields={setInvalidFields}
                  w333
                  invalidFields={invalidFields}
                />
                <InputForm2
                  text={"Số vào sổ:"}
                  setValue={setPayload}
                  keyObject={"NUMBER_ENTERED_INTO_THE_DEGREE_TRACKING_BOOK"}
                  setInvalidFields={setInvalidFields}
                  w333
                  invalidFields={invalidFields}
                />
                <InputForm2
                  text={" Ngày tốt nghiệp:"}
                  setValue={setPayload}
                  keyObject={"DATE_OF_DECISION_ANNOUNCEMENT"}
                  setInvalidFields={setInvalidFields}
                  w333
                  invalidFields={invalidFields}
                  typeInput={"date"}
                />
              </div>
              <div className="flex h-[100px] gap-[30px]">
                <InputForm2
                  text={" Ngày sửa đổi:"}
                  setValue={setPayload}
                  keyObject={"DATE_UPDATED"}
                  setInvalidFields={setInvalidFields}
                  w333
                  invalidFields={invalidFields}
                  typeInput={"date"}
                />
                <SelectForm
                  text={"Trạng thái:"}
                  setValue={setPayload}
                  keyObject={"APPROVED"}
                  setInvalidFields={setInvalidFields}
                  w12
                  invalidFields={invalidFields}
                  dataNoAPI={statuses}
                />
              </div>
              <div className="flex h-[100px] gap-[30px]">
                <InputForm2
                  text={"Mô tả:"}
                  setValue={setPayload}
                  keyObject={"COMMENT"}
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
        <div className="animation fixed left-0 right-0 z-20 m-auto h-[710px] w-[870px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">Quản lý bằng cấp</h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleEditAction} />
              </div>
            </div>

            {degreebooks?.map(
              (item) =>
                showActionMenu.studentId ===
                  item.DIPLOMA_MANAGEMENT_PROFILE_ID && (
                  <div
                    key={item.DIPLOMA_MANAGEMENT_PROFILE_ID}
                    className="border-t-[1px] border-border-body-form py-[20px]"
                  >
                    <div className="flex h-[100px] gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Mã sinh viên:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[item.DIPLOMA_MANAGEMENT_PROFILE_ID]
                              .STUDENT_ID_NUMBER
                          }
                          type="text"
                          id="STUDENT_ID_NUMBER"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              item.DIPLOMA_MANAGEMENT_PROFILE_ID,
                              "STUDENT_ID_NUMBER",
                            )
                          }
                        />
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Năm tốt nghiệp:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[item.DIPLOMA_MANAGEMENT_PROFILE_ID]
                              .GRADUATION_YEAR
                          }
                          type="text"
                          id="GRADUATION_YEAR"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              item.DIPLOMA_MANAGEMENT_PROFILE_ID,
                              "GRADUATION_YEAR",
                            )
                          }
                        />
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Loại đào tạo:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[item.DIPLOMA_MANAGEMENT_PROFILE_ID]
                              .MODE_OF_STUDY
                          }
                          type="text"
                          id="MODE_OF_STUDY"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              item.DIPLOMA_MANAGEMENT_PROFILE_ID,
                              "MODE_OF_STUDY",
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="flex h-[100px] gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          chuyên ngành đào tạo:
                        </label>
                        <select
                          defaultValue={
                            objectPayload[item.DIPLOMA_MANAGEMENT_PROFILE_ID]
                              .ACADEMIC_PROGRAM_ID
                          }
                          type="text"
                          id="ACADEMIC_PROGRAM_ID"
                          className="block w-[530px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              item.DIPLOMA_MANAGEMENT_PROFILE_ID,
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
                      </div>
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Xếp loại:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[item.DIPLOMA_MANAGEMENT_PROFILE_ID]
                              .CLASSIFIED_BY_ACADEMIC_RECORDS
                          }
                          type="text"
                          id="CLASSIFIED_BY_ACADEMIC_RECORDS"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              item.DIPLOMA_MANAGEMENT_PROFILE_ID,
                              "CLASSIFIED_BY_ACADEMIC_RECORDS",
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="flex h-[100px] gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Số hiệu bằng:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[item.DIPLOMA_MANAGEMENT_PROFILE_ID]
                              .CERTIFICATE_NUMBER
                          }
                          type="text"
                          id="CERTIFICATE_NUMBER"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              item.DIPLOMA_MANAGEMENT_PROFILE_ID,
                              "CERTIFICATE_NUMBER",
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Số vào sổ:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[item.DIPLOMA_MANAGEMENT_PROFILE_ID]
                              .NUMBER_ENTERED_INTO_THE_DEGREE_TRACKING_BOOK
                          }
                          type="text"
                          id="NUMBER_ENTERED_INTO_THE_DEGREE_TRACKING_BOOK"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              item.DIPLOMA_MANAGEMENT_PROFILE_ID,
                              "NUMBER_ENTERED_INTO_THE_DEGREE_TRACKING_BOOK",
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Ngày tốt nghiệp:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[item.DIPLOMA_MANAGEMENT_PROFILE_ID]
                              .DATE_OF_DECISION_ANNOUNCEMENT
                          }
                          type="date"
                          id="DATE_OF_DECISION_ANNOUNCEMENT"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              item.DIPLOMA_MANAGEMENT_PROFILE_ID,
                              "DATE_OF_DECISION_ANNOUNCEMENT",
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="flex h-[100px] gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Ngày sửa đổi:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[item.DIPLOMA_MANAGEMENT_PROFILE_ID]
                              .DATE_UPDATED
                          }
                          type="date"
                          id="DATE_UPDATED"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              item.DIPLOMA_MANAGEMENT_PROFILE_ID,
                              "DATE_UPDATED",
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Trạng thái:
                        </label>
                        <select
                          defaultValue={
                            objectPayload[item.DIPLOMA_MANAGEMENT_PROFILE_ID]
                              .APPROVED
                          }
                          type="text"
                          id="APPROVED"
                          className="block w-[530px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              item.DIPLOMA_MANAGEMENT_PROFILE_ID,
                              "APPROVED",
                            )
                          }
                        >
                          <option hidden></option>
                          {statuses?.map((item) => (
                            <option key={item.id} value={item.value}>
                              {item.status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex h-[100px] gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Ghi chú:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[item.DIPLOMA_MANAGEMENT_PROFILE_ID]
                              .COMMENT
                          }
                          type="text"
                          id="COMMENT"
                          className="block w-[810px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              item.DIPLOMA_MANAGEMENT_PROFILE_ID,
                              "COMMENT",
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
                          handleSaveInformation(
                            item.DIPLOMA_MANAGEMENT_PROFILE_ID,
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

      {importFile && (
        <ImportFile
          text={"Danh sách bằng cấp"}
          handleImportAction={handleImportFile}
          handleImport={handleImport}
          onFileSelect={handleFileSelect}
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

export default DiplopmaManagementProfile;
