import { Consultation } from "../types/types";
import searchIcon from "../assets/icons/search-normal.svg";
import filterIcon from "../assets/icons/filter.svg";

interface ConsultationsListProps {
  onSelectConsultation: (consultation: Consultation) => void;
  consultations: Consultation[];
}

export default function ConsultationsList({
  onSelectConsultation,
  consultations,
}: ConsultationsListProps) {
  return (
    <div className="p-[22px] rounded-[14px] bg-white">
      <h2 className="text-lg font-semibold text-[#383E49]">Consultations</h2>
      <p className="text-sm text-gray-500 mb-4">
        You have consulted {consultations.length} times within the past year
      </p>

      {/* Search & Filter */}
      <div className="flex items-center justify-between gap-5 my-10">
        <div className="w-3/4 max-w-[380px] relative">
          <img
            src={searchIcon}
            alt="search"
            className="absolute left-3 top-4"
          />
          <input
            type="text"
            placeholder="Search Consultations, Types, Months, Dates, Status"
            className="!pl-10 input"
          />
        </div>

        <div className="p-3 flex-shrink-0 grid place-content-center border border-[#E0E0E0] rounded-xl">
          <img src={filterIcon} alt="filter" />
        </div>
      </div>

      {/* Consultations Table */}
      <table className="w-full">
        <thead>
          <tr className="text-left font-semibold py-5 text-[#2B2F38>]">
            <th>Date</th>
            <th>Type</th>
            <th>Status</th>
            <th>Consulting Partner</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((consultation) => (
            <tr
              key={consultation.id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => onSelectConsultation(consultation)}
            >
              <td className="py-5 text-[#48505E]">{consultation.date}</td>
              <td className="py-5 text-[#48505E]">{consultation.type}</td>
              <td className="py-5">
                <span
                  className={`px-3.5 py-1.5 text-sm font-medium rounded-[100px] ${
                    consultation.status === "Scheduled"
                      ? "bg-[#F7900914]-100 text-[#F79009]"
                      : "bg-[#12B76A14] text-[#12B76A]"
                  }`}
                >
                  {consultation.status}
                </span>
              </td>
              <td className="py-5 text-[#48505E]">{consultation.partner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
