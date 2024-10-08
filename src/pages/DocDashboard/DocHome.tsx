import DoctorsMiniConsultations from "../../components/DoctorsMiniConsultations";
import PatientsInCare from "../../components/PatientsInCare";
import { Link } from "react-router-dom";
import DocScheduleDays from "../../components/DocScheduleDays";
import { dummySchedule } from "../../lib/dashboardUtils";
import { Consultation } from "../../types/types";
import { useEffect, useState } from "react";
import { sendRequest } from "../../utility/sendRequest";

export default function DocHome() {
	const [consultations, setConsultations] = useState<Consultation[] | null>(null);

	// Extend Day.js with advanced formatting options
	const fetchConsultations = async () => {
		const res = await sendRequest("/doctors/consultations", "GET");
		setConsultations(res.data.docs[0]);
	};

	console.log(consultations);

	useEffect(() => {
		fetchConsultations();
	}, []);

	return (
		<div className="grid gap-5">
			<DocScheduleDays daysWithInfo={dummySchedule.days} />
			{consultations && (
				<div className="w-full p-6 rounded-[14px] bg-white">
					<h2 className="font-semibold text-[#2B2F38]">Today's Consultations</h2>
					<p className="text-xs text-[#9ea1a7] my-1.5 mb-4">You have 5 consultations schedule for today</p>
					<div className="grid gap-4 pb-6">
						<DoctorsMiniConsultations consultations={consultations} />
					</div>

					<Link
						to="/dashboard/partner/doctor/consultations"
						className="hover:bg-gray-100 cursor-pointer text-sm text-secondary"
					>
						See All Consultations →
					</Link>
				</div>
			)}

			{consultations && (
				<div className="w-full p-6 rounded-[14px] bg-white">
					<h2 className="font-semibold mb-4 text-[#2B2F38]">Patients In Care</h2>
					<div className="grid gap-4">
						{consultations.map((patient, i) => (
							<PatientsInCare key={i} patient={patient} />
						))}
					</div>
				</div>
			)}
		</div>
	);
}
