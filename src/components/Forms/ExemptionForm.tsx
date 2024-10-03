import React, { useState } from "react";
import Alert from "../UI/Alert";
import Btn from "../UI/Btn";
import CustomCalendar from "../CustomCalendar";

interface Exemption {
  dates: string[]; // Update this to selectedDates or dateRange
  startTime: string;
  endTime: string;
  allDay: boolean;
}

interface ExemptionFormProps {
  exemption?: Exemption;
  onSubmit: (formValues: any) => void; // Function to handle form submission
  isLoading: boolean; // Loading state for the button
  error: string | null; // Error message if any
}

const ExemptionForm: React.FC<ExemptionFormProps> = ({
  exemption = { dates: [], startTime: "", endTime: "", allDay: false },
  onSubmit,
  isLoading,
  error,
}) => {
  const [formValues, setFormValues] = useState(exemption);

  // Handle all-day toggle
  const handleAllDayToggle = () => {
    setFormValues({
      ...formValues,
      allDay: !formValues.allDay,
    });
  };

  const handleDateSelect = (dates: string[]) => {
    setFormValues({
      ...formValues,
      dates: [...dates, ...formValues.dates],
    });
  };

  return (
    <div>
      {/* Calendar Component for Date Selection */}
      <CustomCalendar
        onDateSelect={handleDateSelect}
        setCloseDate={() => {}}
        isSelectDate
      />

      <div className="flex gap-5">
        {/* Start Time Input */}
        <div className="mb-6 w-full">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Start Time
          </label>
          <input
            type="time"
            value={formValues?.startTime || ""}
            className="input"
            onChange={(e) =>
              setFormValues({
                ...formValues,
                startTime: e.target.value,
              })
            }
            disabled={formValues?.allDay}
          />
        </div>

        {/* End Time Input */}
        <div className="mb-6 w-full">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            End Time
          </label>
          <input
            type="time"
            value={formValues?.endTime || ""}
            className="input"
            onChange={(e) =>
              setFormValues({
                ...formValues,
                endTime: e.target.value,
              })
            }
            disabled={formValues?.allDay}
          />
        </div>
      </div>

      {/* All Day Checkbox */}
      <div className="mb-6">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formValues?.allDay}
            onChange={handleAllDayToggle}
            className="w-4 h-4"
          />
          <span>Exempt All Day</span>
        </label>
      </div>

      {/* Error Message */}
      {error && <Alert type="danger" message={error} />}

      {/* Submit Button */}
      <div className="text-center my-8" onClick={() => onSubmit(formValues)}>
        <Btn label="Submit" type="primary" disabled={isLoading} auth />
      </div>
    </div>
  );
};

export default ExemptionForm;
