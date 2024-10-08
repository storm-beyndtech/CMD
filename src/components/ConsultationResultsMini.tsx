import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Consultation } from "../types/types";
import dayjs from "dayjs";

export default function ConsultationResultsMini({ consultation }: { consultation: Consultation }) {
	return (
		<div className="w-full p-6 rounded-[14px] bg-white">
			{/* Title and Appointment Info */}
			<h2 className="text-lg font-semibold text-[#383E49] mb-1">Consultation Results</h2>
			<p className="text-sm text-[#9aa0ad] mb-4">
				From your last appointment,{" "}
				<span className="font-medium">{dayjs(consultation.dateTime).format("HH:mm - MMM D, YYYY")}</span>
			</p>

			{/* Patient Symptoms and Description */}
			<p className="text-sm text-[#4D5562] mb-4">{consultation.doctorNotes}</p>

			{/* Results Preview */}
			<div className="flex items-center space-x-2 mb-4">
				{consultation.documents.map((doc, i) => (
					<img key={i} src={doc.url} alt="result-preview-1" className="w-10 h-10 rounded-md object-cover" />
				))}
			</div>

			{/* Link to See Results & Prescriptions */}
			<div>
				<Link
					to={`/dashboard/patient/consultations/${consultation._id}`}
					className="flex items-center text-secondary text-sm font-semibold hover:text-[#6E44B9]"
				>
					See Results & Prescriptions <FiArrowRight className="ml-2" />
				</Link>
			</div>
		</div>
	);
}
