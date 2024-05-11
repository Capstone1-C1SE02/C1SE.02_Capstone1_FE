import Button from "./Button";

function HeaderAndInput({ lable, onClick, onClickImportFile }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <h1 className="text-[30px] font-semibold">{lable}</h1>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button text="Thêm mới" justify onClick={onClick} />
          <Button text="Import File" justify onClick={onClickImportFile} />
        </div>
        <div>
          <button className="mr-2 text-[12px] font-semibold">Tìm kiếm</button>
          <input
            type="text"
            className="px-1 py-1 text-[13px] font-light"
            placeholder="Nhập mã sinh viên để tìm kiếm"
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderAndInput;
