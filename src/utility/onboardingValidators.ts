export const docSpecialtyValidatorV1 = (values: {
	specialities: string[];
	medicalLicenseNumber: string;
	experienceYears: number;
	practiceLocations: { hospital: string; location: string[] }[];
	consultationAvailability: string[];
	identificationNumber: string;
}): string | true => {
	const {
		specialities,
		medicalLicenseNumber,
		experienceYears,
		practiceLocations,
		consultationAvailability,
		identificationNumber,
	} = values;

	// Validate specialities: At least one specialty is required
	if (!specialities || specialities.length === 0) return "At least one specialty is required";

	// Validate medical license number: should be 6-10 digits
	if (!medicalLicenseNumber) return "Medical license number is required";
	if (medicalLicenseNumber.length < 3) return "License number should be at least 3 digits";

	// Validate medical license number: should be 6-10 digits
	if (!identificationNumber) return "Identification Number is required";
	if (identificationNumber.length < 3) return "Identification Number should be at least 3 digits";

	// Validate experience years: should be between 1 and 50 years
	if (!experienceYears) return "Years of experience is required";
	if (isNaN(experienceYears)) return "Experience years must be a valid number";
	if (experienceYears < 1 || experienceYears > 50)
		return "Experience must be between 1 and 50 years";

	// Validate practice locations: At least one practice location is required
	if (!practiceLocations || practiceLocations.length === 0)
		return "At least one practice location is required";

	// Validate consultation availability: must contain valid values
	if (!consultationAvailability || consultationAvailability.length === 0)
		return "At least one consultation type is required";
	if (
		!consultationAvailability.includes("in-person") &&
		!consultationAvailability.includes("online")
	)
		return "Consultation availability must include either 'in-person' or 'online'";

	return true;
};

export const docPrimaryPracticeLocationValidator = (values: {
	primaryPracticeLocation: {
		hospital: string;
		department: string;
		position: string;
		startDate: string;
	};
}): string | true => {
	const { primaryPracticeLocation } = values;

	// Validate hospital name: should not be empty
	if (!primaryPracticeLocation.hospital)
		return "Hospital name is required for primary practice location";

	// Validate department: should not be empty
	if (!primaryPracticeLocation.department)
		return "Department is required for primary practice location";

	// Validate position: should not be empty
	if (!primaryPracticeLocation.position)
		return "Position is required for primary practice location";

	// Validate start date: should be a valid date
	if (!primaryPracticeLocation.startDate)
		return "Start date is required for primary practice location";
	if (isNaN(Date.parse(primaryPracticeLocation.startDate)))
		return "Start date must be a valid date";

	return true;
};

export const docAvailabilityValidator = (values: {
	availability: {
		days: string[];
		startTime: string;
		endTime: string;
		allDay: boolean;
	};
}): string | true => {
	const { availability } = values;

	// Validate days: At least one day must be selected
	if (!availability.days || availability.days.length === 0)
		return "At least one available day must be selected";

	// Validate time fields if all-day is not selected
	if (!availability.allDay) {
		if (!availability.startTime) return "Start time is required if not available all day";
		if (!availability.endTime) return "End time is required if not available all day";
		if (availability.startTime >= availability.endTime)
			return "Start time must be earlier than end time";
	}

	return true;
};

export const labAndPharmacyUpdateValidator = (values: {
	name: string;
	licenseNumber: string;
	experienceYears: string;
	location: {
		address: string;
		city: string;
		state: string;
		country: string;
		zipCode: string;
	};
	contact: {
		firstName: string;
		lastName: string;
		role: string;
		phone: string;
		email: string;
	};
	isPrimaryAddress: boolean;
}): string | true => {
	const { name, licenseNumber, experienceYears, location, contact } = values;

	// Validate name (minimum length 2)
	if (!name || name.length < 2)
		return "Practice name is required and must be at least 2 characters";

	// Validate license number (minimum length 2)
	if (!licenseNumber || licenseNumber.length < 2)
		return "License number is required and must be at least 2 characters";

	// Validate experience years
	if (!experienceYears || isNaN(Number(experienceYears)) || Number(experienceYears) < 1)
		return "Valid experience years are required";

	// Validate location fields (minimum length 2 for address, city, state, country, zip code)
	if (!location.address || location.address.length < 2)
		return "Address is required and must be at least 2 characters";
	if (!location.city || location.city.length < 2)
		return "City is required and must be at least 2 characters";
	if (!location.state || location.state.length < 2)
		return "State is required and must be at least 2 characters";
	if (!location.country || location.country.length < 2)
		return "Country is required and must be at least 2 characters";
	if (!location.zipCode || location.zipCode.length < 2)
		return "Zip code is required and must be at least 2 characters";

	// Validate contact fields (minimum length 2 for first name, last name, role, phone, and email)
	if (!contact.firstName || contact.firstName.length < 2)
		return "Contact first name is required and must be at least 2 characters";
	if (!contact.lastName || contact.lastName.length < 2)
		return "Contact last name is required and must be at least 2 characters";
	if (!contact.role || contact.role.length < 2)
		return "Contact role is required and must be at least 2 characters";
	if (!contact.phone || contact.phone.length < 2)
		return "Contact phone number is required and must be at least 2 characters";
	if (!contact.email || contact.email.length < 2)
		return "Contact email is required and must be at least 2 characters";

	return true;
};
