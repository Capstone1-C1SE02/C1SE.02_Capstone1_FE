function Item({ label, value, size }) {
  return (
    <div className="flex w-full flex-grow items-center gap-[30px]">
      <p
        className={`${size === "large" ? "w-[370px] text-left" : "w-[200px] text-right"} flex-shrink-0 text-[18px] font-[600]`}
      >
        {label}
      </p>
      <p className="flex-grow text-[18px]">{value}</p>
    </div>
  );
}

export default Item;
