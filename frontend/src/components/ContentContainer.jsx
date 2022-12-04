import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

function ContentContainer() {
  return (
    <div className="secondary-app-color px-12 h-40 content-container min-height-without-heading">
      <SideBar />
      <div className=" bg-slate-3005 secondary-app-color mx-auto min-h-full relative pb-6">
        <Outlet />
      </div>
    </div>
  );
}

export default ContentContainer;
