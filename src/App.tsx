import { Route, Routes, Navigate } from "react-router-dom";
// Importing pages
import PageLoader from "./components/PageLoader";
import PatientAuth from "./pages/Auth/Patients/PatientAuth";

// Layouts
import Home from "./pages/Home";
import PartnerAuth from "./pages/Auth/Partners/PartnerAuth";
import EmailHandler from "./components/EmailHandler";
import PatientUpdateProfile from "./pages/Auth/Patients/PatientUpdateProfile";
import Subscribe from "./pages/Auth/Patients/Subscribe";
import PatientProfile from "./pages/PatientDashboard/PatientProfile";
import ManageCards from "./pages/PatientDashboard/ManageCards";
import PatientMedications from "./pages/PatientDashboard/PatientMedications";
import PatientHome from "./pages/PatientDashboard/PatientHome";
import Payment from "./pages/Auth/Patients/Payment";
import FirstHRA from "./pages/Auth/Patients/FirstHRA";
import PatientConsultations from "./pages/PatientDashboard/PatientConsultations";
import Checkout from "./pages/PatientDashboard/Checkout";
import ConsultationsBooked from "./components/HRA/ConsultationBooked";
import AccountType from "./pages/Auth/Partners/AccountType";
import DocConsultations from "./pages/DocDashboard/DocConsultations";
import PaySuccess from "./pages/Auth/Patients/PaySuccess";
import { contextData } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import PartnersProfile from "./components/PartnersProfile";
import CompleteRegDoc from "./pages/Auth/Doctor/CompleteRegDoc";
import AccountSetupDoc from "./pages/Auth/Doctor/AccountSetupDoc";
import DocHome from "./pages/DocDashboard/DocHome";
import PatientInCare from "./pages/DocDashboard/PatientInCare";
import DocSchedulePage from "./pages/DocDashboard/DocSchedulePage";
import CompletePharmacyReg from "./pages/Auth/Pharmacy/CompletePharmacyReg";
import PatientLayout from "./components/Layouts/PatientLayout";
import DocLayout from "./components/Layouts/DocLayout";
import CompleteLabReg from "./pages/Auth/Lab/CompleteLabReg";
import PharmacyLayout from "./components/Layouts/PharmacyLayout";
import PharmacyHome from "./pages/PharmacyDashboard/PharmacyHome";
import LabLayout from "./components/Layouts/LabLayout";
import LabHome from "./pages/LabDashboard/LabHome";
import AppointmentDetails from "./pages/LabDashboard/AppointmentDetails";
import LabProfile from "./pages/LabDashboard/LabProfile";
import LabAppointments from "./pages/LabDashboard/LabAppointments";
import NewLabAppointments from "./pages/LabDashboard/NewLabAppointments";
import PharmacyOrders from "./pages/PharmacyDashboard/PharmacyOrders";
import PharmacyInventory from "./pages/PharmacyDashboard/PharmacyInventory";
import PharmacyProfile from "./pages/PharmacyDashboard/PharmacyProfile";
import CardApplication from "./pages/CardManagement/CardApplication";
import CardApplicationSuccess from "./pages/CardManagement/CardApplicationSuccess";
import RequestNewCard from "./pages/CardManagement/RequestNewCard";
import DeactivateCard from "./pages/CardManagement/DeactivateCard";

// Main App Component
export default function App() {
	const { fetching } = contextData(); // Get user context

	// Loading screen while fetching user data
	if (fetching) return <PageLoader />;

	return (
		<Routes>
			{/* Public routes */}
			<Route path="/" element={<Home />} />
			<Route path="/checkout" element={<Checkout />} />
			<Route path="/card-application" element={<CardApplication />} />
			<Route path="/card-application-success" element={<CardApplicationSuccess />} />
			<Route path="/request-new-card" element={<RequestNewCard />} />
			<Route path="/deactivate-card" element={<DeactivateCard />} />

			{/* Patient auth routes */}
			<Route path="/auth/patient/:action" element={<PatientAuth />} />
			<Route path="/verify-email" element={<EmailHandler />} />
			<Route path="/auth/patient/update-profile" element={<PatientUpdateProfile />} />
			<Route path="/auth/patient/package" element={<Subscribe />} />
			<Route path="/auth/patient/payment" element={<Payment />} />
			<Route path="/payment-message" element={<PaySuccess />} />
			<Route path="/auth/patient/HRA" element={<FirstHRA />} />
			<Route path="/auth/patient/HRA/success" element={<ConsultationsBooked />} />

			{/*    --    --   --   --  */}
			{/*Members Dashboard routes (Protected)  */}
			{/*    --    --   --   --  */}

			<Route
				path="/dashboard/patient"
				element={
					<PrivateRoute>
						<PatientLayout />
					</PrivateRoute>
				}
			>
				<Route index element={<PatientHome />} />
				<Route path="/dashboard/patient/medications" element={<PatientMedications />} />
				<Route path="/dashboard/patient/cards" element={<ManageCards />} />
				<Route path="/dashboard/patient/consultations" element={<PatientConsultations />} />
				<Route path="/dashboard/patient/consultations/:id" element={<PatientConsultations />} />
				<Route path="/dashboard/patient/profile" element={<PatientProfile />} />
				<Route path="/dashboard/patient/checkout" element={<Checkout />} />
				<Route path="*" element={<Navigate to="/dashboard/patient" />} />
			</Route>

			{/*    --    --   --   --  */}
			{/* Doctor Dashboard routes (Protected) */}
			{/*    --    --   --   --  */}

			<Route
				path="/dashboard/partner/doctor"
				element={
					<PrivateRoute>
						<DocLayout />
					</PrivateRoute>
				}
			>
				<Route index element={<DocHome />} />
				<Route path="/dashboard/partner/doctor/consultations" element={<DocConsultations />} />
				<Route path="/dashboard/partner/doctor/consultation/:id" element={<PatientInCare />} />
				<Route path="/dashboard/partner/doctor/schedule" element={<DocSchedulePage />} />
				<Route path="/dashboard/partner/doctor/profile" element={<PartnersProfile />} />
			</Route>

			{/*    --    --   --   --  */}
			{/* Pharmacy Dashboard routes (Protected) */}
			{/*    --    --   --   --  */}

			<Route
				path="/dashboard/partner/pharmacy"
				element={
					<PrivateRoute>
						<PharmacyLayout />
					</PrivateRoute>
				}
			>
        <Route index element={<PharmacyHome />} />
        <Route path="/dashboard/partner/pharmacy/orders" element={<PharmacyOrders />} />
        <Route path="/dashboard/partner/pharmacy/inventory" element={<PharmacyInventory />} />
        <Route path="/dashboard/partner/pharmacy/profile" element={<PharmacyProfile />} />
			</Route>

			{/*    --    --   --   --  */}
			{/* Pharmacy Dashboard routes (Protected) */}
			{/*    --    --   --   --  */}

			<Route
				path="/dashboard/partner/lab"
				element={
					<PrivateRoute>
						<LabLayout />
					</PrivateRoute>
				}
			>
				<Route index element={<LabHome />} />
				<Route path="/dashboard/partner/lab/appointments" element={<LabAppointments />} />
				<Route path="/dashboard/partner/lab/new-appointments" element={<NewLabAppointments />} />
				<Route path="/dashboard/partner/lab/appointment/:id" element={<AppointmentDetails />} />
				<Route path="/dashboard/partner/lab/profile" element={<LabProfile />} />
			</Route>

			{/*    --    --   --   --  */}
			{/* Partner auth routes */}
			{/*    --    --   --   --  */}

			<Route path="/auth/partner/:action" element={<PartnerAuth />} />
			<Route path="/auth/partner/accountType" element={<AccountType />} />
			<Route path="/auth/partner/doctor/complete-reg" element={<CompleteRegDoc />} />
			<Route path="/auth/partner/doctor/account-setup" element={<AccountSetupDoc />} />
			<Route path="/auth/partner/pharmacy/complete-reg" element={<CompletePharmacyReg />} />
			<Route path="/auth/partner/lab/complete-reg" element={<CompleteLabReg />} />

			{/*    --    --   --   --  */}
			{/* Catch-all for undefined routes */}
			{/*    --    --   --   --  */}

			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
}
