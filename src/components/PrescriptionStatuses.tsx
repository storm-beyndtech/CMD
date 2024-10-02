import { Link } from "react-router-dom";
import { Prescription, PrescriptionsProps } from "../types/types";

export function ActivePrescription({ prescriptions }: PrescriptionsProps) {
  return (
    <div className="space-y-5">
      {prescriptions.map((prescription: Prescription, index: number) => (
        <div
          key={index}
          className="flex items-center p-[22px] rounded-[14px] gap-5"
        >
          <img
            src={prescription.drug.imageUrl}
            alt={prescription.drug.name}
            className="w-20 h-20 rounded"
          />
          <div>
            <h3 className="text-lg font-semibold text-[#2B2F38]">
              {prescription.drug.name} - {prescription.dosage}
            </h3>
            <p className="text-sm text-gray-500">{prescription.dosage}</p>
            <p
              className={`text-sm ${
                !prescription.refillDate
                  ? "text-[#F04438]"
                  : "text-[#F79009]"
              }`}
            >
              {prescription.refillDate ? prescription.refillDate : "No refill"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}




// Completed prescription
export function CompletedPrescription({ prescriptions }: PrescriptionsProps) {
  return (
    <div className="space-y-5">
      {prescriptions.map((prescription: Prescription, index: number) => (
        <div
          key={index}
          className="flex items-center p-[22px] rounded-[14px] gap-5"
        >
          <img
            src={prescription.drug.imageUrl}
            alt={prescription.drug.name}
            className="w-20 h-20 rounded"
          />
          <div>
            <h3 className="text-lg font-semibold text-[#2B2F38]">
              {prescription.drug.name} - {prescription.dosage}
            </h3>
            <Link to="#" className="text-[#989FAD] text-sm font-medium">Get Started {" "}→</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
