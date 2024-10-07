import { Link } from "react-router-dom";
import LabAppointmentCard from "../../components/LabAppointmentCard";
import { consultations } from "../../lib/dashboardUtils";

export default function NewLabAppointments() {
	return (
		<div className="w-full p-6 rounded-[14px] bg-white">
			<div className="mb-5">
				<h2 className="font-semibold text-[#2B2F38]">New Appointments</h2>
				<p className="text-xs text-[#9ea1a7] mt-1 mb-5">
          You have <span className="font-bold text-black">{consultations.length}</span> new Lab Appointments today
				</p>
			</div>

			<div className="grid gap-7 mb-5">
				{consultations.map((consultation, i) => (
					<LabAppointmentCard key={i} data={consultation} />
				))}
			</div>

			<Link
				to="/dashboard/partner/lab/new-appointments"
				className="hover:bg-gray-100 cursor-pointer text-sm text-secondary"
			>
				See New Appointments →
			</Link>
		</div>
	);
}
