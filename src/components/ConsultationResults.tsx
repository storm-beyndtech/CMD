import { Consultation } from "../types/types";
import AttendingDoctor from "./AttendingDoctor";
import DoctorsNotes from "./DoctorsNotes";
import LabResults from "./LabResults";
import Prescriptions from "./Prescriptions";

interface ConsultationResultsProps {
	consultation: Consultation;
	onBack: () => void | null; // Function to go back to the list
}

export default function ConsultationResults({ consultation, onBack }: ConsultationResultsProps) {
	return (
		<div className="grid gap-5">
			<h2 className="text-lg font-semibold text-[#383E49] mb-4 cursor-pointer" onClick={onBack}>
				{!onBack && <span className="mr-5">←</span>} Consultation Results
			</h2>

			{/* Reusable Components */}
			{consultation.doctorNotes && consultation.doctorNotes !== "" && <DoctorsNotes doctorNotes={consultation.doctorNotes} documents={consultation.documents} />}

			{consultation.results && (
				<LabResults
					lastVisit={!consultation.lastVisit ? consultation.dateTime : consultation.lastVisit}
					remarks={consultation.remarks}
					tests={consultation.tests}
					uploads={consultation.uploads}
				/>
			)}
			{consultation.prescriptions?.length > 0 && <Prescriptions prescriptions={consultation.prescriptions} />}
      <AttendingDoctor doctor={consultation.doctor } />
		</div>
	);
}
