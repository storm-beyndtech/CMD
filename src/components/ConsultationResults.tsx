import { Consultation } from "../types/types";
import AttendingDoctor from "./AttendingDoctor";
import DoctorsNotes from "./DoctorsNotes";
import LabResults from "./LabResults";
import Prescriptions from "./Prescriptions";

interface ConsultationResultsProps {
  consultation: Consultation;
  onBack: () => void | null; // Function to go back to the list
}

export default function ConsultationResults({
  consultation,
  onBack,
}: ConsultationResultsProps) {
  return (
    <div className="grid gap-5">
      <h2
        className="text-lg font-semibold text-[#383E49] mb-4 cursor-pointer"
        onClick={onBack}
      >
        {!onBack && <span className="mr-5">←</span>} Consultation Results
      </h2>

      {/* Reusable Components */}
      <DoctorsNotes
        notes={consultation.notes}
        documents={consultation.documents}
      />
      <LabResults
        lastVisit={consultation.lastVisit}
        remarks={consultation.remarks}
        tests={consultation.tests}
        uploads={consultation.uploads}
      />
      <Prescriptions prescriptions={consultation.prescriptions} />
      <AttendingDoctor />
    </div>
  );
}
