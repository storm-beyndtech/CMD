import { useState } from "react";
import logo from "../../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { sendRequest } from "../../../utility/sendRequest";
import DocSpecialtyForm from "../../../components/Forms/DocSpecialtyForm";
import { docSpecialtyValidatorV1 } from "../../../utility/onboardingValidators";
import DocSpecialtyForm2 from "../../../components/Forms/DocSpecialtyForm2";
import omit from "lodash/omit";
import { contextData } from "../../../context/AuthContext";

// Define the form values type
interface FormValues {
	specialities: string[];
	medicalLicenseNumber: string;
	experienceYears: number;
	inPersonConsultation: boolean;
	virtualConsultation: boolean;
	practiceLocations: { hospital: string; location: string[] | any }[];
	consultationAvailability: string[];
	identificationNumber: string;
	linkedin: string;
	twitter: string;
	website: string;
}

export default function CompleteRegDoc() {
	const { profile, fetchUser, token } = contextData();
	const navigate = useNavigate();

	// Initialize formValues with default data or empty values
	const [formValues, setFormValues] = useState<FormValues>({
		specialities: profile?.specialities || [],
		medicalLicenseNumber: profile?.medicalLicenseNumber || "",
		experienceYears: profile?.experienceYears || 0,
		inPersonConsultation: profile?.consultationAvailability?.includes("in-person") || false,
		virtualConsultation: profile?.consultationAvailability?.includes("online") || false,
		practiceLocations: profile?.practiceLocations || [],
		consultationAvailability: profile?.consultationAvailability || [],
		identificationNumber: profile?.identificationNumber || "",
		linkedin: profile?.socialLinks?.linkedin || "",
		twitter: profile?.socialLinks?.twitter || "",
		website: profile?.socialLinks?.twitter || "",
	});

	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [showSpecialtyForm2, setShowSpecialtyForm2] = useState(false);

	const handleChange = (id: string, e: any) => {
		if (id === "inPersonConsultation") {
			setFormValues((prevValues) => ({
				...prevValues,
				inPersonConsultation: !prevValues.inPersonConsultation,
			}));
		} else if (id === "virtualConsultation") {
			setFormValues((prevValues) => ({
				...prevValues,
				virtualConsultation: !prevValues.virtualConsultation,
			}));
		} else {
			setFormValues((prevValues) => ({
				...prevValues,
				[id]: e,
			}));
		}
	};

	const handleSubmit1 = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		const inPerson = formValues.inPersonConsultation;
		const virtual = formValues.virtualConsultation;
		const consultationAvailability =
			inPerson && virtual
				? ["in-person", "online"]
				: inPerson && !virtual
				? ["in-person"]
				: !inPerson && virtual
				? ["online"]
				: [];

		const updatedValues = {
			...formValues,
			consultationAvailability,
			identificationNumber: "DSRRSET",
		};

		const isValid = docSpecialtyValidatorV1(updatedValues);
		if (isValid === true) {
			const dataToSend = omit(updatedValues, [
				"website",
				"linkedin",
				"twitter",
				"inPersonConsultation",
				"virtualConsultation",
			]);

			try {
				setLoading(true);
				await sendRequest("/doctors/profile/continue-registration", "POST", dataToSend);
				setShowSpecialtyForm2(true);
			} catch (error: any) {
				setError(error.message);
				if (error.message === "Doctor onboarding already completed") {
					setTimeout(() => {
						setShowSpecialtyForm2(true);
						setError(null);
					}, 2000);
				}
			} finally {
				setLoading(false);
			}
		} else {
			setError(isValid);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		try {
			setLoading(true);
			const dataToSend = omit(formValues, [
				"website",
				"specialities",
				"medicalLicenseNumber",
				"experienceYears",
				"inPersonConsultation",
				"virtualConsultation",
				"practiceLocations",
				"consultationAvailability",
			]);

			await sendRequest("/doctors/profile/complete-registration", "POST", dataToSend);

			await fetchUser(token);
			navigate("/dashboard/partner/doctor");
		} catch (error: any) {
			setError(error.message);
			if (error.message === "Doctor registration already completed") {
				setTimeout(() => {
					setError(null);
					navigate("/dashboard/partner/doctor");
				}, 2000);
			}
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
				<h2 className="title sm:!text-[22px] !text-xl text-center my-7">
					{!showSpecialtyForm2 ? "Tell us more about you" : "Complete Registration"}
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
