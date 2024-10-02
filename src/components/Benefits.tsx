import { benefitsList } from "../lib/utils";
import tick from "../assets/icons/tick.svg";
import Btn from "./UI/Btn";
import { Link } from "react-router-dom";

export default function Benefits() {
  return (
    <section className="max-ctn py-[75px] flex flex-col gap-10 items-center" id="membership">
      <div className="w-full flex justify-between flex-wrap gap-y-16">
        {benefitsList.map((benefit, i) => (
          <div key={i} className="max-w-[580px] flex flex-col sm:gap-10 gap-7">
            <img
              src={benefit.img}
              alt={benefit.title}
              className="rounded-[14px]"
            />
            <h2 className="title sm:!text-[38px] sm:!leading-[45.6px]">
              {benefit.title}
            </h2>
            <p className="desc">{benefit.desc}</p>

            <div className="flex flex-col">
              {benefit.keyPoints.map((keyPoint, i) => (
                <div key={i} className="flex gap-3.5 py-3">
                  <img src={tick} alt="tick" />
                  <p className="text-[17px] text-[#383E49] font-medium leading-[25.5px]">
                    {keyPoint}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Link to="/auth/patient/register">
        <Btn type="primary" label="Become a Member"/>
      </Link>
    </section>
  );
}
