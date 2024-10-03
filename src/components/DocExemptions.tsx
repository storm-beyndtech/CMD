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
    <div className="mt-4 p-[22px] rounded-[14px] bg-white">
      <h3 className="text-lg font-semibold text-[#383E49] mb-4">
        Closed Dates / Exemptions
      </h3>
      <ul className="space-y-2">
        {exemptions.map((exemption, index) => (
          <li key={index} className="p-3 border border-gray-200 rounded-2xl">
            <div className="font-medium mb-1">{exemption.date}</div>
            {exemption.allDay ? (
              <p className="text-sm text-gray-400">All-Day</p>
            ) : (
              <p className="text-sm text-gray-400">
                {exemption.startTime} - {exemption.endTime}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocExemptions;
