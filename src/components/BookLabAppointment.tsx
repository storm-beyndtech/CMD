import { FiRepeat } from "react-icons/fi";
import Btn from "./UI/Btn";
import dummyAppointment from "../assets/dummylab.svg";
import locationIcon from "../assets/icons/location.svg";
import { RxDotFilled } from "react-icons/rx";
import { TbArrowUpRight } from "react-icons/tb";
import { useState } from "react";
import { labs } from "../lib/dashboardUtils";
import { GrClose } from "react-icons/gr";

export default function BookLabAppointment() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full p-6 rounded-[14px] bg-white">
      {/* Top Section: Title and Request Lab Change */}
      <div className="flex flex-wrap-reverse gap-y-3 justify-between items-center mb-4">
        <h2 className="text-sm sm:text-lg font-semibold text-[#383E49]">
          Book a Lab Appointment
        </h2>
        <button
          className="flex items-center text-secondary text-sm"
          onClick={() => setIsModalOpen(true)} // Open Modal
        >
          <FiRepeat className="mr-2" />
          Request <span className="hidden sm:block"> Lab</span> Change
        </button>
      </div>

      {/* Lab Details */}
      <div className="w-full mt-5 rounded-[14px] flex max-sm:flex-row-reverse sm:items-center max-sm:justify-between max-[500px]:justify-end sm:gap-8 gap-3">
        <img
          src={dummyAppointment}
          alt="Lab"
          className="w-[180px] h-[180px] max-sm:w-20 max-sm:h-20  rounded-[14px] object-cover max-[400px]:hidden"
        />

        <div className="grid gap-4 flex-shrink">
          <div>
            <span className="w-fit flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-[#12B76A] bg-[#F0FAF5] p-2 pr-4 sm:px-2 sm:py-3 rounded-full">
              <RxDotFilled size={24} /> Suggested Lab by Doctor
            </span>
          </div>

          <div>
            <h3 className="text-[15px] font-semibold text-[#344054] flex items-center">
              Moviki Labs
              <a
                href="https://maps.google.com"
                className="ml-2 text-[#0066DA] text-[13px] font-medium flex items-center gap-2"
              >
                View on Maps <TbArrowUpRight />
              </a>
            </h3>

            <p className="text-sm text-[#5D6679] mt-1 flex items-center gap-2">
              <img src={locationIcon} alt="location" />
              123 Health Avenue, Suite 4, Lagos
            </p>
          </div>

          <div>
            <Btn label="Reach Contact Person" type="primary" />
          </div>
        </div>
      </div>

      {/* Modal for Lab Change */}
      {isModalOpen && (
      <div className="h-screen fixed top-0 left-0 inset-0 z-[50000] bg-black bg-opacity-50 py-20 overflow-y-scroll">
        <div className="h-fit min-h-[850px] w-full">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full relative mx-auto">
            <GrClose
              className="absolute top-7 right-5 text-gray-500 text-2xl cursor-pointer"
              onClick={() => setIsModalOpen(false)} // Close Modal
            />
            <h2 className="text-lg font-semibold mb-4">
              Request a New Lab for your Test
            </h2>
            <div className="grid gap-4">
              {labs.map((lab) => (
                <div
                  key={lab.id}
                  className="border-t border-[#f0f0f0] flex items-center gap-8 pt-4"
                >
                  <img
                    src={lab.image}
                    alt={lab.name}
                    className="w-[100px] h-[100px] rounded-[10px] object-cover"
                  />
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#344054]">
                      {lab.name}
                    </h3>
                    <a
                      href={lab.mapLink}
                      className="text-[#0066DA] text-[13px] font-medium flex items-center gap-1"
                    >
                      View on Maps <TbArrowUpRight />
                    </a>
                    <p className="text-sm text-[#5D6679] mt-2 flex items-center gap-1">
                      <img src={locationIcon} alt="location" />
                      {lab.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
