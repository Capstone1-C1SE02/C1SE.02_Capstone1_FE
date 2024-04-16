import { memo } from "react";

const Button = ({
  text,
  bgColor,
  textColor,
  justify,
  text16,
  onClick,
  wFull,
}) => {
  return (
    <button
      className={`flex h-[30px] w-[100px] items-center ${justify && "justify-center"} ${bgColor} ${textColor} rounded-[5px] border-[1px] border-border-input px-[5px] text-left ${text16 ? "text-[16px]" : "text-[12px]"}   font-semibold ${wFull && "w-full"}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default memo(Button);
