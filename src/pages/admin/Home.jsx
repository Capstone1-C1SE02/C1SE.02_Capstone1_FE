import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const students = [
  {
    name: "Nguyễn Hữu Tuấn",
    id: "1",
    major: "Công nghệ thông tin",
    program: "Công nghệ phần mềm chuẩn CMU",
    classification: "Giỏi",
    graduationYear: "2024",
  },
  {
    name: "Nguyễn Hữu Tuấn",
    id: "2",
    major: "Công nghệ thông tin",
    program: "Công nghệ phần mềm chuẩn CMU",
    classification: "Giỏi",
    graduationYear: "2024",
  },
  {
    name: "Nguyễn Hữu Tuấn",
    id: "3",
    major: "Công nghệ thông tin",
    program: "Công nghệ phần mềm chuẩn CMU",
    classification: "Giỏi",
    graduationYear: "2024",
  },
  {
    name: "Nguyễn Hữu Tuấn",
    id: "4",
    major: "Công nghệ thông tin",
    program: "Công nghệ phần mềm chuẩn CMU",
    classification: "Giỏi",
    graduationYear: "2024",
  },
];

function Home() {
  const token = useSelector((state) => state.auth);
  const [showActionMenu, setShowActionMenu] = useState({
    studentId: null,
    isOpen: false,
  });

  const [addAction, showAddAction] = useState(false);
  const [editAction, showEditAction] = useState(false);
  const [deleteAction, showDeleteAction] = useState(false);

  const handleAddAction = () => {
    showAddAction(!addAction);
    console.log("ok 1");
  };

  const handleEditAction = () => {
    console.log("ok 2");
    showEditAction(!editAction);
  };

  const handleDeleteAction = () => {
    console.log("ok 3");
    showDeleteAction(!deleteAction);
  };

  const handleCloseAll = () => {
    showAddAction(false);
    showEditAction(false);
    showDeleteAction(false);
    console.log("ok 4");
  };

  const handleActionClick = (studentId) => {
    setShowActionMenu({ studentId, isOpen: !showActionMenu.isOpen });
  };

  return (
    <div className="relative mx-auto flex h-full w-full flex-col gap-[10px] bg-secondary">
      {/* {toast.success(`${token?.login?.currentUser?.message}`)} */}
      <ToastContainer />

      <h1 className="text-[30px] font-semibold">
        Danh sách sinh viên đã nhận bằng
      </h1>

      <div className="  h-full rounded-xl bg-table-bg">
        <div className="h-full p-[-60px]">
          <table
            className={`block h-40 min-h-[100%] w-full border-x-[30px] border-t-[30px] border-white ${window.innerWidth >= 1600 ? "overflow-x-hidden " : "overflow-x-scroll"} `}
          >
            <thead className=" w-full ">
              <tr className="block w-full text-left text-[12px] font-medium uppercase text-header-text">
                <th className=" min-w-[200px] px-4 py-2">Tên sinh viên</th>
                <th className=" min-w-[200px] px-4 py-2">Mã sinh viên</th>
                <th className=" min-w-[200px] px-4 py-2">Chuyên ngành</th>
                <th className=" min-w-[500px] px-4 py-2">
                  Chương trình đào tạo
                </th>
                <th className=" min-w-[200px] px-4 py-2">Xếp loại</th>
                <th className=" min-w-[200px] px-4 py-2">Năm tốt nghiệp</th>
                <th className=" min-w-[20px] px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className=" w-full   ">
              {students.map((student, index) => (
                <tr
                  key={student.id}
                  className="block border-gray-300 text-[14px] font-semibold hover:bg-gray-200"
                >
                  <td className="min-w-[200px] px-4 py-2">{student.name}</td>
                  <td className="min-w-[200px] px-4 py-2">{student.id}</td>
                  <td className="min-w-[200px] px-4 py-2">{student.major}</td>
                  <td className="min-w-[500px] px-4 py-2">{student.program}</td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.classification}
                  </td>
                  <td className="min-w-[200px] px-4 py-2">
                    {student.graduationYear}
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

export default Home;
