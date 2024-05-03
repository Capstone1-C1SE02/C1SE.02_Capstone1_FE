import React, { useEffect, useState } from "react";
import icon from "@/ultils/icon";
import {
  Button,
  Label,
  HeaderAndInput,
  DeleteForm,
  FooterPage,
} from "@/components/admin";
import { Student, AcademicProgram } from "@/components/dropList";
const { BsThreeDotsVertical, FaTimes } = icon;
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "@/axiosConfig";
import { addDiplopManamentProfile } from "@/redux/apiRequestAdd";
import { deleleDiplopManagermentProfile } from "@/redux/apiRequestDelete";
import { editDiplopManagermentProfile } from "@/redux/apiRequestEdit";
import { ToastContainer, toast } from "react-toastify";
import getAdminId from "@/ultils/getAdminId";

function DiplopmaManagementProfile() {
  const adminId = getAdminId();
  const data = useSelector((state) => state.addAction.data);
  const dataDelete = useSelector((state) => state.deleteAction);
  const dataEdit = useSelector((state) => state.EditAction);
  const dispatch = useDispatch();
  const [render, setRender] = useState(0);
  const [degreebooks, setDegreebooks] = useState([]);
  const [student, setStudent] = useState();
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
        setDegreebooks(response.data.results.data);
        setPanigationData({
          count: response.data.count,
          page: response.data.total_pages,
        });
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy danh sách năm học:", error);
      }
    }
    fetchDegreesData();
  }, [render, page]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const student = await Student();
        const academicProgram = await AcademicProgram();
        setStudent(student.data.results.data);
        setAcademicProgram(academicProgram.data.results.data);
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
    LAST_NAME: "",
    FIRST_NAME: "",
    MIDDLE_NAME: "",
    STUDENT_ID_NUMBER: "",
    GRADUATION_YEAR: "",
    MODE_OF_STUDY: "",
    ACADEMIC_PROGRAM_ID: "",
    CLASSIFIED_BY_ACADEMIC_RECORDS: "",

    NUMBER_ENTERED_INTO_THE_DEGREE_TRACKING_BOOK: "",
    CERTIFICATE_NUMBER: "",
    DATE_OF_DECISION_ANNOUNCEMENT: "",
    DATE_UPDATED: "",
    APPORVEDY: "",
    COMMENT: "",
    user: adminId,
  });

  const [objectPayload, setObjectPayload] = useState();

  useEffect(() => {
    setObjectPayload(
      degreebooks.reduce((acc, diplopmaMP) => {
        acc[diplopmaMP.DIPLOMA_MANAGEMENT_PROFILE_ID] = {
          LAST_NAME: diplopmaMP.LAST_NAME,
          FIRST_NAME: diplopmaMP.FIRST_NAME,
          MIDDLE_NAME: diplopmaMP.MIDDLE_NAME,
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
          APPORVEDY: diplopmaMP.APPORVEDY,
          COMMENT: diplopmaMP.COMMENT,
          user: adminId,
        };
        return acc;
      }, {}),
    );
  }, [degreebooks]);

  //add
  const handleAddANew = async () => {
    await addDiplopManamentProfile(payload, dispatch);
    toast.success(`${data?.message}`);
    console.log("paylod", payload);
    showAddAction(!addAction);
    setRender(render + 1);
  };

  // edit
  const handleSaveInformation = async (id) => {
    await editDiplopManagermentProfile(objectPayload[id], id, dispatch);
    dataEdit ? toast.success("Sửa thành công") : toast.error("Sửa thất bại");
    console.log("ok131", objectPayload[id]);
    console.log("data edit", dataEdit);
    showEditAction(!editAction);
    setRender(render + 1);
  };

  //delele
  const handleDelete = async () => {
    console.log("showActionMenu.STUDENT_ID_NUMBER", showActionMenu.studentId);
    await deleleDiplopManagermentProfile(showActionMenu.studentId, dispatch);
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
    <div className=" flex h-full w-full flex-col gap-[10px] overflow-x-auto bg-secondary">
      <HeaderAndInput
        lable={"Quản lý hồ sơ văn bằng"}
        onClick={handleAddAction}
      />
      <ToastContainer />

      <div className=" relative h-[84%]  rounded-xl bg-table-bg">
        <div className="h-full p-[-60px]">
          <table
            className={` block h-full w-full overflow-x-auto border-x-[30px] border-t-[30px] border-white`}
          >
            <thead className=" relative w-full">
              <tr className="relavite block w-full text-left text-[12px] font-medium uppercase text-header-text">
                <th className=" min-w-[200px] px-4 py-2">Tên </th>
                <th className=" min-w-[200px] px-4 py-2">Mã sinh viên</th>
                <th className=" min-w-[200px] px-4 py-2">
                  Chương trình đào tạo
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
                  className="block border-gray-300 text-[14px] font-semibold hover:bg-gray-200"
                >
                  <td className="min-w-[200px] px-4 py-2">
                    {student.LAST_NAME +
                      " " +
                      student.MIDDLE_NAME +
                      " " +
                      student.FIRST_NAME}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.STUDENT_ID_NUMBER}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.ACADEMIC_PROGRAM_ID}
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
                    {student.APPORVEDY === true
                      ? "Được phê duyệt"
                      : "Đang xử lý"}
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
            count={+`${parseInt(panigationData.count / 12)}`}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>

      {/* add form */}
      {addAction && (
        <div className="fixed left-0 right-0 top-[15%] z-20 m-auto h-[700px] w-[870px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">
                Quản lý hồ sơ văn bằng
              </h1>
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
                  <label className="text-[16px] font-normal">
                    Mã sinh viên:
                  </label>
                  <input
                    type="text"
                    id="STUDENT_ID_NUMBER"
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
                  <label className="text-[16px] font-normal">
                    Năm tốt nghiệp:
                  </label>
                  <input
                    type="text"
                    id="GRADUATION_YEAR"
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
                  <label className="text-[16px] font-normal">
                    Loại đào tạo:
                  </label>
                  <input
                    type="text"
                    id="MODE_OF_STUDY"
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
                  <label className="text-[16px] font-normal">
                    Chương trình đào tạo:
                  </label>
                  <select
                    id="ACADEMIC_PROGRAM_ID"
                    className="block w-[530px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    type="text"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
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
                  <label className="text-[16px] font-normal">Xếp loại:</label>
                  <input
                    type="text"
                    id="CLASSIFIED_BY_ACADEMIC_RECORDS"
                    className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  ></input>
                </div>{" "}
              </div>
              <div className="mb-[10px] flex gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Số hiệu bằng:
                  </label>
                  <input
                    type="text"
                    id="CERTIFICATE_NUMBER"
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
                  <label className="text-[16px] font-normal">Số vào sổ:</label>
                  <input
                    type="text"
                    id="NUMBER_ENTERED_INTO_THE_DEGREE_TRACKING_BOOK"
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
                    Ngày tốt nghiệp:
                  </label>
                  <input
                    type="date"
                    id="DATE_OF_DECISION_ANNOUNCEMENT"
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
                  <label className="text-[16px] font-normal">
                    Ngày sửa đổi:
                  </label>
                  <input
                    type="date"
                    id="DATE_UPDATED"
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
                  <label className="text-[16px] font-normal">Trạng thái:</label>
                  <input
                    type="text"
                    id="APPORVEDY"
                    className="block w-[530px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                  <label className="text-[16px] font-normal">Ghi chú:</label>
                  <input
                    type="text"
                    id="COMMENT"
                    className="block w-[810px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
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

            {degreebooks?.map(
              (item) =>
                showActionMenu.studentId ===
                  item.DIPLOMA_MANAGEMENT_PROFILE_ID && (
                  <div
                    key={item.DIPLOMA_MANAGEMENT_PROFILE_ID}
                    className="border-t-[1px] border-border-body-form py-[20px]"
                  >
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">Họ:</label>
                        <input
                          defaultValue={
                            objectPayload[item.DIPLOMA_MANAGEMENT_PROFILE_ID]
                              .LAST_NAME
                          }
                          type="text"
                          id="LAST_NAME"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              item.DIPLOMA_MANAGEMENT_PROFILE_ID,
                              "LAST_NAME",
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Tên lót:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[item.DIPLOMA_MANAGEMENT_PROFILE_ID]
                              .MIDDLE_NAME
                          }
                          type="text"
                          id="MIDDLE_NAME"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              item.DIPLOMA_MANAGEMENT_PROFILE_ID,
                              "MIDDLE_NAME",
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">Tên:</label>
                        <input
                          defaultValue={
                            objectPayload[item.DIPLOMA_MANAGEMENT_PROFILE_ID]
                              .FIRST_NAME
                          }
                          type="text"
                          id="FIRST_NAME"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              item.DIPLOMA_MANAGEMENT_PROFILE_ID,
                              "FIRST_NAME",
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="mb-[10px] flex gap-[30px]">
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
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Chương trình đào tạo:
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
                    <div className="mb-[10px] flex gap-[30px]">
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
                    <div className="mb-[10px] flex gap-[30px]">
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
                        <input
                          defaultValue={
                            objectPayload[item.DIPLOMA_MANAGEMENT_PROFILE_ID]
                              .APPORVEDY
                          }
                          type="text"
                          id="APPORVEDY"
                          className="block w-[530px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              item.DIPLOMA_MANAGEMENT_PROFILE_ID,
                              "APPORVEDY",
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="mb-[10px] flex gap-[30px]">
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
                            item.DIPLOMA_MANAGEMENT_PROFILE_ID,
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

export default DiplopmaManagementProfile;
