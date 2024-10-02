import { Link } from "react-router-dom";
import { experts, expertsKeyPoints } from "../lib/utils";
import Btn from "./UI/Btn";
import badge from "../assets/icons/badge.svg";

export default function HealthExperts() {
  return (
    <section className="max-ctn py-[75px] flex justify-between flex-wrap gap-y-16">
      <div className="w-full max-w-[530px] flex flex-col gap-14">
        <div className="flex flex-col gap-10">
          <h2 className="title sm:max-w-96 sm:!leading-[54.6px] !leading-[40px] max-w-72">
            Backed by Leading Health Experts
          </h2>
          <p className="desc">
            Our solutions are backed by a distinguished network of global health
            professionals, including board-certified physicians, renowned
            specialists, and top-tier pharmacists. Every step of your healthcare
            journey is overseen by experts who are committed to providing the
            best possible care
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {expertsKeyPoints.map((point, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <img src={point.icon} alt={point.title} />
              <div>
                <p className="font-semibold text-[17px] text-[#2B2F38] mb-1">
                  {point.title}
                </p>
                <p className="text-[#5D6679]">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-secondary font-medium leading-[25.6px]">
            Looking to bring your expertise to our platform?
          </p>
          <Link to="/auth/partner/register">
            <Btn type="primary" label="Become a Partner" />
          </Link>
        </div>
      </div>

      <div className="w-full sm:max-w-[678px] grid grid-cols-2 gap-x-8 gap-y-16 max-md:gap-x-4 max-md:gap-y-10">
        {experts.map((expert, i) => (
          <div key={i} className="w-full sm:max-w-[325px] flex flex-col gap-2">
            <img
              src={expert.img}
              alt={expert.name}
              className="w-full rounded-[10px]"
            />
            <p className="text-base sm:text-xl font-semibold text-[#2B2F38]">
              {expert.name}
            </p>
            <p className="text-xs sm:text-base text-[#483380]">
              {expert.position}
            </p>
            <div className="flex items-start gap-1">
              <img src={badge} alt="badge" width={22.5} />
              <p className="text-[#5D6679] text-xs sm:text-base">{expert.hospitals}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
