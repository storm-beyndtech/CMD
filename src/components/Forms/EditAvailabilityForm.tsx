import React, { useState, useEffect } from "react";
import Alert from "../UI/Alert";
import Btn from "../UI/Btn";

interface Availability {
  days: string[];
  startTime: string;
  endTime: string;
  allDay: boolean;
}

interface EditAvailabilityFormProps {
  availability: Availability[]; // Expecting an array of availability slots
  onSubmit: (formValues: Availability[]) => void; // Function to handle form submission
  isLoading: boolean; // Loading state for the button
  error: string | null; // Error message if any
}

const EditAvailabilityForm: React.FC<EditAvailabilityFormProps> = ({
  availability,
  onSubmit,
  isLoading,
  error,
}) => {
  const [formValues, setFormValues] = useState<Availability[]>(availability); // Initialize state as an array

  useEffect(() => {
    // Update form values whenever availability prop changes
    setFormValues(availability);
  }, [availability]);

  // Handle checkbox toggle for days
  const toggleDay = (index: number, day: string) => {
    const newAvailability = [...formValues];
    const currentDays = newAvailability[index].days;

    newAvailability[index].days = currentDays.includes(day)
      ? currentDays.filter((d) => d !== day)
      : [...currentDays, day];

    setFormValues(newAvailability);
  };

  // Handle all-day toggle
  const handleAllDayToggle = (index: number) => {
    const newAvailability = [...formValues];
    newAvailability[index].allDay = !newAvailability[index].allDay;
    
    setFormValues(newAvailability);
  };

  // Handle time changes
  const handleTimeChange = (index: number, type: 'startTime' | 'endTime', value: string) => {
    const newAvailability = [...formValues];
    newAvailability[index][type] = value;
    setFormValues(newAvailability);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues); // Pass updated form values to the parent handler
  };

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      {/* Availability Slots */}
      {formValues.map((slot, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <h3 className="font-semibold mb-2">Availability Slot {index + 1}</h3>
          
          {/* Days Input */}
          <label className="block text-gray-700 text-sm font-medium mb-4">
            Select Available Days
          </label>
          <div className="grid grid-cols-3 gap-4">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
              <label key={day} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={slot.days.includes(day)}
                  onChange={() => toggleDay(index, day)}
                  className="w-4 h-4"
                />
                <span>{day}</span>
              </label>
            ))}
          </div>

          {/* Start Time Input */}
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Start Time
            </label>
            <input
              type="time"
              value={slot.startTime}
              className="input"
              onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)}
              disabled={slot.allDay}
            />
          </div>

          {/* End Time Input */}
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              End Time
            </label>
            <input
              type="time"
              value={slot.endTime}
              className="input"
              onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)}
              disabled={slot.allDay}
            />
          </div>

          {/* All Day Checkbox */}
          <div className="mb-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={slot.allDay}
                onChange={() => handleAllDayToggle(index)}
                className="w-4 h-4"
              />
              <span>Available All Day</span>
            </label>
          </div>
        </div>
      ))}

      {/* Error Message */}
      {error && <Alert type="danger" message={error} />}

      {/* Submit Button */}
      <div className="text-center my-8">
        <Btn
          label="Submit"
          type="primary"
          disabled={isLoading}
          btnAction="submit"
          auth
        />
      </div>
    </form>
  );
};

export default EditAvailabilityForm;
