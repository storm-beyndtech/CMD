import { FiArrowRight } from "react-icons/fi";
import result1 from "../assets/result-1.svg";
import result2 from "../assets/result-2.svg";
import { Link } from "react-router-dom";

export default function ConsultationResultsMini() {
  return (
    <div className="w-full p-6 rounded-[14px] bg-white">
      {/* Title and Appointment Info */}
      <h2 className="text-lg font-semibold text-[#383E49] mb-1">
        Consultation Results
      </h2>
      <p className="text-sm text-[#9aa0ad] mb-4">
        From your last appointment,{" "}
        <span className="font-medium">19:00 - Sep 11, 2024</span>
      </p>

      {/* Patient Symptoms and Description */}
      <p className="text-sm text-[#4D5562] mb-4">
        Patient presented with symptoms of fatigue and shortness of breath.
        Possible anemia or vitamin deficiency...
      </p>

      {/* Results Preview */}
      <div className="flex items-center space-x-2 mb-4">
        <img
          src={result1}
          alt="result-preview-1"
          className="w-10 h-10 rounded-md object-cover"
        />
        <img
          src={result2}
          alt="result-preview-2"
          className="w-10 h-10 rounded-md object-cover"
        />
      </div>

      {/* Link to See Results & Prescriptions */}
      <div>
        <Link
          to={`/dashboard/patient/consultations/${1}`}
          className="flex items-center text-[#7F56D9] text-sm font-semibold hover:text-[#6E44B9]"
        >
          See Results & Prescriptions <FiArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
}
