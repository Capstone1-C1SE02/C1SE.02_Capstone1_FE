import Header from "@/components/user/Header";
import SideBar from "@/components/user/SideBar";

function DefaultLayoutUser({ children }) {
  return (
    <div className="flex min-h-[100vh] justify-center bg-[--primaryBackgroundColor] p-[30px]">
      <div className="flex w-[1170px] flex-col gap-[30px]">
        <Header />
        <main className="flex min-h-min flex-col gap-[20px] rounded-[20px] bg-white p-[30px]">
          <h1 className="text-[30px] font-bold">Tra cứu thông tin văn bằng</h1>
          <div className="flex flex-grow items-center gap-[30px]">
            <SideBar />
            <div className="h-[100%] w-[3px] rounded-full bg-[--primaryBackgroundColor]" />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DefaultLayoutUser;
