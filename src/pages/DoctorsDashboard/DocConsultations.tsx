import { useState } from "react";
import DoctorsMiniConsultations from "../../components/DoctorsMiniConsultations";
import searchIcon from "../../assets/icons/search.svg";
import calendarIcon from "../../assets/icons/calendar.svg";
import filterIcon from "../../assets/icons/filter.svg";
import PatientsInCare from "../../components/PatientsInCare";
import ConsultationHistory from "../../components/ConsultationHistory";
import CustomCalendar from "../../components/CustomCalendar";
import { docConsultations } from "../../lib/dashboardUtils";
import dayjs from "dayjs";
import { IoMdClose } from "react-icons/io";
import adjust from "../../assets/icons/setting-4.svg";

const consultations = docConsultations;

export default function DocConsultations() {
  const [activeTab, setActiveTab] = useState<
    "PatientsInCare" | "Upcoming" | "History"
  >("PatientsInCare");

  // Calendar modal state
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<string[]>([]);
  const [filteredConsultations, setFilteredConsultations] =
    useState(consultations);

  // Search & Filter input toggle
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("");

  // Filter consultations based on selected date range
  const filterByDate = (dates: string[]) => {
    const filtered = consultations.filter((consultation) =>
      dates.some((date) =>
        dayjs(consultation.appointmentTime).isSame(dayjs(date), "day"),
      ),
    );
    setFilteredConsultations(filtered);
    setSelectedDateRange(dates);
    setIsCalendarOpen(false); // Close modal after selection
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = consultations.filter((consultation) =>
      consultation.patientName.toLowerCase().includes(searchValue),
    );
    setFilteredConsultations(filtered);
  };

  //handle search select
  const handleSearchSelect = (type: string) => {
    setIsSearchActive(true);
    setSearchType(type);
  };

  // Reset search and filter
  const resetFilters = () => {
    setFilteredConsultations(consultations);
    setSearchTerm("");
    setSelectedDateRange([]);
    setIsSearchActive(false);
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "PatientsInCare":
        return (
          <div className="grid gap-4">
            {filteredConsultations.map((patient, i) => (
              <PatientsInCare key={i} patient={patient} />
            ))}
          </div>
        );
      case "Upcoming":
        return (
          <div className="grid gap-4">
            <DoctorsMiniConsultations consultations={filteredConsultations} />
          </div>
        );
      case "History":
        return (
          <div className="grid gap-4">
            {filteredConsultations.map((patient, i) => (
              <ConsultationHistory key={i} patient={patient} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-6 max-sm:px-4 rounded-[14px] bg-white">
      <h2 className="font-semibold text-[#2B2F38]">Today's Consultations</h2>
      <p className="text-xs text-[#9ea1a7] my-1.5 mb-4">
        You have {filteredConsultations.length} consultations scheduled for
        today
      </p>

      {/* Search or Tabs */}
      {!isSearchActive ? (
        <div className="w-full mb-5 flex items-end justify-between flex-wrap-reverse">
          <div className="w-full max-w-[500px] flex">
            <button
              className={`authTab !text-sm !max-w-[150px] py-5 !flex gap-1.5 ${
                activeTab === "PatientsInCare"
                  ? "!text-secondary3 border-secondary3"
                  : "!font-semibold"
              }`}
              onClick={() => setActiveTab("PatientsInCare")}
            >
              <span className="max-sm:hidden">Patients </span>
              <span>in Care</span>
            </button>
            <button
              className={`authTab !text-sm !max-w-[150px] py-5 ${
                activeTab === "Upcoming"
                  ? "!text-secondary3 border-secondary3"
                  : "!font-semibold"
              }`}
              onClick={() => setActiveTab("Upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`authTab !text-sm !max-w-[150px] py-5 ${
                activeTab === "History"
                  ? "!text-secondary3 border-secondary3"
                  : "!font-semibold"
              }`}
              onClick={() => setActiveTab("History")}
            >
              History
            </button>
          </div>

          <div className="py-5 flex justify-end gap-3">
            <img
              src={searchIcon}
              alt="search"
              className="w-5 h-5 cursor-pointer"
              onClick={() => handleSearchSelect("search")} // Activate search mode
            />
            <img
              src={calendarIcon}
              alt="calendar"
              className="w-5 h-5 cursor-pointer"
              onClick={() => handleSearchSelect("date")}
            />
            <img
              src={filterIcon}
              alt="filter"
              className="w-6 h-6 cursor-pointer"
              onClick={() => handleSearchSelect("search")} // Activate search mode
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-between gap-3 mb-5">
          {searchType === "date" ? (
            <button
              className="border border-gray-300 p-4 rounded-xl font-medium flex items-center gap-3 text-[#2B2F38]"
              onClick={() => setIsCalendarOpen(true)}
            >
              <img src={adjust} alt="adjust" /> Open Calendar
            </button>
          ) : (
            <div className="!flex items-center input !max-w-[400px]">
              <img src={searchIcon} alt="search" className="w-5 h-5 mr-2" />
              <input
                type="text"
                className="outline-none"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by patient name"
              />
            </div>
          )}
          <button
            className="px-4 py-2 font-semibold text-sm flex items-center gap-2 text-secondary"
            onClick={resetFilters}
          >
            Reset <IoMdClose className="text-lg" />
          </button>
        </div>
      )}

      {/* Tab Content */}
      <div className="mt-8 bg-white rounded-[14px]">{renderTabContent()}</div>

      {/* Calendar Modal */}
      {isCalendarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[5000]">
          <CustomCalendar
            selectedDateRange={selectedDateRange}
            onDateSelect={filterByDate}
            setCloseDate={setIsCalendarOpen}
          />
        </div>
      )}
    </div>
  );
}
