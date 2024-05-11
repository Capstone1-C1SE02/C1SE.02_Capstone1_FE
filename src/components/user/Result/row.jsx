function Row({ children }) {
  return (
    <div className="flex w-full flex-col items-center gap-4 lg:flex-row lg:gap-0">
      {children}
    </div>
  );
}

export default Row;
