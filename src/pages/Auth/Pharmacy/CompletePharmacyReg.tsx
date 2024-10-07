import { useState } from "react";
import logo from "../../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { sendRequest } from "../../../utility/sendRequest";
import PharmacyCompleteRegForm from "../../../components/Forms/PharmacyCompleteRegForm";
import { labAndPharmacyUpdateValidator } from "../../../utility/onboardingValidators";
import { contextData } from "../../../context/AuthContext";

export default function CompletePharmacyReg() {
  const { setProfile, fetchUser, token } = contextData();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    licenseNumber: "",
    experienceYears: "",
    location: {
      address: "",
      city: "",
      state: "",
      country: "Nigeria",
      zipCode: "",
    },
    contact: {
      firstName: "",
      lastName: "",
      role: "",
      phone: "",
      email: "",
    },
    isPrimaryAddress: false,
  });
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes and update formValues
  const handleChange = (event: any) => {
    const id = event.target.id

    if (
      id === "address" ||
      id === "city" ||
      id === "state" ||
      id === "country" ||
      id === "zipCode"
    ) {
      setFormValues({
        ...formValues,
        location: { ...formValues.location, [id]: event.target.value },
      });
    } else if (id === "isPrimaryAddress") {
      setFormValues({
        ...formValues,
        isPrimaryAddress: !formValues.isPrimaryAddress,
      });
    } else if (
      id === "firstName" ||
      id === "lastName" ||
      id === "role" ||
      id === "phone" ||
      id === "email"
    ) {
      setFormValues({
        ...formValues,
        contact: { ...formValues.contact, [id]: event.target.value },
      });
    } else {
      setFormValues({ ...formValues, [id]: event.target.value });
    }
  };




	// Complete Registration Form Submit
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		const isValid = labAndPharmacyUpdateValidator(formValues);
    if (!isValid) return setError(isValid);

    const { isPrimaryAddress, ...requestData } = formValues
    
		try {
			setLoading(true);
      const res = await sendRequest("/pharmacy/profile/complete-registration", "POST", requestData);
      setProfile(res.data);
      fetchUser(token)
			return navigate("/dashboard/partner/pharmacy");
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

      <div className="w-full flex flex-col items-center">
        <h2 className="title sm:!text-[22px] !text-xl text-center my-7">
          Tell us more about you
        </h2>
        <div className="w-full sm:w-[540px] bg-white rounded-[14px] py-10">
          <PharmacyCompleteRegForm
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
