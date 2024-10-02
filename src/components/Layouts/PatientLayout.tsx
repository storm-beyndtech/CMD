import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function PatientLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full h-screen flex bg-primary">
      {/* Fixed Header */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Layout container */}
      <div className="max-ctn !max-w-[1150px] flex flex-1">
        {/* Fixed Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Scrollable Main content */}
        <main className="flex-1 overflow-y-auto no-scrollbar mt-24 sm:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
