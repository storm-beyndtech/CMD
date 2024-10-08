import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { consultations } from "../../lib/dashboardUtils";
import { FiArrowLeft } from "react-icons/fi";
import dayjs from "dayjs";
import PageLoader from "../../components/PageLoader";
import LabResults from "../../components/LabResults";
import EmptyResult from "../../components/EmptyResult";
import LabAppointmentCard from "../../components/LabAppointmentCard";
import phoneIcon from "../../assets/icons/call.svg";
import resultIcon from "../../assets/icons/note-text.svg";
import { GrClose } from "react-icons/gr";
import AddLabResult from "../../components/Forms/AddLabResult";
import { experts } from "../../lib/utils";
import badge from "../../assets/icons/badge.svg";
import Avatar from "../../components/UI/Avatar";

export default function AppointmentDetails() {
	const navigate = useNavigate();
	const { id } = useParams(); // Extract 'id' from the URL params
	const [consultation, setConsultation] = useState<any>(null);
	const [showLabResult, setShowLabResult] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState("");

	useEffect(() => {
		// Simulate fetching data by matching the id
		const fetchConsultation = () => {
			const data = consultations.find((c) => c._id === id);
			setConsultation(data);
		};
		fetchConsultation();
	}, [id]);

	if (!consultation) {
		return <PageLoader />;
	}

	const handleBack = () => {
		navigate(-1);
	};

	const handleOpenModal = (e: string) => {
		if (e === "Contact Patient") {
			console.log(e);
		}

		if (e === "Send Result") {
			setIsModalOpen(true);
			setModalContent("Send Result");
		}
	};

	const handleSubmit = () => {
		setShowLabResult(true);
		setIsModalOpen(false);
	};

	return (
		<div className="w-full grid gap-5">
			{/* Back Button */}
			<div className="flex items-start gap-2 mb-3 cursor-pointer">
				<FiArrowLeft className="text-gray-500 pt-1.5 text-2xl" onClick={handleBack} />
				<div className="flex flex-col items-center justify-start ">
					<h3 className="text-lg font-semibold flex items-center justify-start gap-3">
						Appointment with {consultation.patientDetails.name}
					</h3>
					<p className="text-sm text-gray-500 -ml-2">
						Last Updated, {dayjs(consultation.lastUpdated).format("MMM D, YYYY, h:mm A")}
					</p>
				</div>
			</div>

			<div className="bg-white grid gap-5 border border-gray-100 p-4 rounded-[14px]">
				<LabAppointmentCard data={consultation} />

				{/* Actions */}
				<div className="flex gap-7 mt-4">
					<button
						className="border border-gray-300 px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-3 text-[#2B2F38]"
						onClick={() => handleOpenModal("Contact Patient")}
					>
						<img src={phoneIcon} alt="facility" className="w-4 h-4" />
						<span>Contact Patient</span>
					</button>

					<button
						className="border border-gray-300 px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-3 text-[#2B2F38]"
						onClick={() => handleOpenModal("Send Result")}
					>
						<img src={resultIcon} alt="drug" className="w-4 h-4" />
						<span>Send Lab Results</span>
					</button>
				</div>
			</div>

			{/* show lab result */}
			{showLabResult && (
				<LabResults
					lastVisit={consultation.lastVisit}
					remarks={consultation.remarks}
					tests={consultation.tests}
					uploads={consultation.uploads}
				/>
			)}

			{!showLabResult && <EmptyResult />}

			{/* Attending doctor */}
			<div className="bg-white grid gap-5 border border-gray-100 p-4 rounded-[14px]">
				<h3 className="text-lg font-semibold text-gray-700">Attending Doctor</h3>
				<div className="w-full flex gap-6">
					<Avatar
						firstName={experts[0].name || "D"}
						profileImageUrl={experts[0].img || ""}
						height="90px"
						width="90px"
						borderRadius="14px"
					/>
					<div className="grid">
						<p className="text-base font-semibold text-[#2B2F38]">{experts[0].name}</p>
						<p className="text-xs sm:text-base text-[#483380]">{experts[0].position}</p>
						<div className="flex items-start gap-1">
							<img src={badge} alt="badge" width={22.5} />
							<p className="text-[#5D6679] text-xs sm:text-base">{experts[0].hospitals}</p>
						</div>
					</div>
				</div>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div className="h-screen fixed top-0 left-0 inset-0 z-[50000] bg-black bg-opacity-50 py-20 overflow-y-scroll">
					<div className="h-fit min-h-[850px] w-full">
						<div className="bg-white rounded-lg p-6 max-w-lg w-full relative mx-auto">
							<GrClose
								className="absolute top-7 right-5 text-gray-500 text-2xl cursor-pointer"
								onClick={() => setIsModalOpen(false)} // Close Modal
							/>
							<h2 className="text-lg font-semibold mb-4">
								{modalContent === "Send Result" ? "Send Result" : "Contact Patient"}
							</h2>

							{/* Conditionally render form based on modal content */}
							{modalContent === "Send Result" && <AddLabResult onSubmit={handleSubmit} />}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
