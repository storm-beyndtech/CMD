import { useEffect, useState } from "react";
import BookLabAppointment from "../../components/BookLabAppointment";
import ConsultationResultsMini from "../../components/ConsultationResultsMini";
import GetCard2 from "../../components/GetCard2";
import HRANotification from "../../components/HRA/HRANotification";
import MiniMedsList from "../../components/MiniMedsList";
import { dummyDrugList } from "../../lib/dashboardUtils";
import { sendRequest } from "../../utility/sendRequest";
import { Consultation } from "../../types/types";

export default function PatientHome() {
	const [consultation, setConsultation] = useState<Consultation | null>(null);

	// Extend Day.js with advanced formatting options
	const fetchConsultations = async () => {
		const res = await sendRequest("/members/consultations?status=pending", "GET");
		setConsultation(res.data.docs[0]);
	};

	console.log(consultation);

	useEffect(() => {
		fetchConsultations();
	}, []);

	return (
		<div>
			<div className="grid gap-4 border-b border-gray-200 pb-6 mb-6">
				<HRANotification consultation={consultation} />
				{consultation && consultation?.doctorNotes !== "" && (
					<ConsultationResultsMini consultation={consultation} />
				)}
				<BookLabAppointment />
			</div>

			<div className="grid gap-5">
				<GetCard2 />
				<MiniMedsList drugs={dummyDrugList.slice(0, 4)} />
			</div>
		</div>
	);
}
