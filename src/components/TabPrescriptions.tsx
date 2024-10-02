import { useState } from "react";
import {
  ActivePrescription,
  CompletedPrescription,
} from "./PrescriptionStatuses";
import Prescriptions from "./Prescriptions";
import { consultations } from "../lib/dashboardUtils";

export default function TabPrescriptions() {
  const [activeTab, setActiveTab] = useState<"Pending" | "Active" | "Previous">(
    "Pending",
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "Pending":
        return <Prescriptions prescriptions={consultations[0].prescriptions} />;
      case "Active":
        return (
          <ActivePrescription prescriptions={consultations[0].prescriptions} />
        );
      case "Previous":
        return (
          <CompletedPrescription
            prescriptions={consultations[0].prescriptions}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-[#383E49] mb-1">
        Prescription
      </h2>
      <p className="text-[#858D9D] mb-5">
        Track the status of your prescriptions.
      </p>

      {/* Tab content */}
      <div className="mt-8 bg-white rounded-[14px]">
        {/* Tab headers */}
        <div className="w-full h-[66px] flex mb-5">
          <button
            className={`authTab !text-base ${
              activeTab === "Pending"
                ? "!text-secondary3 border-secondary3"
                : "!font-normal"
            }`}
            onClick={() => setActiveTab("Pending")}
          >
            Pending
          </button>

          <button
            className={`authTab !text-base ${
              activeTab === "Active"
                ? "!text-secondary3 border-secondary3"
                : "!font-normal"
            }`}
            onClick={() => setActiveTab("Active")}
          >
            Active
          </button>

          <button
            className={`authTab !text-base ${
              activeTab === "Previous"
                ? "!text-secondary3 border-secondary3"
                : "!font-normal"
            }`}
            onClick={() => setActiveTab("Previous")}
          >
            Previous
          </button>
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
}
