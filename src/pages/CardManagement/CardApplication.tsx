import { useState } from "react";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { contextData } from "../../context/AuthContext";
import { sendRequest } from "../../utility/sendRequest";
import { validateGetNewCardFields } from "../../utility/validators";
import CardApplicationForm from "../../components/Forms/CardApplicationForm";

export default function CardApplication() {
	const { setProfile, fetchUser, token } = contextData();
	const navigate = useNavigate();
	const [formValues, setFormValues] = useState({
		location: {
			address: "",
			city: "",
			state: "",
			country: "Nigeria",
			zipCode: "",
		},
		phone: [],
	});
	const [error, setError] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	// Handle input changes and update formValues
	const handleChange = (event: any) => {
		const id = event.target.id;

		if (id === "address" || id === "city" || id === "state" || id === "country" || id === "zipCode") {
			setFormValues({
				...formValues,
				location: { ...formValues.location, [id]: event.target.value },
			});
		} else {
			setFormValues({ ...formValues, [id]: event.target.value });
		}
	};

	// Complete Registration Form Submit
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		const isValid = validateGetNewCardFields(formValues);
		if (!isValid) return setError(isValid);

    try {
      navigate("/card-application-success")
      return console.log(formValues)
			setLoading(true);
			const res = await sendRequest("/card-endPoint", "POST", formValues);
			setProfile(res.data);
			fetchUser(token);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full min-h-screen bg-primary pb-10 px-5">
			<Link to="/">
				<img className="w-[150px] mx-auto pt-5 !max-sm:pb-0" alt="logo" src={logo} />
			</Link>

			<div className="w-full flex flex-col items-center">
				<h2 className="title sm:!text-[24px] !text-xl text-center my-7">Get your Carepoints Card</h2>
				<div className="w-full sm:w-[540px] bg-white rounded-[14px] py-10">
          <h2 className="text-lg font-semibold text-center my-7">Confirm your Details for Delivery</h2>
					<CardApplicationForm
						onSubmit={handleSubmit}
						handleChange={handleChange}
						formValues={formValues}
						isLoading={loading}
            error={error}
            setError={setError}
            setFormValues={setFormValues}
					/>
				</div>
			</div>
		</div>
	);
}
