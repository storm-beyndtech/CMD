import React, { useState } from "react";
import Btn from "../UI/Btn";

interface ReasonOption {
	value: string;
	label: string;
}

export default function RequestNewCardForm() {
	const [selectedReason, setSelectedReason] = useState<string | null>(null);
	const [customReason, setCustomReason] = useState<string>("");

	// Define the array of options
	const reasonOptions: ReasonOption[] = [
		{
			value: "lost",
			label: "I lost my CarePoints Card, and I need a new one to continue using my benefits",
		},
		{ value: "membership", label: "I’ve switched to a different membership plan" },
		{ value: "expired", label: "My card has expired" },
		{ value: "damaged", label: "My CarePoints Card is damaged" },
		{ value: "other", label: "Other" },
	];

	const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setSelectedReason(value);
		if (value !== "other") {
			setCustomReason("");
		}
	};

	const handleCustomReasonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCustomReason(event.target.value);
	};

	return (
		<div className="w-full max-w-[500px] mx-auto p-7 bg-white rounded-[14px]">
			<h2 className="text-xl font-semibold text-gray-900">Requesting for a new card because</h2>
			<p className="text-sm text-gray-600 mb-6">Select your reason for requesting a new card</p>

			{/* Dynamically render radio options */}
			<div className="space-y-10">
				{reasonOptions.map((option) => (
					<div key={option.value}>
						<label className="flex items-center space-x-3">
							<input
								type="radio"
								name="deactivate-reason"
								value={option.value}
								checked={selectedReason === option.value}
								onChange={handleReasonChange}
								className="form-radio h-5 w-5 text-indigo-600 flex-shrink-0"
							/>
							<span className="text-gray-700 text-sm">{option.label}</span>
						</label>

						{/* Show custom input if 'Other' is selected */}
						{selectedReason === "Other" && option.value === "Other" && (
							<textarea
								value={customReason}
								onChange={handleCustomReasonChange}
								placeholder="Please let us know"
								rows={4}
								className="mt-3 w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						)}
					</div>
				))}
			</div>

			{/* Button */}
			<div className="mt-5" onClick={() => alert(`Reason: ${selectedReason}, Custom: ${customReason}`)}>
				<Btn type="primary" label="Continue" auth />
			</div>
		</div>
	);
}
