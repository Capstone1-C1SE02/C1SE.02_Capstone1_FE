import { memo } from "react";

const InputForm = ({
  text,
  setValue,
  keyObject,
  typeInput,
  invalidFields,
  setInvalidFields,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor=""
        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {text}
      </label>
      <input
        type={typeInput ? `${typeInput}` : ""}
        id=""
        className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
        placeholder=""
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

export default memo(InputForm);
