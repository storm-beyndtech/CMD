import { useState } from "react";
import logo from "../../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { sendRequest } from "../../../utility/sendRequest";
import { docPrimaryPracticeLocationValidator } from "../../../utility/onboardingValidators";
import OnboardingProgressDoc from "../../../components/OnboardingProgressDoc";
import DocAccSetupForm from "../../../components/Forms/DocAccSetupForm";
import DocAvailabilityForm from "../../../components/Forms/DocAvailabilityForm";
import { contextData } from "../../../context/AuthContext";

export default function AccountSetupDoc() {
  const { setProfile } = contextData();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    availability: [
      {
        days: [],
        startTime: "",
        endTime: "",
        allDay: false,
      },
    ],
    primaryPracticeLocation: {
      hospital: "",
      department: "None",
      position: "",
      startDate: "",
    },
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
    setError(null);

    const validAvailability = formValues.availability.filter(
      (schedule: any) =>
        schedule.allDay ||
        (schedule.startTime.length === 5 && schedule.endTime.length === 5),
    );

    if (validAvailability.length === 0) {
      return setError("Please add valid availability before submitting.");
    }

    try {
      setLoading(true);

      console.log(validAvailability);

      const res = await sendRequest(
        "/doctors/profile/complete-account-setup",
        "POST",
        {...formValues, availability: validAvailability},
      );

      setProfile(res.data);

      return navigate("/dashboard/partner/doctor");
    } catch (error: any) {
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
