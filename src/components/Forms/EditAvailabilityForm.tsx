import React, { useState, useEffect } from "react";
import Alert from "../UI/Alert";
import Btn from "../UI/Btn";
import ScheduleForm from "./ScheduleForm";
import { BiMessageSquareEdit } from "react-icons/bi";

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
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track which availability is being edited
  const [showNewScheduleForm, setShowNewScheduleForm] = useState(false); // Control form display for adding new schedules

  useEffect(() => {
    setFormValues(availability);
  }, [availability]);

  // Handle form submission for editing/adding schedule
  const handleSubmit = (updatedAvailability: Availability) => {
    if (editingIndex !== null) {
      const newAvailability = [...formValues];
      newAvailability[editingIndex] = updatedAvailability;
      setFormValues(newAvailability);
      setEditingIndex(null); // Close edit form
    } else {
      setFormValues([...formValues, updatedAvailability]); // Add new availability
      setShowNewScheduleForm(false); // Close new schedule form
    }
  };

  // Handle deleting availability
  // const handleDelete = (index: number) => {
  //   const newAvailability = formValues.filter((_, i) => i !== index);
  //   setFormValues(newAvailability);
  // };

  if (editingIndex !== null || showNewScheduleForm)
    return (
      <ScheduleForm
        currentValues={editingIndex !== null ? formValues[editingIndex] : null}
        onSubmit={handleSubmit}
        existingDays={formValues.flatMap((slot) => slot.days)} // To prevent duplicate days when adding new
        onCancel={() => {
          setEditingIndex(null);
          setShowNewScheduleForm(false);
        }}
      />
    );

  return (
    <div className="w-full">
      {/* Existing Availability List */}
      {formValues.map((slot, index) => (
        <div
          key={index}
          className="mb-6 flex items-center justify-between border-b pb-4"
        >
          <div className="grid gap-1">
            <p className="font-medium">{slot.days.join(", ")} </p>
            <p className="text-sm text-gray-500">
              {slot.allDay ? "All Day" : `${slot.startTime} - ${slot.endTime}`}
            </p>
          </div>
          {/* Edit Icon */}
          <div>
            <BiMessageSquareEdit
              className="text-xl cursor-pointer text-gray-400"
              onClick={() => setEditingIndex(index)}
            />
          </div>
        </div>
      ))}

      {/* Add New Schedule Button */}
      <button className="formAdd" onClick={() => setShowNewScheduleForm(true)}>
        Add New Schedule
      </button>

      {/* Error Message */}
      {error && <Alert type="danger" message={error} />}

      {/* Done Button */}
      <div className="text-center my-8" onClick={() => onSubmit(formValues)}>
        <Btn label="Done" type="primary" disabled={isLoading} auth />
      </div>
    </div>
  );
};

export default EditAvailabilityForm;
