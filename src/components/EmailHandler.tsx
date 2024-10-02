import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/logo.svg";
import CardAlert from "./CardAlert";

export default function EmailHandler() {
  const [message, setMessage] = useState("");
  const [isVerified, setIsVerified] = useState<null | boolean>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifiedParam = searchParams.get("verified");

    switch (verifiedParam) {
      case "true":
        setIsVerified(true);
        setMessage("Your email has been verified. Thank you!");
        break;
      case "false":
        setIsVerified(false);
        setMessage(
          "Please check your email inbox and verify your email to complete registration.",
        );
        break;
      default:
        setIsVerified(null);
        setMessage(
          "To complete your registration, please check your inbox for a confirmation email from CMD Health Systems.",
        );
        break;
    }
  }, [searchParams]);

  const handleOpenEmailApp = () => {
    navigate("/verify-email?verified=true");
  };

  const handleNavigate = () => {
    navigate("/auth/patient/login");
  };

  const handleNavigate2 = () => {
    navigate("/verify-email?verified=false");
  };

  return (
    <div className="w-full h-screen bg-primary">
      <Link to="/">
        <img className="w-[150px] mx-auto mt-5" alt="logo" src={logo} />
      </Link>

      <div className="w-full h-[80%] grid place-content-center">
        {isVerified === null && (
          <CardAlert
            title="Confirm Your Email Address"
            desc={message}
            btnAction={handleOpenEmailApp}
            btnLabel="Open Mail"
          />
        )}

        {isVerified === true && (
          <CardAlert
            title="Email Address Confirmed"
            desc={message}
            btnAction={handleNavigate2}
            btnLabel="Proceed to Setup"
            icon
            success
          />
        )}

        {isVerified === false && (
          <CardAlert
            title="Email Verification Failed"
            desc={message}
            btnAction={handleNavigate}
            btnLabel="Send Verification Mail"
          />
        )}
      </div>
    </div>
  );
}
