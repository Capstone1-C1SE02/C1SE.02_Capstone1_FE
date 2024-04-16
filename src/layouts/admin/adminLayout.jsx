import React, { useEffect, useState } from "react";
import Header from "@/components/admin/Header";
import Nav from "@/components/admin/Nav";
import { Label } from "@/components/admin";

function adminLayout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  const handleOnClick = () => {
    setShowNav(!showNav);
    setShowLabel(!showLabel);
  };

  return (
    <div className="flex h-screen w-full overflow-y-hidden">
      <div className="flex w-full ">
        <div
          className={`fixed z-30 ${showNav ? "" : "hidden"} h-full w-[400px] bg-secondary`}
        >
          <Nav onClick={handleOnClick} />
        </div>

        <div className="relative max-h-[100vh] w-full">
          <div className="relative h-[100vh]">
            <div>
              <Header onClickShowNav={handleOnClick} />
            </div>
            <div className="h-[92%] bg-secondary px-6 pb-6">{children}</div>
          </div>
        </div>
      </div>

      {/* label */}
      {showLabel && (
        <div>
          <Label onClick={handleOnClick} />
        </div>
      )}
    </div>
  );
}

export default adminLayout;
