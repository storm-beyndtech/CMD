import React from 'react';
import { Prescription } from '../types/types';

interface PrescriptionCardProps {
  prescription: Prescription
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({ prescription }) => {
  return (
    <div className="flex items-center gap-4">
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
          {prescription.refillDate ? prescription.refillDate : "No Refills"}
        </p>
      </div>
    </div>
  );
};

export default PrescriptionCard;
