function FormField({ label, id, value, setValue, type = "text", image }) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-7 xl:gap-8">
      <label
        htmlFor={id}
        className="flex-shrink-0 font-[500] md:w-[150px] md:text-right lg:w-[200px]"
      >
        {label}
      </label>
      {image ? (
        <div className="flex flex-grow flex-wrap justify-end gap-4 md:gap-7 xl:items-center">
          <input
            type={type}
            name={id}
            id={id}
            value={value}
            onChange={(e) => setValue(e.target.value.toUpperCase())}
            className="flex-grow rounded-md border border-[#AEB8C2] p-2 text-[16px] leading-none focus:outline-none focus:ring-2 focus:ring-[#607180] focus:ring-opacity-50 lg:w-[100px] lg:p-3"
          />
          <img
            className="flex h-[46px] rounded-md border border-[#5B6B79] object-cover lg:w-[150px] lg:flex-shrink-0 xl:ml-[10px] xl:mr-[10px] xl:cursor-pointer xl:rounded-[10px] xl:border-[#AEB8C2] xl:object-contain xl:object-center xl:shadow-md"
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
          className="flex-grow rounded-md border border-[#AEB8C2] p-2 text-[16px] leading-none focus:outline-none focus:ring-2 focus:ring-[#607180] focus:ring-opacity-50 lg:p-3"
        />
      )}
    </div>
  );
}

export default FormField;
