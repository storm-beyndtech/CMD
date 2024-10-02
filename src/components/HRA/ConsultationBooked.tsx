import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import CardAlert from "../CardAlert";

export default function ConsultationsBooked() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // Handle navigation logic
    navigate("/dashboard/patient");
  };

  return (
    <div className="w-full h-screen bg-primary">
      <img src={logo} alt="Logo" className="mx-auto pt-5" />

      <div className="w-full h-[80%] grid place-content-center">
        <CardAlert
          title="HRA Appointment Booked"
          desc="Your Health Risk Assessment Appointment has been booked successfully"
          btnAction={handleNavigate}
          btnLabel="Proceed to dashboard"
          icon
          success
        />
      </div>
    </div>
  );
}
