function FormField({ label, id, value, setValue, type = "text", image }) {
  return (
    <div className="flex items-center gap-[30px]">
      <label htmlFor={id} className="w-[200px] text-right font-[500]">
        {label}
      </label>
      {image ? (
        <div className="flex flex-grow items-center gap-[30px]">
          <input
            type={type}
            name={id}
            id={id}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-grow rounded-md border border-[#AEB8C2] p-[10px] text-[16px] leading-none focus:outline-none focus:ring-2 focus:ring-[#607180] focus:ring-opacity-50"
          />
          <img
            className="flex h-[100%] w-[150px] rounded-md border border-[#5B6B79] object-cover"
            src={image}
            alt="Captcha"
          />
        </div>
      ) : (
        <input
          type={type}
          name={id}
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-grow rounded-md border border-[#AEB8C2] p-[10px] text-[16px] leading-none focus:outline-none focus:ring-2 focus:ring-[#607180] focus:ring-opacity-50"
        />
      )}
    </div>
  );
}

export default FormField;
