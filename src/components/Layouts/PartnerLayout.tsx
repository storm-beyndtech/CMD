import { useState } from "react";
import { Outlet } from "react-router-dom";
import PartnerSidebar from "./PartnerSideBar";
import PartnerHeader from "./PartnerHeader";

export default function PartnerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full h-screen flex bg-primary">
      {/* Fixed Header */}
      <PartnerHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Layout container */}
      <div className="max-ctn !max-w-[1150px] flex flex-1">
        {/* Fixed Sidebar */}
        <PartnerSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Scrollable Main content */}
        <main className="flex-1 overflow-y-auto no-scrollbar mt-24 sm:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
