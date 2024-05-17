import Button from "./Button";

function HeaderAndInput({ lable, onClick, onClickImportFile, placeholder }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <h1 className="text-[30px] font-semibold">{lable}</h1>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button text="Thêm mới" justify onClick={onClick} />
          {onClickImportFile && (
            <Button text="Import File" justify onClick={onClickImportFile} />
          )}
        </div>
        <div className="mx-4">
          <button className="p-3 text-[14px] font-semibold">Tìm kiếm</button>
          <input
            type="text"
            className="border-black-300 w-[400px] border-2 p-3 text-[16px] font-light"
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderAndInput;
