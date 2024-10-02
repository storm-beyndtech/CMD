import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import CardAlert, { AlertProps } from "./CardAlert";

export default function AlertPageModal({
  success,
  error,
  title,
  desc,
  icon,
  btnLabel,
}: AlertProps) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // Handle navigation logic
    navigate("/auth/patient/consultation");
  };

  return (
    <div className="w-full h-screen bg-primary absolute top-0 left-0 z-[10000]">
      <Link to="/" className="w-[150px] mx-auto pt-5">
        <img className="w-full" alt="logo" src={logo} />
      </Link>

      <div className="w-full h-[80%] grid place-content-center">
          <CardAlert
          title={title}
          desc={desc}
          btnAction={handleNavigate}
          btnLabel={btnLabel}
          icon={icon}
          error={error}
          success={success}
          />
      </div>
    </div>
  );
}
