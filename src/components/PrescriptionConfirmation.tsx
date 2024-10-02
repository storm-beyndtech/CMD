import React, { useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2; // You can change this to display more items per page

  const handleNextPage = () => {
    if (currentPage < Math.ceil(prescriptions.length / itemsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate which prescriptions to show on the current page
  const startIndex = currentPage * itemsPerPage;
  const selectedPrescriptions = prescriptions.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="">
      <p className="text-gray-600 mb-6">
        Before finalizing this prescription, kindly review and confirm the
        details.
      </p>

      <div className="flex justify-center gap-6">
        {/* Render the current page of prescription cards */}
        {selectedPrescriptions.map((prescription, index) => (
          <PrescriptionCard key={index} prescription={prescription} />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-end mt-6 space-x-4 pr-3">
        <button
          onClick={handlePreviousPage}
          className={`border border-gray-200 px-3 py-2 rounded-xl text-2xl ${
            currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === 0}
        >
          ←
        </button>
        <button
          onClick={handleNextPage}
          className={`border border-gray-200 px-3 py-2 rounded-xl text-2xl ${
            currentPage === Math.ceil(prescriptions.length / itemsPerPage) - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={
            currentPage === Math.ceil(prescriptions.length / itemsPerPage) - 1
          }
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
