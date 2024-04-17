import { Button } from "@/components/admin";
import React, { useEffect, useState } from "react";
import icon from "@/ultils/icon";
import { Label } from "@/components/admin";
import { HeaderAndInput } from "@/components/admin";
const { BsThreeDotsVertical, FaTimes } = icon;
const academicprograms = [
  {
    id: "1",
    year: "7480103",
    academicprogram: "T",
    major: "Công nghệ thông tin",
  },
  {
    id: "2",
    year: "7480103",
    academicprogram: "T",
    major: "Công nghệ thông tin",
  },
  {
    id: "3",
    year: "7480103",
    academicprogram: "T",
    major: "Công nghệ thông tin",
  },
];

function ListAcademicProgramYear() {
  const [showActionMenu, setShowActionMenu] = useState({
    studentId: null,
    isOpen: false,
  });

  const [idStudent, setIdStudent] = useState("");
  const [addAction, showAddAction] = useState(false);
  const [editAction, showEditAction] = useState(false);
  const [deleteAction, showDeleteAction] = useState(false);
  const [payload, setPayload] = useState({
    id: "",
    year: "",
    academicprogram: "",
    major: "",
  });

  const [objectPayload, setObjectPayload] = useState(() =>
    academicprograms.reduce((acc, academicprogram) => {
      acc[academicprogram.id] = {
        id: academicprogram.id,
        year: academicprogram.year,
        academicprogram: academicprogram.academicprogram,
        major: academicprogram.major,
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
      {" "}
      <HeaderAndInput
        lable={"Danh sách chương trình đào tạo theo năm"}
        onClick={handleAddAction}
      />
      <div className=" relative h-full rounded-xl bg-table-bg">
        <div className="h-full p-[-60px]">
          <table
            className={`relative block h-40 min-h-[100%] w-full border-[30px] border-white ${window.innerWidth >= 1600 ? "overflow-x-hidden " : "overflow-x-scroll"} `}
          >
            <thead className="flex w-full flex-col ">
              <tr className=" flex w-full items-center justify-between text-left text-[12px] font-medium uppercase text-header-text">
                <th className=" min-w-[100px] px-4 py-2">Năm học</th>
                <th className=" min-w-[300px] px-4 py-2">Ngành học</th>
                <th className=" min-w-[400px] px-4 py-2">
                  Chương trình đào tạo
                </th>
                <th className=" min-w-[20px] px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="flex w-full flex-col ">
              {academicprograms.map((academicprogram, index) => (
                <tr
                  key={academicprogram.id}
                  className="relative flex items-center justify-between border-gray-300 text-[14px] font-semibold hover:bg-gray-200 "
                >
                  <td className="w-[100px] px-4 py-2">
                    {academicprogram.year}
                  </td>
                  <td className="w-[300px] px-4 py-2">
                    {academicprogram.major}
                  </td>
                  <td className="w-[400px] px-4 py-2">
                    {academicprogram.academicprogram}
                  </td>
                  <td
                    onClick={() => handleActionClick(academicprogram.id)}
                    className={`relative right-0 flex h-[39px] min-w-[10px] items-center ${
                      showActionMenu.studentId === academicprogram.id &&
                      showActionMenu.isOpen &&
                      "bg-custom-bg-notActive-nav"
                    } cursor-pointer rounded-[3px] px-2 `}
                  >
                    <BsThreeDotsVertical />
                    {showActionMenu.studentId === academicprogram.id &&
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
        <div className="fixed left-0 right-0 top-[20px] z-20 m-auto h-[390px] w-[870px] rounded-[10px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">
                Danh sách chương trình đào tạo theo năm
              </h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleAddAction} />
              </div>
            </div>

            <div className="border-y-[1px] border-border-body-form py-[20px]">
              <div className="mb-[10px] flex gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">Năm học</label>
                  <select
                    id="year"
                    className="block h-[40px] w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    type="text"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  >
                    <optgroup label="Năm học">
                      <option hidden></option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                    </optgroup>
                  </select>
                </div>{" "}
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">Ngành học</label>
                  <select
                    id="academicprogram"
                    className="block h-[40px] w-[530px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    type="text"
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
                    Chương trình đào tạo
                  </label>
                  <select
                    id="academicprogram"
                    className="block h-[40px] w-[810px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    type="text"
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
        <div className="fixed left-0 right-0 top-[20px] z-20 m-auto h-[390px] w-[870px] rounded-[10px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">
                Danh sách chương trình đào tạo theo năm
              </h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleEditAction} />
              </div>
            </div>

            {academicprograms.map(
              (academicprogram, index) =>
                showActionMenu.studentId === academicprogram.id && (
                  <div
                    key={academicprogram.id}
                    className="border-t-[1px] border-border-body-form py-[20px]"
                  >
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Năm học
                        </label>
                        <select
                          defaultValue={objectPayload[academicprogram.id].year}
                          type="text"
                          id="year"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(e, academicprogram.id, "year")
                          }
                        >
                          <optgroup label="Năm học">
                            <option hidden></option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                          </optgroup>
                        </select>
                      </div>
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Ngành học:
                        </label>
                        <select
                          defaultValue={objectPayload[academicprogram.id].major}
                          type="text"
                          id="major"
                          className="block w-[530px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(e, academicprogram.id, "major")
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
                      </div>
                    </div>
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="mb-[10px] flex gap-[30px]">
                        <div className="flex flex-col gap-[5px]">
                          <label className="text-[16px] font-normal">
                            Chương trình đào tạo:
                          </label>
                          <select
                            defaultValue={
                              objectPayload[academicprogram.id].academicprogram
                            }
                            type="text"
                            id="academicprogram"
                            className="block w-[810px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            onChange={(e) =>
                              handledOnchangeEdit(
                                e,
                                academicprogram.id,
                                "academicprogram",
                              )
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
                        </div>
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
                          handleSaveInformation(academicprogram.id)
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

export default ListAcademicProgramYear;
