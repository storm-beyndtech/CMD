import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi"; // Menu icon
import { MdContentCopy } from "react-icons/md"; // Copy icon
import googleMeetIcon from "../assets/icons/google-meet.svg";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function ConsultationCard({
  patientName,
  appointmentTime,
  meetingLink,
  imageUrl,
}: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="p-6 rounded-[14px] bg-white w-full shadow-sm">
      {/* Top Section */}
      <div className="flex justify-between items-start">
        {/* Left: Icon and Title */}
        <div className="flex items-start sm:gap-4 gap-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-[#383E49] flex items-center justify-between">
              Consultation with {patientName}{" "}
              <img src={imageUrl} alt="patient" className="w-6 h-6 ml-5" />
            </h2>
            <p className="text-sm text-[#48505E] mb-3">{appointmentTime}</p>
            <button className="mt-2 border border-[#f0f0f0] text-[#48505E] text-sm py-3 px-4 rounded-lg flex items-center gap-2">
              <img src={googleMeetIcon} alt="Google Meet" className="w-5 h-5" />
              Join with Google Meet
            </button>
            <div className="flex items-center gap-2 mt-1 text-[#667085] text-sm">
              <MdContentCopy className="cursor-pointer" />
              <a href={meetingLink} className="hover:underline">
                {meetingLink}
              </a>
            </div>
          </div>
        </div>

        {/* Right: Menu Icon (Desktop Only) */}
        <div className="relative hidden md:block">
          <FiMoreHorizontal
            className="cursor-pointer text-[#667085]"
            size={24}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-fit text-nowrap bg-white border rounded-lg shadow-lg px-4 py-2">
              <Link
                to="#"
                className="hover:bg-gray-100 cursor-pointer text-sm text-secondary flex items-center gap-3"
              >
                View on your Calendar <BsArrowRight />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
