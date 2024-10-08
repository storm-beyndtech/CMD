import { countries } from "../../lib/countries"; // Assuming you have a country list
import { statesOfNigeria } from "../../lib/states"; // Assuming you have a state list
import Alert from "../UI/Alert";
import Btn from "../UI/Btn";
import InputField from "../UI/InputField";
import { useState } from "react";
import flag from "../../assets/icons/ng.svg";

export default function CardApplicationForm({
	onSubmit,
	handleChange,
	formValues,
	isLoading,
	error,
	setFormValues,
	setError,
}: any) {
	const [newPhoneNumber, setNewPhoneNumber] = useState("");

	const {
		location: { address, city, state, country, zipCode },
	} = formValues;

	// Handle phone number addition
	const handleAddPhone = () => {
		if (newPhoneNumber.length >= 10) {
			const newNumbers = [...formValues.phone, newPhoneNumber]; // Push new number
			setFormValues({ ...formValues, phone: newNumbers });
			setNewPhoneNumber(""); // Clear input
		} else {
			setError("Invalid phone number");
		}
	};

	// Handle phone number change for new input
	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewPhoneNumber(e.target.value);
		setError(null); // Clear error when user types
	};

	// Handle clearing phone numbers
	const handleClearNumbers = () => {
		setFormValues({ ...formValues, phone: [] });
	};

	return (
		<form className="w-full px-8 max-sm:px-5 flex flex-col gap-4" onSubmit={onSubmit} autoComplete="off">
			{/* Delivery Address */}
			<p className="font-medium mt-4 text-gray-500">Delivery Address</p>
			<InputField placeholder="Street Address" value={address} onChange={handleChange} id="address" />

			<div className="grid grid-cols-2 gap-2.5">
				<InputField placeholder="City" value={city} onChange={handleChange} id="city" />

				<InputField
					placeholder="State"
					value={state}
					onChange={handleChange}
					type="selectField"
					id="state"
					fieldOptions={statesOfNigeria}
				/>
			</div>

			<InputField
				placeholder="Country"
				value={country}
				onChange={handleChange}
				type="selectField"
				id="country"
				fieldOptions={countries}
			/>

			<InputField placeholder="Postal Code" value={zipCode} onChange={handleChange} id="zipCode" />

			{/* Phone Number */}
			<p className="font-medium mt-4 text-gray-500">Contact Phone Number</p>

			{/* List of Read-Only Phone Numbers */}
			{formValues.phone.length > 0 &&
				formValues.phone.map((phoneNumber: string, index: number) => (
					<label key={index} className="label">
						<div className="w-full flex items-center relative">
							<div className="h-full flex items-center gap-2 px-3 absolute left-0 top-0 z-[2]">
								<img src={flag} alt="flag" className="w-6" />
								<p className="text-[#383E49]">+234</p>
							</div>
							<input value={phoneNumber} type="tel" className="input !pl-[90px] relative" readOnly disabled />
						</div>
					</label>
				))}

			{/* Input for New Phone Number */}
			<label className="label">
				<div className="w-full flex items-center relative">
					<div className="h-full flex items-center gap-2 px-3 absolute left-0 top-0 z-[2]">
						<img src={flag} alt="flag" className="w-6" />
						<p className="text-[#383E49]">+234</p>
					</div>
					<input
						value={newPhoneNumber}
						onChange={(e) => handlePhoneChange(e)}
						type="tel"
						className="input !pl-[90px] relative"
						placeholder="8068473884"
						maxLength={10}
					/>
				</div>
			</label>

			<div className="flex justify-between">
				{/* Add Phone Button */}
				<div className="formAdd" onClick={handleAddPhone}>
					+ Add Phone Number
				</div>

				{/* Clear Phone Numbers Button */}
				{formValues.phone.length > 0 && (
					<div
						className="p-3 rounded-xl border border-secondary text-secondary font-medium text-sm cursor-pointer"
						onClick={handleClearNumbers}
					>
						<span className="text-red-500 font-semibold">×</span> Clear Numbers
					</div>
				)}
			</div>

			{/* Continue Button */}
			<Btn type="primary" label="Continue" disabled={isLoading} btnAction="submit" />

			{error && (
				<div className="-mt-8">
					<Alert type="danger" message={error} />
				</div>
			)}
		</form>
	);
}
