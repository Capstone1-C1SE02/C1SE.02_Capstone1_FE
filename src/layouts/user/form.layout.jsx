import SideBar from "@/components/user/SideBar";
import RootLayoutUser from "@/layouts/user/root.layout";

function FormLayoutUser({ children }) {
  return (
    <RootLayoutUser>
      <h1 className="text-[30px] font-bold">Tra cứu thông tin văn bằng</h1>
      <div className="flex items-center gap-[30px]">
        <SideBar />
        <div className="h-[100%] w-[3px] flex-shrink-0 rounded-full bg-[--primaryBackgroundColor]" />
        {children}
      </div>
    </RootLayoutUser>
  );
}

export default FormLayoutUser;
