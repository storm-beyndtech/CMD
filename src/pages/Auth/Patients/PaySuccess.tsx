import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import CardAlert from "../../../components/CardAlert";

export default function PaySuccess() {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [btnLabel, setBtnLabel] = useState("");
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const type = searchParams.get("type");

    switch (type) {
      case "prescription":
        setSuccess(true);
        setTitle("Your payment has been confirmed");
        setMessage(
          `Congratulations! Your purchase was successful. 
          Please check your inbox for any info regarding your purchase`,
        );
        setBtnLabel("Continue");
        break;
      case "package":
        setSuccess(true);
        setTitle("Your payment has been confirmed");
        setMessage(
          `Congratulations! Your purchase was successful. 
          Please check your inbox for any info regarding your purchase`,
        );
        setBtnLabel("Continue");
        break;
      default:
    }
  }, [searchParams]);

  const handleNavigate = () => {
    const type = searchParams.get("type");

    if (type === "prescription") {
      navigate("/dashboard/patient");
    } else {
      navigate("/auth/patient/HRA");
    }
  };

  return (
    <div className="w-full h-screen bg-primary">
      <Link to="/">
        <img className="w-[150px] mx-auto mt-5" alt="logo" src={logo} />
      </Link>

      <div className="w-full h-[80%] grid place-content-center">
        <CardAlert
          title={title}
          desc={message}
          btnAction={handleNavigate}
          btnLabel={btnLabel}
          success={success}
          icon
        />
      </div>
    </div>
  );
}
