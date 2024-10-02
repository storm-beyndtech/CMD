import { Link } from "react-router-dom";
import { packages } from "../lib/utils";
import Btn from "./UI/Btn";

export default function Packages() {


  return (
    <div className="max-ctn mx-auto py-6 !px-0">
      <div className="flex flex-col lg:flex-row">
        <div className="font-semibold hidden xl:grid place-content-end justify-start pb-[90px] px-10 gap-16 lg:w-1/4 pr-8 text-[#2B2F38] bg-white">
          <p>Number of Users</p>
          <p>Orientation</p>
          <p>Basic Investigation</p>
          <p>Monthly CareCredit</p>
          <p>Elective Medical Practices</p>
          <p>Access to Medical Care</p>
        </div>

        {/* Loop through Packages */}
        <div className="flex flex-wrap w-full xl:w-3/4 justify-center lg:justify-start gap-y-5">
          {packages.map((plan) => (
            <div
              key={plan.name}
              className="border rounded-lg p-6 w-full lg:w-[33.3%] bg-white flex flex-col justify-even gap-6"
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">{plan.name}</h2>
                  <p className="text-secondary3 font-bold text-xl flex flex-col gap-1">
                    ${plan.price}{" "}
                    <span className="text-xs text-[#5D6679] font-normal">
                      Per Year
                    </span>
                  </p>
                </div>

                <p className="text-[15px] leading-[22.5px] h-16">
                  {plan.description}
                </p>
              </div>

              <Link to="/auth/patient/payment">
                <Btn label="Select Plan" type="primary" form />
              </Link>

              <div className="leading-[21.6px] text-[#48505E]">
                <p className="subscribeList">{plan.users}</p>
                <p className="subscribeList">{plan.orientation}</p>
                <p className="subscribeList">{plan.basicInvestigation}</p>
                <p className="subscribeList">{plan.monthlyCareCredit}</p>
                <p className="subscribeList">{plan.electiveMedicalPractices}</p>
                <p className="subscribeList">{plan.accessToMedicalCare}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
