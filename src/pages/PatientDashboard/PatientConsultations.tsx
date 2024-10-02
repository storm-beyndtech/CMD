import { useEffect, useState } from "react";
import { Consultation } from "../../types/types";
import ConsultationsList from "../../components/ConsultationList";
import ConsultationResults from "../../components/ConsultationResults";
import { useParams } from "react-router-dom";
import { consultations } from "../../lib/dashboardUtils";


export default function PatientConsultations() {
  // State to keep track of which consultation is selected
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const { id } = useParams<{ id: string }>();

  // Function to handle when a consultation is selected from the list
  const handleSelectConsultation = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
  };

  // Function to go back to the consultations list
  const handleBackToList = () => {
    setSelectedConsultation(null); 
  };

    // Effect to handle the id parameter
    useEffect(() => {
      if (id) setSelectedConsultation(consultations.find(c => c.id === id) as Consultation);
    }, [id]);

  return (
    <div className="w-full">
      {/* Show consultations list or details based on the state */}
      {!selectedConsultation ? (
        <ConsultationsList onSelectConsultation={handleSelectConsultation} consultations={consultations}/>
      ) : (
        <ConsultationResults consultation={selectedConsultation} onBack={handleBackToList} />
      )}
    </div>
  );
}
