import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import GetCard from "../../../components/GetCard";
import OnboardingProgress from "../../../components/OnboardingProgress";
import Packages from "../../../components/Packages";

export default function Subscribe() {
  return (
    <div className="w-full min-h-screen bg-primary pb-10 px-5">
      <Link to="/">
        <img
          className="w-[150px] mx-auto pt-5 !max-sm:pb-0"
          alt="logo"
          src={logo}
        />
      </Link>
      <OnboardingProgress stage="3" />

      <div className="w-full grid place-content-center">
        <h2 className="title sm:!text-[22px] !text-xl text-center mb-7">
          Activate Your Account
        </h2>

        <Packages />
        <GetCard />
      </div>
    </div>
  );
}
