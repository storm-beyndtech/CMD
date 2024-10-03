import Alert from "../UI/Alert";
import Btn from "../UI/Btn";

export default function DocAvailabilityForm({
  onSubmit,
  formValues,
  isLoading,
  error,
  setFormValues,
}: any) {

  // Handle checkbox toggle for days
  const toggleDay = (day: string, index: number) => {
    const newDays = formValues.availability[index].days.includes(day)
      ? formValues.availability[index].days.filter((d: string) => d !== day)
      : [...formValues.availability[index].days, day];
  
    setFormValues({
      ...formValues,
      availability: formValues.availability.map((avail:any, i:number) =>
        i === index ? { ...avail, days: newDays } : avail
      ),
    });
  };
  

  // Handle all-day toggle for each availability object
  const handleAllDayToggle = (index: number) => {
    const updatedAvailability = formValues.availability.map(
      (avail: any, i: number) =>
        i === index
          ? {
              ...avail,
              allDay: !avail.allDay,
            }
          : avail,
    );

    setFormValues({
      ...formValues,
      availability: updatedAvailability,
    });
  };

  return (
    <form
      className="w-full sm:min-w-[500px] flex flex-col sm:px-8 px-4 mx-auto bg-white rounded-[14px]"
      onSubmit={onSubmit}
      autoComplete="off"
    >
      {formValues.availability.map((availability:any, index:number) => (
        <div key={index} className="mb-6 border-b pb-6">
          <h3 className="text-lg font-semibold mb-4">
            Availability {index + 1}
          </h3>

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
                    onChange={() => toggleDay(day, index)}
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
                  availability: formValues.availability.map((avail:any, i:number) =>
                    i === index
                      ? { ...avail, startTime: e.target.value }
                      : avail,
                  ),
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
                  availability: formValues.availability.map((avail:any, i:number) =>
                    i === index ? { ...avail, endTime: e.target.value } : avail,
                  ),
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
                onChange={() => handleAllDayToggle(index)}
                className="w-4 h-4"
              />
              <span>Available All Day</span>
            </label>
          </div>
        </div>
      ))}

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
