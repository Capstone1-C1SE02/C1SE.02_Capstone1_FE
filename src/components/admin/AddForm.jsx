import React from "react";
import icon from "@/ultils/icon";
const { BsThreeDotsVertical, FaTimes } = icon;
import { Button } from "./index";

const AddForm = ({ handleAddAction, handleAddNew, setPayload }) => {
  return (
    <div className="fixed left-0 right-0 top-[20px] z-20 m-auto h-[300px] w-[460px] rounded-[10px] bg-[white]">
      <div className="m-[30px]">
        <div className="m mb-[20px] flex justify-between">
          <h1 className="text-[30px] font-semibold">Năm học</h1>
          <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
            <FaTimes onClick={handleAddAction} />
          </div>
        </div>

        <div className="border-y-[1px] border-border-body-form py-[20px]">
          <div className="flex h-[100px] gap-[30px]">
            <div className="flex flex-col gap-[5px]">
              <label className="text-[16px] font-normal">Năm học:</label>
              <input
                id="Year"
                className="block w-[390px] rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                type="text"
                onChange={(e) =>
                  setPayload((pre) => ({
                    ...pre,
                    [e.target.id]: e.target.value,
                  }))
                }
              />
            </div>
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
          <Button text={"Thêm mới"} justify text16 onClick={handleAddNew} />
        </div>
      </div>
    </div>
  );
};

export default AddForm;
