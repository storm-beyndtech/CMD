import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConsultationDetails from "../../components/ConsultationDetails";
import { docConsultations } from "../../lib/dashboardUtils";
import { FiArrowLeft } from "react-icons/fi";
import dayjs from "dayjs";
import PageLoader from "../../components/PageLoader";

const consultations = docConsultations;

export default function PatientInCare() {
  const navigate = useNavigate()
  const { id } = useParams(); // Extract 'id' from the URL params
  const [consultation, setConsultation] = useState<any>(null);

  useEffect(() => {
    // Simulate fetching data by matching the id
    const fetchConsultation = () => {
      const data = consultations.find((c) => c.id === id);
      setConsultation(data);
    };
    fetchConsultation();
  }, [id]);

  if (!consultation) {
    return <PageLoader />;
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full grid gap-5">
      {/* Back Button */}
      <div className="flex items-start gap-2 mb-3 cursor-pointer">
        <FiArrowLeft className="text-gray-500 pt-1.5 text-2xl" onClick={handleBack}/>
        <div className="flex flex-col items-center justify-start ">
          <h3 className="text-lg font-semibold flex items-center justify-start gap-3">
            Consultation with {consultation.patientName}
          </h3>
          <p className="text-sm text-gray-500 pl-1.5">
            Last Updated,{" "}
            {dayjs(consultation.lastUpdated).format("MMM D, YYYY, h:mm A")}
          </p>
        </div>
      </div>
      <ConsultationDetails consultation={consultation} />
    </div>
  );
}
