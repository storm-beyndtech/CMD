import React, { useRef } from "react";
import PrescriptionCard from "./PrescriptionCard";
import { Prescription } from "../types/types";
import Btn from "./UI/Btn";

interface PrescriptionConfirmationProps {
  prescriptions: Prescription[];
  goBack: () => void;
}

const PrescriptionConfirmation: React.FC<PrescriptionConfirmationProps> = ({
  prescriptions,
  goBack,
}) => {
  const prescriptionWrapperRef = useRef<HTMLDivElement>(null);

  // Function to slide back (scroll to the left)
  const handleSlideBack = () => {
    if (prescriptionWrapperRef.current) {
      prescriptionWrapperRef.current.scrollBy({
        left: -300, // Adjust this value depending on your card width
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  // Function to slide forward (scroll to the right)
  const handleSlideFront = () => {
    if (prescriptionWrapperRef.current) {
      prescriptionWrapperRef.current.scrollBy({
        left: 300, // Adjust this value depending on your card width
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  return (
    <div className="">
      <p className="text-gray-600 mb-6">
        Before finalizing this prescription, kindly review and confirm the
        details.
      </p>

      {/* Wrapper with scroll */}
      <div
        className="w-full flex gap-6 overflow-x-scroll no-scrollbar my-5"
        ref={prescriptionWrapperRef} // Reference to the wrapper
      >
        {prescriptions.map((prescription, i) => (
          <PrescriptionCard key={i} prescription={prescription} />
        ))}
      </div>

      {/* Slide controls */}
      <div className="flex justify-end mt-6 space-x-4 pr-3">
        <button
          onClick={handleSlideBack}
          className="border border-gray-200 px-3 py-2 rounded-xl text-2xl"
        >
          ←
        </button>
        <button
          onClick={handleSlideFront}
          className="border border-gray-200 px-3 py-2 rounded-xl text-2xl"
        >
          →
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex justify-between items-center mt-6 gap-5">
        <button
          className="border border-gray-300 py-3 px-7 rounded-xl font-medium flex items-center gap-3 text-[#2B2F38]"
          onClick={goBack}
        >
          Cancel
        </button>

        <Btn type="primary" label="Confirm & Send" auth />
      </div>
    </div>
  );
};

export default PrescriptionConfirmation;
