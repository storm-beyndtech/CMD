import { isValidEmail } from "./validators";

// Utility function to check if card number length is greater than 10
export const isValidCardNumber = (cardNumber: string): boolean => {
  return cardNumber.length > 10;
};


// Utility function for card expiration validation (MM/YY)
export const isValidCardExpiration = (cardExpiration: string): boolean => {
  const expirationRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  if (!expirationRegex.test(cardExpiration)) return false;

  const [month, year] = cardExpiration.split("/");
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-based

  const expMonth = parseInt(month, 10);
  const expYear = parseInt(year, 10);

  return (
    expYear > currentYear ||
    (expYear === currentYear && expMonth >= currentMonth)
  );
};

// Utility function for CVC validation (3 or 4 digits)
export const isValidCVC = (cvc: string): boolean => {
  const cvcRegex = /^\d{3,4}$/;
  return cvcRegex.test(cvc);
};

// Validate fields for card payment form
export const validateCardPaymentFields = (values: {
  email: string;
  nameOnCard: string;
  cardNumber: string;
  cardExpiration: string;
  cvc: string;
  terms: boolean;
}): string | true => {
  const { email, nameOnCard, cardNumber, cardExpiration, cvc, terms } = values;

  // Email validation
  if (!email) return "Email is required";
  if (!isValidEmail(email)) return "Invalid email format";

  // Name on card validation
  if (!nameOnCard) return "Name on card is required";

  // Card number validation
  if (!cardNumber) return "Card number is required";
  if (!isValidCardNumber(cardNumber)) return "Invalid card number";

  // Card expiration date validation
  if (!cardExpiration) return "Card expiration date is required";
  if (!isValidCardExpiration(cardExpiration))
    return "Invalid card expiration date";

  // CVC validation
  if (!cvc) return "CVC is required";
  if (!isValidCVC(cvc)) return "Invalid CVC";

  // Terms and conditions validation
  if (!terms) return "You must accept the terms and conditions";

  return true;
};
