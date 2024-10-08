import { useEffect, useState } from "react";
import Alert from "../UI/Alert";
import Btn from "../UI/Btn";
import { BsCheckSquare } from "react-icons/bs";
import { RxBox } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";
import { IoCloseCircleSharp } from "react-icons/io5";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/trash.svg";
import { countries } from "../../lib/countries";

const specialtyList = [
	{ name: "Cardiologist", value: "Cardiologist" },
	{ name: "Pediatrician", value: "Pediatrician" },
	{ name: "Neonatal Consultant", value: "Neonatal Consultant" },
	{ name: "Oncologist", value: "Oncologist" },
	{ name: "Otolaryngologist", value: "Otolaryngologist" },
	{ name: "Ophthalmologist", value: "Ophthalmologist" },
];

interface Location {
	officeName: string;
	address: string;
	country: string;
}

export default function DocSpecialtyForm({
	onSubmit,
	handleChange,
	formValues,
	isLoading,
	error,
	setFormValues,
}: any) {
	const [practiceLocations, setPracticeLocations] = useState<Location[]>([]);

	const [newLocation, setNewLocation] = useState<Location>({
		officeName: "",
		address: "",
		country: "Nigeria",
	});

	const [specialities, setSpecialities] = useState<string[]>([]);

	useEffect(() => {
		if (formValues.practiceLocations.length > 0) {
			setPracticeLocations(
				formValues.practiceLocations.map((loc: any) => ({
					officeName: loc.hospital,
					address: loc.location,
					country: "Nigeria",
				})) || [],
			);

			if (practiceLocations.length > 0) {
				setNewLocation(practiceLocations[0]);
			}
		}

		setSpecialities(formValues.specialities);
  }, []);
  

	// Handles Adding a New Practice Location
	const addPracticeLocation = () => {
		if (newLocation.officeName && newLocation.address && newLocation.country) {
			const updatedLocations = [...practiceLocations, newLocation];

			setPracticeLocations(updatedLocations);

			// Update parent formValues with new practice location
			const formattedLocations = updatedLocations.map((location) => ({
				hospital: location.officeName,
				location: `${location.address}, ${location.country}`,
			}));

			setFormValues({
				...formValues,
				practiceLocations: formattedLocations,
			});

			// Reset the form
			setNewLocation({ officeName: "", address: "", country: "Nigeria" });
		}
	};

	// Handles Removing a Practice Location
	const removePracticeLocation = (index: number) => {
		const updatedLocations = practiceLocations.filter((_, i) => i !== index);
		setPracticeLocations(updatedLocations);

		// Update parent formValues after removal
		const formattedLocations = updatedLocations.map((location) => ({
			hospital: location.officeName,
			location: `${location.address}, ${location.country}`,
		}));

		setFormValues({
			...formValues,
			practiceLocations: formattedLocations,
		});
	};

	// Handles Editing a Practice Location
	const handleEditLocation = (location: Location, index: number) => {
		setNewLocation(location);
		removePracticeLocation(index); // Remove it from the list to be updated
	};

	// Handles Adding a New Specialty
	const addSpecialty = (newSpecialty: string) => {
		if (newSpecialty !== "none" && !specialities.includes(newSpecialty)) {
			const updatedSpecialities = [...specialities, newSpecialty];
			setSpecialities(updatedSpecialities);

			// Update parent formValues with new specialities
			setFormValues({
				...formValues,
				specialities: updatedSpecialities,
			});
		}
	};

	// Handles Removing a Specialty
	const removeSpecialty = (specialty: string) => {
		const updatedSpecialities = specialities.filter((s) => s !== specialty);
		setSpecialities(updatedSpecialities);

		// Update parent formValues after removal
		setFormValues({
			...formValues,
			specialities: updatedSpecialities,
		});
	};

	const { medicalLicenseNumber, experienceYears, inPersonConsultation, virtualConsultation } = formValues;

	return (
		<form
			className="flex flex-col sm:px-8 px-4 mx-auto bg-white rounded-[14px]"
			onSubmit={onSubmit}
			autoComplete="off"
		>
			{/* Specialities Dropdown */}
			<div>
				<p className="font-medium text-[#48505E] mb-3">Specialty</p>
				<div className="flex gap-3 mb-3">
          <select id="specialty" className="input" value="" onChange={(e) => addSpecialty(e.target.value)}>
            <option value="" disabled>Select Specialty</option>
						{specialtyList.map((specialty, i) => (
							<option key={i} value={specialty.value}>
								{specialty.name}
							</option>
						))}
					</select>
				</div>

				{/* List of Added Specialities */}
				{specialities.length > 0 && (
					<div className="flex flex-wrap gap-2 mb-4">
						{specialities.map((specialty, index) => (
							<div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-md">
								<span>{specialty}</span>
								<IoCloseCircleSharp
									className="ml-2 cursor-pointer text-red-600"
									onClick={() => removeSpecialty(specialty)}
								/>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Medical License Number */}
			<div className="pt-4">
				<p className="font-medium text-[#48505E] mb-3">Medical License Number</p>
				<input
					type="text"
					value={medicalLicenseNumber}
					placeholder="e.g MED-1234567"
					className="input"
					onChange={(e) => handleChange("medicalLicenseNumber", e.target.value)}
				/>
			</div>

			{/* Years of Experience */}
			<div className="pt-4">
				<p className="font-medium text-[#48505E] mb-3">Years of Experience</p>
				<input
					type="number"
					value={experienceYears}
					placeholder="1"
					className="input"
					onChange={(e) => handleChange("experienceYears", parseInt(e.target.value))}
				/>
			</div>

			{/* Practice Locations */}
			<div className="pt-4">
				<p className="font-medium text-[#48505E] mb-3">Practice Location(s)</p>

				{/* List of Practice Locations Added */}
				{practiceLocations.length > 0 && (
					<div className="mb-4">
						{practiceLocations.map((location, index) => (
							<div key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-3">
								<div className="text-sm">
									<p>
										<strong>{location.officeName}</strong>
									</p>
									<p className="text-sm text-[#667085]">
										{location.address}, {location.country}
									</p>
								</div>

								<div className="flex space-x-3">
									<img src={editIcon} alt="edit" onClick={() => handleEditLocation(location, index)} />
									<img src={deleteIcon} alt="delete" onClick={() => removePracticeLocation(index)} />
								</div>
							</div>
						))}
					</div>
				)}

				{/* Input fields for adding a new location */}
				<div className="mb-4">
					<input
						type="text"
						value={newLocation.officeName}
						placeholder="Office Name"
						className="input mb-3"
						onChange={(e) => setNewLocation({ ...newLocation, officeName: e.target.value })}
					/>

					<input
						type="text"
						value={newLocation.address}
						placeholder="Full Address e.g: Street and State"
						className="input mb-3"
						onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
					/>

					<select
						value={newLocation.country}
						className="input mb-3"
						onChange={(e) => setNewLocation({ ...newLocation, country: e.target.value })}
					>
						{countries.map((country, i) => (
							<option key={i} value={country.name}>
								{country.name}
							</option>
						))}
					</select>

					<button type="button" onClick={addPracticeLocation} className="formAdd">
						<FiPlus size={16} />
						Add Location
					</button>
				</div>
			</div>

			{/* Consultation Availability */}
			<div className="pt-4">
				<p className="text-lg font-semibold text-[#383E49]">Consultation Availability</p>

				<div className="grid gap-2 my-3">
					{/* In-Person Consultation */}
					<div className="flex items-center gap-3 relative cursor pointer">
						<label
							htmlFor="inPersonConsultation"
							className="font-medium text-[#48505E] flex items-center gap-3"
						>
							<RxBox className={`w-5 h-5 ${inPersonConsultation ? "hidden" : "block"}`} />
							<BsCheckSquare
								className={`w-5 h-5 text-secondary3 ${inPersonConsultation ? "block" : "hidden"}`}
							/>
							In-Person Consultation
						</label>
						<input
							type="checkbox"
							id="inPersonConsultation"
							className="hidden"
							checked={inPersonConsultation}
							onChange={(e) => handleChange("inPersonConsultation", e.target.checked)}
						/>
					</div>

					{/* Virtual Consultation */}
					<div className="flex items-center gap-3">
						<label
							htmlFor="virtualConsultation"
							className="font-medium text-[#48505E] flex items-center gap-3"
						>
							<RxBox className={`w-5 h-5 ${virtualConsultation ? "hidden" : "block"}`} />
							<BsCheckSquare
								className={`w-5 h-5 text-secondary3 ${virtualConsultation ? "block" : "hidden"}`}
							/>
							Virtual Consultation
						</label>
						<input
							type="checkbox"
							id="virtualConsultation"
							className="hidden"
							checked={virtualConsultation}
							onChange={(e) => handleChange("virtualConsultation", e.target.checked)}
						/>
					</div>
				</div>
			</div>

			{/* Error Message */}
			{error && <Alert type="danger" message={error} />}

			{/* Submit Button */}
			<div className="text-center my-5">
				<Btn label="Submit" type="primary" disabled={isLoading} btnAction="submit" auth />
			</div>
		</form>
	);
}
