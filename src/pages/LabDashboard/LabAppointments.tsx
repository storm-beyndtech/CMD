import AllAppointments from "../../components/AllAppointments";
import { consultations } from "../../lib/dashboardUtils";

export default function LabAppointments() {
	return (
		<div className="w-full p-6 rounded-[14px] bg-white">
			<h2 className="text-lg font-semibold text-[#383E49]">All Appointments</h2>
			<p className="text-sm text-gray-500 mb-4">You have {consultations.length} appointments scheduled.</p>
			<AllAppointments consultations={consultations} />
		</div>
	);
}
