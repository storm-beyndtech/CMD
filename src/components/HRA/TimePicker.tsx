import React from 'react';

interface TimePickerProps {
  selectedDate?: string | null ;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
  availableTimes: string[]
}

const TimePicker: React.FC<TimePickerProps> = ({ onTimeSelect, availableTimes, selectedTime }) => {
  return (
    <div className="w-full py-5">
    <p className="text-xl font-semibold text-[#383E49] mb-4">Pick a Time</p>
    <div className="flex flex-col gap-4">
      {availableTimes.map((time) => (
        <button
          key={time}
          className={`border-2 rounded-2xl p-4 font-medium text-secondary3 cursor-pointer ${
            selectedTime === time
              ? "border-secondary3 opacity-100"
              : "opacity-50"
          }`}
          onClick={() => onTimeSelect(time)}
        >
          {time}
        </button>
      ))}
    </div>
  </div>
  );
};

export default TimePicker;