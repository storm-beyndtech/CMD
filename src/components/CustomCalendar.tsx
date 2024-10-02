import React, { useState } from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoMdClose } from "react-icons/io"; // Close icon
import Btn from "./UI/Btn";

dayjs.extend(advancedFormat);

interface CustomCalendarProps {
  selectedDateRange?: string[] | null;
  onDateSelect: (dates: string[]) => void;
  setCloseDate: any;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  onDateSelect,
  setCloseDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
  const [isRange, setIsRange] = useState(false); // For selecting date range
  const [firstSelectedDate, setFirstSelectedDate] =
    useState<dayjs.Dayjs | null>(null);
  const [secondSelectedDate, setSecondSelectedDate] =
    useState<dayjs.Dayjs | null>(null);

  // Handle month navigation
  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  // Get all days for the current month
  const daysInMonth = Array.from(
    { length: currentMonth.daysInMonth() },
    (_, i) => currentMonth.date(i + 1),
  );

  // Get days of the week starting from Monday
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Get the first day of the current month and calculate how many days to offset for correct weekday alignment
  const firstDayOfMonthIndex = (currentMonth.startOf("month").day() + 6) % 7;

  // Handle single or range date selection
  const handleDateClick = (day: dayjs.Dayjs) => {
    if (!isRange) {
      setFirstSelectedDate(day);
      setSecondSelectedDate(null);
    } else {
      if (!firstSelectedDate) {
        setFirstSelectedDate(day);
      } else if (!secondSelectedDate) {
        setSecondSelectedDate(
          day.isAfter(firstSelectedDate) ? day : firstSelectedDate,
        );
        setFirstSelectedDate(
          day.isBefore(firstSelectedDate) ? day : firstSelectedDate,
        );
      } else {
        // Reset range if both dates are already selected
        setFirstSelectedDate(day);
        setSecondSelectedDate(null);
      }
    }
  };

  // Determine if a date is within the range
  const isInRange = (day: dayjs.Dayjs) =>
    firstSelectedDate &&
    secondSelectedDate &&
    day.isAfter(firstSelectedDate) &&
    day.isBefore(secondSelectedDate);

  // Handle "Filter" button click
  const handleFilter = () => {
    if (firstSelectedDate && secondSelectedDate) {
      // Return the range of dates
      const range = [];
      let current = firstSelectedDate;
      while (
        current.isBefore(secondSelectedDate) ||
        current.isSame(secondSelectedDate, "day")
      ) {
        range.push(current.format("YYYY-MM-DD"));
        current = current.add(1, "day");
      }
      onDateSelect(range);
    } else if (firstSelectedDate) {
      // Return the single selected date
      onDateSelect([firstSelectedDate.format("YYYY-MM-DD")]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl relative">
      <h3 className="text-lg font-semibold mb-4">Select Date(s)</h3>
      <div className="w-full max-w-[540px] mx-auto p-8 rounded-2xl border border-[#E4E5E7] mb-5">
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

        {/* Select Date Range Option */}
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            checked={isRange}
            onChange={() => setIsRange(!isRange)}
            id="dateRange"
            className="mr-2"
          />
          <label htmlFor="dateRange" className="text-gray-800">
            Select Date Range
          </label>
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
            const isFirstSelected =
              firstSelectedDate && day.isSame(firstSelectedDate, "day");
            const isSecondSelected =
              secondSelectedDate && day.isSame(secondSelectedDate, "day");
            const isHighlighted = isInRange(day);

            return (
              <button
                key={day.format("YYYY-MM-DD")}
                className={`w-9 h-9 rounded-full text-lg font-medium flex items-center justify-center mx-auto ${
                  isFirstSelected || isSecondSelected
                    ? "bg-secondary3 text-white"
                    : isHighlighted
                    ? "bg-secondary3/20 text-secondary3"
                    : "text-[#383E49] hover:bg-secondary3/40"
                }`}
                onClick={() => handleDateClick(day)}
              >
                {day.date()}
              </button>
            );
          })}
        </div>

        {/* Close Button */}
        <IoMdClose
          onClick={() => setCloseDate(false)}
          className="absolute top-7 right-4 text-xl text-gray-500 hover:text-gray-900 cursor-pointer"
        />
      </div>

      <a
        href="javascript:void(0)"
        onClick={handleFilter}
        className={`${firstSelectedDate ? "opacity-100" : "opacity-50"}`}
      >
        <Btn type="primary" label="Filter" auth />
      </a>
    </div>
  );
};

export default CustomCalendar;
