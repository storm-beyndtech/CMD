import { useState } from "react";
import dayjs from "dayjs";
import { FiCheck } from "react-icons/fi";

export default function DoctorScheduleCalendar ({ availability }: any) {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const daysInWeek = 7;

  console.log(setCurrentDate)

  // This function checks if the doctor is available on a specific day
  const isAvailable = (date:any) => {
    const dayOfWeek = date.format("dddd"); // Get the day name (e.g., "Monday")
    return availability.days.includes(dayOfWeek);
  };

  // Generates the array of dates for the calendar
  const generateDates = () => {
    const startOfWeek = currentDate;
    return Array.from({ length: daysInWeek }, (_, index) => {
      return startOfWeek.add(index, "day"); // Day.js method to add days
    });
  };

  const dates = generateDates();

  return (
    <div className="w-full overflow-x-scroll">
      <div className="flex gap-4 w-max py-4">
        {dates.map((date, index) => (
          <div
            key={index}
            className={`min-w-[50px] text-center py-2 px-4 rounded-lg border 
              ${isAvailable(date) ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
          >
            <p className="text-xs">{date.format("ddd")}</p> {/* Short day format */}
            <p className="font-semibold">{date.format("DD")}</p> {/* Date format */}
            {isAvailable(date) && <FiCheck className="text-green-600 mx-auto mt-1" />}
          </div>
        ))}
      </div>
    </div>
  );
};