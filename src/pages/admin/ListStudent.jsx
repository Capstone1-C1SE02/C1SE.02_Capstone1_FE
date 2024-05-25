import {
  Button,
  Label,
  HeaderAndInput,
  DeleteForm,
  FooterPage,
  ImportFile,
} from "@/components/admin";
import React, { useEffect, useState } from "react";
import icon from "@/ultils/icon";
import axiosConfig from "@/axiosConfig";
import { addStudent } from "@/redux/apiRequestAdd";
import { deleleStudent } from "@/redux/apiRequestDelete";
import { editStudent } from "@/redux/apiRequestEdit";
import { searchStudent } from "@/redux/apiSearch";
import { useDispatch, useSelector } from "react-redux";
import { LearningStatusType, Academicleveltype } from "@/components/dropList";
import "react-toastify/dist/ReactToastify.css";
const { BsThreeDotsVertical, FaTimes } = icon;
import Swal from "sweetalert2";

function ListStudent() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [render, setRender] = useState(0);
  const [learningStatusType, setLearningStatusType] = useState();
  const [academicleveltype, setAcademicleveltype] = useState();
  const [page, setPage] = useState(1);
  const [students, setStudentsData] = useState([]);
  const [panigationData, setPanigationData] = useState({
    count: "",
    page: "",
  });

  const [searchPayload, setsearchPayload] = useState(false);
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

      const response = await axiosConfig.post("/upload-student", formData);
      Swal.fire({
        icon: "success",
        title: "Import danh sách sinh viên thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      setImportFile(false);

      console.log("Upload file successfully", response);
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
    async function fetchStudentsData() {
      try {
        if (searchPayload == false) {
          const response = await axiosConfig.get(`/student?page=${page}`);
          setStudentsData(response.data.results.data);
          console.log("response ád", response.data);
          setPanigationData({
            count: response.data.count,
            page: response.data.total_pages,
          });
        } else {
          const response = await axiosConfig.post(
            `/search/student?studentID=${searchValue}`,
          );

          setStudentsData([response.data.data]);
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy danh sách sinh viên:", error);
      }
    }
    fetchStudentsData();
  }, [render, page, searchPayload]);
  console.log("response", panigationData.count, panigationData.page);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const learningStatus = await LearningStatusType();
        const academiclevel = await Academicleveltype();
        setLearningStatusType(learningStatus.data);
        setAcademicleveltype(academiclevel.data);
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

  const [payload, setPayload] = useState({
    STUDENT_ID_NUMBER: "",
    LAST_NAME: "",
    FIRST_NAME: "",
    MIDDLE_NAME: "",
    GENDER: "",
    BIRTH_DATE: "",
    BIRTH_PLACE: "",
    NATION: "",
    NATIONALITY: "",
    PEOPLE_ID_NUMBER: "",
    PHONE_NUMBER: "",
    EMAIL: "",
    COMMENTS: "",
    LEARNING_STATUS_TYPE_ID: "",
    ACADEMIC_LEVEL_TYPE_ID: "",
  });

  const setPayloadAction = () => {
    setPayload({
      STUDENT_ID_NUMBER: "",
      LAST_NAME: "",
      FIRST_NAME: "",
      MIDDLE_NAME: "",
      GENDER: "",
      BIRTH_DATE: "",
      BIRTH_PLACE: "",
      NATION: "",
      NATIONALITY: "",
      PEOPLE_ID_NUMBER: "",
      PHONE_NUMBER: "",
      EMAIL: "",
      COMMENTS: "",
      LEARNING_STATUS_TYPE_ID: "",
      ACADEMIC_LEVEL_TYPE_ID: "",
    });
  };

  const [objectPayload, setObjectPayload] = useState([]);
  useEffect(() => {
    setObjectPayload(
      students.length > 0 &&
        students.reduce((acc, student) => {
          acc[student.STUDENT_ID_NUMBER] = {
            STUDENT_ID_NUMBER: student.STUDENT_ID_NUMBER,
            LAST_NAME: student.LAST_NAME,
            FIRST_NAME: student.FIRST_NAME,
            MIDDLE_NAME: student.MIDDLE_NAME,
            GENDER: student.GENDER,
            BIRTH_DATE: student.BIRTH_DATE,
            BIRTH_PLACE: student.BIRTH_PLACE,
            NATION: student.NATION,
            NATIONALITY: student.NATIONALITY,
            PEOPLE_ID_NUMBER: student.PEOPLE_ID_NUMBER,
            PHONE_NUMBER: student.PHONE_NUMBER,
            EMAIL: student.EMAIL,
            COMMENTS: student.COMMENTS,
            LEARNING_STATUS_TYPE_ID:
              student.learningstatustype.LEARNING_STATUS_TYPE_ID,
            ACADEMIC_LEVEL_TYPE_ID:
              student.academicleveltype.ACADEMIC_LEVEL_TYPE_ID,
          };
          return acc;
        }, {}),
    );
  }, [students]);

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
    setIdStudent(STUDENT_ID_NUMBER);
  };

  const handledOnchangeEdit = (e, id, property) => {
    const newValue = e.target.value;
    setObjectPayload((pre) => ({
      ...pre,
      [id]: { ...pre[id], [property]: newValue },
    }));
  };

  const [renderAction, setRenderAction] = useState({
    renderAdd: 0,
    renderEdit: 0,
    renderDelete: 0,
  });

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
        Swal.fire("Thông báo", "Thêm sinh viên thất bại", "error");
      } else if (!errorAdd) {
        Swal.fire("Thông báo", "Thêm sinh viên thành công", "success");
      }
      setShowAlert(false);
    }
  }, [count.countAdd]);
  useEffect(() => {
    if (showAlert) {
      if (errorEdit) {
        Swal.fire("Thông báo", "Sửa sinh viên thất bại", "error");
      } else if (!errorEdit) {
        Swal.fire("Thông báo", "Sửa sinh viên thành công", "success");
      }
      setShowAlert(false);
    }
  }, [count.countEdit]);
  useEffect(() => {
    if (showAlert) {
      if (errorDelete) {
        Swal.fire("Thông báo", "Xoá sinh viên thất bại", "error");
      } else if (!errorDelete) {
        Swal.fire("Thông báo", "Xoá sinh viên thành công", "success");
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
    await addStudent(payload, dispatch);
    setCount((pre) => ({ ...pre, countAdd: pre.countAdd + 1 }));
    showAddAction(!addAction);
    setRender(render + 1);
    setPayloadAction();
    setShowAlert(true);
  };

  //edit
  const handleSaveInformation = async (id) => {
    console.log("objectPayload[id]", objectPayload[id]);
    const valid = validate(objectPayload[id]);
    console.log("valid edit--------", valid);
    if (valid > 0) {
      return;
    }
    await editStudent(objectPayload[id], dispatch);
    await searchStudent(searchValue, dispatch);

    setCount((pre) => ({ ...pre, countEdit: pre.countEdit + 1 }));
    showEditAction(!editAction);
    setRender(render + 1);
    setShowAlert(true);
  };

  //delele
  const handleDelete = async () => {
    await deleleStudent(showActionMenu.studentId, dispatch);
    await searchStudent(searchValue, dispatch);
    showDeleteAction(!deleteAction);
    setRender(render + 1);
    setShowAlert(true);
    setCount((pre) => ({ ...pre, countDelete: pre.countDelete + 1 }));
    showEditAction(false);
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
    <div className=" flex h-full w-full flex-col gap-[10px] overflow-x-auto bg-backLayout">
      <HeaderAndInput
        lable={"Danh sách sinh viên"}
        onClick={handleAddAction}
        onClickImportFile={handleImportFile}
        placeholder="Nhập mã số sinh viên để tìm kiếm"
        buttonClick={handleSearch}
        valueSearch={searchValue}
        setvalueSearch={setSearchValue}
        endSearch={handleEndSearch}
      />

      <div className="h-[84%] rounded-xl bg-table-bg">
        <div className="h-full p-[-60px]">
          <table
            className={` block h-full overflow-x-auto border-l-[30px] border-t-[30px] border-white`}
          >
            <thead className=" relative w-full">
              <tr className="relavite block w-full text-left text-[12px] font-medium uppercase text-header-text">
                <th className=" min-w-[200px] px-4 py-2">MSSV</th>
                <th className=" min-w-[350px] px-4 py-2">Họ </th>
                <th className=" min-w-[200px] px-4 py-2">Tên</th>
                <th className=" min-w-[200px] px-4 py-2">Giới tính</th>
                <th className=" min-w-[200px] px-4 py-2">Ngày sinh</th>
                <th className=" min-w-[500px] px-4 py-2">Nơi sinh</th>
                <th className=" min-w-[200px] px-4 py-2">Quốc tịch</th>
                <th className=" min-w-[200px] px-4 py-2">Dân tộc</th>
                <th className=" min-w-[200px] px-4 py-2">CCCD</th>
                <th className=" min-w-[200px] px-4 py-2">Số điện thoại</th>
                <th className=" min-w-[200px] px-4 py-2">Email</th>
                <th className=" min-w-[400px] px-4 py-2">Mô tả</th>
                <th className=" min-w-[200px] px-4 py-2">Trạng thái học tập</th>
                <th className=" min-w-[200px] px-4 py-2">Bậc đào tạo</th>
                <th className=" min-w-[20px] px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className=" relative w-full ">
              {console.log("table", students.length)}
              {students?.map((student) => (
                <tr
                  key={student.STUDENT_ID_NUMBER}
                  className="flex h-[58px] cursor-pointer items-center overflow-hidden text-ellipsis whitespace-nowrap border-gray-300 text-[14px] font-semibold hover:bg-gray-200"
                  onClick={() => showViewEdit(student.STUDENT_ID_NUMBER)}
                >
                  <td className="w-[200px] overflow-hidden text-ellipsis px-4 py-2">
                    {student.STUDENT_ID_NUMBER}
                  </td>
                  <td className="w-[350px] overflow-hidden text-ellipsis px-4 py-2">
                    {student.LAST_NAME + " " + student.MIDDLE_NAME}
                  </td>
                  <td className="w-[200px] overflow-hidden text-ellipsis px-4 py-2">
                    {student.FIRST_NAME}
                  </td>

                  <td className="w-[200px] overflow-hidden text-ellipsis px-4 py-2">
                    {student.GENDER ? "Nam" : "Nữ"}
                  </td>
                  <td className="w-[200px] overflow-hidden text-ellipsis px-4 py-2">
                    {student.BIRTH_DATE}
                  </td>
                  <td className="w-[500px] px-4 py-2">{student.BIRTH_PLACE}</td>
                  <td className="w-[200px] overflow-hidden text-ellipsis px-4 py-2">
                    {student.NATION}
                  </td>
                  <td className="w-[200px] overflow-hidden text-ellipsis px-4 py-2">
                    {student.NATIONALITY}
                  </td>
                  <td className="w-[200px] overflow-hidden text-ellipsis px-4 py-2">
                    {student.PEOPLE_ID_NUMBER}
                  </td>
                  <td className="w-[200px] overflow-hidden text-ellipsis px-4 py-2">
                    {student.PHONE_NUMBER}
                  </td>
                  <td className="w-[200px] overflow-hidden text-ellipsis px-4 py-2">
                    {student.EMAIL}
                  </td>
                  <td className="w-[400px] overflow-hidden text-ellipsis px-4 py-2">
                    {student.COMMENTS}
                  </td>
                  <td className="w-[200px] overflow-hidden text-ellipsis px-4 py-2">
                    {learningStatusType?.map(
                      (i) =>
                        student.LEARNING_STATUS_TYPE_ID ==
                          i.LEARNING_STATUS_TYPE_ID &&
                        i.LEARNING_STATUS_TYPE_NAME,
                    )}
                  </td>
                  <td className="w-[200px] overflow-hidden text-ellipsis px-4 py-2">
                    {academicleveltype?.map(
                      (i) =>
                        student.ACADEMIC_LEVEL_TYPE_ID ==
                          i.ACADEMIC_LEVEL_TYPE_ID &&
                        i.ACADEMIC_LEVEL_TYPE_NAME,
                    )}
                  </td>
                  <td
                    onClick={() => handleActionClick(student.STUDENT_ID_NUMBER)}
                    className={` w-[10px] ${
                      showActionMenu.STUDENT_ID_NUMBER ===
                        student.STUDENT_ID_NUMBER &&
                      showActionMenu.isOpen &&
                      "bg-custom-bg-notActive-nav"
                    } cursor-pointer rounded-[3px] px-2 `}
                  >
                    <BsThreeDotsVertical />
                    {showActionMenu.STUDENT_ID_NUMBER ===
                      student.STUDENT_ID_NUMBER &&
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
            count={+panigationData.page}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
      {/* add form */}
      {addAction && (
        <div className="animation absolute left-1/2 top-1/2 z-20 m-auto h-[810px] w-[870px] -translate-x-1/2 -translate-y-1/2 bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">Sinh viên</h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleAddAction} />
              </div>
            </div>

            <div className="border-y-[1px] border-border-body-form py-[20px]">
              <div className="flex h-[100px] gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">Họ:</label>
                  <input
                    id="LAST_NAME"
                    className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    type="text"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  />
                  {invalidFields.length > 0 &&
                    invalidFields.some((item) => item.name === "LAST_NAME") && (
                      <small className="italic text-red-500">
                        {
                          invalidFields.find((i) => i.name === "LAST_NAME")
                            ?.message
                        }
                      </small>
                    )}
                </div>
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">Tên lót:</label>
                  <input
                    type="text"
                    id="MIDDLE_NAME"
                    className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  />{" "}
                  {invalidFields.length > 0 &&
                    invalidFields.some(
                      (item) => item.name === "DEGREE_CODE",
                    ) && (
                      <small className="italic text-red-500">
                        {
                          invalidFields.find((i) => i.name === "DEGREE_CODE")
                            ?.message
                        }
                      </small>
                    )}
                </div>
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">Tên:</label>
                  <input
                    type="text"
                    id="FIRST_NAME"
                    className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  />{" "}
                  {invalidFields.length > 0 &&
                    invalidFields.some(
                      (item) => item.name === "DEGREE_CODE",
                    ) && (
                      <small className="italic text-red-500">
                        {
                          invalidFields.find((i) => i.name === "DEGREE_CODE")
                            ?.message
                        }
                      </small>
                    )}
                </div>
              </div>
              <div className="flex h-[100px] gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">MSSV:</label>
                  <input
                    id="STUDENT_ID_NUMBER"
                    className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    type="text"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  />{" "}
                  {invalidFields.length > 0 &&
                    invalidFields.some(
                      (item) => item.name === "DEGREE_CODE",
                    ) && (
                      <small className="italic text-red-500">
                        {
                          invalidFields.find((i) => i.name === "DEGREE_CODE")
                            ?.message
                        }
                      </small>
                    )}
                </div>
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">Ngày sinh:</label>
                  <input
                    type="date"
                    id="BIRTH_DATE"
                    className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  />{" "}
                  {invalidFields.length > 0 &&
                    invalidFields.some(
                      (item) => item.name === "DEGREE_CODE",
                    ) && (
                      <small className="italic text-red-500">
                        {
                          invalidFields.find((i) => i.name === "DEGREE_CODE")
                            ?.message
                        }
                      </small>
                    )}
                </div>{" "}
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">Nơi sinh:</label>
                  <input
                    type="text"
                    id="BIRTH_PLACE"
                    className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  />{" "}
                  {invalidFields.length > 0 &&
                    invalidFields.some(
                      (item) => item.name === "DEGREE_CODE",
                    ) && (
                      <small className="italic text-red-500">
                        {
                          invalidFields.find((i) => i.name === "DEGREE_CODE")
                            ?.message
                        }
                      </small>
                    )}
                </div>{" "}
              </div>
              <div className="flex h-[100px] gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">Giới tính:</label>
                  <select
                    type="checkbox"
                    id="GENDER"
                    className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  >
                    <option hidden></option>
                    <option value={true}>Nam</option>
                    <option value={false}>Nữ</option>
                  </select>{" "}
                  {invalidFields.length > 0 &&
                    invalidFields.some(
                      (item) => item.name === "DEGREE_CODE",
                    ) && (
                      <small className="italic text-red-500">
                        {
                          invalidFields.find((i) => i.name === "DEGREE_CODE")
                            ?.message
                        }
                      </small>
                    )}
                </div>{" "}
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">Quốc tịch:</label>
                  <input
                    type="text"
                    id="NATION"
                    className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  />{" "}
                  {invalidFields.length > 0 &&
                    invalidFields.some(
                      (item) => item.name === "DEGREE_CODE",
                    ) && (
                      <small className="italic text-red-500">
                        {
                          invalidFields.find((i) => i.name === "DEGREE_CODE")
                            ?.message
                        }
                      </small>
                    )}
                </div>{" "}
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">Dân tộc:</label>
                  <input
                    type="text"
                    id="NATIONALITY"
                    className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  />{" "}
                  {invalidFields.length > 0 &&
                    invalidFields.some(
                      (item) => item.name === "DEGREE_CODE",
                    ) && (
                      <small className="italic text-red-500">
                        {
                          invalidFields.find((i) => i.name === "DEGREE_CODE")
                            ?.message
                        }
                      </small>
                    )}
                </div>{" "}
              </div>
              <div className="flex h-[100px] gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">CCCD:</label>
                  <input
                    type="text"
                    id="PEOPLE_ID_NUMBER"
                    className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  />{" "}
                  {invalidFields.length > 0 &&
                    invalidFields.some(
                      (item) => item.name === "DEGREE_CODE",
                    ) && (
                      <small className="italic text-red-500">
                        {
                          invalidFields.find((i) => i.name === "DEGREE_CODE")
                            ?.message
                        }
                      </small>
                    )}
                </div>{" "}
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Số điện thoại:
                  </label>
                  <input
                    type="text"
                    id="PHONE_NUMBER"
                    className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  />{" "}
                  {invalidFields.length > 0 &&
                    invalidFields.some(
                      (item) => item.name === "DEGREE_CODE",
                    ) && (
                      <small className="italic text-red-500">
                        {
                          invalidFields.find((i) => i.name === "DEGREE_CODE")
                            ?.message
                        }
                      </small>
                    )}
                </div>{" "}
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">Email:</label>
                  <input
                    type="text"
                    id="EMAIL"
                    className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  />{" "}
                  {invalidFields.length > 0 &&
                    invalidFields.some(
                      (item) => item.name === "DEGREE_CODE",
                    ) && (
                      <small className="italic text-red-500">
                        {
                          invalidFields.find((i) => i.name === "DEGREE_CODE")
                            ?.message
                        }
                      </small>
                    )}
                </div>{" "}
              </div>
              <div className="flex h-[100px] gap-[30px]">
                {" "}
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Trạng thái học tập:
                  </label>
                  <select
                    type="text"
                    id="LEARNING_STATUS_TYPE_ID"
                    className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  >
                    <option hidden></option>
                    {learningStatusType &&
                      learningStatusType?.map((item) => (
                        <option
                          value={item.LEARNING_STATUS_TYPE_ID}
                          key={item.LEARNING_STATUS_TYPE_ID}
                        >
                          {item.LEARNING_STATUS_TYPE_NAME}
                        </option>
                      ))}
                  </select>{" "}
                  {invalidFields.length > 0 &&
                    invalidFields.some(
                      (item) => item.name === "DEGREE_CODE",
                    ) && (
                      <small className="italic text-red-500">
                        {
                          invalidFields.find((i) => i.name === "DEGREE_CODE")
                            ?.message
                        }
                      </small>
                    )}
                </div>{" "}
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Bậc đào tạo:
                  </label>
                  <select
                    type="text"
                    id="ACADEMIC_LEVEL_TYPE_ID"
                    className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                  </select>{" "}
                  {invalidFields.length > 0 &&
                    invalidFields.some(
                      (item) => item.name === "DEGREE_CODE",
                    ) && (
                      <small className="italic text-red-500">
                        {
                          invalidFields.find((i) => i.name === "DEGREE_CODE")
                            ?.message
                        }
                      </small>
                    )}
                </div>{" "}
              </div>
              <div className="flex h-[100px] gap-[30px]">
                {" "}
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">Mô tả:</label>
                  <input
                    type="text"
                    id="COMMENTS"
                    className="block w-[820px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  />{" "}
                  {invalidFields.length > 0 &&
                    invalidFields.some(
                      (item) => item.name === "DEGREE_CODE",
                    ) && (
                      <small className="italic text-red-500">
                        {
                          invalidFields.find((i) => i.name === "DEGREE_CODE")
                            ?.message
                        }
                      </small>
                    )}
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
        <div className="animation fixed left-0 right-0 top-[16%] z-20 m-auto h-[810px] w-[870px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">Sinh viên</h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleEditAction} />
              </div>
            </div>

            {students.length > 0 &&
              students?.map(
                (student, index) =>
                  showActionMenu.studentId === student.STUDENT_ID_NUMBER && (
                    <div
                      key={student.STUDENT_ID_NUMBER}
                      className="border-t-[1px] border-border-body-form py-[20px]"
                    >
                      <div className="flex h-[100px] gap-[30px]">
                        <div className="flex flex-col gap-[5px]">
                          <label className="text-[16px] font-normal">Họ:</label>
                          <input
                            defaultValue={
                              objectPayload[student.STUDENT_ID_NUMBER].LAST_NAME
                            }
                            type="text"
                            id="LAST_NAME"
                            className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            onChange={(e) =>
                              handledOnchangeEdit(
                                e,
                                student.STUDENT_ID_NUMBER,
                                "LAST_NAME",
                              )
                            }
                          />
                        </div>{" "}
                        <div className="flex flex-col gap-[5px]">
                          <label className="text-[16px] font-normal">
                            Tên lót:
                          </label>
                          <input
                            defaultValue={
                              objectPayload[student.STUDENT_ID_NUMBER]
                                .MIDDLE_NAME
                            }
                            type="text"
                            id="MIDDLE_NAME"
                            className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            onChange={(e) =>
                              handledOnchangeEdit(
                                e,
                                student.STUDENT_ID_NUMBER,
                                "MIDDLE_NAME",
                              )
                            }
                          />
                        </div>{" "}
                        <div className="flex flex-col gap-[5px]">
                          <label className="text-[16px] font-normal">
                            Tên :
                          </label>
                          <input
                            defaultValue={
                              objectPayload[student.STUDENT_ID_NUMBER]
                                .FIRST_NAME
                            }
                            type="text"
                            id="FIRST_NAME"
                            className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            onChange={(e) =>
                              handledOnchangeEdit(
                                e,
                                student.STUDENT_ID_NUMBER,
                                "FIRST_NAME",
                              )
                            }
                          />
                        </div>{" "}
                      </div>
                      <div className="flex h-[100px] gap-[30px]">
                        <div className="flex flex-col gap-[5px]">
                          <label className="text-[16px] font-normal">
                            MSSV :
                          </label>
                          <input
                            defaultValue={
                              objectPayload[student.STUDENT_ID_NUMBER]
                                .STUDENT_ID_NUMBER
                            }
                            type="text"
                            id="STUDENT_ID_NUMBER"
                            className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            onChange={(e) =>
                              handledOnchangeEdit(
                                e,
                                student.STUDENT_ID_NUMBER,
                                "STUDENT_ID_NUMBER",
                              )
                            }
                          />
                        </div>
                        <div className="flex flex-col gap-[5px]">
                          <label className="text-[16px] font-normal">
                            Ngày sinh :
                          </label>
                          <input
                            defaultValue={
                              objectPayload[student.STUDENT_ID_NUMBER]
                                .BIRTH_DATE
                            }
                            type="date"
                            id="BIRTH_DATE"
                            className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            onChange={(e) =>
                              handledOnchangeEdit(
                                e,
                                student.STUDENT_ID_NUMBER,
                                "BIRTH_DATE",
                              )
                            }
                          />
                        </div>{" "}
                        <div className="flex flex-col gap-[5px]">
                          <label className="text-[16px] font-normal">
                            Nơi sinh :
                          </label>
                          <input
                            defaultValue={
                              objectPayload[student.STUDENT_ID_NUMBER]
                                .BIRTH_PLACE
                            }
                            type="text"
                            id="BIRTH_PLACE"
                            className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            onChange={(e) =>
                              handledOnchangeEdit(
                                e,
                                student.STUDENT_ID_NUMBER,
                                "BIRTH_PLACE",
                              )
                            }
                          />
                        </div>{" "}
                      </div>
                      <div className="flex h-[100px] gap-[30px]">
                        <div className="flex flex-col gap-[5px]">
                          <label className="text-[16px] font-normal">
                            Giới tính:
                          </label>
                          <select
                            defaultValue={
                              objectPayload[student.STUDENT_ID_NUMBER].GENDER
                            }
                            type="text"
                            id="GENDER"
                            className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            onChange={(e) =>
                              handledOnchangeEdit(
                                e,
                                student.STUDENT_ID_NUMBER,
                                "GENDER",
                              )
                            }
                          >
                            <option hidden></option>
                            <option value={true}>Nam</option>
                            <option value={false}>Nữ</option>
                          </select>
                        </div>{" "}
                        <div className="flex flex-col gap-[5px]">
                          <label className="text-[16px] font-normal">
                            Quốc tịch :
                          </label>
                          <input
                            defaultValue={
                              objectPayload[student.STUDENT_ID_NUMBER]
                                .NATIONALITY
                            }
                            type="text"
                            id="NATIONALITY"
                            className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            onChange={(e) =>
                              handledOnchangeEdit(
                                e,
                                student.STUDENT_ID_NUMBER,
                                "NATIONALITY",
                              )
                            }
                          />
                        </div>
                        <div className="flex flex-col gap-[5px]">
                          <label className="text-[16px] font-normal">
                            Dân tộc :
                          </label>
                          <input
                            defaultValue={
                              objectPayload[student.STUDENT_ID_NUMBER].NATION
                            }
                            type="text"
                            id="NATION"
                            className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            onChange={(e) =>
                              handledOnchangeEdit(
                                e,
                                student.STUDENT_ID_NUMBER,
                                "NATION",
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="flex h-[100px] gap-[30px]">
                        <div className="flex flex-col gap-[5px]">
                          <label className="text-[16px] font-normal">
                            CCCD :
                          </label>
                          <input
                            defaultValue={
                              objectPayload[student.STUDENT_ID_NUMBER]
                                .PEOPLE_ID_NUMBER
                            }
                            type="text"
                            id="PEOPLE_ID_NUMBER"
                            className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            onChange={(e) =>
                              handledOnchangeEdit(
                                e,
                                student.STUDENT_ID_NUMBER,
                                "PEOPLE_ID_NUMBER",
                              )
                            }
                          />
                        </div>
                        <div className="flex flex-col gap-[5px]">
                          <label className="text-[16px] font-normal">
                            Số điện thoại:
                          </label>
                          <input
                            defaultValue={
                              objectPayload[student.STUDENT_ID_NUMBER]
                                .PHONE_NUMBER
                            }
                            type="text"
                            id="PHONE_NUMBER"
                            className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            onChange={(e) =>
                              handledOnchangeEdit(
                                e,
                                student.STUDENT_ID_NUMBER,
                                "PHONE_NUMBER",
                              )
                            }
                          />
                        </div>
                        <div className="flex flex-col gap-[5px]">
                          <label className="text-[16px] font-normal">
                            Email:
                          </label>
                          <input
                            defaultValue={
                              objectPayload[student.STUDENT_ID_NUMBER].EMAIL
                            }
                            type="text"
                            id="EMAIL"
                            className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            onChange={(e) =>
                              handledOnchangeEdit(
                                e,
                                student.STUDENT_ID_NUMBER,
                                "EMAIL",
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="flex h-[100px] gap-[30px]">
                        <div className="flex flex-col gap-[5px]">
                          <label className="text-[16px] font-normal">
                            Trạng thái học tập:
                          </label>
                          <select
                            defaultValue={
                              objectPayload[student.STUDENT_ID_NUMBER]
                                .LEARNING_STATUS_TYPE_ID
                            }
                            type="text"
                            id="LEARNING_STATUS_TYPE_ID"
                            className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            onChange={(e) =>
                              handledOnchangeEdit(
                                e,
                                student.STUDENT_ID_NUMBER,
                                "LEARNING_STATUS_TYPE_ID",
                              )
                            }
                          >
                            <option hidden></option>
                            {learningStatusType &&
                              learningStatusType?.map((item) => (
                                <option
                                  value={item.LEARNING_STATUS_TYPE_ID}
                                  key={item.LEARNING_STATUS_TYPE_ID}
                                >
                                  {item.LEARNING_STATUS_TYPE_NAME}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="flex flex-col gap-[5px]">
                          <label className="text-[16px] font-normal">
                            Bậc đào tạo:
                          </label>
                          <select
                            defaultValue={
                              objectPayload[student.STUDENT_ID_NUMBER]
                                .ACADEMIC_LEVEL_TYPE_ID
                            }
                            type="text"
                            id="ACADEMIC_LEVEL_TYPE_ID"
                            className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            onChange={(e) =>
                              handledOnchangeEdit(
                                e,
                                student.STUDENT_ID_NUMBER,
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
                        </div>
                      </div>
                      <div className="flex h-[100px] gap-[30px]">
                        <div className="flex flex-col gap-[5px]">
                          <label className="text-[16px] font-normal">
                            Mô tả:
                          </label>
                          <input
                            defaultValue={
                              objectPayload[student.STUDENT_ID_NUMBER].COMMENTS
                            }
                            type="text"
                            id="COMMENTS"
                            className="block w-[810px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            onChange={(e) =>
                              handledOnchangeEdit(
                                e,
                                student.STUDENT_ID_NUMBER,
                                "COMMENTS",
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
                            handleSaveInformation(student.STUDENT_ID_NUMBER)
                          }
                        />{" "}
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
          text={"Danh sách sinh viên"}
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

export default ListStudent;
