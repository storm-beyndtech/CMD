import { useState } from "react";
import searchIcon from "../assets/icons/search-normal.svg";
import filterIcon from "../assets/icons/filter.svg";
import Avatar from "./UI/Avatar";
import { Consultation } from "../types/types";

export default function AllAppointments({consultations} : {consultations: Consultation[]}) {
	const [filteredStatus, setFilteredStatus] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	// Filters consultations by status and search term
	const filteredConsultations = consultations.filter((consultation) => {
		const matchesStatus = filteredStatus === "" || consultation.status === filteredStatus;
		const matchesSearchTerm =
			searchTerm === "" ||
			consultation.patientDetails.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			consultation.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
			consultation.date.includes(searchTerm);

		return matchesStatus && matchesSearchTerm;
	});

	return (
		<div className="w-full mb-4">
			{/* Search & Filter */}
			<div className="flex items-center justify-between gap-5 my-10">
				<div className="w-3/4 max-w-[380px] relative">
					<img src={searchIcon} alt="search" className="absolute left-3 top-4" />
					<input
						type="text"
						placeholder="Search Name, Test Type, Status, Date"
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
						<option value="Pending">Pending</option>
						<option value="In Progress">In Progress</option>
						<option value="Completed">Completed</option>
					</select>
					<img src={filterIcon} alt="filter" className="absolute top-3 right-2 pointer-events-none" />
				</div>
			</div>

			{/* Consultations Table */}
			<table className="w-full">
				<thead>
					<tr className="text-left font-semibold py-5 text-[#2B2F38] max-sm:hidden">
						<th>Patient</th>
						<th>Test Type</th>
						<th>Status</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{filteredConsultations.map((consultation, i) => (
						<tr key={i} className="hover:bg-gray-100/20 max-sm:border-t border-gray-200 max-sm:flex max-sm:flex-col max-sm:py-4">
							<td className="py-3 sm:py-5 text-[#48505E] flex items-center justify-start gap-2">
								{" "}
								<Avatar
									firstName={consultation.patientDetails.name || "J"}
									profileImageUrl={consultation.patientDetails.photo?.url || ""}
									height="30px"
									width="30px"
								/>
								{consultation.patientDetails.name}
							</td>
							<td className="py-3 sm:py-5 text-[#48505E]">{consultation.testType}</td>
							<td className="py-3 sm:py-5">
								<span
									className={`px-3.5 py-1.5 text-sm font-medium rounded-full ${
										consultation.status === "Completed"
											? "bg-[#12B76A14] text-[#12B76A]"
											: consultation.status === "In Progress"
											? "bg-[#F7900914] text-[#F79009]"
											: "bg-[#F0443814] text-[#F04438]"
									}`}
								>
									{consultation.status}
								</span>
							</td>
							<td className="py-3 sm:py-5 text-[#48505E]">{consultation.date}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
