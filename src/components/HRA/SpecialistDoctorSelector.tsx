import React from "react";
import { LuCheck } from "react-icons/lu";
import badge from "../../assets/icons/badge.svg";

interface Doctor {
  id: string;
  name: string;
  img: string;
  position: string;
  hospitals: string;
}

interface SpecialistDoctorSelectorProps {
  selectedSpecialist: string | null;
  onSpecialistSelect: (specialist: string) => void;
  doctors: Doctor[];
  manualDoctorSelection: boolean;
  setManualDoctorSelection: (value: boolean) => void;
  selectedDoctor: string | null;
  onDoctorSelect: (doctorName: string) => void;
}

const SpecialistDoctorSelector: React.FC<SpecialistDoctorSelectorProps> = ({
  selectedSpecialist,
  onSpecialistSelect,
  doctors,
  manualDoctorSelection,
  setManualDoctorSelection,
  selectedDoctor,
  onDoctorSelect,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Specialist Selector */}
      <div>
        <p className="text-lg font-semibold text-[#383E49]">Specialist Type</p>
        <p className="text-[#667085] my-1 text-sm">
          Select the type of specialist you are looking for
        </p>
        <select
          id="specialist"
          className="input"
          value={selectedSpecialist ?? ""}
          onChange={(e) => onSpecialistSelect(e.target.value)}
        >
          <option value="">Select Specialist</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Neonatal Consultant">Neonatal Consultant</option>
          <option value="Oncologist">Oncologist</option>
          <option value="Otolaryngologist">Otolaryngologist</option>
        </select>
      </div>

      {/* Manual Doctor Selection Checkbox */}
      <div className="flex items-center gap-2 relative">
        <input
          type="checkbox"
          className="opacity-0 w-full h-5 absolute z-[2] top-0 left-0 cursor-pointer"
          checked={manualDoctorSelection}
          onChange={() => setManualDoctorSelection(!manualDoctorSelection)}
        />
        <div
          className={`w-5 h-5 border-[1.5px] cursor-pointer ${
            manualDoctorSelection ? "border-secondary3" : "border-gray-400"
          } rounded-md p-1.5 absolute top-1px left-0 z-[1] grid place-content-center`}
        >
          <LuCheck
            className={`text-[12px] ${
              manualDoctorSelection ? "block text-secondary3" : "hidden"
            }`}
          />
        </div>
        <label className="z-[1] font-medium text-[#383E49] pl-8">
          Select your specialist manually
        </label>
      </div>

      {/* Doctor Selector */}
      {manualDoctorSelection && (
        <div className="py-5">
          <p className="text-lg font-semibold text-[#383E49]">
            Available Specialist
          </p>
          <p className="text-[#667085] my-1 text-sm">
            Select a specialist you would like attending to you
          </p>
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="flex items-center gap-4 p-4 cursor-pointer pt-6"
              onClick={() => onDoctorSelect(doctor.id)}
            >
              <input
                type="radio"
                name="doctor"
                checked={selectedDoctor === doctor.id}
                onChange={() => onDoctorSelect(doctor.id)}
                className="hidden" // Hide the default radio button
              />
              <div
                className={`w-5 h-5 border-[1.5px] rounded-full flex items-center justify-center ${
                  selectedDoctor === doctor.id ? "border-secondary3" : "border-gray-300"
                } cursor-pointer flex-shrink-0`}
                onClick={() => onDoctorSelect(doctor.id)}
              >
                {selectedDoctor === doctor.id && (
                  <div className="w-2.5 h-2.5 bg-secondary3 rounded-full"></div>
                )}
              </div>
              <img
                src={doctor.img}
                alt={doctor.name}
                className="w-[110px] h-[110px] rounded-[10px] object-cover"
              />
              <div className="grid gap-1.5">
                <p className="font-semibold text-[#2B2F38]">{doctor.name}</p>
                <p className="text-sm text-[#483380] font-medium">
                  {doctor.position}
                </p>
                <div className="flex items-start gap-1">
                  <img src={badge} alt="badge" width={22.5} />
                  <p className="text-[#5D6679] text-xs leading-5">
                    {doctor.hospitals}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecialistDoctorSelector;
