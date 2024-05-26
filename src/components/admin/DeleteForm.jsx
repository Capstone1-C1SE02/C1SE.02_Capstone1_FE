import React from "react";
import icon from "@/ultils/icon";
const { FaTimes } = icon;
import { Button } from "./index";

const DeleteForm = ({ text, handleDeleteAction, handleDelete }) => {
  return (
    <div className="animation fixed left-0 right-0 top-[30%] z-20 m-auto h-[298px] w-[870px] bg-[white]">
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
          <Button text={"Huỷ"} justify text16 onClick={handleDeleteAction} />
          <Button
            text={"Xoá"}
            bgHover
            textHover
            justify
            text16
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteForm;
