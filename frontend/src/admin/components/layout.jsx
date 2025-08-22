import React from "react";
import { Link, Outlet, useMatch } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";

export default function LayoutDashboard({isAdmin = true}) {
  const isManagerPreviewPage = useMatch('/manager/courses/:id/preview')
  const isStudentPreviewPage = useMatch('/student/detail-course/:id')

  return (
    <>
      {isManagerPreviewPage !== null || isStudentPreviewPage !== null ? (
        <Outlet />
      ) : (
        <div className="flex min-h-screen">
          <Sidebar/>
          <main className="flex flex-col flex-1 gap-[30px] p-[30px] ml-[290px]">
            <Header />
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
}