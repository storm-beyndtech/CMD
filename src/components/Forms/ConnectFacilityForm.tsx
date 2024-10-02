import { useState } from "react";
import { labs } from "../../lib/dashboardUtils";
import { TbArrowUpRight } from "react-icons/tb";
import locationIcon from "../../assets/icons/location.svg";
import Btn from "../UI/Btn";

export default function ConnectFacilityForm() {
  const [facilityType, setFacilityType] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedLab, setSelectedLab] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLab(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle facility connection (send facilityType, notes, selectedLab)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-h-[500px] overflow-y-scroll no-scrollbar"
    >
      {/* Facility Type Dropdown */}
      <div className="mb-4">
        <label
          htmlFor="facilityType"
          className="block text-sm font-medium text-gray-700"
        >
          Facility Type
        </label>
        <select
          id="facilityType"
          value={facilityType}
          onChange={(e) => setFacilityType(e.target.value)}
          className="!mt-1.5 input !sm:text-sm"
        >
          <option value="" disabled>
            Select Type
          </option>
          <option value="Lab">Lab</option>
          <option value="Pharmacy">Pharmacy</option>
          <option value="Clinic">Clinic</option>
        </select>
      </div>

      {/* Additional Notes */}
      <div className="mb-4">
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700"
        >
          Additional Notes for Facility
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any additional note you want to add along with your patient notes?"
          className="!mt-1.5 input !sm:text-sm"
          rows={4}
        ></textarea>
      </div>

      {/* Available Nearby Labs */}
      {facilityType.length > 0 &&
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Available Nearby Labs
          </h3>
          <div className="grid gap-4">
            {labs.map((lab) => (
              <label
                key={lab.id}
                className="border-t border-gray-200 pt-4 flex items-start gap-4"
              >
                <input
                  type="radio"
                  name="lab"
                  value={lab.id}
                  checked={selectedLab === lab.id}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <div className="flex items-start gap-4">
                  <img
                    src={lab.image}
                    alt={lab.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      {lab.name}
                    </h4>
                    <a
                      href={lab.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 text-xs flex items-center gap-1"
                    >
                      View on Maps <TbArrowUpRight />
                    </a>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <img
                        src={locationIcon}
                        alt="location"
                        className="w-4 h-4"
                      />
                      {lab.address}
                    </p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      }

      {/* Submit Button */}
      <div className="mt-6">
        <Btn label="Send to Facility" type="primary" form />
      </div>
    </form>
  );
}
