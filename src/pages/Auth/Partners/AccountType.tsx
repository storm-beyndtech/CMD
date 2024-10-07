import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import checked from "../../../assets/icons/tick-circle.svg";
import { accountTypes } from "../../../lib/dashboardUtils";
import { useState } from "react";
import Btn from "../../../components/UI/Btn";
import { contextData } from "../../../context/AuthContext";
import PageLoader from "../../../components/PageLoader";

export default function AccountType() {
  const { profile, fetching, user } = contextData();
  const navigate = useNavigate()
  const [accountType, setAccountType] = useState("");

  if (fetching) return <PageLoader />;
  
  if (profile) {
    if (user.partnerType === "doctor") {
        return <Navigate to="/dashboard/partner/doctor/" replace />;
    }
  }

  const submitAccountType = async () => {
    if (accountType === "Doctor") {
      navigate("/dashboard/partner/doctor/")
    }
    if (accountType === "Lab") {
      navigate("/dashboard/partner/lab/")
    }
    if (accountType === "Pharmacy") {
      navigate("/dashboard/partner/pharmacy/")
    }
  }

  return (
    <div className="w-full min-h-screen bg-primary pb-10 px-5">
      <Link to="/">
        <img
          className="w-fit mx-auto pt-5 !max-sm:pb-0"
          alt="logo"
          src={logo}
        />
      </Link>

      <h2 className="text-3xl text-[#383E49] font-semibold mx-auto my-7 w-fit">
        Select Partner Type
      </h2>

      <div className="flex flex-wrap justify-center gap-10">
        {accountTypes.map((type, i) => (
          <div
            className={`w-full max-w-[350px] p-6 bg-white rounded-[14px] grid gap-3 border cursor-pointer ${
              accountType === type.title ? "border-secondary3" : "border-white"
            }`}
            key={i}
            onClick={() => setAccountType(type.title)}
          >
            <div className="relative w-full overflow-hidden rounded-xl">
              <img src={type.image} alt={type.title} className="w-full" />
              <div
                className={`${
                  accountType === type.title
                    ? "absolute top-0 left-0 z-2 w-full h-full bg-secondary3 opacity-30"
                    : ""
                }`}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-[#383E49]">{type.title}</h2>
              <img
                src={checked}
                alt="checked"
                className={`${accountType === type.title ? "block" : "hidden"}`}
              />
            </div>

            <p className="text-[#5D6679]">{type.desc}</p>
          </div>
        ))}
      </div>

      <div className="w-fit mt-20 mx-auto" onClick={submitAccountType}>
        <Btn label="Continue" type="primary"/>
      </div>
    </div>
  );
}
