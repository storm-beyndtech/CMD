import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import PartnerSidebar from "./PartnerSideBar";
import PartnerHeader from "./PartnerHeader";
import { navItemsPharmacy } from "../../lib/dashboardUtils";
import { contextData } from "../../context/AuthContext";
import PageLoader from "../PageLoader";

export default function PharmacyLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile, fetching } = contextData();

	// Show loading while fetching user or profile data
	if (fetching) return <PageLoader />;

	if (profile) {
		if (!profile.isRegistrationComplete) {
			return <Navigate to="/auth/partner/pharmacy/complete-reg" replace />;
		}
  } else {
    return <Navigate to="/auth/partner/pharmacy/complete-reg" replace />;
  }


  return (
    <div className="w-full h-screen flex bg-primary">
      {/* Fixed Header */}
      <PartnerHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Layout container */}
      <div className="max-ctn !max-w-[1150px] flex flex-1">
        {/* Fixed Sidebar */}
        <PartnerSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navItems={navItemsPharmacy}
        />

        {/* Scrollable Main content */}
        <main className="flex-1 overflow-y-auto no-scrollbar mt-24 sm:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
