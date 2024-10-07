import { useState } from "react";
import logo from "../../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import OnboardingProgress from "../../../components/OnboardingProgress";
import UpdateForm from "../../../components/Forms/UpdateForm";
import { handleInputChange } from "../../../utility/handleInput";
import { sendRequest } from "../../../utility/sendRequest";
import { validateProfileFields } from "../../../utility/validators";
import { contextData } from "../../../context/AuthContext";

export default function PatientUpdateProfile() {
  const { setProfile } = contextData()
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    occupation: "",
    isPrimaryAddress: false,
  });
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    handleInputChange(e, setFormValues);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const isValid = validateProfileFields(formValues);
    if (isValid !== true) return setError(isValid);

    try {
      setLoading(true);
      const res = await sendRequest("/profile", "PUT", FormData);
      setProfile(res.data)
      navigate("/auth/patient/package");
    } catch (error: any) {
      if (error.message === "Profile already completed")
        return navigate("/auth/patient/package");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-primary pb-10 px-5">
      <Link to="/">
        <img
          className="w-[150px] mx-auto pt-5 !max-sm:pb-0"
          alt="logo"
          src={logo}
        />
      </Link>

      <OnboardingProgress stage="2" />

      <div className="w-full grid place-content-center">
        <h2 className="title sm:!text-[22px] !text-xl text-center mb-7">
          Complete Account Setup
        </h2>
        <div className="w-full max-w-[542px] bg-white rounded-[14px] py-10 shadow-lg shadow-[#eaeaeaa6]">
          <UpdateForm
            onSubmit={handleSubmit}
            handleChange={handleChange}
            formValues={formValues}
            isLoading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
