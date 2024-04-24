import { Button } from "@/components/admin";
import React, { useEffect, useState } from "react";
import icon from "@/ultils/icon";
import { Label } from "@/components/admin";
import { HeaderAndInput } from "@/components/admin";
import axiosConfig from "@/axiosConfig";
import { addStudent } from "@/redux/apiRequestAdd";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { BsThreeDotsVertical, FaTimes } = icon;

function ListStudent() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.addAction);
  const [students, setStudentsData] = useState([]);
  useEffect(() => {
    async function fetchStudentsData() {
      try {
        const response = await axiosConfig.get("/student");
        setStudentsData(response.data);
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy danh sách sinh viên:", error);
      }
    }
    fetchStudentsData();
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
    StudentID: "",
    StudentName: "",
    DateOfBirth: "",
    Address: "",
    Gender: "",
    Nation: "",
    Nationality: "",
    Email: "",
    PhoneNumber: "",
    major_name: "",
    program_name: "",
    YearOfAdmission: "",
  });

  const [objectPayload, setObjectPayload] = useState(() =>
    students.reduce((acc, student) => {
      acc[student.id] = {
        program_name: student.program_name,
        major_name: student.major_name,
        FirstName: student.FirstName,
        LastName: student.LastName,
        Gender: student.Gender,
        DateOfBirth: student.DateOfBirth,
        Address: student.Address,
        Nation: student.Nation,
        Nationality: student.Nationality,
        PhoneNumber: student.PhoneNumber,
        Email: student.Email,
        MSSV: student.MSSV,
        YearOfAdmission: student.YearOfAdmission,
        YBAP_ID: student.YBAP_ID,
      };
      return acc;
    }, {}),
  );

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

  //add
  const handleAddANew = () => {
    addStudent(payload, dispatch);
    toast.success(`${data.addAction}`);
  };

  // edit
  const handleSaveInformation = (id) => {
    console.log("ok131", objectPayload[id]);
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
                <th className=" min-w-[200px] px-4 py-2">Tên sinh viên</th>
                <th className=" min-w-[200px] px-4 py-2">Ngày sinh</th>
                <th className=" min-w-[200px] px-4 py-2">Quê quán</th>
                <th className=" min-w-[200px] px-4 py-2">Giới tính</th>
                <th className=" min-w-[200px] px-4 py-2">Dân tộc</th>
                <th className=" min-w-[200px] px-4 py-2">Quốc tịch</th>
                <th className=" min-w-[200px] px-4 py-2">Email</th>
                <th className=" min-w-[200px] px-4 py-2">Số điện thoại</th>
                <th className=" min-w-[200px] px-4 py-2">Chuyên ngành</th>
                <th className=" min-w-[200px] px-4 py-2">
                  Chương trình đào tạo
                </th>
                <th className=" min-w-[200px] px-4 py-2">Năm nhập học</th>
                <th className=" min-w-[20px] px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className=" relative  w-full ">
              {students?.map((student, index) => (
                <tr
                  key={student.StudentID}
                  className="block border-gray-300 text-[14px] font-semibold hover:bg-gray-200"
                >
                  <td className="min-w-[200px] px-4 py-2">
                    {student.StudentName}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.DateOfBirth}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">{student.Address}</td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.Gender ? "Nam" : "Nữ"}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">{student.Nation}</td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.Nationality}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">{student.Email}</td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.PhoneNumber}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.yearbasedacademicprogram.majorName}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.yearbasedacademicprogram.programName}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.YearOfAdmission}
                  </td>
                  <td
                    onClick={() => handleActionClick(student.StudentID)}
                    className={`relative min-w-[10px] ${
                      showActionMenu.studentId === student.StudentID &&
                      showActionMenu.isOpen &&
                      "bg-custom-bg-notActive-nav"
                    } cursor-pointer rounded-[3px] px-2 `}
                  >
                    <BsThreeDotsVertical />
                    {showActionMenu.studentId === student.StudentID &&
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
        <div className="fixed left-0 right-0 top-[20px] z-20 m-auto h-[610px] w-[870px] bg-[white]">
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
                  <label className="text-[16px] font-normal">Họ tên:</label>
                  <input
                    id="StudentName"
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
                  <label className="text-[16px] font-normal">Ngày sinh:</label>
                  <input
                    type="date"
                    id="DateOfBirth"
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
                  <label className="text-[16px] font-normal">Quê quán:</label>
                  <input
                    type="text"
                    id="Address"
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
                    type="text"
                    id="Gender"
                    className="block  w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  >
                    <optgroup
                      label="Giới tính"
                      className="border-b-[1px] bg-white p-[10px] text-left"
                    >
                      <option hidden></option>
                      <option value={true}>Nam</option>
                      <option value={false}>Nữ</option>
                    </optgroup>
                  </select>
                </div>{" "}
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">Dân tộc:</label>
                  <input
                    type="text"
                    id="Nation"
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
                  <label className="text-[16px] font-normal">Quốc tịch:</label>
                  <input
                    type="text"
                    id="Nationality"
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
                  <label className="text-[16px] font-normal">Email:</label>
                  <input
                    type="text"
                    id="Email"
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
                    id="PhoneNumber"
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
                    Năm nhập học:
                  </label>
                  <select
                    type="text"
                    id="YearOfAdmission"
                    className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  >
                    <optgroup label="Năm nhập học">
                      <option hidden></option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                    </optgroup>
                  </select>
                </div>{" "}
              </div>
              <div className="mb-[10px] flex gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Chuyên ngành:
                  </label>
                  <select
                    type="text"
                    id="majorName"
                    className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  >
                    <optgroup label="Chuyên ngành">
                      <option hidden></option>
                      <option value="CNTT">Công nghệ thông tin</option>
                      <option value="CNTT-CMU">
                        Công nghệ thông tin chuẩn CMU
                      </option>
                    </optgroup>
                  </select>
                </div>{" "}
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Chương trình đào tạo:
                  </label>
                  <select
                    type="text"
                    id="programName"
                    className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  >
                    <optgroup label="Chương trình đào tạo">
                      <option hidden></option>
                      <option value="T">Thường</option>
                      <option value="CMU">Chuẩn CMU</option>
                    </optgroup>
                  </select>
                </div>{" "}
              </div>
              {/* <div className="mb-[10px] flex gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Loại hình đào tạo:
                  </label>
                  <select
                    type="text"
                    id="ModeofStudy"
                    className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  >
                    <optgroup label="Loại hình đào tạo">
                      <option hidden></option>
                      <option value="DH">Đại học</option>
                      <option value="CD">Cao đẳng</option>
                    </optgroup>
                  </select>
                </div>{" "}
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Thời gian đào tạo:
                  </label>
                  <select
                    type="text"
                    id="YearOfAdmission"
                    className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  >
                    <optgroup label="Thời gian đào tạo">
                      <option hidden></option>
                      <option value="4">4</option>
                      <option value="4.5">4.5</option>
                    </optgroup>
                  </select>
                </div>{" "}
              </div> */}
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
        <div className="fixed left-0 right-0 top-[20px] z-20 m-auto h-[610px] w-[870px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">Sinh viên</h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleEditAction} />
              </div>
            </div>

            {students.map(
              (student, index) =>
                showActionMenu.studentId === student.id && (
                  <div
                    key={student.id}
                    className="border-t-[1px] border-border-body-form py-[20px]"
                  >
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Họ tên:
                        </label>
                        <input
                          defaultValue={objectPayload[student.id].username}
                          type="text"
                          id="username"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.id, "username")
                          }
                        />
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Ngày sinh:
                        </label>
                        <input
                          defaultValue={objectPayload[student.id].date}
                          type="date"
                          id="date"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.id, "date")
                          }
                        />
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Quê quán:
                        </label>
                        <input
                          defaultValue={objectPayload[student.id].address}
                          type="text"
                          id="address"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.id, "address")
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
                          type="text"
                          id="gender"
                          className="block  w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          defaultValue={objectPayload[student.id].gender}
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.id, "gender")
                          }
                        >
                          <optgroup
                            label="Giới tính"
                            className="border-b-[1px] bg-white p-[10px] text-left"
                          >
                            <option hidden></option>
                            <option value="0">Nam</option>
                            <option value="1">Nữ</option>
                          </optgroup>
                        </select>
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Dân tộc:
                        </label>
                        <input
                          type="text"
                          id="ethnic"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          defaultValue={objectPayload[student.id].ethnic}
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.id, "ethnic")
                          }
                        />
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Quốc tịch:
                        </label>
                        <input
                          type="text"
                          id="nation"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          defaultValue={objectPayload[student.id].nation}
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.id, "nation")
                          }
                        />
                      </div>{" "}
                    </div>
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Email:
                        </label>
                        <input
                          type="text"
                          id="email"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          defaultValue={objectPayload[student.id].email}
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.id, "email")
                          }
                        />
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Số điện thoại:
                        </label>
                        <input
                          type="text"
                          id="phonenumber"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          defaultValue={objectPayload[student.id].phonenumber}
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.id, "phonenumber")
                          }
                        />
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Năm nhập học:
                        </label>
                        <select
                          type="text"
                          id="yearAdmission"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          defaultValue={objectPayload[student.id].yearAdmission}
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.id, "yearAdmission")
                          }
                        >
                          <optgroup label="Năm nhập học">
                            <option hidden></option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                          </optgroup>
                        </select>
                      </div>{" "}
                    </div>
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Chuyên ngành:
                        </label>
                        <select
                          type="text"
                          id="major"
                          className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          defaultValue={objectPayload[student.id].major}
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.id, "major")
                          }
                        >
                          <optgroup label="Chuyên ngành">
                            <option hidden></option>
                            <option value="CNTT">Công nghệ thông tin</option>
                            <option value="CNTT-CMU">
                              Công nghệ thông tin chuẩn CMU
                            </option>
                          </optgroup>
                        </select>
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Chương trình đào tạo:
                        </label>
                        <select
                          type="text"
                          id="academicProgram"
                          className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          defaultValue={
                            objectPayload[student.id].academicProgram
                          }
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              student.id,
                              "academicProgram",
                            )
                          }
                        >
                          <optgroup label="Chương trình đào tạo">
                            <option hidden></option>
                            <option value="T">Thường</option>
                            <option value="CMU">Chuẩn CMU</option>
                          </optgroup>
                        </select>
                      </div>{" "}
                    </div>
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Loại hình đào tạo:
                        </label>
                        <select
                          type="text"
                          id="modeofStudy"
                          className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          defaultValue={objectPayload[student.id].modeofStudy}
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.id, "modeofStudy")
                          }
                        >
                          <optgroup label="Loại hình đào tạo">
                            <option hidden></option>
                            <option value="CQ">Đại học</option>
                            <option value="CD">Cao đẳng</option>
                          </optgroup>
                        </select>
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Thời gian đào tạo:
                        </label>
                        <select
                          type="text"
                          id="timeStudy"
                          className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          defaultValue={objectPayload[student.id].timeStudy}
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.id, "timeStudy")
                          }
                        >
                          <optgroup label="Thời gian đào tạo">
                            <option hidden></option>
                            <option value="4">4</option>
                            <option value="4.5">4.5</option>
                          </optgroup>
                        </select>
                      </div>{" "}
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
                        onClick={(e) => handleSaveInformation(student.id)}
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
                onClick={(e) => alert("xoá sinh viên mã", idStudent)}
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

export default ListStudent;
