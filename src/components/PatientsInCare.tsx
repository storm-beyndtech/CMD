import { Link } from "react-router-dom";
import locationIcon from "../assets/icons/location.svg";

export default function PatientsInCare({ patient }: any) {
  return (
    <div className="p-2 sm:p-6 rounded-[14px] bg-white w-full shadow-sm">
      <div className="flex items-start sm:gap-4 gap-2">
        <img
          className="w-[35px] h-[35px] sm:w-[75px] sm:h-[75px] object-cover"
          src={patient.imageUrl}
        />
        <div>
          <p className="sm:text-lg font-semibold text-[#2B2F38]">
            {patient.patientName}
          </p>
          <p className="text-xs text-[#9ea1a7] my-1.5">
            Consultation, {patient.appointmentTime}
          </p>
          <p className="text-sm text-[#5D6679] mt-1 flex items-center gap-2 mb-4">
            <img src={locationIcon} alt="location" />
            {patient.location}
          </p>

          <Link
            to={`/dashboard/partner/doctor/consultations/patient-in-care/${patient.id}`}
            className="text-secondary text-sm font-semibold"
          >
            Go to Patient →
          </Link>
        </div>
      </div>
    </div>
  );
}
