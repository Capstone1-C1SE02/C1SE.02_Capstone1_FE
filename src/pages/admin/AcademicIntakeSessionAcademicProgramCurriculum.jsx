import React, { useEffect, useState } from "react";
import icon from "@/ultils/icon";
import {
  Button,
  Label,
  HeaderAndInput,
  DeleteForm,
  FooterPage,
  SelectForm,
  TransferListForProYear,
} from "@/components/admin";
import {
  Curiculum,
  AcademicProgram,
  Academicintakesession,
} from "@/components/dropList";
const { BsThreeDotsVertical, FaTimes } = icon;
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "@/axiosConfig";
import { addAcademicInTakeCessionAcademicProgramCurriculum } from "@/redux/apiRequestAdd";
import { deleleAcademicInTakeCessionAcademicProgramCurriculum } from "@/redux/apiRequestDelete";
import { editAcademicInTakeCessionAcademicProgramCurriculum } from "@/redux/apiRequestEdit";
import Swal from "sweetalert2";

function AcademicIntakeSessionAcademicProgramCurriculum() {
  const dispatch = useDispatch();
  const [render, setRender] = useState(0);
  const [curiculum, setCuriculum] = useState();
  const [academicProgram, setAcademicProgram] = useState();
  const [academicintakesession, setAcademicintakesession] = useState();
  const [page, setPage] = useState(1);
  const [panigationData, setPanigationData] = useState({
    count: "",
    page: "",
  });

  const statuses = [
    { id: 0, value: true, status: "ĐÃ HOÀN THÀNH" },
    { id: 1, value: false, status: "ĐANG" },
  ];
  const [YBAPData, setYBAPData] = useState([]);
  useEffect(() => {
    async function fetchYBAPData() {
      try {
        const response = await axiosConfig.get(
          `/academicintakesessionacademicprogramcurriculum?page=${page}`,
        );
        setYBAPData(response.data.results.data);
        setPanigationData({
          count: response.data.count,
          page: response.data.total_pages,
        });
      } catch (error) {
        console.error(
          "Đã xảy ra lỗi khi lấy danh sách chương trình học theo năm:",
          error,
        );
      }
    }
    fetchYBAPData();
  }, [render, page]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const academicProgram = await AcademicProgram();
        const curriculum = await Curiculum();
        const academicintakesession = await Academicintakesession();

        setCuriculum(curriculum.data.results.data);
        setAcademicProgram(academicProgram.data.data);
        setAcademicintakesession(academicintakesession.data.results.data);
        console.log(academicintakesession);
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
  const [studentTransferList, setStudentTransferList] = useState([]);
  const [payload, setPayload] = useState({
    ACADEMIC_INTAKE_SESSION_ID: "",
    ACADEMIC_PROGRAM_ID: "",
    STATUS_NAME: "",
  });
  const setPayloadAction = () => {
    setPayload({
      ACADEMIC_INTAKE_SESSION_ID: "",
      ACADEMIC_PROGRAM_ID: "",
      STATUS_NAME: "",
    });
  };

  const [objectPayload, setObjectPayload] = useState();

  useEffect(() => {
    setObjectPayload(
      YBAPData.reduce((acc, academicprogram) => {
        acc[academicprogram.id] = {
          ACADEMIC_INTAKE_SESSION_ID:
            academicprogram.ACADEMIC_INTAKE_SESSION_ID,
          ACADEMIC_PROGRAM_ID: academicprogram.ACADEMIC_PROGRAM_ID,
          CURRICULUM_ID: academicprogram.CURRICULUM_ID,
          STATUS_NAME: academicprogram.STATUS_NAME,
        };
        return acc;
      }, {}),
    );
  }, [YBAPData]);

  const [invalidFields, setInvalidFields] = useState([]);
  const validate = (payload) => {
    let invalids = 0;
    let fields = Object.entries(payload);
    fields.forEach((item, index) => {
      if (item[1] === "") {
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
    if (showAlert) {
      if (errorAdd) {
        Swal.fire("Thông báo", "Thêm khoá đào tạo thất bại", "error");
      } else if (!errorAdd) {
        Swal.fire("Thông báo", "Thêm khoá đào tạo thành công", "success");
      }
      setShowAlert(false);
    }
  }, [count.countAdd]);
  useEffect(() => {
    if (showAlert) {
      if (errorEdit) {
        Swal.fire("Thông báo", "Sửa khoá đào tạo thất bại", "error");
      } else if (!errorEdit) {
        Swal.fire("Thông báo", "Sửa khoá đào tạo thành công", "success");
      }
      setShowAlert(false);
    }
  }, [count.countEdit]);
  useEffect(() => {
    if (showAlert) {
      if (errorDelete) {
        Swal.fire("Thông báo", "Xoá khoá đào tạo thất bại", "error");
      } else if (!errorDelete) {
        Swal.fire("Thông báo", "Xoá khoá đào tạo thành công", "success");
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
    for (let i = 0; i < studentTransferList.length; i++) {
      const updatePayload = {
        ...payload,
        CURRICULUM_ID: studentTransferList[i]["CURRICULUM_ID"],
      };
      console.log(updatePayload);

      await addAcademicInTakeCessionAcademicProgramCurriculum(
        updatePayload,
        dispatch,
      );
    }

    setCount((pre) => ({ ...pre, countAdd: pre.countAdd + 1 }));
    showAddAction(!addAction);
    setRender(render + 1);
    setPayloadAction();
    setShowAlert(true);
  };

  // edit
  const handleSaveInformation = async (id) => {
    const valid = validate(objectPayload[id]);
    if (valid > 0) {
      return;
    }
    await editAcademicInTakeCessionAcademicProgramCurriculum(
      objectPayload[id],
      id,
      dispatch,
    );
    setCount((pre) => ({ ...pre, countEdit: pre.countEdit + 1 }));
    showEditAction(!editAction);
    setRender(render + 1);
    setShowAlert(true);
  };

  //delete
  const handleDelete = async () => {
    await deleleAcademicInTakeCessionAcademicProgramCurriculum(
      showActionMenu.studentId,
      dispatch,
    );
    showDeleteAction(!deleteAction);
    setRender(render + 1);
    setShowAlert(true);
    setCount((pre) => ({ ...pre, countDelete: pre.countDelete + 1 }));
    showEditAction(false);
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

  const showDeleteEdit = () => {
    showDeleteAction(!deleteAction);
    showEditAction(!editAction);
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

  const showViewEdit = (id) => {
    setShowActionMenu({ studentId: id });
    handleEditAction();
  };
  return (
    <div className="relative mx-auto flex h-full w-full flex-col gap-[10px] bg-backLayout">
      <HeaderAndInput
        placeholder={"Nhập tên chuyên ngành đào tạo để tìm kiếm"}
        lable={
          "Thông tin về chương trình đào tạo và khóa học cung cấp trong kỳ tuyển sinh"
        }
        onClick={handleAddAction}
      />
      <div className=" relative h-[84%] rounded-xl bg-table-bg">
        <div className="h-full p-[-60px]">
          <table
            className={`relative block h-40 min-h-[100%] w-full border-l-[30px] border-t-[30px] border-white ${window.innerWidth >= 1600 ? "overflow-x-hidden " : "overflow-x-scroll"} `}
          >
            <thead className="flex w-full flex-col ">
              <tr className=" flex w-full items-center justify-between text-left text-[12px] font-medium uppercase text-header-text">
                <th className=" min-w-[300px] px-4 py-2">Tên kỳ tuyển sinh</th>
                <th className=" min-w-[300px] px-4 py-2">
                  Chương trình đào tạo
                </th>
                <th className=" min-w-[300px] px-4 py-2">
                  Tên chuyên ngành đào tạo
                </th>
                <th className=" min-w-[300px] px-4 py-2">Trạng thái</th>
                <th className=" min-w-[20px] px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="flex w-full flex-col ">
              {YBAPData?.map((YBAP) => (
                <tr
                  key={YBAP.id}
                  className="relative flex items-center justify-between border-gray-300 text-[14px] font-semibold hover:bg-gray-200 "
                  onClick={() => showViewEdit(YBAP.id)}
                >
                  <td className="min-w-[300px] px-4 py-2">
                    {academicintakesession?.map(
                      (item) =>
                        item.ACADEMIC_INTAKE_SESSION_ID ===
                          YBAP.ACADEMIC_INTAKE_SESSION_ID &&
                        `${item.ACADEMIC_INTAKE_SESSION_NAME}`,
                    )}
                  </td>
                  <td className="min-w-[300px] px-4 py-2">
                    {curiculum?.map(
                      (item) =>
                        item.CURRICULUM_ID === YBAP.CURRICULUM_ID &&
                        `${item.CURRICULUM_NAME}`,
                    )}
                  </td>
                  <td className="min-w-[300px] px-4 py-2">
                    {" "}
                    {academicProgram?.map(
                      (item) =>
                        item.ACADEMIC_PROGRAM_ID === YBAP.ACADEMIC_PROGRAM_ID &&
                        `${item.ACADEMIC_PROGRAM_NAME}`,
                    )}
                  </td>
                  <td className="min-w-[300px] px-4 py-2">
                    {YBAP.STATUS_NAME == 1 ? "ĐANG MỞ" : "ĐÃ HOÀN THÀNH"}
                  </td>
                  <td
                    onClick={() => handleActionClick(YBAP.id)}
                    className={`relative right-0 flex h-[39px] min-w-[10px] items-center ${
                      showActionMenu.studentId === YBAP.id &&
                      showActionMenu.isOpen &&
                      "bg-custom-bg-notActive-nav"
                    } cursor-pointer rounded-[3px] px-2 `}
                  >
                    <BsThreeDotsVertical />
                    {showActionMenu.studentId === YBAP.id &&
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
      <div className="fixed bottom-2 w-full">
        <div className="flex justify-center">
          <FooterPage
            count={panigationData.page}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
      {/* add form */}
      {addAction && (
        <div className="animation fixed left-0 right-0 top-[18%] z-20 m-auto h-[780px] w-[1290px] rounded-[10px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">
                Thông tin về chương trình đào tạo và khóa học cung cấp trong kỳ
                tuyển sinh
              </h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleAddAction} />
              </div>
            </div>

            <div className="border-y-[1px] border-border-body-form py-[20px]">
              <div className="flex h-[100px] gap-[30px]">
                <SelectForm
                  text={"Tên kỳ tuyển sinh:"}
                  setValue={setPayload}
                  keyObject={"ACADEMIC_INTAKE_SESSION_ID"}
                  setInvalidFields={setInvalidFields}
                  dataAPI={academicintakesession}
                  dataValue={"ACADEMIC_INTAKE_SESSION_ID"}
                  dataName={"ACADEMIC_INTAKE_SESSION_NAME"}
                  w22
                  invalidFields={invalidFields}
                />
                <SelectForm
                  text={"Chuyên ngành đào tạo:"}
                  setValue={setPayload}
                  keyObject={"ACADEMIC_PROGRAM_ID"}
                  setInvalidFields={setInvalidFields}
                  dataAPI={academicProgram}
                  dataValue={"ACADEMIC_PROGRAM_ID"}
                  dataName={"ACADEMIC_PROGRAM_NAME"}
                  w22
                  invalidFields={invalidFields}
                />
                <SelectForm
                  text={"Trạng thái:"}
                  setValue={setPayload}
                  keyObject={"STATUS_NAME"}
                  setInvalidFields={setInvalidFields}
                  dataNoAPI={statuses}
                  w22
                  invalidFields={invalidFields}
                />
              </div>
              <div>
                <TransferListForProYear
                  onRightListChange={(rightList) =>
                    setStudentTransferList(rightList)
                  }
                />
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
        <div className="animation fixed left-0 right-0 top-[18%] z-20 m-auto h-[460px] w-[870px] rounded-[10px] bg-[white]">
          <div className="m-[30px]">
            <div className="m mb-[20px] flex justify-between">
              <h1 className="text-[30px] font-semibold">
                Thông tin về chương trình đào tạo và khóa học cung cấp trong kỳ
                tuyển sinh
              </h1>
              <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
                <FaTimes onClick={handleEditAction} />
              </div>
            </div>

            {YBAPData.map(
              (academicprogram) =>
                showActionMenu.studentId === academicprogram.id && (
                  <div
                    key={academicprogram.id}
                    className="border-t-[1px] border-border-body-form py-[20px]"
                  >
                    <div className="flex h-[100px] gap-[30px]">
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Tên kỳ tuyển sinh:
                        </label>
                        <select
                          defaultValue={
                            objectPayload[academicprogram.id]
                              .ACADEMIC_INTAKE_SESSION_ID
                          }
                          type="text"
                          id="ACADEMIC_INTAKE_SESSION_ID"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              academicprogram.id,
                              "ACADEMIC_INTAKE_SESSION_ID",
                            )
                          }
                        >
                          <option hidden></option>
                          {academicintakesession?.map((item) => (
                            <option
                              key={item.ACADEMIC_INTAKE_SESSION_ID}
                              value={item.ACADEMIC_INTAKE_SESSION_ID}
                            >
                              {`${item.ACADEMIC_INTAKE_SESSION_NAME} `}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Tên chuyên ngành đào tạo:
                        </label>
                        <select
                          defaultValue={
                            objectPayload[academicprogram.id]
                              .ACADEMIC_PROGRAM_ID
                          }
                          type="text"
                          id="ACADEMIC_PROGRAM_ID"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              academicprogram.id,
                              "ACADEMIC_PROGRAM_ID",
                            )
                          }
                        >
                          <option hidden></option>
                          {academicProgram?.map((item) => (
                            <option
                              key={item.ACADEMIC_PROGRAM_ID}
                              value={item.ACADEMIC_PROGRAM_ID}
                            >
                              {item.ACADEMIC_PROGRAM_NAME}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[16px] font-normal">
                          Trạng thái:
                        </label>
                        <select
                          defaultValue={
                            objectPayload[academicprogram.id].STATUS_NAME
                          }
                          type="text"
                          id="STATUS_NAME"
                          className="block w-[250px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          onChange={(e) =>
                            handledOnchangeEdit(
                              e,
                              academicprogram.id,
                              "STATUS_NAME",
                            )
                          }
                        >
                          <option hidden></option>
                          {statuses.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex h-[100px] gap-[30px]">
                      <div className="flex h-[100px] gap-[30px]">
                        <div className="flex flex-col gap-[5px]">
                          <label className="text-[16px] font-normal">
                            Chương trình đào tạo:
                          </label>
                          <select
                            defaultValue={
                              objectPayload[academicprogram.id].CURRICULUM_ID
                            }
                            type="text"
                            id="CURRICULUM_ID"
                            className="block w-[810px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            onChange={(e) =>
                              handledOnchangeEdit(
                                e,
                                academicprogram.id,
                                "CURRICULUM_ID",
                              )
                            }
                          >
                            <option hidden></option>
                            {curiculum?.map((item) => (
                              <option
                                key={item.CURRICULUM_ID}
                                value={item.CURRICULUM_ID}
                              >
                                {item.CURRICULUM_NAME}
                              </option>
                            ))}
                          </select>
                        </div>
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
                          handleSaveInformation(academicprogram.id)
                        }
                      />
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
      {(addAction || editAction || deleteAction) && (
        <div>
          <Label onClick={handleCloseAll} />
        </div>
      )}
    </div>
  );
}

export default AcademicIntakeSessionAcademicProgramCurriculum;
