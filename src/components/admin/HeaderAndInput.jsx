import Button from "./Button";
import icon from "@/ultils/icon";
import { useState } from "react";
const { FaRegWindowClose, FaWindowClose } = icon;

function HeaderAndInput({
  lable,
  onClick,
  onClickImportFile,
  placeholder,
  buttonClick,
  valueSearch,
  setvalueSearch,
  endSearch,
}) {
  const handleChang = (e) => {
    setvalueSearch(e.target.value);
  };

  const clearInput = () => {
    setvalueSearch("");
  };
  return (
    <div className="flex flex-col gap-[10px] ">
      <h1 className="text-[30px] font-semibold">{lable}</h1>
      <div className="mb-[10px] flex h-[25px] justify-between">
        <div className="flex gap-2">
          <Button text="Thêm mới" justify onClick={onClick} />
          {onClickImportFile && (
            <Button text="Import File" justify onClick={onClickImportFile} />
          )}
        </div>
        <div className="ml-4 flex items-center gap-2">
          <button
            onClick={buttonClick}
            className="p-3 text-[14px] font-semibold"
          >
            Tìm kiếm
          </button>
          <input
            type="text"
            className="border-black-300 h-[24px] w-[400px] border-2 p-3 text-[16px] font-light"
            onChange={(e) => handleChang(e)}
            value={valueSearch}
            placeholder={placeholder}
          />
          <div onClick={clearInput}>
            <FaWindowClose size={24} onClick={endSearch} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderAndInput;
