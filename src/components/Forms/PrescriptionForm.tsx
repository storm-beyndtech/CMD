import React, { useState } from "react";
import PrescriptionConfirmation from "../PrescriptionConfirmation";
import AddPrescriptionForm from "./AddPrescriptionForm";
import { Prescription } from "../../types/types";

const PrescriptionForm: React.FC = () => {
  const [isConfirmationStep, setIsConfirmationStep] = useState(false);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  // Function to add a new prescription from the form
  const handleAddPrescription = (newPrescription: Prescription) => {
    setPrescriptions([...prescriptions, newPrescription]);
  };

  // Function to move to the confirmation step
  const goToConfirmation = () => {
    setIsConfirmationStep(true);
  };

  // Function to go back to the form step
  const goBackToForm = () => {
    setIsConfirmationStep(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-lg mx-auto">
      {isConfirmationStep ? (
        // If in confirmation step, show the PrescriptionConfirmation component
        <PrescriptionConfirmation
          prescriptions={prescriptions}
          goBack={goBackToForm}
        />
      ) : (
        // Otherwise, show the PrescriptionForm component
        <AddPrescriptionForm
          addPrescription={handleAddPrescription}
          goToConfirmation={goToConfirmation}
        />
      )}
    </div>
  );
};

export default PrescriptionForm;
