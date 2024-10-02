import React, { useState } from "react";
import { dummyDrugList } from "../../lib/dashboardUtils";
import Btn from "../UI/Btn";
import { Prescription, Drug } from "../../types/types"; // Assuming you have a Drug type
import { IoCloseCircleSharp } from "react-icons/io5";

interface AddPrescriptionFormProps {
  addPrescription: (prescription: Prescription) => void;
  goToConfirmation: () => void;
}

export default function AddPrescriptionForm({
  addPrescription,
  goToConfirmation,
}: AddPrescriptionFormProps) {
  const [selectedMedication, setSelectedMedication] = useState<Drug | null>(
    null,
  );
  const [tabs, setTabs] = useState("");
  const [frequency, setFrequency] = useState("");
  const [timeframe, setTimeframe] = useState("Daily");
  const [refill, setRefill] = useState("No");
  const [refillDate, setRefillDate] = useState("");
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  // Handle medication selection (now sets the entire drug object)
  const handleMedicationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDrug = dummyDrugList.find(
      (drug) => drug.id === e.target.value,
    );
    setSelectedMedication(selectedDrug || null);
  };

  // Handle adding the medication to the list
  const addMedication = () => {
    if (selectedMedication) {
      const newPrescription: Prescription = {
        dosage: `${tabs} • ${frequency} • ${timeframe}`,
        refill,
        ...(refill === "Yes" && { refillDate }), // Only include refillDate if it's set to Yes
        drug: selectedMedication, // Add the entire selected medication object
      };

      setPrescriptions([...prescriptions, newPrescription]);

      // Reset the form fields for new input
      setTabs("");
      setFrequency("");
      setTimeframe("Daily");
      setRefill("No");
      setRefillDate("");
    }
  };

  // Remove medication from the list
  const removeMedication = (index: number) => {
    setPrescriptions(prescriptions.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (prescriptions.length > 0) {
      prescriptions.forEach((prescription) => addPrescription(prescription));

      // Move to the confirmation step
      goToConfirmation();
    } else {
      alert("Please add at least one medication.");
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 mb-4">
          {/* Medication Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Medication
            </label>
            <select
              onChange={handleMedicationChange}
              className="mt-1 input"
              value={selectedMedication?.name || ""}
            >
              <option value="">Select</option>
              {dummyDrugList.map((drug, i) => (
                <option key={i} value={drug.id}>
                  {drug.name}
                </option>
              ))}
            </select>
          </div>

          {/* Conditionally Render Other Inputs */}
          {selectedMedication && (
            <>
              {/* Dosage Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dosage
                </label>
                <div className="flex flex-col space-y-4">
                  {/* Tabs */}
                  <select
                    className="input"
                    value={tabs}
                    onChange={(e) => setTabs(e.target.value)}
                  >
                    <option value="">Amount of Tab</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    {/* Add more dosage types as needed */}
                  </select>

                  {/* Frequency */}
                  <select
                    className="input"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                  >
                    <option value="">Frequency</option>
                    <option value="2x">2x</option>
                    <option value="3x">3x</option>
                    <option value="4x">4x</option>
                  </select>

                  {/* Timeframe */}
                  <select
                    className="input"
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
              </div>

              {/* Refill Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Refill
                </label>
                <select
                  className="mt-1 input"
                  value={refill}
                  onChange={(e) => setRefill(e.target.value as "Yes" | "No")}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              {/* Conditionally show Refill Date if Refill is Yes */}
              {refill === "Yes" && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Refill Date
                  </label>
                  <input
                    placeholder="YYYY/MM/DD e.g: 2024-06-23"
                    type="text"
                    className="input"
                    value={refillDate}
                    onChange={(e) => setRefillDate(e.target.value)}
                  />
                </div>
              )}

              {/* Display list of added prescriptions */}
              {prescriptions.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {prescriptions.map((prescription, i) => (
                    <div
                      key={i}
                      className="flex items-center bg-gray-100 px-3 py-1 rounded-md"
                    >
                      <span>{prescription.drug.name}</span>
                      <IoCloseCircleSharp
                        className="ml-2 cursor-pointer text-red-600"
                        onClick={() => removeMedication(i)}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Add Medication Button */}
              <button
                type="button"
                className="formAdd mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={addMedication}
              >
                <span className="font-bold text-lg">+</span> Add Medication
              </button>
            </>
          )}
        </div>

        {/* Submit Button */}
        <Btn label="Send with Results" type="primary" form />
      </form>
    </div>
  );
}
