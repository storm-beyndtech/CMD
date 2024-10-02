


import DoctorsMiniConsultations from "../../components/DoctorsMiniConsultations";
import avatar1 from "../../assets/avatar/avatar-1.svg";
import avatar2 from "../../assets/avatar/avatar-2.svg";
import PatientsInCare from "../../components/PatientsInCare";
import ConsultationHistory from "../../components/ConsultationHistory";

export default function DocConsultations() {
  const consultations = [
    {
      patientName: "John Doe",
      appointmentTime: "Sep 15, 2024, 10:00 AM",
      imageUrl: avatar1,
      meetingLink: "https://meet.google.com/edr-ghj-yti",
    },
    {
      patientName: "Jane Doe",
      appointmentTime: "Sep 15, 2024, 11:00 AM",
      imageUrl: avatar2,
      meetingLink: "https://meet.google.com/xyz-abc",
    },
    {
      patientName: "John Doe",
      appointmentTime: "Sep 15, 2024, 10:00 AM",
      imageUrl: avatar1,
      meetingLink: "https://meet.google.com/edr-ghj-yti",
    },
    {
      patientName: "Jane Doe",
      appointmentTime: "Sep 15, 2024, 11:00 AM",
      imageUrl: avatar2,
      meetingLink: "https://meet.google.com/xyz-abc",
    },
    {
      patientName: "John Doe",
      appointmentTime: "Sep 15, 2024, 10:00 AM",
      imageUrl: avatar1,
      meetingLink: "https://meet.google.com/edr-ghj-yti",
    },
    {
      patientName: "Jane Doe",
      appointmentTime: "Sep 15, 2024, 11:00 AM",
      imageUrl: avatar2,
      meetingLink: "https://meet.google.com/xyz-abc",
    },
    {
      patientName: "John Doe",
      appointmentTime: "Sep 15, 2024, 10:00 AM",
      imageUrl: avatar1,
      meetingLink: "https://meet.google.com/edr-ghj-yti",
    },
    {
      patientName: "Jane Doe",
      appointmentTime: "Sep 15, 2024, 11:00 AM",
      imageUrl: avatar2,
      meetingLink: "https://meet.google.com/xyz-abc",
    },
    {
      patientName: "John Doe",
      appointmentTime: "Sep 15, 2024, 10:00 AM",
      imageUrl: avatar1,
      meetingLink: "https://meet.google.com/edr-ghj-yti",
    },
    {
      patientName: "Jane Doe",
      appointmentTime: "Sep 15, 2024, 11:00 AM",
      imageUrl: avatar2,
      meetingLink: "https://meet.google.com/xyz-abc",
    },
  ];

  return (
    <div className="w-full p-6 rounded-[14px] bg-white">
      <h2 className="font-semibold text-[#2B2F38]">Today's Consultations</h2>
      <p className="text-xs text-[#9ea1a7] my-1.5 mb-4">
        You have 5 consultations schedule for today
      </p>
      <div className="grid gap-4 border-b border-gray-200 pb-6 mb-6">
        <DoctorsMiniConsultations consultations={consultations} />
      </div>
      <div className="w-full p-6 rounded-[14px] bg-white">
        <div className="grid gap-4">
          {consultations.map((patient, i) => (
            <PatientsInCare key={i} patient={patient} />
          ))}
        </div>
      </div>

      <div className="w-full p-6 rounded-[14px] bg-white">
        <div className="grid gap-4">
          {consultations.map((patient, i) => (
            <ConsultationHistory key={i} patient={patient} />
          ))}
        </div>
      </div>
    </div>
  );
}
