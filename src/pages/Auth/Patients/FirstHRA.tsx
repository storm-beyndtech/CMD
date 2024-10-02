import logo from "../../../assets/logo.svg";
import { useState } from "react";
import HRAAppointment from "../../../components/HRA/HRAAppointment";
import HRAForm from "../../../components/Forms/HRAForm";
import HRAPromptCard from "../../../components/HRA/HRAPrompCard";
import { sendRequest } from "../../../utility/sendRequest";
import { Link, useNavigate } from "react-router-dom";

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

export default function FirstHRA() {
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

  const handleChange = (id: string, value: string) => {
    setFormValues({ ...formValues, [id]: value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const isCurrentMedication = formValues.currentMedications === "true" ? true : false;

    console.log(formValues, isCurrentMedication);

    const reqData = {
      doctorId: "66f3719bfcadeb50bd9aecdf",
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
      const response = await sendRequest(
        `/members/consultations/hra`,
        "POST",
        reqData,
      );

      if (response.data) {
        navigate("/auth/patient/HRA/success");
      }
    } catch (error: any) {
      console.log(error);
      setError(error.message);
      if (error.message === "You have already booked an HRA consultation") {
        setTimeout(() => {
          navigate("/dashboard/patient");
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-primary pb-10 px-5">
      <Link to="/">
        <img className="w-fit mx-auto pt-5 !max-sm:pb-0" alt="logo" src={logo} />
      </Link>

      <h2 className="text-3xl text-[#383E49] font-semibold mx-auto my-7 w-fit">
        Book HRA Appointment
      </h2>

      {page === 1 && <HRAPromptCard btnAction={setPage} />}

      {page === 2 && (
        <HRAAppointment
          setFormValues={setFormValues}
          formValues={formValues}
          setPage={setPage}
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
