import Header from "@/components/user/Header";

function DefaultLayoutUser({ children }) {
  return (
    <div className="flex h-[100vh] justify-center bg-[--primaryBackgroundColor] p-[30px]">
      <div className="flex w-[1170px] flex-col gap-[30px]">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default DefaultLayoutUser;
