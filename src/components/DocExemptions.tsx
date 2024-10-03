import React from "react";

interface Exemption {
  date: string;
  startTime?: string;
  endTime?: string;
  allDay: boolean;
}

interface ExemptionsProps {
  exemptions: Exemption[];
}

const DocExemptions: React.FC<ExemptionsProps> = ({ exemptions }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Closed Dates / Exemptions</h3>
      <ul className="space-y-2">
        {exemptions.map((exemption, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded-md">
            <div className="font-medium">{exemption.date}</div>
            {exemption.allDay ? (
              <div>All-Day</div>
            ) : (
              <div>
                {exemption.startTime} - {exemption.endTime}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocExemptions;
