import { useState } from "react";
import Alert from "../UI/Alert";
import Btn from "../UI/Btn";
import { IoCloseCircleSharp } from "react-icons/io5";

export default function DocAvailabilityForm({
  onSubmit,
  formValues,
  isLoading,
  error,
  setFormValues,
}: any) {
  // Local state to track the current schedule being added
  const [currentSchedule, setCurrentSchedule] = useState({
    days: [] as string[],
    startTime: "",
    endTime: "",
    allDay: false,
  });

  // Handle checkbox toggle for days in the currentSchedule
  const toggleDay = (day: string) => {
    const newDays = currentSchedule.days.includes(day)
      ? currentSchedule.days.filter((d) => d !== day)
      : [...currentSchedule.days, day];

    setCurrentSchedule({
      ...currentSchedule,
      days: newDays,
    });
  };

  // Handle all-day toggle for the current schedule
  const handleAllDayToggle = () => {
    setCurrentSchedule((prev) => ({
      ...prev,
      allDay: !prev.allDay,
      startTime: "",
      endTime: "",
    }));
  };

  // Check if the schedule is valid (either start/end time is provided or all day is selected)
  const isScheduleValid = () => {
    return (
      currentSchedule.days.length > 0 &&
      (currentSchedule.allDay ||
        (currentSchedule.startTime && currentSchedule.endTime))
    );
  };

  // Add current schedule to the availability list
  const addSchedule = () => {
    if (isScheduleValid()) {
      // Add currentSchedule to availability
      setFormValues({
        ...formValues,
        availability: [...formValues.availability, currentSchedule],
      });

      // Clear the currentSchedule
      setCurrentSchedule({
        days: [],
        startTime: "",
        endTime: "",
        allDay: false,
      });
    }
  };

  // Remove a schedule
  const removeSchedule = (index: number) => {
    const updatedAvailability = formValues.availability.filter(
      (_: any, i: number) => i !== index,
    );
    setFormValues({
      ...formValues,
      availability: updatedAvailability,
    });
  };

  // Check if a day is already selected in any added schedule
  const isDayDisabled = (day: string) => {
    return formValues.availability.some((schedule: any) =>
      schedule.days.includes(day),
    );
  };

  return (
    <form
      className="w-full sm:min-w-[500px] flex flex-col sm:px-8 px-4 mx-auto bg-white rounded-[14px]"
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <div className="border-b">
        <h3 className="text-lg font-semibold mb-4">Add Availability</h3>

        {/* Days Input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-4">
            Select Available Days
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <label key={day} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={currentSchedule.days.includes(day)}
                  onChange={() => toggleDay(day)}
                  className="w-4 h-4"
                  disabled={isDayDisabled(day)} // Disable if day is already in any schedule
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-5 mt-8">
          {/* Start Time Input */}
          <div className="mb-6 w-full">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Start Time
            </label>
            <input
              type="time"
              value={currentSchedule.startTime}
              className="input"
              onChange={(e) =>
                setCurrentSchedule({
                  ...currentSchedule,
                  startTime: e.target.value,
                })
              }
              disabled={currentSchedule.allDay}
            />
          </div>

          {/* End Time Input */}
          <div className="mb-6 w-full">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              End Time
            </label>
            <input
              type="time"
              value={currentSchedule.endTime}
              className="input"
              onChange={(e) =>
                setCurrentSchedule({
                  ...currentSchedule,
                  endTime: e.target.value,
                })
              }
              disabled={currentSchedule.allDay}
            />
          </div>
        </div>
        {/* All Day Checkbox */}
        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={currentSchedule.allDay}
              onChange={handleAllDayToggle}
              className="w-4 h-4"
            />
            <span>Available All Day</span>
          </label>
        </div>

        {/* Add Schedule Button */}
        <button
          type="button"
          className="formAdd mt-4"
          onClick={addSchedule}
          disabled={!isScheduleValid()} // Disable if schedule is invalid
        >
          <span className="font-bold text-lg">+</span> Add Schedule
        </button>
      </div>

      {/* Display Added Schedules */}
      {formValues.availability.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {formValues.availability
            .filter(
              (schedule: any) =>
                // Only show if schedule has allDay or both startTime and endTime filled
                schedule.allDay || (schedule.startTime && schedule.endTime),
            )
            .map((schedule: any, i: number) => (
              <div
                key={i}
                className="text-xs flex items-center bg-gray-100 px-3 py-1 rounded-md"
              >
                <span>
                  {schedule.days.join(", ")} -{" "}
                  {schedule.allDay
                    ? "All Day"
                    : `${schedule.startTime} to ${schedule.endTime}`}
                </span>
                <IoCloseCircleSharp
                  className="ml-2 cursor-pointer text-red-600 text-base"
                  onClick={() => removeSchedule(i)}
                />
              </div>
            ))}
        </div>
      )}

      <p className="text-xs text-warning my-3">
        Add Days and Time Variants, e.g Mon: 9am - 9pm, Sat: 10am - 2pm
      </p>

      {/* Error Message */}
      {error && <Alert type="danger" message={error} />}

      {/* Submit Button */}
      <div className="text-center my-3">
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
}
