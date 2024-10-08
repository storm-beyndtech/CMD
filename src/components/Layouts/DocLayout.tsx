import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import PartnerSidebar from "./PartnerSideBar";
import PartnerHeader from "./PartnerHeader";
import { navItemsDoctor } from "../../lib/dashboardUtils";
import { contextData } from "../../context/AuthContext";
import PageLoader from "../PageLoader";

export default function DocLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const { profile, fetching } = contextData(); // Fetch profile from context

	// Show loading while fetching user or profile data
	if (fetching) return <PageLoader />;

	if (!profile) return <Navigate to="/auth/partner/accountType" replace />;
	if (!profile.isRegistrationComplete) return <Navigate to="/auth/partner/doctor/complete-reg" replace />;

	if (!profile.isAccountSetupComplete) return <Navigate to="/auth/partner/doctor/account-setup" replace />;

	return (
		<div className="w-full h-screen flex bg-primary">
			{/* Fixed Header */}
			<PartnerHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			{/* Layout container */}
			<div className="max-ctn !max-w-[1150px] flex flex-1">
				{/* Fixed Sidebar */}
				<PartnerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} navItems={navItemsDoctor} />

				{/* Scrollable Main content */}
				<main className="flex-1 overflow-y-auto no-scrollbar mt-24 sm:p-4">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
