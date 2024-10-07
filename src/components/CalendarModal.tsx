import React, { useState } from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { IoIosArrowForward, IoIosArrowBack, IoIosClose } from "react-icons/io";

dayjs.extend(advancedFormat);

interface CalendarModalProps {
  highlightDate: string; // UTC format or normal date string
  isVisible: boolean;
  onClose: () => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  highlightDate,
  isVisible,
  onClose,
}) => {
  const highlightedDay = dayjs(highlightDate);
  const [currentMonth, setCurrentMonth] = useState(
    highlightedDay.startOf("month")
  );

  // Get all days for the current month
  const daysInMonth = Array.from(
    { length: currentMonth.daysInMonth() },
    (_, i) => currentMonth.date(i + 1)
  );

  // Get days of the week starting from Monday
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Get the first day of the current month and calculate how many days to offset for correct weekday alignment
  const firstDayOfMonthIndex = (currentMonth.startOf("month").day() + 6) % 7;

  // Handle month navigation
  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  // Return null if modal is not visible
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[100000] p-2"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }} // Modal backdrop
    >
      <div className="relative w-full max-w-[600px] mx-auto p-3 sm:p-8 bg-white rounded-2xl shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-8 right-8 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <IoIosClose size={50} />
        </button>

        <p className="text-xl font-semibold text-[#383E49] my-5">Scheduled Date</p>

        <div className="w-full max-w-[540px] mx-auto p-3 sm:p-8 rounded-2xl border border-[#E4E5E7]">
          {/* Calendar Header: Month and Year with Navigation */}
          <div className="flex justify-between items-center pb-4 border-b border-[#E4E5E7]">
            <IoIosArrowBack
              onClick={goToPreviousMonth}
              className="text-gray-600 hover:text-gray-900 cursor-pointer"
            />
            <div className="text-lg font-semibold text-gray-800">
              {currentMonth.format("MMMM YYYY")}
            </div>
            <IoIosArrowForward
              onClick={goToNextMonth}
              className="text-gray-600 hover:text-gray-900 cursor-pointer"
            />
          </div>

          {/* Weekdays Header (Mon-Sun) */}
          <div className="grid grid-cols-7 text-center py-6">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-[#7E818C] font-medium">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-3 gap-y-5 content-center">
            {/* Add empty slots for days before the first day of the month */}
            {Array.from({ length: firstDayOfMonthIndex }).map((_, index) => (
              <div key={index} />
            ))}

            {/* Render each day of the month */}
            {daysInMonth.map((day) => {
              const isHighlighted = highlightedDay.isSame(day, "day");

              return (
                <div
                  key={day.format("YYYY-MM-DD")}
                  className={`w-9 h-9 rounded-full text-lg font-medium flex items-center justify-center mx-auto ${
                    isHighlighted
                      ? "bg-secondary3 text-white"
                      : "text-[#383E49]"
                  }`}
                >
                  {day.date()}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
