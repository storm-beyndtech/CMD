import Alert from "../UI/Alert";
import Btn from "../UI/Btn";
import calendarIcon from "../../assets/icons/calendar-2.svg";
import globeIcon from "../../assets/icons/global-2.svg";
import hospitalIcon from "../../assets/icons/hospital-2.svg";

const labList = [
  { name: "Select Laboratory", value: "none" },
  {
    name: "Tripea Consulting Laboratory",
    value: "Tripea Consulting Laboratory",
  },
  {
    name: "Tripea Consulting Laboratory",
    value: "Tripea Consulting Laboratory",
  },
];

export default function HRAForm({
  onSubmit,
  handleChange,
  formValues,
  isLoading,
  error,
}: any) {
  const {
    dateTime,
    timeZone,
    labLocation,
    condition,
    currentMedications,
    currentLocation,
    preferredLab,
  } = formValues;

  return (
    <form
      className="px-7 py-8 max-w-[540px] mx-auto bg-white rounded-2xl"
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <div className="grid gap-5 py-4">
        <div className="flex items-center gap-3">
          <img src={calendarIcon} alt="search" />
          <p>{dateTime}</p>
        </div>
        <div className="flex items-center gap-3">
          <img src={globeIcon} alt="light" />
          <p>{timeZone}</p>
        </div>
        <div className="flex items-center gap-3">
          <img src={hospitalIcon} alt="activity" />
          <p>{labLocation}</p>
        </div>
      </div>

      <div className="pt-4">
        <p className="text-lg font-semibold text-[#383E49] my-4">
          Describe your condition
        </p>
        <textarea
          value={condition}
          onChange={(e) => handleChange("condition", e.target.value)}
          className="input"
          placeholder="Please add as much as the doctor should know about your condition"
          rows={4}
        />
      </div>

      <div className="pt-4">
        <p className="text-lg font-semibold text-[#383E49] mb-3">
          Are you on any current medications?
        </p>
        <select
          id="currentMedications"
          className="input"
          value={currentMedications}
          onChange={(e) => handleChange("currentMedications", e.target.value)}
        >
          {[
            { name: "No", value: "false" },
            { name: "Yes", value: "true" },
          ].map((lab, i) => (
            <option key={i} value={lab.value}>
              {lab.name}
            </option>
          ))}
        </select>
      </div>

      <div className="pt-4">
        <p className="text-lg font-semibold text-[#383E49] mb-3">Current Location</p>
        <input
          type="text"
          value={currentLocation}
          placeholder="Enter your full address"
          className="input"
          onChange={(e) => handleChange("currentLocation", e.target.value)}
        />
      </div>

      <div className="pt-4">
        <p className="text-lg font-semibold text-[#383E49]">
          Preferred Medical Laboratory
        </p>
        <p className="text-[#667085] my-1 text-sm mb-3">
          Select from partner labs nearby for your tests{" "}
        </p>
        <select
          id="preferredLab"
          className="input"
          value={preferredLab}
          onChange={(e) =>
            handleChange("preferredLab", e.target.value)
          }
        >
          {labList.map((lab, i) => (
            <option key={i} value={lab.value}>
              {lab.name}
            </option>
          ))}
        </select>
      </div>

      <div className="my-5">
        <Btn
          type="primary"
          label="Confirm & Book Appointment"
          form
          disabled={isLoading}
        />
      </div>

      {error && (
        <div className="mt-8">
          <Alert type="danger" message={error} />
        </div>
      )}
    </form>
  );
}
