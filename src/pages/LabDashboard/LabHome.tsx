import { Link } from "react-router-dom";
import LabAppointmentCard from "../../components/LabAppointmentCard";
import { consultations } from "../../lib/dashboardUtils";
import AllAppointments from "../../components/AllAppointments";

export default function LabHome() {
	return (
		<div className="grid gap-5">
			<div className="w-full p-6 rounded-[14px] bg-white">
				<div className="mb-5">
					<h2 className="font-semibold text-[#2B2F38]">New Appointments</h2>
					<p className="text-xs text-[#9ea1a7] mt-1 mb-5">
						You have <span className="font-bold text-black">2</span> new Lab Appointments today
					</p>
				</div>

				<div className="grid gap-7 mb-5">
					{consultations.slice(0, 2).map((consultation, i) => (
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

			<div className="w-full p-6 rounded-[14px] bg-white">
				<h2 className="text-lg font-semibold text-[#383E49]">All Appointments</h2>
				<p className="text-sm text-gray-500 mb-4">You have {consultations.length} appointments scheduled.</p>
				<AllAppointments consultations={consultations} />
				<Link
					to="/dashboard/partner/lab/appointments"
					className="hover:bg-gray-100 cursor-pointer text-sm text-secondary"
				>
					See All Appointments →
				</Link>
			</div>
		</div>
	);
}
