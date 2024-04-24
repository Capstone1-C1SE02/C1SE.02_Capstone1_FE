import { Button } from "@/components/admin";
import React, { useEffect, useState } from "react";
import icon from "@/ultils/icon";
import { Label } from "@/components/admin";
import { HeaderAndInput } from "@/components/admin";
const { BsThreeDotsVertical, FaTimes } = icon;
import axiosConfig from "@/axiosConfig";

function DegreeInfomation() {
  // const [degreeinfomations, setDegreeinfomations] = useState([]);
  // useEffect(() => {
  //   async function fetchDegreeInfomationsData() {
  //     try {
  //       const response = await axiosConfig.get("/degreeinfomation");
  //       setDegreeinfomations(response.data);
  //     } catch (error) {
  //       console.error("Đã xảy ra lỗi khi lấy danh sách năm học:", error);
  //     }
  //   }
  //   fetchDegreeInfomationsData();
  // }, []);

  // console.log("DATA ", degreeinfomations);
  // const [showActionMenu, setShowActionMenu] = useState({
  //   degreeinfomationId: null,
  //   isOpen: false,
  // });

  // const [iddegreeinfomation, setIddegreeinfomation] = useState("");
  // const [addAction, showAddAction] = useState(false);
  // const [editAction, showEditAction] = useState(false);
  // const [deleteAction, showDeleteAction] = useState(false);
  // const [payload, setPayload] = useState({
  //   DegreeID: "",
  //   FirstName: "",
  //   LastName: "",
  //   ProgramName: "",
  //   Classification: "",
  //   SerialNumber: "",
  //   NumberInTheDegreeInfomation: "",
  //   YearOfGraduation: "",
  //   NumberOfGraduationDecision: "",
  //   YearOfGraduation: "",
  // });

  // const [objectPayload, setObjectPayload] = useState(() =>
  //   degreeinfomations.reduce((acc, degreeinfomation) => {
  //     acc[degreeinfomation.id] = {
  //       DegreeID: degreeinfomation.DegreeID,
  //       FirstName: degreeinfomation.FirstName,
  //       LastName: degreeinfomation.LastName,
  //       ProgramName: degreeinfomation.ProgramName,
  //       Classification: degreeinfomation.Classification,
  //       SerialNumber: degreeinfomation.SerialNumber,
  //       NumberInTheDegreeInfomation:
  //         degreeinfomation.NumberInTheDegreeInfomation,
  //       YearOfGraduation: degreeinfomation.YearOfGraduation,
  //       NumberOfGraduationDecision: degreeinfomation.NumberOfGraduationDecision,
  //       YearOfGraduation: degreeinfomation.YearOfGraduation,
  //     };
  //     return acc;
  //   }, {}),
  // );

  // //add
  // const handleAddANew = () => {
  //   console.log("paylod", payload);
  // };

  // const handleAddAction = () => {
  //   showAddAction(!addAction);
  //   console.log(addAction);
  // };

  // const handleEditAction = () => {
  //   showEditAction(!editAction);
  // };

  // const handleDeleteAction = () => {
  //   showDeleteAction(!deleteAction);
  // };

  // const handleCloseAll = () => {
  //   showAddAction(false);
  //   showEditAction(false);
  //   showDeleteAction(false);
  // };

  // const handleActionClick = (degreeinfomationId) => {
  //   setShowActionMenu({ degreeinfomationId, isOpen: !showActionMenu.isOpen });
  //   setIddegreeinfomation(degreeinfomationId);
  // };

  // const handledOnchangeEdit = (e, id, property) => {
  //   const newValue = e.target.value;
  //   setObjectPayload((pre) => ({
  //     ...pre,
  //     [id]: { ...pre[id], [property]: newValue },
  //   }));
  // };

  // // edit
  // const handleSaveInformation = (id) => {
  //   console.log("ok131", objectPayload[id]);
  // };
  return (
    <div className="relative mx-auto flex h-full w-full flex-col gap-[10px] bg-secondary">
      <HeaderAndInput lable={"Sổ cấp bằng"} onClick={handleAddAction} />

      <div className=" relative h-full rounded-xl bg-table-bg">
        <div className="h-full p-[-60px]">
          <table
            className={`block h-40 min-h-[100%] w-full border-[30px] border-white ${window.innerWidth >= 1600 ? "overflow-x-hidden " : "overflow-x-scroll"} `}
          >
            <thead className=" w-full ">
              <tr className="block w-full text-left text-[12px] font-medium uppercase text-header-text">
                <th className=" min-w-[200px] px-4 py-2">Tên sinh viên</th>
                <th className=" min-w-[300px] px-4 py-2">
                  Chương trình đào tạo
                </th>
                <th className=" min-w-[200px] px-4 py-2">Xếp loại</th>
                <th className=" min-w-[200px] px-4 py-2">Số hiệu bằng</th>
                <th className=" min-w-[200px] px-4 py-2">Sổ vào cấp bằng</th>
                <th className=" min-w-[200px] px-4 py-2">Năm tốt nghiệp</th>
                <th className=" min-w-[250px] px-4 py-2">
                  Số quyết định tốt nghiệp
                </th>
                <th className=" min-w-[200px] px-4 py-2">Ngày quyết định</th>
                <th className=" min-w-[20px] px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className=" w-full">
              {degreeinfomations.map((degreeinfomation, index) => (
                <tr
                  key={degreeinfomation.DegreeID}
                  className="block border-gray-300 text-[14px] font-semibold hover:bg-gray-200"
                >
                  <td className="min-w-[200px] px-4 py-2">
                    {degreeinfomation.degreeBook.student.LastName +
                      " " +
                      degreeinfomation.degreeBook.student.FirstName}
                  </td>
                  <td className="min-w-[300px] px-4 py-2">
                    {
                      degreeinfomation.degreeBook.student
                        .yearbasedacademicprogram.program.ProgramName
                    }
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {degreeinfomation.Classification}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {degreeinfomation.SerialNumber}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {degreeinfomation.degreeBook.NumberInTheDegreeBook}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {degreeinfomation.YearOfGraduation}
                  </td>
                  <td className="min-w-[250px] px-4 py-2">
                    {degreeinfomation.degreeBook.NumberOfGraduationDecision}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {degreeinfomation.YearOfGraduation}
                  </td>
                  <td
                    onClick={() => handleActionClick(degreeinfomation.id)}
                    className={`relative min-w-[10px] ${
                      showActionMenu.degreeinfomationId ===
                        degreeinfomation.id &&
                      showActionMenu.isOpen &&
                      "bg-custom-bg-notActive-nav"
                    } cursor-pointer rounded-[3px] px-2 `}
                  >
                    <BsThreeDotsVertical />
                    {showActionMenu.degreeinfomationId ===
                      degreeinfomation.id &&
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
        <div className="fixed left-0 right-0 top-[20px] z-20 m-auto h-[450px] w-[870px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">Sổ cấp bằng</h1>
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
                    id="FirstName"
                    className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                      <option value="T">Thường</option>
                      <option value="CMU">Chuẩn CMU</option>
                    </optgroup>
                  </select>
                </div>{" "}
              </div>
              <div className="mb-[10px] flex gap-[30px]">
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">Xếp loại:</label>
                  <input
                    type="text"
                    id="Classification"
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
                    Số hiệu bằng:
                  </label>
                  <input
                    type="text"
                    id="SerialNumber"
                    className="block  w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        [e.target.id]: e.target.value,
                      }))
                    }
                  ></input>
                </div>{" "}
                <div className="flex flex-col gap-[5px]">
                  <label className="text-[16px] font-normal">
                    Sổ vào số cấp bằng:
                  </label>
                  <input
                    type="text"
                    id="NumberInTheDegreeInfomation"
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
                    Năm tốt nghiệp:
                  </label>
                  <input
                    type="text"
                    id="YearOfGraduation"
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
                    Sổ quyết định tốt nghiệp:
                  </label>
                  <input
                    type="text"
                    id="NumberOfGraduationDecision"
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
                    Ngày quyết định:
                  </label>
                  <input
                    type="text"
                    id="YearOfGraduation"
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
        <div className="fixed left-0 right-0 top-[20px] z-20 m-auto h-[450px] w-[870px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">Sổ cấp bằng</h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleEditAction} />
              </div>
            </div>

            {degreeinfomations.map(
              (degreeinfomation, index) =>
                showActionMenu.degreeinfomationId === degreeinfomation.id && (
                  <div
                    key={degreeinfomation.id}
                    className="border-t-[1px] border-border-body-form py-[20px]"
                  >
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Tên sinh viên:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[degreeinfomation.id].username
                          }
                          type="text"
                          id="username"
                          className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              degreeinfomation.id,
                              "username",
                            )
                          }
                        />
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Chương trình đào tạo:
                        </label>
                        <select
                          defaultValue={
                            objectPayload[degreeinfomation.id].academicprogram
                          }
                          type="text"
                          id="academicprogram"
                          className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              degreeinfomation.id,
                              "academicprogram",
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
                          Xếp loại:
                        </label>
                        <input
                          defaultValue={
                            objectPayload[degreeinfomation.id].classification
                          }
                          type="text"
                          id="classification"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              degreeinfomation.id,
                              "classification",
                            )
                          }
                        />
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Số hiệu bằng:
                        </label>
                        <input
                          type="text"
                          id="numerical"
                          className="block  w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          defaultValue={
                            objectPayload[degreeinfomation.id].numerical
                          }
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              degreeinfomation.id,
                              "numerical",
                            )
                          }
                        />
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Sổ vào số cấp bằng:
                        </label>
                        <input
                          type="text"
                          id="DegreeInfomation"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          defaultValue={
                            objectPayload[degreeinfomation.id].DegreeInfomation
                          }
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              degreeinfomation.id,
                              "DegreeInfomation",
                            )
                          }
                        />
                      </div>{" "}
                    </div>
                    <div className="mb-[10px] flex gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Năm tốt nghiệp:
                        </label>
                        <input
                          type="text"
                          id="graduationyear"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          defaultValue={
                            objectPayload[degreeinfomation.id].graduationyear
                          }
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              degreeinfomation.id,
                              "graduationyear",
                            )
                          }
                        />
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Sổ quyết định tốt nghiệp:
                        </label>
                        <input
                          type="text"
                          id="numbergraduationdecisions"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          defaultValue={
                            objectPayload[degreeinfomation.id]
                              .numbergraduationdecisions
                          }
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              degreeinfomation.id,
                              "numbergraduationdecisions",
                            )
                          }
                        />
                      </div>{" "}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Ngày quyết định:
                        </label>
                        <input
                          type="text"
                          id="yearAdecisiondaydmission"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          defaultValue={
                            objectPayload[degreeinfomation.id].decisionday
                          }
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              degreeinfomation.id,
                              "decisionday",
                            )
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
                        onClick={(e) =>
                          handleSaveInformation(degreeinfomation.id)
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
                onClick={(e) => alert("xoá sinh viên mã", iddegreeinfomation)}
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

export default DegreeInfomation;
