import ConsultationCard from "./ConsultationCard";

export default function DoctorsMiniConsultations({ consultations }: any) {
  return (
    <div className="grid gap-4 border-b border-gray-200 pb-6">
      {consultations.map((consult: any, i: number) => (
        <ConsultationCard
          key={i}
          patientName={consult.patientName}
          appointmentTime={consult.appointmentTime}
          imageUrl={consult.imageUrl}
          meetingLink={consult.meetingLink}
        />
      ))}
    </div>
  );
}
