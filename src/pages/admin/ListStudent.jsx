import { Button, Label, HeaderAndInput, DeleteForm } from "@/components/admin";
import React, { useEffect, useState } from "react";
import icon from "@/ultils/icon";
import axiosConfig from "@/axiosConfig";
import { addStudent } from "@/redux/apiRequestAdd";
import { deleleStudent } from "@/redux/apiRequestDelete";
import { editStudent } from "@/redux/apiRequestEdit";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { LearningStatusType, Academicleveltype } from "@/components/dropList";
import "react-toastify/dist/ReactToastify.css";

const { BsThreeDotsVertical, FaTimes } = icon;

function ListStudent() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.addAction.data);
  const dataDelete = useSelector((state) => state.deleteAction);
  const dataEdit = useSelector((state) => state.EditAction);
  console.log("ADD DATA", data);

  const [render, setRender] = useState(0);

  const [learningStatusType, setLearningStatusType] = useState();
  const [academicleveltype, setAcademicleveltype] = useState();

  const [page, setPage] = useState(2);
  const [students, setStudentsData] = useState([]);
  useEffect(() => {
    async function fetchStudentsData() {
      try {
        const response = await axiosConfig.get(`/student?page=1`);
        setStudentsData(response.data.results.data);
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy danh sách sinh viên:", error);
      }
    }
    fetchStudentsData();
  }, [render]);

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

  console.log("learningStatusType", learningStatusType, academicleveltype);
  const [showActionMenu, setShowActionMenu] = useState({
    STUDENT_ID_NUMBER: null,
    isOpen: false,
  });

  const [idStudent, setIdStudent] = useState("");
  const [addAction, showAddAction] = useState(false);
  const [editAction, showEditAction] = useState(false);
  const [deleteAction, showDeleteAction] = useState(false);
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

  const [objectPayload, setObjectPayload] = useState([]);
  useEffect(() => {
    setObjectPayload(
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

  console.log("objectPayload", objectPayload);
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

  const handleActionClick = (STUDENT_ID_NUMBER) => {
    setShowActionMenu({ STUDENT_ID_NUMBER, isOpen: !showActionMenu.isOpen });
    setIdStudent(STUDENT_ID_NUMBER);
    console.log(STUDENT_ID_NUMBER, idStudent);
  };

  const handledOnchangeEdit = (e, id, property) => {
    const newValue = e.target.value;
    setObjectPayload((pre) => ({
      ...pre,
      [id]: { ...pre[id], [property]: newValue },
    }));
  };

  //add
  const handleAddANew = async () => {
    await addStudent(payload, dispatch);
    toast.success(`${data?.message}`);
    console.log("paylooad", payload);
    console.log("paylooad data.addAction", data);
    showAddAction(!addAction);
    setRender(render + 1);
  };
  // edit
  const handleSaveInformation = async (id) => {
    await editStudent(objectPayload[id], dispatch);
    dataEdit ? toast.success("Sửa thành công") : toast.error("Sửa thất bại");
    console.log("ok131", objectPayload[id]);
    console.log("data edit", dataEdit);
    showEditAction(!editAction);
    setRender(render + 1);
  };

  //delele
  const handleDelete = async () => {
    await deleleStudent(showActionMenu.STUDENT_ID_NUMBER, dispatch);
    console.log("paylooad", dataDelete.data);
    dataDelete.data == 204
      ? toast.success("Xoá thành công")
      : toast.error("Xoá thất bại");
    showDeleteAction(!deleteAction);
    setRender(render + 1);
  };

  return (
    <div className=" flex h-full w-full flex-col gap-[10px] overflow-x-auto bg-secondary">
      <HeaderAndInput lable={"Danh sách sinh viên"} onClick={handleAddAction} />
      <ToastContainer />

      <div className=" relative h-full rounded-xl bg-table-bg">
        <div className="h-full p-[-60px]">
          <table
            className={` block h-full w-full overflow-x-auto border-x-[30px] border-t-[30px] border-white`}
          >
            <thead className=" relative w-full">
              <tr className="relavite block w-full text-left text-[12px] font-medium uppercase text-header-text">
                <th className=" min-w-[200px] px-4 py-2">Họ </th>
                <th className=" min-w-[200px] px-4 py-2">Tên</th>
                <th className=" min-w-[200px] px-4 py-2">MSSV</th>
                <th className=" min-w-[200px] px-4 py-2">Giới tính</th>
                <th className=" min-w-[200px] px-4 py-2">Ngày sinh</th>
                <th className=" min-w-[500px] px-4 py-2">Nơi sinh</th>
                <th className=" min-w-[200px] px-4 py-2">Quốc tịch</th>
                <th className=" min-w-[200px] px-4 py-2">Dân tộc</th>
                <th className=" min-w-[200px] px-4 py-2">CCCD</th>
                <th className=" min-w-[200px] px-4 py-2">Số điện thoại</th>
                <th className=" min-w-[200px] px-4 py-2">Email</th>
                <th className=" min-w-[200px] px-4 py-2">Mô tả</th>
                <th className=" min-w-[200px] px-4 py-2">Trạng thái học tập</th>
                <th className=" min-w-[200px] px-4 py-2">Bậc đào tạo</th>
                <th className=" min-w-[20px] px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className=" relative  w-full ">
              {students?.map((student) => (
                <tr
                  key={student.STUDENT_ID_NUMBER}
                  className="block border-gray-300 text-[14px] font-semibold hover:bg-gray-200"
                >
                  <td className="min-w-[200px] px-4 py-2">
                    {student.LAST_NAME + " " + student.MIDDLE_NAME}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.FIRST_NAME}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.STUDENT_ID_NUMBER}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.GENDER ? "Nam" : "Nữ"}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.BIRTH_DATE}
                  </td>
                  <td className="min-w-[500px] px-4 py-2">
                    {student.BIRTH_PLACE}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">{student.NATION}</td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.NATIONALITY}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.PEOPLE_ID_NUMBER}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.PHONE_NUMBER}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">{student.EMAIL}</td>
                  <td className="min-w-[200px] px-4 py-2">{student.COMMENT}</td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.academicleveltype.ACADEMIC_LEVEL_TYPE_NAME}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.learningstatustype.LEARNING_STATUS_TYPE_NAME}
                  </td>
                  <td
                    onClick={() => handleActionClick(student.STUDENT_ID_NUMBER)}
                    className={`relative min-w-[10px] ${
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

      {/* add form */}
      {addAction && (
        <div className="fixed left-0 right-0 top-[15%] z-20 m-auto h-[700px] w-[870px] bg-[white]">
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
                  />
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
                  />
                </div>
              </div>
              <div className="mb-[10px] flex gap-[30px]">
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
                  />
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
                  />
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
                  />
                </div>{" "}
              </div>
              <div className="mb-[10px] flex gap-[30px]">
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
                  </select>
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
                  />
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
                  />
                </div>{" "}
              </div>
              <div className="mb-[10px] flex gap-[30px]">
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
                  />
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
                  />
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
                  />
                </div>{" "}
              </div>
              <div className="mb-[10px] flex gap-[30px]">
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
                  </select>
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
                  </select>
                </div>{" "}
              </div>
              <div className="mb-[10px] flex gap-[30px]">
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
        <div className="fixed left-0 right-0 top-[15%] z-20 m-auto h-[700px] w-[870px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">Sinh viên</h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleEditAction} />
              </div>
            </div>

            {console.log("students", students)}
            {students?.map(
              (student, index) =>
                showActionMenu.STUDENT_ID_NUMBER ===
                  student.STUDENT_ID_NUMBER && (
                  <div
                    key={student.STUDENT_ID_NUMBER}
                    className="border-t-[1px] border-border-body-form py-[20px]"
                  >
                    <div className="mb-[10px] flex gap-[30px]">
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
                            objectPayload[student.STUDENT_ID_NUMBER].MIDDLE_NAME
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
                        <label className="text-[16px] font-normal">Tên :</label>
                        <input
                          defaultValue={
                            objectPayload[student.STUDENT_ID_NUMBER].FIRST_NAME
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
                    <div className="mb-[10px] flex gap-[30px]">
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
                            objectPayload[student.STUDENT_ID_NUMBER].BIRTH_DATE
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
                            objectPayload[student.STUDENT_ID_NUMBER].BIRTH_PLACE
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
                    <div className="mb-[10px] flex gap-[30px]">
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
                            objectPayload[student.STUDENT_ID_NUMBER].NATIONALITY
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
                    <div className="mb-[10px] flex gap-[30px]">
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
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Trạng thái học tập:
                        </label>
                        <select
                          defaultValue={
                            objectPayload[student.STUDENT_ID_NUMBER]
                              .ACADEMIC_LEVEL_TYPE_ID
                          }
                          type="text"
                          id="LEARNING_STATUS_TYPE_NAME"
                          className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              student.STUDENT_ID_NUMBER,
                              "LEARNING_STATUS_TYPE_NAME",
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
                            academicleveltype.map((item) => (
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
                    <div className="mb-[10px] flex gap-[30px]">
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
                          handleSaveInformation(student.STUDENT_ID_NUMBER)
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

export default ListStudent;
