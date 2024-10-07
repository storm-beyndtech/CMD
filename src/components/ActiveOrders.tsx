import React from "react";
import PrescriptionCard from "./PrescriptionCard";
import { consultations } from "../lib/dashboardUtils";

const ActiveOrders: React.FC = () => {
  return (
    <div className="active-orders-container">
      <h2 className="text-xl font-semibold">Active Orders</h2>
      <p className="text-gray-600">You have {consultations.length} orders in total</p>

      {consultations.map((consultation) => (
        <div key={consultation.id} className="consultation-block my-5">
          {/* Patient Details */}
          <div className="flex items-center mb-2">
            <div className="patient-avatar mr-3">
              {/* Add an avatar image or icon for the patient */}
              <img
                src="/path-to-avatar.png"
                alt={consultation.patientDetails.name}
                className="rounded-full w-10 h-10"
              />
            </div>
            <div className="patient-info">
              <h4 className="text-lg font-medium">{consultation.patientDetails.name}</h4>
              <p className="text-sm text-gray-500">Received {consultation.date}, 10:00 AM</p>
            </div>
          </div>

          {/* Prescription Cards */}
          <div className="w-full flex gap-6 overflow-x-scroll no-scrollbar my-5">
            {consultation.prescriptions.map((prescription, i) => (
              <PrescriptionCard key={i} prescription={prescription} />
            ))}
          </div>
        </div>
      ))}

      {/* Footer: View All Orders */}
      <div className="text-right">
        <button className="text-indigo-600 font-medium">See All Orders →</button>
      </div>
    </div>
  );
};

export default ActiveOrders;
