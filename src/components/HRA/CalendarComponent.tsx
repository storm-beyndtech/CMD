import React, { useState } from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

dayjs.extend(advancedFormat);

interface CalendarComponentProps {
  availableDates: string[] | undefined;
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  availableDates,
  selectedDate,
  onDateSelect,
}) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));

  // Format available dates as dayjs objects
  const availableDayjsDates = availableDates?.map((date) => dayjs(date));

  // Check if a given date is in the available dates list
  const isAvailable = (date: dayjs.Dayjs) =>
    availableDayjsDates?.some((availableDate) =>
      availableDate.isSame(date, "day"),
    );

  // Get all days for the current month
  const daysInMonth = Array.from(
    { length: currentMonth.daysInMonth() },
    (_, i) => currentMonth.date(i + 1),
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

  return (
    <>
      <p className="text-lg font-semibold text-[#383E49] my-5">Select Date & Time</p>

      <div className="w-full max-w-[540px] mx-auto p-8 rounded-2xl border border-[#E4E5E7]">
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
            const isDateAvailable = isAvailable(day);
            const isSelected =
              selectedDate && day.isSame(dayjs(selectedDate), "day");

            return (
              <button
                key={day.format("YYYY-MM-DD")}
                className={`w-9 h-9 rounded-full text-lg font-medium flex items-center justify-center mx-auto ${
                  isDateAvailable
                    ? isSelected
                      ? "bg-secondary3 text-white"
                      : "bg-secondary3/15 text-secondary3 hover:bg-secondary3/40"
                    : "text-[#383E49] cursor-not-allowed"
                }`}
                onClick={() =>
                  isDateAvailable && onDateSelect(day.format("YYYY-MM-DD"))
                }
                disabled={!isDateAvailable}
              >
                {day.date()}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CalendarComponent;
