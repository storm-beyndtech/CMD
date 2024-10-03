import React, { useState } from "react";
import Btn from "../UI/Btn";

interface Availability {
  days: string[];
  startTime: string;
  endTime: string;
  allDay: boolean;
}

interface ScheduleFormProps {
  currentValues: Availability | null; // If editing, pass current values, otherwise null for new
  onSubmit: (formValues: Availability) => void; // Pass updated/new values to the parent
  existingDays: string[]; // Used to prevent duplicate days when adding new schedule
  onCancel: () => void; // Handle cancel action
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({
  currentValues,
  onSubmit,
  existingDays,
  // onCancel,
}) => {
  const [formValues, setFormValues] = useState<Availability>(
    currentValues || { days: [], startTime: "", endTime: "", allDay: false },
  );

  const availableDays = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ].filter(
    (day) => !existingDays.includes(day) || currentValues?.days.includes(day),
  ); // Remove days already in availability

  // Handle checkbox toggle for days
  const toggleDay = (day: string) => {
    const newDays = formValues.days.includes(day)
      ? formValues.days.filter((d) => d !== day)
      : [...formValues.days, day];
    setFormValues({ ...formValues, days: newDays });
  };

  // Handle time changes
  const handleTimeChange = (type: "startTime" | "endTime", value: string) => {
    setFormValues({ ...formValues, [type]: value });
  };

  // Handle all-day toggle
  const handleAllDayToggle = () => {
    setFormValues({ ...formValues, allDay: !formValues.allDay });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues); // Pass updated form values to the parent handler
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-4 border-t mt-4">
      {/* Days Input */}
      <label className="block text-gray-700 text-sm font-medium mb-4">
        Select Available Days
      </label>
      <div className="grid grid-cols-3 gap-4 ">
        {availableDays.map((day) => (
          <label key={day} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formValues.days.includes(day)}
              onChange={() => toggleDay(day)}
              className="w-4 h-4"
            />
            <span>{day}</span>
          </label>
        ))}
      </div>

      <div className="flex gap-5 mt-8">
        {/* Start Time Input */}
        <div className="mb-2 w-full">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Start Time
          </label>
          <input
            type="time"
            value={formValues.startTime}
            className="input"
            onChange={(e) => handleTimeChange("startTime", e.target.value)}
            disabled={formValues.allDay}
          />
        </div>

        {/* End Time Input */}
        <div className="mb-2 w-full">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            End Time
          </label>
          <input
            type="time"
            value={formValues.endTime}
            className="input"
            onChange={(e) => handleTimeChange("endTime", e.target.value)}
            disabled={formValues.allDay}
          />
        </div>
      </div>

      {/* All Day Checkbox */}
      <div className="mb-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formValues.allDay}
            onChange={handleAllDayToggle}
            className="w-4 h-4"
          />
          <span>All Day</span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-between mt-4">
        <Btn label="Save" type="primary" btnAction="submit" auth />
      </div>
    </form>
  );
};

export default ScheduleForm;
