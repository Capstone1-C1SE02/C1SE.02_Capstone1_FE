import Header from "@/components/user/Header";

function RootLayoutUser({ children }) {
  return (
    <div className="flex min-h-[100vh] justify-center bg-[--primaryBackgroundColor] p-8">
      <div className="flex w-full flex-col gap-8 md:w-[768px] lg:w-[1024px] xl:w-[1280px]">
        <Header />
        <main className="flex min-h-min flex-col gap-5 rounded-3xl bg-white p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default RootLayoutUser;
