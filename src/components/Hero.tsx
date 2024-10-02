import { Link } from "react-router-dom";
import { sponsorsHero as sponsors } from "../lib/utils";
import Btn from "./UI/Btn";
import arrDown from "../assets/icons/arrow-down.svg";
import doctorsIMG from "../assets/drs-hero.svg";

export default function Hero() {
  return (
    <section
      className="w-full bg-contain bg-no-repeat bg-right max-sm:bg-none"
      id="heroSection"
      style={{ backgroundImage: `url(${doctorsIMG})` }}
    >
      <div className="max-ctn h-svh max-sm:h-fit flex items-center max-sm:bg-white py-[60px]">
        <div className="w-full max-w-[580px] h-full bg-white flex items-center">
          <div className="w-full max-w-[580px] flex flex-col max-sm:gap-[16px] gap-11">
            <h1 className="text-[54px] max-sm:text-[32px] max-sm:leading-[40px] leading-[67.5px] text-[#2B2F38] font-semibold">
              Redefining Premium Healthcare Solutions
            </h1>
            <p className="text-lg text-[#5D6679] max-sm:text-sm leading-[22.5px] max-sm:max-w-72">
              Your gateway to exclusive, personalized health solutions, premium
              drugs, and elite medical care
            </p>

            <div className="flex items-center gap-4 max-sm:my-3">
              <Link to="/auth/patient/register">
                <Btn type="primary" label="Become a Member" />
              </Link>

              <Link
                to="#members"
                className="flex items-center gap-1.5 text-secondary font-semibold"
              >
                Learn More
                <img src={arrDown} alt="partners" />
              </Link>
            </div>
            <div className="w-full flex items-center justify-between">
              {sponsors.map((sponsor, i) => (
                <img key={i} src={sponsor.src} alt="partners" className="max-sm:w-[18%]"/>
              ))}
            </div>
          </div>
        </div>
      </div>

      <img src={doctorsIMG} alt="heroBg" className="w-full hidden max-sm:flex"/>
    </section>
  );
}
