import { useState } from "react";
import { PrescriptionsProps } from "../types/types";
import Btn from "./UI/Btn";
import { useNavigate } from "react-router-dom";

export default function Prescriptions({ prescriptions }: PrescriptionsProps) {
  const navigate = useNavigate();
  const [selectedPrescriptions, setSelectedPrescriptions] = useState<number[]>(
    [],
  );
  const [selectAll, setSelectAll] = useState(false);

  // Toggle a single prescription selection
  const handleTogglePrescription = (index: number) => {
    if (selectedPrescriptions.includes(index)) {
      setSelectedPrescriptions(
        selectedPrescriptions.filter((i) => i !== index),
      );
    } else {
      setSelectedPrescriptions([...selectedPrescriptions, index]);
    }
  };

  // Toggle the "Select All" functionality
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedPrescriptions([]); // Deselect all
    } else {
      setSelectedPrescriptions(prescriptions.map((_, index) => index)); // Select all
    }
    setSelectAll(!selectAll);
  };

  // Check if any prescription is selected
  const hasSelected = selectedPrescriptions.length > 0;

  const handleProceedToCheckout = () => {
    if (hasSelected) {
      navigate("/checkout");
    }
  };

  return (
    <div className="p-[22px] rounded-[14px] bg-white">
      <h2 className="text-lg font-semibold text-[#383E49]">Prescriptions</h2>

      {prescriptions.map((prescription, index) => (
        <div
          key={index}
          className="w-full flex justify-between items-center my-6 relative"
        >
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={selectedPrescriptions.includes(index)}
              onChange={() => handleTogglePrescription(index)}
              className="sm:w-5 sm:h-5"
            />
            <img
              src={prescription.drug.imageUrl}
              alt={prescription.drug.name}
              className="w-[60px] h-[60px] sm:w-20 sm:h-20 rounded"
            />
            <div>
              <h3 className="max-sm:text-sm font-semibold text-[#344054]">
                {prescription.drug.name} {prescription.dosage}
              </h3>
              <p className="text-xs sm:text-sm text-[#5D6679]">
                {prescription.dosage}
              </p>
              <p className="text-xs sm:text-sm text-[#989FAD]">
                {prescription.refillDate
                  ? prescription.refillDate
                  : "No Refills"}
              </p>
            </div>
          </div>
          <h2 className="font-bold text-secondary absolute top-1 right-1">
            ${prescription.drug.price}
          </h2>
        </div>
      ))}

      {/* Select All Checkbox and Proceed Button */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className="sm:w-5 sm:h-5"
          />
          <label className="text-[#383E49] font-semibold max-sm:text-sm">
            Select All
          </label>
        </div>

        <div
          className={`${
            hasSelected ? "opacity-100" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={handleProceedToCheckout}
        >
          <Btn type="primary" label="Proceed to Checkout" />
        </div>
      </div>
    </div>
  );
}
