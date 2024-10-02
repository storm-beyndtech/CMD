import { useState } from "react";
import logo from "../../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { sendRequest } from "../../../utility/sendRequest";
import DocSpecialtyForm from "../../../components/Forms/DocSpecialtyForm";
import { docSpecialtyValidatorV1 } from "../../../utility/onboardingValidators";
import DocSpecialtyForm2 from "../../../components/Forms/DocSpecialtyForm2";

export default function CompleteRegDoc() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    specialities: [],
    medicalLicenseNumber: "",
    experienceYears: "",
    inPersonConsultation: false,
    virtualConsultation: false,
    practiceLocations: [],
    consultationAvailability: ["online"],
    identificationNumber: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
  });

  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showSpecialtyForm2, setShowSpecialtyForm2] = useState(false);

  const handleChange = (id: string, e: any) => {
    if (id === "inPersonConsultation")
      setFormValues({
        ...formValues,
        inPersonConsultation: !formValues.inPersonConsultation,
      });
    if (id === "virtualConsultation")
      setFormValues({
        ...formValues,
        virtualConsultation: !formValues.virtualConsultation,
      });

    setFormValues({ ...formValues, [id]: e });
  };

  const handleSubmit1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { inPersonConsultation, virtualConsultation } = formValues;
    const consultationAvailability =
      inPersonConsultation && virtualConsultation
        ? ["in-person", "online"]
        : inPersonConsultation && !virtualConsultation
        ? ["in-person"]
        : !inPersonConsultation && virtualConsultation
        ? ["online"]
        : [];

    setFormValues({
      ...formValues,
      consultationAvailability,
    });

    const isValid = docSpecialtyValidatorV1({
      ...formValues,
      consultationAvailability,
    });
    if (isValid === true) {
      setShowSpecialtyForm2(true);
    } else {
      setError(isValid);
    }
  };

  //Complete Registration Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await sendRequest(
        "/doctor/profile/continue-registration",
        "POST",
        FormData,
      );
      return navigate("/dashboard/partner/doctor");
    } catch (error: any) {
      if (error.message === "Profile already completed")
        return navigate("/dashboard/partner/doctor");
      setError(error.message);
    } finally {
      setLoading(false);
      navigate("/auth/partner/doctor/account-setup")
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

      <div className="w-full flex flex-col items-center">
        <h2 className="title sm:!text-[22px] !text-xl text-center my-7">
          {!showSpecialtyForm2
            ? "Tell us more about you"
            : "Complete Registration"}
        </h2>
        <div className="w-full sm:w-[540px] bg-white rounded-[14px] py-10">
          {!showSpecialtyForm2 && (
            <DocSpecialtyForm
              onSubmit={handleSubmit1}
              handleChange={handleChange}
              formValues={formValues}
              isLoading={loading}
              error={error}
              setFormValues={setFormValues}
            />
          )}

          {showSpecialtyForm2 && (
            <DocSpecialtyForm2
              onSubmit={handleSubmit}
              handleChange={handleChange}
              formValues={formValues}
              isLoading={loading}
              error={error}
              setFormValues={setFormValues}
            />
          )}
        </div>
      </div>
    </div>
  );
}
