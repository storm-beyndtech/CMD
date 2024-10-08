import { useEffect, useState } from "react";
import { Consultation } from "../../types/types";
import ConsultationsList from "../../components/ConsultationList";
import ConsultationResults from "../../components/ConsultationResults";
import { useParams } from "react-router-dom";
import { sendRequest } from "../../utility/sendRequest";
import PageLoader from "../../components/PageLoader";


export default function PatientConsultations() {
  // State to keep track of which consultation is selected
  const [consultations, setConsultations] = useState<Consultation[] | null>(null);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [fetching, setFetching] = useState(false);
  const { id } = useParams<{ id: string }>();


	// Extend Day.js with advanced formatting options
  const fetchConsultations = async () => {
    setFetching(true)
		const res = await sendRequest("/members/consultations", "GET");
    setConsultations(res.data.docs);
    setFetching(false)
	};

	console.log(consultations);
	useEffect(() => {
		fetchConsultations();
  }, []);
  
  // Effect to handle the id parameter
  useEffect(() => {
    if (id) {
      if (consultations) setSelectedConsultation(consultations.find(c => c._id === id) as Consultation);
      else {
        alert("Consultations not found")
      }
    }
  }, [id]);

  // Function to handle when a consultation is selected from the list
  const handleSelectConsultation = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
  };

  // Function to go back to the consultations list
  const handleBackToList = () => {
    setSelectedConsultation(null); 
  };

  if (fetching) {
    return <PageLoader />
  }

  return (
    <div className="w-full">
      {/* Show consultations list or details based on the state */}
      {!selectedConsultation ? (
        <ConsultationsList onSelectConsultation={handleSelectConsultation} consultations={consultations || []}/>
      ) : (
        <ConsultationResults consultation={selectedConsultation} onBack={handleBackToList} />
      )}
    </div>
  );
}
