import logo from "../../../assets/logo.svg";
import { useEffect, useState } from "react";
import HRAAppointment from "../../../components/HRA/HRAAppointment";
import HRAForm from "../../../components/Forms/HRAForm";
import HRAPromptCard from "../../../components/HRA/HRAPrompCard";
import { sendRequest } from "../../../utility/sendRequest";
import { Link, useNavigate } from "react-router-dom";
import { contextData } from "../../../context/AuthContext";

export interface HRAAppointmentFormProps {
	dateTime: string;
	timeZone: string;
	labLocation: string;
	doctorId: string;
	condition: string;
	currentMedications: string;
	currentLocation: string;
	preferredLab: string;
}

const dummyDoctors = [
	{
		primaryPracticeLocation: {
			hospital: "General Hospital",
			department: "Cardiology",
			position: "Chief Cardiologist",
			startDate: new Date("2020-01-01"),
		},
		_id: "66f3719bfcadeb50bd9aecdf",
		user: {
			photo: {
				url: "",
				publicId: "",
			},
			_id: "66f36aec6f0b6dde96fcaa26",
			firstName: "Nebula",
			lastName: "Marvel",
		},
		specialities: ["cardiology", "internal medicine"],
		availability: [
			{
				_id: "67041b1be0bc472c0e12155e",
				days: ["Monday", "Wednesday", "Friday"],
				startTime: "9:00 AM",
				endTime: "5:00 PM",
				allDay: false,
			},
		],
	},
];

export default function FirstHRA() {
  const { fetchUser, token } = contextData();
	const [doctors, setDoctors] = useState(dummyDoctors);
	const [page, setPage] = useState(1);
	const navigate = useNavigate();
	const [formValues, setFormValues] = useState({
		dateTime: "",
		timeZone: "",
		labLocation: "",
		doctorId: "",
		condition: "",
		currentMedications: "",
		currentLocation: "",
		preferredLab: "",
	});
	const [error, setError] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	const fetchDoctors = async () => {
		const res = await sendRequest("/members/consultations/get-doctors", "GET");
		setDoctors(res.data.docs);
  };
  

	useEffect(() => {
		fetchDoctors();
	}, []);

	const handleChange = (id: string, value: string) => {
		setFormValues({ ...formValues, [id]: value });
		setError(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		const isCurrentMedication = formValues.currentMedications === "true" ? true : false;

		const reqData = {
			doctorId: formValues.doctorId,
			dateTime: formValues.dateTime,
			patientDetails: {
				note: formValues.condition,
				isCurrentMedication: isCurrentMedication,
				currentLocation: formValues.currentLocation,
				selectedLab: "None",
			},
		};

		try {
			setLoading(true);
			const res = await sendRequest(`/members/consultations/hra`, "POST", reqData);

      if (res.data) {
        fetchUser(token)
				navigate("/auth/patient/HRA/success");
			}
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full min-h-screen bg-primary pb-10 px-5">
			<Link to="/">
				<img className="w-fit mx-auto pt-5 !max-sm:pb-0" alt="logo" src={logo} />
			</Link>

			<h2 className="text-3xl text-[#383E49] font-semibold mx-auto my-7 w-fit">Book HRA Appointment</h2>

			{page === 1 && <HRAPromptCard btnAction={setPage} />}

			{page === 2 && (
				<HRAAppointment
					setFormValues={setFormValues}
					formValues={formValues}
					setPage={setPage}
					doctors={doctors}
				/>
			)}

			{page === 3 && (
				<HRAForm
					handleChange={handleChange}
					formValues={formValues}
					onSubmit={handleSubmit}
					error={error}
					isLoading={loading}
				/>
			)}
		</div>
	);
}
