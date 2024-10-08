import React, { useEffect, useState } from "react";
import SpecialistDoctorSelector from "./SpecialistDoctorSelector";
import CalendarComponent from "./CalendarComponent";
import TimePicker from "./TimePicker";
import Btn from "../UI/Btn";
import { HRAAppointmentFormProps } from "../../pages/Auth/Patients/FirstHRA";

export interface Photo {
	url: string;
	publicId: string;
}

export interface PrimaryPracticeLocation {
	hospital: string;
	department: string;
	position: string;
	startDate: Date;
}

export interface User {
	photo: Photo;
	_id: string;
	firstName: string;
	lastName: string;
}

export interface Availability {
	_id: string;
	days: string[];
	startTime: string;
	endTime: string;
	allDay: boolean;
}

interface ConsultationDoc {
	primaryPracticeLocation: PrimaryPracticeLocation;
	_id: string;
	user: User;
	specialities: string[];
	availability: Availability[];
}

interface PropsData {
	setFormValues: React.Dispatch<React.SetStateAction<HRAAppointmentFormProps>>;
	formValues: HRAAppointmentFormProps;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	doctors: ConsultationDoc[];
}

export default function HRAAppointment({ setFormValues, formValues, setPage, doctors }: PropsData) {
	const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(null);
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

	// Function to get available dates from doctor availability
	const generateAvailableDates = (availability: Availability[], allDoctorsAvailability: Availability[]) => {
		const availableDates = new Set<string>();
		const currentMonth = new Date().getMonth();
		const currentYear = new Date().getFullYear();
		const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

		let commonDays: string[] = [];

		if (availability.length === 0) {
			// No doctor selected, find common days across all doctors
			const allDays = allDoctorsAvailability.map((a) => a.days);
			commonDays = Array.from(new Set(allDays.flat()));
		} else {
			// Doctor selected, use their specific availability
			commonDays = availability.map((a) => a.days).flat();
		}

		// Generate available dates for the current month based on common days
		for (let date = 1; date <= daysInMonth; date++) {
			const currentDate = new Date(currentYear, currentMonth, date);
			const weekday = currentDate.toLocaleDateString("en-US", { weekday: "long" });

			if (commonDays.includes(weekday)) {
				availableDates.add(currentDate.toISOString().split("T")[0]);
			}
		}

		return Array.from(availableDates); // Convert Set to Array
	};

	// Example usage for when a doctor isn't selected
	const generateGeneralAvailableDates = (doctors: ConsultationDoc[]) => {
		const allDoctorsAvailability = doctors.map((doctor) => doctor.availability).flat();
		return generateAvailableDates([], allDoctorsAvailability);
	};

	// Example usage for when a doctor is selected
	const generateDoctorAvailableDates = (selectedDoctor: ConsultationDoc | undefined) => {
		if (selectedDoctor) {
			return generateAvailableDates(selectedDoctor.availability, []);
		}
	};

	const handleSpecialistSelect = (specialist: string) => {
		setSelectedSpecialist(specialist);
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
			? generateDoctorAvailableDates(doctors.find((doctor) => doctor._id === selectedDoctor))
			: generateGeneralAvailableDates(doctors);

  
  //handle submit
	const handleSubmit = () => {
		// Check if a doctor is already selected
		if (!selectedDoctor) {
			// Find a doctor based on the selected date and time
			const suitableDoctor = doctors.find((doctor) => {
				return doctor.availability.some((availability) => {
					const availableDays = availability.days;
					const selectedDateDay = new Date(selectedDate as string).toLocaleDateString("en-US", {
						weekday: "long",
					});

					// Check if the doctor is available on the selected day
					if (!availableDays.includes(selectedDateDay)) {
						return false; // Not available on this day
					}

					// If the doctor is available all day
					if (availability.allDay) {
						return true; // Any time on this day is fine
					}

					// Ensure startTime is defined before splitting
					if (!availability.startTime) {
						return false; // Skip this availability if startTime is missing
					}

					// Split the startTime
					const [startHour, startMinute] = availability.startTime.split(":").map(Number);
					const selectedTimeHour = Number(selectedTime?.split(":")[0]);
					const selectedTimeMinute = Number(selectedTime?.split(":")[1]);

					// Verify if the selected time is greater than or equal to the startTime
					const isAfterStartTime =
						selectedTimeHour > startHour ||
						(selectedTimeHour === startHour && selectedTimeMinute >= startMinute);

					return isAfterStartTime; // Only allow times after the start time
				});
			});

			// If a suitable doctor is found, set them as the selected doctor
			if (suitableDoctor) {
				setSelectedDoctor(suitableDoctor._id);
			} else {
				// No suitable doctor found, you can show an error message or handle this case accordingly
				console.log("No doctor available for the selected date and time.");
				return;
			}
		}

		// Proceed if time and timezone are selected
		if (selectedTime && timeZone) {
			let [hours, minutes] = selectedTime.split(":").map(Number);
			const appointmentDate = new Date(selectedDate as string);
			appointmentDate.setHours(hours, minutes, 0, 0);

			// Adjust the time to the user's local timezone
			const localDateTime = new Date(appointmentDate.toLocaleString("en-US", { timeZone }));

			// If no doctor was initially selected, use the one we found
      const doctor = doctors.find((doctor) => doctor._id === selectedDoctor);
      
			setFormValues({
				...formValues,
				dateTime: localDateTime.toISOString(),
				timeZone,
				labLocation: doctor?.primaryPracticeLocation.hospital || "Princeton Hospital, Ikeja",
				doctorId: selectedDoctor || "",
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
				className={`w-full sm:w-[540px] flex-shrink-0 p-8 bg-white/50 ${selectedDate ? "block" : "hidden"}`}
			>
				{selectedDate && (
					<TimePicker
						selectedTime={selectedTime}
						onTimeSelect={handleTimeSelect}
						availableTimes={["13:00", "16:00", "19:00", "21:00"]}
					/>
				)}

				{selectedDoctor && (
					<div className="pt-4">
						<p className="text-lg font-semibold text-[#383E49] my-4">Your Timezone</p>
						<input type="text" value={timeZone} disabled className="input text-[#7E818C]" />
					</div>
				)}

				{selectedSpecialist && selectedDate && selectedTime && (
					<div className="my-5" onClick={handleSubmit}>
						<Btn type="primary" label="Continue" form icon />
					</div>
				)}
			</div>
		</div>
	);
}
