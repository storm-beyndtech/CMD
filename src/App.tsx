import { Route, Routes, Navigate } from "react-router-dom";
// Importing pages
import PageLoader from "./components/PageLoader";
import PasswordReset from "./pages/Auth/PasswordReset";
import PatientAuth from "./pages/Auth/Patients/PatientAuth";

// Layouts
import PatientLayout from "./components/Layouts/PatientLayout";
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
import PartnerLayout from "./components/Layouts/PartnerLayout";
// import PartnerHome from "./pages/PartnerDashboard/PartnerHome";
import DocConsultations from "./pages/DoctorsDashboard/DocConsultations";
import PaySuccess from "./pages/Auth/Patients/PaySuccess";
import { contextData } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import PartnersProfile from "./components/PartnersProfile";
import CompleteRegDoc from "./pages/Auth/Doctor/CompleteRegDoc";
import AccountSetupDoc from "./pages/Auth/Doctor/AccountSetupDoc";
import DoctorsHome from "./pages/DoctorsDashboard/DoctorsHome";
import PatientInCare from "./pages/DoctorsDashboard/PatientInCare";
import DocSchedulePage from "./pages/DoctorsDashboard/DocSchedulePage";

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
      <Route path="/auth/password-reset" element={<PasswordReset />} />
      <Route path="/auth/password-reset/:page" element={<PasswordReset />} />

      {/* Patient auth routes */}
      <Route path="/auth/patient/:action" element={<PatientAuth />} />
      <Route path="/verify-email" element={<EmailHandler />} />
      <Route
        path="/auth/patient/update-profile"
        element={<PatientUpdateProfile />}
      />
      <Route path="/auth/patient/package" element={<Subscribe />} />
      <Route path="/auth/patient/payment" element={<Payment />} />
      <Route path="/payment-message" element={<PaySuccess />} />
      <Route path="/auth/patient/HRA" element={<FirstHRA />} />
      <Route
        path="/auth/patient/HRA/success"
        element={<ConsultationsBooked />}
      />

      {/* Dashboard routes (Protected) */}
      <Route
        path="/dashboard/patient"
        element={
          <PrivateRoute>
            <PatientLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<PatientHome />} />
        <Route
          path="/dashboard/patient/medications"
          element={<PatientMedications />}
        />
        <Route path="/dashboard/patient/cards" element={<ManageCards />} />
        <Route
          path="/dashboard/patient/consultations"
          element={<PatientConsultations />}
        />
        <Route
          path="/dashboard/patient/consultations/:id"
          element={<PatientConsultations />}
        />
        <Route path="/dashboard/patient/profile" element={<PatientProfile />} />
        <Route path="/dashboard/patient/checkout" element={<Checkout />} />
        {/* Catch-all for undefined dashboard routes */}
        <Route path="*" element={<Navigate to="/dashboard/patient" />} />
      </Route>

      {/* Partner Dashboard routes (Protected) */}
      <Route
        path="/dashboard/partner/doctor"
        element={
          <PrivateRoute>
            <PartnerLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<DoctorsHome />} />
        <Route
          path="/dashboard/partner/doctor/consultations"
          element={<DocConsultations />}
        />
        <Route
          path="/dashboard/partner/doctor/consultations/patient-in-care/:id"
          element={<PatientInCare />}
        />
        <Route
          path="/dashboard/partner/doctor/schedule"
          element={<DocSchedulePage />}
        />
        <Route
          path="/dashboard/partner/doctor/profile"
          element={<PartnersProfile />}
        />
      </Route>

      {/* Partner auth routes */}
      <Route path="/auth/partner/:action" element={<PartnerAuth />} />
      <Route path="/auth/partner/accountType" element={<AccountType />} />
      <Route
        path="/auth/partner/doctor/complete-reg"
        element={<CompleteRegDoc />}
      />
      <Route
        path="/auth/partner/doctor/account-setup"
        element={<AccountSetupDoc />}
      />

      {/* Catch-all for undefined routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

