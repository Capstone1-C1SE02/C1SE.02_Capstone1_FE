import React from "react";
import Header from "@/components/admin/Header";
import Nav from "@/components/admin/Nav";

function adminLayout({ children }) {
  return (
    <div className="flex w-full">
      <div className="h-screen w-1/5 bg-secondary">
        <Nav />
      </div>

      <div className="flex w-4/5 flex-col">
        <div className="h-screen w-full">
          <Header />
        </div>
        <div className="w-4/5 bg-blue-200">{children}</div>
      </div>
    </div>
  );
}

export default adminLayout;
