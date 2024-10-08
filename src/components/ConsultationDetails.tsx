import { useState } from "react";
import locationIcon from "../assets/icons/location.svg";
import calendarIcon from "../assets/icons/calendar-2.svg";
import editIcon from "../assets/icons/edit-2.svg";
import pillsIcon from "../assets/icons/pills.svg";
import hospitalIcon from "../assets/icons/hospital-2.svg";
import { GrClose } from "react-icons/gr";
import AddNotesForm from "./Forms/AddNotesForm";
import ConnectFacilityForm from "./Forms/ConnectFacilityForm";
import PrescriptionForm from "./Forms/PrescriptionForm";
import LabResults from "./LabResults";
import { Consultation } from "../types/types";

export default function ConsultationDetails({ consultation }: { consultation: Consultation }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState("");

	const handleOpenModal = (content: string) => {
		setModalContent(content);
		setIsModalOpen(true);
	};

	return (
		<>
			<div className="w-full p-6 max-sm:px-4 rounded-[14px] bg-white">
				{/* Patient Information */}
				<div className="flex items-start gap-4 mb-4">
					<img
						src={consultation.patientDetails.photo.url}
						alt="Profile"
						className="w-[80px] h-[80px] rounded-full object-cover"
					/>
					<div>
						<h4 className="font-semibold flex gap-4 items-center">
							{consultation.patientDetails.name}
							<span className="px-2 py-1 text-xs font-semibold bg-[#F7900914] text-[#F79009] rounded-2xl">
								{consultation.status ? consultation.status : "in-care"}
							</span>
						</h4>
						<p className="text-sm text-[#5D6679] mt-1 flex items-center gap-2 mb-2">
							<img src={calendarIcon} alt="calendar" className="w-4 h-4" />
							Consultation, {consultation.dateTime}
						</p>
						<p className="text-sm text-[#5D6679] mt-1 flex items-center gap-2">
							<img src={locationIcon} alt="location" className="w-4 h-4" />
							{consultation.doctor.primaryPracticeLocation.location}
						</p>
					</div>
				</div>

				{/* Add Notes */}

				<div
					className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-4 cursor-pointer"
					onClick={() => handleOpenModal("Add Notes")}
				>
					<div className="flex items-center gap-5">
						<img src={editIcon} alt="edit" className="w-4 h-4" />
						<p className="font-medium text-[#5D6679]">Add Patient Notes</p>
					</div>
				</div>

				{/* Actions */}
				<div className="flex gap-7 mt-4">
					<button
						className="border border-gray-300 px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-3 text-[#2B2F38]"
						onClick={() => handleOpenModal("Connect Facility")}
					>
						<img src={hospitalIcon} alt="facility" className="w-4 h-4" />
						<span>Connect to a Facility</span>
					</button>

					<button
						className="border border-gray-300 px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-3 text-[#2B2F38]"
						onClick={() => handleOpenModal("Send Prescriptions")}
					>
						<img src={pillsIcon} alt="drug" className="w-4 h-4" />
						<span>Send Prescriptions with Results</span>
					</button>
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
									{modalContent === "Add Notes"
										? "Add Patient Notes"
										: modalContent === "Connect Facility"
										? "Connect to a Facility"
										: "Add Prescription"}
								</h2>

								{/* Conditionally render form based on modal content */}
								{modalContent === "Add Notes" && <AddNotesForm />}
								{modalContent === "Connect Facility" && <ConnectFacilityForm />}
								{modalContent === "Send Prescriptions" && <PrescriptionForm />}
							</div>
						</div>
					</div>
				)}
			</div>

			<div>
				{consultation.results && (
					<LabResults
						lastVisit={!consultation.lastVisit ? consultation.dateTime : consultation.lastVisit}
						remarks={consultation.remarks}
						tests={consultation.tests}
						uploads={consultation.uploads}
					/>
				)}
			</div>
		</>
	);
}
