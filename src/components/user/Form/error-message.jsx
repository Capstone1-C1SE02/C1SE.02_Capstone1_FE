import { BiSolidError } from "react-icons/bi";

function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="flex max-h-9 items-center gap-1 rounded-md bg-[--backgroundColorActive] px-3 py-2">
      <BiSolidError className="text-[24px] text-primary-0.9" />
      <p className="text-[16px] text-primary-0.9">{message}</p>
    </div>
  );
}

export default ErrorMessage;
