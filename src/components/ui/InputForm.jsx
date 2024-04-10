import { memo } from "react";

const InputForm = ({ text}) => {
    return (
            <div className="mb-4">
                    <label htmlFor="" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {text}
                    </label>
                    <input type="" id="" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="" />
            </div>
        
    )
}

export default memo(InputForm);
