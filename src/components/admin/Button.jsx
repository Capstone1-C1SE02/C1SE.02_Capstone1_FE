import { memo } from "react";

const Button = ({ text, bgColor, textColor }) => {
  return (
    <button className={`h-[25px] w-[90px] ${bgColor} rounded`}>{text}</button>
  );
};

export default memo(Button);
