import React, { useEffect, useState } from "react";
import SpecialistDoctorSelector from "./SpecialistDoctorSelector";
import CalendarComponent from "./CalendarComponent";
import TimePicker from "./TimePicker";
import { experts } from "../../lib/utils";
import Btn from "../UI/Btn";
import { HRAAppointmentFormProps } from "../../pages/Auth/Patients/FirstHRA";

interface Doctor {
  id: string;
  name: string;
  img: string;
  position: string;
  hospitals: string;
  availableDates: string[]; // Array of available dates for the doctor
}

const doctors: Doctor[] = experts;

const generalAvailableDates = [
  "2024-09-01",
  "2024-09-12",
  "2024-09-13",
  "2024-09-05",
  "2024-09-25",
];

interface PropsData {
  setFormValues: React.Dispatch<React.SetStateAction<HRAAppointmentFormProps>>;
  formValues: HRAAppointmentFormProps;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function HRAAppointment({
  setFormValues,
  formValues,
  setPage,
}: PropsData) {
  const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(
    null,
  );
  const [manualDoctorSelection, setManualDoctorSelection] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeZone, setTimeZone] = useState<string>("");

  // Automatically detect user's time zone
  useEffect(() => {
    const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(detectedTimeZone);
  }, []);

  const handleSpecialistSelect = (specialist: string) => {
    setSelectedSpecialist(specialist);
    // Reset doctor and date selections if a new specialist is chosen
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleDoctorSelect = (doctorID: string) => {
    setSelectedDoctor(doctorID);
    setSelectedDate(null); // Reset the date when a new doctor is selected
    setSelectedTime(null);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset the time when a new date is selected
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Get the available dates based on doctor selection or general availability
  const availableDates =
    manualDoctorSelection && selectedDoctor
      ? doctors.find((doctor) => doctor.id === selectedDoctor)
          ?.availableDates ?? []
      : generalAvailableDates;

  //submit the data to the next HRA page
  const handleSubmit = () => {
    if (selectedTime && timeZone) {
      // Assuming selectedTime is already in "HH:mm" 24-hour format
      let [hours, minutes] = selectedTime.split(":").map(Number);
      const appointmentDate = new Date(selectedDate as string);

      // Set the hours and minutes based on the selected time (24-hour format)
      appointmentDate.setHours(hours, minutes, 0, 0);

      // Adjust the date object to the user's timezone (keeps local time intact)
      const localDateTime = new Date(
        appointmentDate.toLocaleString("en-US", { timeZone }),
      );

      //find doctor
      const doctor = doctors.find((doctor) => doctor.id === selectedDoctor);

      // Proceed to the next page or step logic
      setFormValues({
        ...formValues,
        dateTime: localDateTime.toISOString(),
        timeZone,
        labLocation: doctor?.hospitals || "Princeton Hospital, Ikeja",
        doctorId: selectedDoctor ? selectedDoctor : "",
      });

      setPage(3);
    }
  };

  return (
    <div className="w-fit mx-auto rounded-2xl flex flex-wrap">
      <div className="w-full sm:w-[540px] flex-shrink-0 p-8 bg-white border-r border-gray-100">
        {/* Specialist and Doctor Selection */}
        <SpecialistDoctorSelector
          selectedSpecialist={selectedSpecialist}
          onSpecialistSelect={handleSpecialistSelect}
          doctors={doctors}
          manualDoctorSelection={manualDoctorSelection}
          setManualDoctorSelection={setManualDoctorSelection}
          selectedDoctor={selectedDoctor}
          onDoctorSelect={handleDoctorSelect}
        />

        {/* Calendar Component */}
        {selectedSpecialist && (
          <CalendarComponent
            availableDates={availableDates}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        )}
      </div>

      <div
        className={`w-full sm:w-[540px] flex-shrink-0 p-8 bg-white/50 ${
          selectedDate ? "block" : "hidden"
        }`}
      >
        {/* Time Selection */}
        {selectedDate && (
          <TimePicker
            selectedTime={selectedTime}
            onTimeSelect={handleTimeSelect}
            availableTimes={["13:00", "16:00", "19:00", "21:00"]}
          />
        )}

        {/* Timezone Display */}
        {selectedDoctor && (
          <div className="pt-4">
            <p className="text-lg font-semibold text-[#383E49] my-4">
              Your Timezone
            </p>
            <input
              type="text"
              value={timeZone}
              disabled
              className="input text-[#7E818C]"
            />
          </div>
        )}

        {selectedSpecialist &&
          manualDoctorSelection &&
          selectedDate &&
          selectedTime && (
            <div className="my-5" onClick={handleSubmit}>
              <Btn type="primary" label="Continue" form icon />
            </div>
          )}

        {selectedSpecialist &&
          !manualDoctorSelection &&
          selectedDate &&
          selectedTime && (
            <div className="my-5" onClick={handleSubmit}>
              <Btn type="primary" label="Continue" form icon />
            </div>
          )}
      </div>
    </div>
  );
}
