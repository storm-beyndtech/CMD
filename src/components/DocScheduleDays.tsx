import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { PiWarningOctagon } from "react-icons/pi";
import { RiCheckDoubleFill } from "react-icons/ri";

interface Day {
  date: string;
  available: boolean;
  consultationCount: number;
  concluded?: boolean;
  partUnavailable?: boolean;
}

interface ScheduleProps {
  daysWithInfo: Day[]; // Only days with exemptions or consultations
}

const DocScheduleDays: React.FC<ScheduleProps> = ({ daysWithInfo }) => {
  const [daysInMonth, setDaysInMonth] = useState<Day[]>([]);

  useEffect(() => {
    // Generate all days in the current month
    const today = dayjs();
    const currentMonthDays = [];
    const totalDays = today.daysInMonth();

    for (let day = 1; day <= totalDays; day++) {
      const date = today.date(day);
      const isPast = date.isBefore(today, "day");
      const dayInfo = daysWithInfo.find((d) => dayjs(d.date).isSame(date, "day"));

      currentMonthDays.push({
        date: date.format("YYYY-MM-DD"),
        available: dayInfo ? dayInfo.available : false,
        consultationCount: dayInfo ? dayInfo.consultationCount : 0,
        concluded: isPast && !dayInfo?.available, // Mark past days without availability as concluded
        partUnavailable: dayInfo?.partUnavailable,
      });
    }

    setDaysInMonth(currentMonthDays);
  }, [daysWithInfo]);

  return (
    <div className="w-full overflow-x-auto no-scrollbar p-[22px] rounded-[14px] bg-white">
      <h2 className="text-lg font-semibold text-[#383E49] mb-4">
        {dayjs().format("MMMM YYYY")}
      </h2>
      <div className="grid grid-flow-col auto-cols-max gap-2">
        {daysInMonth.map((day, index) => {
          const formattedDate = dayjs(day.date).format("D");
          const formattedDay = dayjs(day.date).format("ddd");

          return (
            <div
              key={index}
              className={`w-[70px] h-[110px] py-3 px-2 text-center rounded-md flex flex-col justify-between
              ${day.available ? "bg-[#90BD401A]" : "border border-gray-100"}
              `}
            >
              {/* Day (Mon, Tue, etc.) */}
              <div className="text-xs text-[#667085]">{formattedDay}</div>

              {/* Date (e.g., 13) */}
              <div className="text-lg font-bold">{formattedDate}</div>

              {/* Icons or Hyphen Section */}
              <div className="flex justify-center items-center space-x-1 h-fit">
                {/* If no consultation and not available, show hyphen */}
                {!day.available && day.consultationCount === 0 ? (
                  <div className="text-lg text-gray-400">-</div>
                ) : (
                  <>
                    {/* Consultation count */}
                    {day.consultationCount > 0 && (
                      <span className="w-5 h-5 grid place-content-center rounded-full bg-secondary3 text-white text-xs font-semibold">
                        {day.consultationCount}
                      </span>
                    )}

                    {/* Concluded Appointment icon */}
                    {day.concluded && (
                      <RiCheckDoubleFill className="text-secondary3 text-2xl" />
                    )}

                    {/* Unavailable icon */}
                    {!day.available && (
                      <PiWarningOctagon className="text-secondary3 text-2xl" />
                    )}

                    {/* Partial unavailability icon */}
                    {day.partUnavailable && (
                      <PiWarningOctagon className="text-secondary3 text-2xl" />
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DocScheduleDays;
