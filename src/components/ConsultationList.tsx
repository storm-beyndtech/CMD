import { useState } from "react";
import { Consultation } from "../types/types";
import searchIcon from "../assets/icons/search-normal.svg";
import filterIcon from "../assets/icons/filter.svg";
import dayjs from "dayjs";

interface ConsultationsListProps {
	onSelectConsultation: (consultation: Consultation) => void;
	consultations: Consultation[];
}

export default function ConsultationsList({ onSelectConsultation, consultations }: ConsultationsListProps) {
	const [filteredStatus, setFilteredStatus] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	// Filters consultations by status and search term
	const filteredConsultations = consultations.filter((consultation) => {
		const matchesStatus = filteredStatus === "" || consultation.status === filteredStatus;
		const matchesSearchTerm =
			searchTerm === "" ||
			consultation.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
			consultation.dateTime.includes(searchTerm); // Assuming 'date' is a string in the consultation

		return matchesStatus && matchesSearchTerm;
	});

	return (
		<div className="p-[22px] rounded-[14px] bg-white">
			<h2 className="text-lg font-semibold text-[#383E49]">Consultations</h2>
			<p className="text-sm text-gray-500 mb-4">
				You have consulted {consultations.length} times within the past year
			</p>

			{/* Search & Filter */}
			<div className="flex items-center justify-between gap-5 my-10">
				<div className="w-3/4 max-w-[380px] relative">
					<img src={searchIcon} alt="search" className="absolute left-3 top-4" />
					<input
						type="text"
						placeholder="Search Consultations, Types, Months, Dates, Status"
						className="!pl-10 input"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<div className="relative">
					<select
						className="p-3 pr-10 flex-shrink-0 grid place-content-center border border-[#E0E0E0] rounded-xl appearance-none"
						value={filteredStatus}
						onChange={(e) => setFilteredStatus(e.target.value)}
					>
						<option value="">All Status</option>
						<option value="In Progress">In Progress</option>
						<option value="Completed">Completed</option>
						<option value="Cancelled">Cancelled</option>
					</select>
					<img src={filterIcon} alt="filter" className="absolute top-3 right-2 pointer-events-none" />
				</div>
			</div>

			{/* Consultations Table */}
			<table className="w-full">
				<thead>
					<tr className="text-left font-semibold py-5 text-[#2B2F38] max-sm:hidden">
						<th>Date</th>
						<th>Type</th>
						<th>Status</th>
						<th>Consulting Partner</th>
					</tr>
				</thead>
				<tbody>
					{filteredConsultations.map((consultation, i) => (
						<tr
							key={i}
							className="cursor-pointer hover:bg-gray-100 max-sm:border-t border-gray-200 max-sm:flex max-sm:flex-col max-sm:py-4"
							onClick={() => onSelectConsultation(consultation)}
						>
							<td className="py-5 text-[#48505E]">
								{" "}
								{consultation && dayjs(consultation.dateTime).format("MMM D, YYYY")}
							</td>
							<td className="py-5 text-[#48505E]">{consultation.type}</td>
							<td className="py-5">
								<span
									className={`px-3.5 py-1.5 text-sm font-medium rounded-full ${
										consultation.status === "Completed"
											? "bg-[#12B76A14] text-[#12B76A]"
											: consultation.status === "In Progress" || consultation.status === "pending"
											? "bg-[#F7900914] text-[#F79009]"
											: "bg-[#F0443814] text-[#F04438]"
									}`}
								>
									{consultation.status}
								</span>
							</td>
							<td className="py-5 text-[#48505E]">
								{consultation.doctor.user.firstName} {consultation.doctor.user.lastName}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
