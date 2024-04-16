import { Button } from "@/components/admin";
import React, { useEffect, useState } from "react";
import icon from "@/ultils/icon";
import { Label } from "@/components/admin";
import { HeaderAndInput } from "@/components/admin";
const { BsThreeDotsVertical, FaTimes } = icon;

const students = [
  {
    username: "Nguyễn Hữu Tuấn",
    id: "1000001",
    academicprogram: "T",
    major: "CNTT",
    numerical: "0012",
    degreebook: "Quốc Gia",
    modeofStudy: "CQ",
    classification: "Giỏi",
    graduationyear: "2025",
  },
  {
    username: "Nguyễn Hữu Tuấn",
    id: "1000002",
    academicprogram: "T",
    major: "CNTT",
    numerical: "0012",
    degreebook: "Quốc Gia",
    modeofStudy: "CQ",
    classification: "Giỏi",
    graduationyear: "2025",
  },
  {
    username: "Nguyễn Hữu Tuấn",
    id: "1000003",
    academicprogram: "T",
    major: "CNTT",
    numerical: "0012",
    degreebook: "Quốc Gia",
    modeofStudy: "CQ",
    classification: "Giỏi",
    graduationyear: "2025",
  },
];
function DegreeList() {
  const [showActionMenu, setShowActionMenu] = useState({
    studentId: null,
    isOpen: false,
  });

  const [idStudent, setIdStudent] = useState("");
  const [addAction, showAddAction] = useState(false);
  const [editAction, showEditAction] = useState(false);
  const [deleteAction, showDeleteAction] = useState(false);
  const [payload, setPayload] = useState({
    username: "",
    academicprogram: "",
    id: "",
    major: "",
    numerical: "",
    degreebook: "",
    modeofStudy: "",
    classification: "",
    graduationyear: "",
  });

  const [objectPayload, setObjectPayload] = useState(() =>
    students.reduce((acc, user) => {
      acc[user.id] = {
        username: user.username,
        academicprogram: user.academicprogram,
        id: user.id,
        major: user.major,
        numerical: user.numerical,
        degreebook: user.degreebook,
        modeofStudy: user.modeofStudy,
        classification: user.classification,
        graduationyear: user.graduationyear,
      };
      return acc;
    }, {}),
  );

  //add
  const handleAddANew = () => {
    console.log("paylod", payload);
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

  // edit
  const handleSaveInformation = (id) => {
    console.log("ok131", objectPayload[id]);
  };
  return (
    <div className="relative mx-auto flex h-full w-full flex-col gap-[10px] bg-secondary">
      <HeaderAndInput lable={"Danh sách bằng"} onClick={handleAddAction} />

      <div className=" relative h-full rounded-xl bg-table-bg">
        <div className="h-full p-[-60px]">
          <table
            className={`block h-40 min-h-[100%] w-full border-[30px] border-white ${window.innerWidth >= 1600 ? "overflow-x-hidden " : "overflow-x-scroll"} `}
          >
            <thead className=" w-full ">
              <tr className="block w-full text-left text-[12px] font-medium uppercase text-header-text">
                <th className=" min-w-[200px] px-4 py-2">Tên sinh viên</th>
                <th className=" min-w-[200px] px-4 py-2">
                  Chương trình đào tạo
                </th>
                <th className=" min-w-[200px] px-4 py-2">Mã sinh viên</th>
                <th className=" min-w-[200px] px-4 py-2">Chuyên ngành</th>
                <th className=" min-w-[200px] px-4 py-2">Số hiệu bằng</th>
                <th className=" min-w-[200px] px-4 py-2">Sổ vào cấp bằng</th>
                <th className=" min-w-[200px] px-4 py-2">Loại hình đào tạo</th>
                <th className=" min-w-[200px] px-4 py-2">Xếp loại</th>
                <th className=" min-w-[200px] px-4 py-2">Năm tốt nghiệp</th>
                <th className=" min-w-[20px] px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className=" w-full">
              {students.map((student, index) => (
                <tr
                  key={student.id}
                  className="block border-gray-300 text-[14px] font-semibold hover:bg-gray-200"
                >
                  <td className="min-w-[200px] px-4 py-2">
                    {student.username}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.academicprogram}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">{student.id}</td>
                  <td className="min-w-[200px] px-4 py-2">{student.major}</td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.numerical}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.degreebook}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.modeofStudy}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.classification}
                  </td>

                  <td className="min-w-[200px] px-4 py-2">
                    {student.graduationyear}
                  </td>
                  <td
                    onClick={() => handleActionClick(student.id)}
                    className={`relative min-w-[10px] ${
                      showActionMenu.studentId === student.id &&
                      showActionMenu.isOpen &&
                      "bg-custom-bg-notActive-nav"
                    } cursor-pointer rounded-[3px] px-2 `}
                  >
                    <BsThreeDotsVertical />
                    {showActionMenu.studentId === student.id &&
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
        <div className="fixed left-0 right-0 top-[20px] z-20 m-auto h-[527px] w-[870px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">Danh sách bằng</h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleAddAction} />
              </div>
            </div>

            <div className="border-y-[1px] border-border-body-form py-[20px]">
              <div className="mb-[10px] flex gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Tên sinh viên:
                  </label>
                  <input
                    id="username"
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
                  <label className="text-[16px] font-normal">
                    Chương trình đào tạo:
                  </label>
                  <select
                    type="text"
                    id="academicprogram"
                    className="block w-[530px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
              <div className="mb-[10px] flex gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Mã sinh viên:
                  </label>
                  <input
                    type="text"
                    id="id"
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
                    Chuyên ngành:
                  </label>
                  <select
                    type="text"
                    id="major"
                    className="block  w-[530px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
              </div>
              <div className="mb-[10px] flex gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Số hiệu bằng:
                  </label>
                  <input
                    type="text"
                    id="numerical"
                    className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                    Sổ vào cấp bằng:
                  </label>
                  <input
                    type="text"
                    id="degreebook"
                    className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                    Loại hình đào tạo:
                  </label>
                  <select
                    type="text"
                    id="modeofStudy"
                    className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                  <label className="text-[16px] font-normal">Xếp loại:</label>
                  <input
                    type="text"
                    id="classification"
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
                    Năm tốt nghiệp:
                  </label>
                  <input
                    type="text"
                    id="graduationyear"
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
        <div className="fixed left-0 right-0 top-[20px] z-20 m-auto h-[527px] w-[870px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">Danh sách bằng</h1>
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
                          Tên sinh viên:
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
                          Chương trình đào tạo:
                        </label>
                        <select
                          type="text"
                          id="academicProgram"
                          className="block w-[530px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          defaultValue={
                            objectPayload[student.id].academicprogram
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
                          Mã sinh viên:
                        </label>
                        <input
                          defaultValue={objectPayload[student.id].id}
                          type="text"
                          id="id"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.id, "id")
                          }
                        />
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Chuyên ngành:
                        </label>
                        <select
                          type="text"
                          defaultValue={objectPayload[student.id].major}
                          id="major"
                          className="block w-[530px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                    </div>
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Số hiệu bằng:
                        </label>
                        <input
                          type="text"
                          id="numerical"
                          className="block  w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          defaultValue={objectPayload[student.id].numerical}
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.id, "numerical")
                          }
                        />
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Sổ vào số cấp bằng:
                        </label>
                        <input
                          type="text"
                          id="degreebook"
                          className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          defaultValue={objectPayload[student.id].degreebook}
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.id, "degreebook")
                          }
                        />
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
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                          Xếp loại:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[student.id].classification
                          }
                          type="text"
                          id="classification"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.id, "classification")
                          }
                        />
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Năm tốt nghiệp:
                        </label>
                        <input
                          type="text"
                          id="graduationyear"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          defaultValue={
                            objectPayload[student.id].graduationyear
                          }
                          onChange={(e) =>
                            handledOnchangeEdit(e, student.id, "graduationyear")
                          }
                        />
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

export default DegreeList;
