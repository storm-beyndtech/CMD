import { useState } from "react";
import logo from "../../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { sendRequest } from "../../../utility/sendRequest";
import { docPrimaryPracticeLocationValidator } from "../../../utility/onboardingValidators";
import OnboardingProgressDoc from "../../../components/OnboardingProgressDoc";
import DocAccSetupForm from "../../../components/Forms/DocAccSetupForm";
import DocAvailabilityForm from "../../../components/Forms/DocAvailabilityForm";

export default function AccountSetupDoc() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    availability: [
      {
        days: [],
        startTime: "",
        endTime: "",
        allDay: false,
      }
    ],
    primaryPracticeLocation: {
      hospital: "",
      department: "None",
      position: "",
      startDate: "",
    },
    allDays: false, // Assuming the doctor is not available all days
  });

  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState("1");

  const handleSubmit1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const isValid = docPrimaryPracticeLocationValidator(formValues);

    if (isValid === true) {
      setStage("2");
    } else {
      setError(isValid);
    }
  };

  //Complete Registration Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     navigate("/dashboard/partner/doctor");

    try {
      setLoading(true);
      const response = await sendRequest("/profile", "PUT", FormData);
      if (response.ok) return navigate("/dashboard/partner/doctor");
    } catch (error: any) {
      if (error.message === "Profile already completed")
        return navigate("/dashboard/partner/doctor");
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

      <OnboardingProgressDoc stage={stage} />

      <div className="w-full flex flex-col items-center">
        <h2 className="title sm:!text-[22px] !text-xl text-center my-7">
          Complete Account Setup
        </h2>
        <div className="w-full sm:w-[540px] bg-white rounded-[14px] py-10">
          {stage === "1" && (
            <DocAccSetupForm
              onSubmit={handleSubmit1}
              formValues={formValues}
              isLoading={loading}
              error={error}
              setFormValues={setFormValues}
            />
          )}

          {stage === "2" && (
            <DocAvailabilityForm
              onSubmit={handleSubmit}
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
