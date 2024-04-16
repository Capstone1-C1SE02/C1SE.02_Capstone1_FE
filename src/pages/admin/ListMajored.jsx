import { Button } from "@/components/admin";
import React, { useEffect, useState } from "react";
import icon from "@/ultils/icon";
import { Label } from "@/components/admin";
import { HeaderAndInput } from "@/components/admin";
const { BsThreeDotsVertical, FaTimes } = icon;
const majors = [
  {
    id: "7480103",
    major: "Kỹ thuật phần mềm (Đạt kiểm định ABET)",
  },
  {
    id: "7480104",
    major: "Kỹ thuật phần mềm (Đạt kiểm định ABET)",
  },
  {
    id: "7480105",
    major: "Kỹ thuật phần mềm (Đạt kiểm định ABET)",
  },
];

function ListMajored() {
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
    major: "",
  });

  const [objectPayload, setObjectPayload] = useState(() =>
    majors.reduce((acc, major) => {
      acc[major.id] = {
        id: year.id,
        major: year.major,
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
      <HeaderAndInput lable={"Danh sách ngành học"} onClick={handleAddAction} />
      <div className=" relative h-full rounded-xl bg-table-bg">
        <div className="h-full p-[-60px]">
          <table
            className={`relative block h-40 min-h-[100%] w-full border-[30px] border-white ${window.innerWidth >= 1600 ? "overflow-x-hidden " : "overflow-x-scroll"} `}
          >
            <thead className="flex w-full flex-col ">
              <tr className=" w-full text-left text-[12px] font-medium uppercase text-header-text">
                <th className=" min-w-full px-4 py-2">Mã ngành</th>
                <th className=" min-w-full px-4 py-2">Năm học</th>
                <th className=" min-w-[20px] px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="flex w-full flex-col ">
              {years.map((year, index) => (
                <tr
                  key={year.id}
                  className="relative flex items-center justify-between border-gray-300 text-[14px] font-semibold hover:bg-gray-200 "
                >
                  <td className="w-[1200px] px-4 py-2">{year.year}</td>
                  <td
                    onClick={() => handleActionClick(year.id)}
                    className={`relative right-0 min-w-[10px] ${
                      showActionMenu.studentId === year.id &&
                      showActionMenu.isOpen &&
                      "bg-custom-bg-notActive-nav"
                    } cursor-pointer rounded-[3px] px-2 `}
                  >
                    <BsThreeDotsVertical />
                    {showActionMenu.studentId === year.id &&
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
    </div>
  );
}

export default ListMajored;
