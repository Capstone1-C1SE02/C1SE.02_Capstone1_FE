import { cn } from "@/lib/utils";

function Item({ label, value, size }) {
  return (
    <div className="flex flex-grow items-center gap-2 lg:w-full lg:gap-8">
      <p
        className={cn(
          "w-[200px] flex-shrink-0 text-left text-[18px] font-[600] md:w-[300px] lg:w-[200px] lg:text-right",
          {
            "tex lg:w-[370px] lg:text-left": size === "large",
          },
        )}
      >
        {label}
      </p>
      <p className="w-[200px] text-[18px] md:w-[200px] lg:flex-grow">{value}</p>
    </div>
  );
}

export default Item;
