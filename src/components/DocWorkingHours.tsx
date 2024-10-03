import React, { useState } from "react";
import { GrClose, GrMoreVertical } from "react-icons/gr"; // Icon for the 3-dot menu
import { PiWarningOctagon } from "react-icons/pi";
import { BiMessageSquareEdit } from "react-icons/bi";
import EditAvailabilityForm from "./Forms/EditAvailabilityForm";
import ExemptionForm from "./Forms/ExemptionForm";

interface Availability {
  days: string[];
  startTime: string;
  endTime: string;
  allDay: boolean;
}

interface Exemption {
  days: string[];
  startTime: string;
  endTime: string;
  reason: string;
  allDay: boolean;
}

interface WorkingHoursProps {
  initialAvailability: Availability[];
}

const DocWorkingHours: React.FC<WorkingHoursProps> = ({
  initialAvailability,
}) => {
  const [availability, setAvailability] = useState<Availability[]>(initialAvailability);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null); // For conditional content in the modal
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile 3-dot menu state
  const [isLoading, setIsLoading] = useState(false); // Loading state for the forms
  const [error, setError] = useState<string | null>(null); // Error state for the forms

  // Open the modal and specify the content type
  const handleOpenModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setError(null);
  };

  // Handle form submission for Availability
  const handleSubmitAvailability = async (formValues: Availability[]) => {
    try {
      setIsLoading(true);
      // Logic to update availability in your backend or state management
      setAvailability(formValues); // Update local state
      handleCloseModal(); // Close the modal after submission
    } catch (err) {
      setError("An error occurred while submitting the availability form."); // Handle error
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Handle form submission for Exemption
  const handleSubmitExemption = async (formValues: Exemption) => {
    try {
      setIsLoading(true);
      // Logic to handle exemption submission in your backend or state management
      console.log("Exemption submitted:", formValues); // Replace with actual logic
      handleCloseModal(); // Close the modal after submission
    } catch (err) {
      setError("An error occurred while submitting the exemption form."); // Handle error
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="mt-4 p-[22px] rounded-[14px] bg-white relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold text-[#383E49] mb-4">Working Hours</h3>
        <div className="hidden md:flex space-x-3">
          {/* Edit Schedule Button */}
          <button
            className="border border-gray-100 px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-3 text-secondary"
            onClick={() => handleOpenModal("Edit Schedule")}
          >
            <BiMessageSquareEdit className="text-xl" />
            <span>Edit Schedule</span>
          </button>

          {/* Create Exemptions Button */}
          <button
            className="border border-gray-300 px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-3 text-secondary"
            onClick={() => handleOpenModal("Create Exemptions")}
          >
            <PiWarningOctagon className="text-xl" />
            <span>Create Exemptions</span>
          </button>
        </div>

        {/* 3-dot menu for mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <GrMoreVertical className="text-2xl" />
          </button>
          {isMobileMenuOpen && (
            <div className="absolute top-10 right-0 bg-white border border-gray-200 rounded-md shadow-lg p-2">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-secondary"
                onClick={() => handleOpenModal("Edit Schedule")}
              >
                Edit Schedule
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-secondary"
                onClick={() => handleOpenModal("Create Exemptions")}
              >
                Create Exemptions
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Availability Display */}
      {availability.map((slot, index) => (
        <div
          key={index}
          className="flex justify-between p-3 border border-gray-100 rounded-[14px] mb-2"
        >
          <div className="font-medium">{slot.days.join(", ")}</div>
          <div>
            {slot.allDay ? "All-Day" : `${slot.startTime} - ${slot.endTime}`}
          </div>
        </div>
      ))}

      {/* Modal */}
      {isModalOpen && (
        <div className="h-screen fixed top-0 left-0 inset-0 z-[50000] bg-black bg-opacity-50 py-20 overflow-y-scroll">
          <div className="h-fit min-h-[850px] w-full">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full relative mx-auto">
              <GrClose
                className="absolute top-7 right-5 text-gray-500 text-2xl cursor-pointer"
                onClick={handleCloseModal} // Close Modal
              />
              <h2 className="text-lg font-semibold mb-4">
                {modalContent === "Edit Schedule"
                  ? "Edit Schedule"
                  : modalContent === "Create Exemptions"
                  ? "Create Exemptions"
                  : "Modal Title"}
              </h2>

              {/* Conditionally render form based on modal content */}
              {modalContent === "Edit Schedule" && (
                <EditAvailabilityForm
                  availability={availability}
                  onSubmit={handleSubmitAvailability}
                  isLoading={isLoading}
                  error={error}
                />
              )}
              {modalContent === "Create Exemptions" && (
                <ExemptionForm
                  onSubmit={handleSubmitExemption}
                  isLoading={isLoading}
                  error={error}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocWorkingHours;
