import Button from "./Button";

function HeaderAndInput({ lable, onClick }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <h1 className="text-[30px] font-semibold">{lable}</h1>
      <div className="">
        <Button
          text="Thêm mới"
          bgColor="bg-bg-button-add"
          textColor="text-[#16A34A]"
          justify
          onClick={onClick}
        />
      </div>
    </div>
  );
}

export default HeaderAndInput;
