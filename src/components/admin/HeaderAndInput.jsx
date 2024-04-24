import Button from "./Button";

function HeaderAndInput({ lable, onClick }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <h1 className="text-[30px] font-semibold">{lable}</h1>
      <div className="">
        <Button text="Thêm mới" justify onClick={onClick} />
      </div>
    </div>
  );
}

export default HeaderAndInput;
