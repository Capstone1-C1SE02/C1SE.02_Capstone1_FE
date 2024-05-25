import React, { useState } from "react";
import icon from "@/ultils/icon";
const { FaTimes } = icon;
import { Button } from "./index";

const ImportFile = ({
  text,
  handleImportAction,
  handleImport,
  onFileSelect,
}) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      onFileSelect(selectedFile);
    } else {
      setFileName("");
      selectedFile(null);
    }
  };
  return (
    <div className="fixed left-0 right-0 top-[28%] z-20 m-auto h-[298px] w-[870px] bg-[white]">
      <div className="m-[30px]">
        <div className="m mb-[20px] flex justify-between">
          <h1 className="text-[30px] font-semibold">{text}</h1>
          <div className="m-[4px] h-[16px] w-[16px] cursor-pointer text-[24px]">
            <FaTimes onClick={handleImportAction} />
          </div>
        </div>
        <div className="my-[20px] rounded-[10px] border-y-[1px] border-border-body-form p-[20px] ">
          <div className="flex items-center gap-10">
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <span className="flex h-10 w-[680px] items-center rounded-xl border-[0.5px] border-solid border-[#94A3B8] px-[10px]">
              {fileName ? fileName : ""}
            </span>
            <label
              htmlFor="fileInput"
              className="flex w-1/5 cursor-pointer justify-center rounded-md border px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Chọn file
            </label>
          </div>
        </div>
        <div className="mt-[30px] flex justify-end gap-[20px]">
          <Button text={"Huỷ"} justify text16 onClick={handleImportAction} />
          <Button
            text={"Truyền"}
            bgHover
            textHover
            justify
            text16
            onClick={handleImport}
          />
        </div>
      </div>
    </div>
  );
};

export default ImportFile;
