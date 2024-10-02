import { Link } from "react-router-dom";
import mailIcon from "../../assets/icons/mail.svg";
import phoneIcon from "../../assets/icons/phone.svg";
import facebook from "../../assets/icons/fb.svg";
import linkedIn from "../../assets/icons/linkedIn.svg";
import twitter from "../../assets/icons/x.svg";
import logo from "../../assets/logo2.svg";
import western from "../../assets/icons/westrnunion-2.svg";
import skrill from "../../assets/icons/Skrill-2.svg";

export interface MenuGroup {
  name: string;
  href: string;
}

const authLinks = [
  { name: "Become a Member", href: "/register-patient" },
  { name: "Join as a Partner", href: "/register-partner" },
  { name: "Become an Sponsor", href: "/sponsor" },
];

export default function Footer() {
  return (
    <section className="bg-secondary2 text-white">
      <div className="flex w-full flex-col gap-10 pt-20 max-ctn">
        <div className="w-full flex grow flex-row flex-wrap lg:flex-nowrap lg:items-start leading-[27.2px] max-sm:gap-y-10">
          {/* LINKS */}
          <div className="w-[47%] sm:w-[250px] flex flex-col gap-3 border-r border-[#312357] pr-10">
            <h2 className="font-semibold text-base sm:text-xl">
              Join Us at CMD
            </h2>

            {authLinks.map((link) => (
              <Link to={link.href} key={link.name} className="text-[#DBDBDB] max-sm:text-sm">
                {link.name}
              </Link>
            ))}
          </div>

          {/* LOCATION */}
          <div className="w-[49%] sm:w-[340px] flex flex-col gap-3 sm:border-r border-[#312357] pl-10 sm:pr-10">
            <h2 className="font-semibold text-base sm:text-xl">Our Location</h2>
            <p className="text-[#DBDBDB] max-sm:text-sm ">
              <span className="font-medium text-white">Parent office: </span>
              <span className="leading-[30px]">
                {" "}
                ConciergeMD Services Corporation 2525 Ponce De Leon Boulevard,
                Suite 300, Miami, Florida, 33134
              </span>
            </p>
          </div>

          {/* CONTACT */}
          <div className="w-[47%] sm:w-[340px] flex flex-col gap-3 border-r border-[#312357] sm:px-10">
            <h2 className="font-semibold text-base sm:text-xl">
              Reach Out to Us
            </h2>
            <a className="text-[#DBDBDB] flex gap-3 max-sm:text-sm">
              <img src={mailIcon} alt="mail" /> info@cmdrxglobal.com
            </a>
            <div className="text-[#DBDBDB] flex items-start gap-3">
              <img src={phoneIcon} alt="phone" />
              <p className="flex flex-col gap-2 max-sm:text-sm">
                <span>+1 305-380-9111 (USA)</span>
                <span>
                  +234 916 780 8000 (Dedicated Active Member Services)
                </span>
                <span>+234 901 998 5555 (Urgent Care)</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a className="border border-gray-50/10 rounded-full w-11 h-11 grid place-content-center">
                <img src={facebook} alt="facebook" />
              </a>
              <a className="border border-gray-50/10 rounded-full w-11 h-11 grid place-content-center">
                <img src={linkedIn} alt="linkedIn" />
              </a>
              <a className="border border-[#312357] rounded-full w-11 h-11 grid place-content-center">
                <img src={twitter} alt="twitter" />
              </a>
            </div>
          </div>

          {/* CONTACT */}
          <div className="w-[47%] sm:w-[300px] flex flex-col gap-5 pl-10">
            <h2 className="font-semibold text-base sm:text-xl">
              Active Work Hours
            </h2>
            <p className="text-[#DBDBDB] max-sm:text-sm">
              <span className="font-medium text-white">Mon - Friday: </span>
              8:00 AM - 5:00 PM
            </p>
            <p className="text-[#DBDBDB] max-sm:text-sm">
              <span className="font-medium text-white">Saturday: </span>
              7:00 AM - 3:00 PM
            </p>
            <p className="text-[#DBDBDB] max-sm:text-sm">
              <span className="font-medium text-white">
                Sunday and Major Holidays:{" "}
              </span>
              Closed
            </p>
            <p className="text-[#DBDBDB] max-sm:text-sm">
              <span className="font-medium text-white">After Hours: </span>
              Call urgent care
            </p>
          </div>
        </div>

        <div className="py-8 flex items-center justify-between border-t border-b border-[#312357]">
          <img src={logo} alt="logo" className="h-[35px] sm:h-[47px] w-auto" />
          <div className="flex gap-3 sm:gap-6">
            <img
              src={western}
              alt="western"
              className="h-[20px] sm:h-[28px] w-auto"
            />
            <img
              src={skrill}
              alt="skrill"
              className="h-[20px] sm:h-[28px] w-auto mx-4"
            />
          </div>
        </div>

        <p className="text-gray-[#858D9D] text-center pb-10 max-sm:text-sm">
          2024 © All rights reserved, CMD Rx Global
        </p>
      </div>
    </section>
  );
}
