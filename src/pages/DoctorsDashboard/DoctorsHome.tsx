import DoctorsMiniConsultations from "../../components/DoctorsMiniConsultations";
import avatar1 from "../../assets/avatar/avatar-1.svg";
import avatar2 from "../../assets/avatar/avatar-2.svg";
import PatientsInCare from "../../components/PatientsInCare";
import { Link } from "react-router-dom";
import DocScheduleDays from "../../components/DocScheduleDays";
import { dummySchedule } from "../../lib/dashboardUtils";

export default function DoctorsHome() {
  const inCare = [
    {
      patientName: "John Doe",
      appointmentTime: "Sep 15, 2024, 10:00 AM",
      location: "Princeton Hospital, Ikeja",
      imageUrl: avatar1,
    },
    {
      patientName: "Jane Doe",
      appointmentTime: "Sep 15, 2024, 11:00 AM",
      location: "Lagos Health Clinic, Lekki",
      imageUrl: avatar2,
    },
    {
      patientName: "John Doe",
      appointmentTime: "Sep 15, 2024, 10:00 AM",
      location: "Princeton Hospital, Ikeja",
      imageUrl: avatar1,
    },
  ];

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
  ];

  return (
    <div className="grid gap-5">
      <DocScheduleDays daysWithInfo={dummySchedule.days} />
      <div className="w-full p-6 rounded-[14px] bg-white">
        <h2 className="font-semibold text-[#2B2F38]">Today's Consultations</h2>
        <p className="text-xs text-[#9ea1a7] my-1.5 mb-4">
          You have 5 consultations schedule for today
        </p>
        <div className="grid gap-4 pb-6">
          <DoctorsMiniConsultations consultations={consultations} />
        </div>

        <Link
          to="/dashboard/partner/doctor/consultations"
          className="hover:bg-gray-100 cursor-pointer text-sm text-secondary"
        >
          See All Consultations →
        </Link>
      </div>

      <div className="w-full p-6 rounded-[14px] bg-white">
        <h2 className="font-semibold mb-4 text-[#2B2F38]">Patients In Care</h2>
        <div className="grid gap-4">
          {inCare.map((patient, i) => (
            <PatientsInCare key={i} patient={patient} />
          ))}
        </div>
      </div>
    </div>
  );
}
