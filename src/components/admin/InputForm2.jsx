import { memo } from "react";

const InputForm2 = ({
  text,
  setValue,
  keyObject,
  typeInput,
  invalidFields,
  setInvalidFields,
  w22,
  w1,
  w12,
}) => {
  return (
    <div className="flex flex-col gap-[5px]">
      <label htmlFor="" className="text-[16px] font-normal">
        {text}
      </label>
      <input
        type={typeInput ? `${typeInput}` : ""}
        className={`block ${w1 ? "w-[810px]" : w12 ? "w-[530px]" : w22 ? "w-[390px]" : "w-[250px]"} rounded-[10px] border-[1px] border-border-input px-3 py-2 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500`}
        onChange={(e) =>
          setValue((pre) => ({ ...pre, [keyObject]: e.target.value }))
        }
        onFocus={() => setInvalidFields("")}
      />
      {invalidFields.length > 0 &&
        invalidFields.some((item) => item.name === keyObject) && (
          <small className="italic text-red-500">
            {invalidFields.find((i) => i.name === keyObject)?.message}
          </small>
        )}
    </div>
  );
};

export default memo(InputForm2);
