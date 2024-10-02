export default function ConsultationHistory({ patient }: any) {
  return (
    <div className="p-6 rounded-[14px] bg-white w-full shadow-sm">
      <div className="grid gap-2">
        <h2 className="w-fit text-lg font-semibold text-[#383E49] flex items-center justify-between">
          Consultation with {patient.patientName}{" "}
          <img
            src={patient.imageUrl}
            alt="patient"
            className="w-6 h-6 ml-5"
          />
        </h2>
        <p className="text-xs text-[#9ea1a7] my-1.5">
          {patient.appointmentTime}
        </p>
      </div>
    </div>
  );
}
