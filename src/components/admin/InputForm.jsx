import { memo } from "react";

const InputForm = ({ text }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor=""
        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {text}
      </label>
      <input
        type=""
        id=""
        className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
        placeholder=""
      />
    </div>
  );
};

export default memo(InputForm);
