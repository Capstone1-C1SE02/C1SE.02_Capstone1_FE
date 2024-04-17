import { Button } from "@/components/admin";
import React, { useEffect, useState } from "react";
import icon from "@/ultils/icon";
import { Label } from "@/components/admin";
import { HeaderAndInput } from "@/components/admin";
import axiosConfig from "../../axiosConfig";

const { BsThreeDotsVertical, FaTimes } = icon;

function ListStudent() {
  const [studentss, setStudentsData] = useState([]);
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
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    Address: "",
    Gender: "",
    Nation: "",
    Nationality: "",
    Email: "",
    PhoneNumber: "",
    MajorName: "",
    ProgramName: "",
    YearOfAdmission: "",
  });

  const [objectPayload, setObjectPayload] = useState(() =>
    studentss.reduce((acc, user) => {
      acc[user.StudentID] = {
        StudentID: user.StudentID,
        FirstName: user.FirstName,
        LastName: user.LastName,
        DateOfBirth: user.DateOfBirth,
        Address: user.Address,
        Gender: user.Gender,
        Nation: user.Nation,
        Nationality: user.Nationality,
        Email: user.Email,
        PhoneNumber: user.PhoneNumber,
        MajorName: user.MajorName,
        ProgramName: user.ProgramName,
        YearOfAdmission: user.YearOfAdmission,
      };
      return acc;
    }, {}),
  );
  console.log(objectPayload);

  //add
  const handleAddANew = () => {
    console.log("paylod", payload);
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

  // edit
  const handleSaveInformation = (id) => {
    console.log("ok131", objectPayload[id]);
  };

  return (
    <div className="relative mx-auto flex h-full w-full flex-col gap-[10px] bg-secondary">
      <HeaderAndInput lable={"Danh sách sinh viên"} onClick={handleAddAction} />
      <div className=" relative h-full rounded-xl bg-table-bg">
        <div className="h-full p-[-60px]">
          <table
            className={`block h-40 min-h-[100%] w-full border-[30px] border-white ${window.innerWidth >= 1600 ? "overflow-x-hidden " : "overflow-x-scroll"} `}
          >
            <thead className=" w-full ">
              <tr className="block w-full text-left text-[12px] font-medium uppercase text-header-text">
                <th className=" min-w-[200px] px-4 py-2">Tên sinh viên</th>
                <th className=" min-w-[200px] px-4 py-2">Ngày sinh</th>
                <th className=" min-w-[500px] px-4 py-2">Quê quán</th>
                <th className=" min-w-[200px] px-4 py-2">Giới tính</th>
                <th className=" min-w-[200px] px-4 py-2">Dân tộc</th>
                <th className=" min-w-[200px] px-4 py-2">Quốc tịch</th>
                <th className=" min-w-[300px] px-4 py-2">Email</th>
                <th className=" min-w-[200px] px-4 py-2">Số điện thoại</th>
                <th className=" min-w-[300px] px-4 py-2">Chuyên ngành</th>
                <th className=" min-w-[200px] px-4 py-2">
                  Chương trình đào tạo
                </th>
                <th className=" min-w-[200px] px-4 py-2">Năm nhập học</th>
                <th className=" min-w-[20px] px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className=" w-full   ">
              {studentss?.map((student, index) => (
                <tr
                  key={index}
                  className="block border-gray-300 text-[14px] font-semibold hover:bg-gray-200"
                >
                  <td className="min-w-[200px] px-4 py-2">
                    {student.LastName + " " + student.FirstName}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.DateOfBirth}
                  </td>
                  <td className="min-w-[500px] px-4 py-2">{student.Address}</td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.Gender ? "Nam" : "Nữ"}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">{student.Nation}</td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.Nationality}
                  </td>
                  <td className="min-w-[300px] px-4 py-2">{student.Email}</td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.PhoneNumber}
                  </td>
                  <td className="min-w-[300px] px-4 py-2">
                    {student.yearbasedacademicprogram.program.major.MajorName}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.yearbasedacademicprogram.program.ProgramName}
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
                          className={`absolute right-0 top-[37px] z-10 flex flex-col gap-[5px] rounded border-[1px] bg-white p-[5px]`}
                        >
                          <Button
                            text={"Sửa"}
                            bgColor={"bg-custom-bg-notActive-nav"}
                            onClick={showEditAction}
                          ></Button>

                          <Button
                            text={"Xoá"}
                            bgColor={"bg-custom-bg-active-nav"}
                            textColor={"text-custom-text-active-nav"}
                            onClick={showDeleteAction}
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
                    id="FirstName"
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
                      <option value="1">Nam</option>
                      <option value="0">Nữ</option>
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
                    id="MajorName"
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
                    id="ProgramName"
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
                      <option value="ThườngT">Thường</option>
                      <option value="Chuẩn CMU">Chuẩn CMU</option>
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
                    id="DurationOfTraning"
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
                bgColor={"bg-bg-button-add"}
                textColor={"text-[#16A34A] "}
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

            {studentss?.map(
              (student, index) =>
                showActionMenu.studentId === student.StudentID && (
                  <div
                    key={index}
                    className="border-t-[1px] border-border-body-form py-[20px]"
                  >
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Họ tên:
                        </label>
                        <input
                          defaultValue={objectPayload[1].FirstName}
                          type="text"
                          id="FirstName"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              student.StudentID,
                              "FirstName",
                            )
                          }
                        />
                      </div>{" "}
                      {/* <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Ngày sinh:
                        </label>
                        <input
                          defaultValue={objectPayload[student.StudentID].date}
                          type="date"
                          id="date"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.StudentID, "date")
                          }
                        />
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Quê quán:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[student.StudentID].address
                          }
                          type="text"
                          id="address"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.StudentID, "address")
                          }
                        />
                      </div>{" "} */}
                    </div>
                    {/* <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Giới tính:
                        </label>
                        <select
                          type="text"
                          id="gender"
                          className="block  w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          defaultValue={objectPayload[student.StudentID].gender}
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.StudentID, "gender")
                          }
                        >
                          <optgroup
                            label="Giới tính"
                            className="border-b-[1px] bg-white p-[10px] text-left"
                          >
                            <option hidden></option>
                            <option value="1">Nam</option>
                            <option value="0">Nữ</option>
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
                          defaultValue={objectPayload[student.StudentID].ethnic}
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.StudentID, "ethnic")
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
                          defaultValue={objectPayload[student.StudentID].nation}
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.StudentID, "nation")
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
                          defaultValue={objectPayload[student.StudentID].email}
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.StudentID, "email")
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
                          defaultValue={
                            objectPayload[student.StudentID].phonenumber
                          }
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              student.StudentID,
                              "phonenumber",
                            )
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
                          defaultValue={
                            objectPayload[student.StudentID].yearAdmission
                          }
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              student.StudentID,
                              "yearAdmission",
                            )
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
                          defaultValue={objectPayload[student.StudentID].major}
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.StudentID, "major")
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
                            objectPayload[student.StudentID].academicProgram
                          }
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              student.StudentID,
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
                          defaultValue={
                            objectPayload[student.StudentID].modeofStudy
                          }
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              student.StudentID,
                              "modeofStudy",
                            )
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
                          defaultValue={
                            objectPayload[student.StudentID].timeStudy
                          }
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              student.StudentID,
                              "timeStudy",
                            )
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
                          handleSaveInformation(student.StudentID)
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
