import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { navItemsPatient } from "../../lib/dashboardUtils";
import { contextData } from "../../context/AuthContext";
import PageLoader from "../PageLoader";
import PatientHeader from "./PatientHeader";
import PatientSidebar from "./PatientSidebar";

export default function PatientLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const { user, fetching } = contextData(); // Fetch profile from context

	// Show loading while fetching user or profile data
	if (fetching) return <PageLoader />;

	if (!user.isCompletedProfile) {
		return <Navigate to="/auth/patient/update-profile" replace />;
	}

	if (!user.isHRABooked) {
		return <Navigate to="/auth/patient/HRA" replace />;
	}

	return (
		<div className="w-full h-screen flex bg-primary">
			{/* Fixed Header */}
			<PatientHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			{/* Layout container */}
			<div className="max-ctn !max-w-[1150px] flex flex-1">
				{/* Fixed Sidebar */}
				<PatientSidebar
					sidebarOpen={sidebarOpen}
					setSidebarOpen={setSidebarOpen}
					navItems={navItemsPatient}
				/>

				{/* Scrollable Main content */}
				<main className="flex-1 overflow-y-auto no-scrollbar mt-24 sm:p-4">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
