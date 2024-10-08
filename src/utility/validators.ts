// Utility function for email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Utility function for password validation
export const isValidPassword = (password: string): string | true => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>+\-_]/.test(password);

  if (!hasUppercase || !hasLowercase || !hasSpecialChar) {
    return "Password must contain an uppercase, lowercase, and a special character";
  }

  return true; // No errors
};

// Validate fields for login form
export const validateLoginFields = (values: {
  email: string;
  password: string;
}): string | true => {
  const { email, password } = values;

  if (!email) return "Email is required";
  if (!isValidEmail(email)) return "Invalid email format";

  const passwordValidation = isValidPassword(password);
  if (passwordValidation !== true) return passwordValidation;

  return true;
};

// Validate fields for registration form
export const validateRegisterFields = (values: {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}): string | true => {
  const {
    email,
    firstName,
    lastName,
    phoneNumber,
    password,
    confirmPassword,
    terms,
  } = values;

  if (!email) return "Email is required";
  if (!isValidEmail(email)) return "Invalid email format";

  if (!firstName) return "First name is required";
  if (!lastName) return "Last name is required";

  if (!phoneNumber) return "Phone number is required";
  if (phoneNumber.length < 10)
    return "Phone number must be at least 10 characters";

  const passwordValidation = isValidPassword(password);
  if (passwordValidation !== true) return passwordValidation;

  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";

  if (!terms) return "Please accept the terms and conditions";

  return true;
};

// Validate fields for profile update form
export const validateProfileFields = (values: {
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  occupation: string;
}): string | true => {
  const { dateOfBirth, gender, address, city, state, postalCode, occupation } =
    values;

  if (!dateOfBirth) return "Date of birth is required";
  if (!gender) return "Gender is required";

  if (!address) return "Address is required";
  if (address.length < 5) return "Address must be at least 5 characters";

  if (!city) return "City is required";
  if (city.length < 2) return "City must be at least 2 characters";

  if (!state) return "State is required";

  if (!postalCode) return "Postal code is required";
  if (postalCode.length < 5) return "Postal code must be at least 5 characters";

  if (!occupation) return "Occupation is required";
  if (occupation.length < 3) return "Occupation must be at least 3 characters";

  return true;
};



export const validateGetNewCardFields = (values: {
  location: {
    address: string,
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phone: string[];

}): string | true => {
  const { location, phone } = values
  
  if (!location.address) return "Address is required";
  if (location.address.length < 5) return "Address must be at least 5 characters";

  if (!location.city) return "City is required";
  if (location.city.length < 2) return "City must be at least 2 characters";

  if (!location.country) return "Country is required";
  if (!location.state) return "State is required";

  if (!location.zipCode) return "Postal code is required";
  if (location.zipCode.length < 5) return "Postal code must be at least 5 characters";

  if(phone.length < 1) return "At least one phone number is required";
  return true;
}
