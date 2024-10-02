import { Link } from "react-router-dom";
import { howCmdWorksList } from "../lib/utils";
import Btn from "./UI/Btn";

export default function HowCmdWorks() {
  return (
    <section className="max-ctn py-[75px] flex flex-col gap-20">
      <div className="flex flex-col items-center text-center gap-[18px]">
        <h2 className="title">How CMD Rx Works</h2>
        <p className="desc max-w-[700px]">
          From personalized health assessments to exclusive access to
          world-class treatments, CMD simplifies your journey to optimal health
          in just a few easy steps
        </p>
      </div>

      {howCmdWorksList.map((step, i) => (
        <div className="even-flex gap-8 sm:gap-0" key={i}>
          <div key={i} className="w-full max-w-[610px] flex items-start gap-2.5 max-sm:flex-row-reverse">
            <div className="w-9 h-9 p-3 grid place-content-center rounded-full bg-secondary3 font-bold text-white">
              {i + 1}
            </div>
            <div>
              <h2 className="title sm:!text-[28px] !text-[20px] !leading-tight mb-2">
                {step.title}
              </h2>
              <p className="desc max-w-[500px]">{step.desc}</p>
            </div>
          </div>
          <img
            src={step.img}
            alt={step.title}
            className="w-[610px] rounded-[14px]"
          />
        </div>
      ))}

      <Link to="/auth/patient/register" className="grid place-content-center">
        <Btn type="primary" label="Become a Member" />
      </Link>
    </section>
  );
}
