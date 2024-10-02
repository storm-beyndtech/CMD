import Alert from "../UI/Alert";
import Btn from "../UI/Btn";

export default function DocAvailabilityForm({
  onSubmit,
  formValues,
  isLoading,
  error,
  setFormValues,
}: any) {
  const { availability } = formValues;

  // Handle checkbox toggle for days
  const toggleDay = (day: string) => {
    const newDays = availability?.days.includes(day)
      ? availability.days.filter((d: string) => d !== day)
      : [...availability.days, day];

    setFormValues({
      ...formValues,
      availability: {
        ...availability,
        days: newDays,
      },
    });
  };

  // Handle all-day toggle
  const handleAllDayToggle = () => {
    setFormValues({
      ...formValues,
      availability: {
        ...availability,
        allDay: !availability.allDay,
      },
    });
  };

  // Handle Add to Schedule (This allows adding multiple day/time slots)
  // const handleAddToSchedule = () => {
  //   // Append new availability
  //   setFormValues({
  //     ...formValues,
  //     availability: {
  //       ...availability,
  //       days: [...availability.days],
  //     },
  //   });
  // };

  return (
    <form
      className="w-full sm:min-w-[500px] flex flex-col sm:px-8 px-4 mx-auto bg-white rounded-[14px]"
      onSubmit={onSubmit}
      autoComplete="off"
    >
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
                checked={availability?.days.includes(day)}
                onChange={() => toggleDay(day)}
                className="w-4 h-4"
              />
              <span>{day}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Start Time Input */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Start Time
        </label>
        <input
          type="time"
          value={availability?.startTime || ""}
          className="input"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              availability: {
                ...availability,
                startTime: e.target.value,
              },
            })
          }
          disabled={availability?.allDay}
        />
      </div>

      {/* End Time Input */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          End Time
        </label>
        <input
          type="time"
          value={availability?.endTime || ""}
          className="input"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              availability: {
                ...availability,
                endTime: e.target.value,
              },
            })
          }
          disabled={availability?.allDay}
        />
      </div>

      {/* All Day Checkbox */}
      <div className="mb-6">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={availability?.allDay}
            onChange={handleAllDayToggle}
            className="w-4 h-4"
          />
          <span>Available All Day</span>
        </label>
      </div>

      {/* <button type="button" className="formAdd" onClick={handleAddToSchedule}>
        <span className="font-bold text-lg">+</span> Add To Schedule
      </button> */}

      <p className="text-xs text-warning mt-4">
        Add Days and Time Variants, e.g Mon: 9am - 9pm, Sat: 10am - 2pm
      </p>

     
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
}
