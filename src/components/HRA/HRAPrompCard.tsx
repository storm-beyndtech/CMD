import risk from "../../assets/appointment/risk.svg";
import searchIcon from "../../assets/appointment/search-zoom-in.svg";
import lightIcon from "../../assets/appointment/direct-right.svg";
import activityIcon from "../../assets/appointment/activity.svg";
import Btn from "../UI/Btn";
import { Dispatch, SetStateAction } from "react";

export default function HRAPromptCard({btnAction}: { btnAction: Dispatch<SetStateAction<number>>}) {
  return (
    <div className="w-full grid place-content-center">
      <div className="w-full max-w-[542px] bg-white grid gap-5 rounded-2xl py-8 px-8 shadow-lg shadow-[#eaeaeaa6]">
        <img src={risk} alt="icon" />
        <h2 className="text-2xl font-semibold text-[#383E49] leading-[33.6px]">
          Get your Health Risk Assessment with a Specialist Virtually
        </h2>
        <p className="text-[#5D6679] leading-[24px]">
          Take a health risk assessment with one of our specialists nearby so we
          can evaluate your health, identify potential risks, and offer
          personalised recommendations just for you.
        </p>

        <div className="grid gap-5 py-4">
          <div className="flex items-center gap-3">
            <img src={searchIcon} alt="search" />
            <p>Detect issues before they become serious</p>
          </div>
          <div className="flex items-center gap-3">
            <img src={lightIcon} alt="light" />
            <p>Tailored recommendations for your health profile</p>
          </div>
          <div className="flex items-center gap-3">
            <img src={activityIcon} alt="activity" />
            <p>Make informed decisions and track your progress</p>
          </div>
        </div>

        <div onClick={() => btnAction(2)} className="w-full flex">
          <Btn label={"Book Appointment"} type="small" form icon />
        </div>
      </div>
    </div>
  );
}
