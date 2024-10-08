import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import CardAlert from "../../components/CardAlert";

export default function CardApplicationSuccess() {
  const navigate = useNavigate();

  const handleNavigate = () => {
      navigate("/dashboard/patient/");
  };

  return (
    <div className="w-full h-screen bg-primary">
      <Link to="/">
        <img className="w-[150px] mx-auto mt-5" alt="logo" src={logo} />
      </Link>

      <div className="w-full h-[80%] grid place-content-center">
        <CardAlert
          title="New Card Request Confirmed"
          desc="Thank you for your request. You will be contacted as soon as your new card is processed and on its way."
          btnAction={handleNavigate}
          btnLabel="Back to Dashboard"
          success={true}
          icon
        />
      </div>
    </div>
  );
}
