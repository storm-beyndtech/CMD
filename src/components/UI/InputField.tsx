import { InputFieldProps } from "../../types/types";
import { useState } from "react";
import eye from "../../assets/icons/eye.svg";
import eyeSlash from "../../assets/icons/eye-slash.svg";
import calendar from "../../assets/icons/calendar.svg";
import flag from "../../assets/icons/ng.svg";
import cardIcon from "../../assets/icons/card.svg";
import cardProviders from "../../assets/card-providers.svg";
import { Link } from "react-router-dom";

export default function InputField({
  label,
  value,
  onChange,
  type,
  placeholder,
  required,
  id,
  checked,
  fieldOptions,
  page,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  switch (type) {
    // Primary Input
    case "primary":
      return (
        <label className="label relative">
          {label}
          <input
            value={value}
            onChange={(e) => onChange(e)}
            type={
              id === "email"
                ? "email"
                : id === "dateOfBirth"
                ? "date"
                : id === "experienceYears"
                ? "number"
                : "text"
            }
            className="input z-[3]"
            placeholder={placeholder}
            required={required}
            id={id}
          />

          {id === "dateOfBirth" && (
            <span className="absolute right-3 top-[50%] z-[1] translate-y-2 cursor-pointer">
              <img src={calendar} alt="calendar-icon" />
            </span>
          )}
        </label>
      );

    // card Inputs
    case "card":
      return (
        <div className="relative">
          <input
            value={value}
            onChange={(e) => onChange(e)}
            type="text"
            className="input z-[3]"
            placeholder={placeholder}
            required={required}
            id={id}
            maxLength={
              id === "cardExpiration" ? 5 : id === "cvc" ? 3 : undefined
            }
            pattern={
              id === "cardExpiration"
                ? "^(0[1-9]|1[0-2])/?([0-9]{2})$"
                : undefined
            }
            title={
              id === "cardExpiration"
                ? "Enter the expiration date in MM/YY format"
                : undefined
            }
          />

          {id === "cardExpiration" ? (
            <span className="absolute right-3 top-[50%] z-[1] -translate-y-2.5 cursor-pointer">
              <img src={calendar} alt="calendar-icon" width={22} />
            </span>
          ) : id === "cvc" ? (
            <span className="absolute right-3 top-[50%] z-[1] -translate-y-2.5 cursor-pointer">
              <img src={cardIcon} alt="card" width={22} />
            </span>
          ) : id === "cardNumber" ? (
            <span className="absolute right-3 top-[50%] z-[1] -translate-y-2.5 cursor-pointer">
              <img src={cardProviders} alt="providers" />
            </span>
          ) : (
            ""
          )}
        </div>
      );

    // Phone Input with Icon
    case "phone":
      return (
        <label className="label">
          {label}
          <div className="w-full flex items-center relative">
            <div className="h-full flex items-center gap-2 px-3 absolute left-0 top-0 z-[2]">
              <img src={flag} alt="flag" className="w-6" />
              <p className="text-[#383E49]">+234</p>
            </div>
            <input
              value={value}
              onChange={(e) => onChange(e)}
              type="tel"
              className="input !pl-[90px] relative"
              placeholder={placeholder}
              required={required}
              id={id}
              maxLength={10}
            />
          </div>
        </label>
      );

    // Password Input with Eye Icon
    case "password":
      return (
        <label className="label relative">
          {label}
          <input
            value={value}
            onChange={(e) => onChange(e)}
            type={showPassword ? "text" : "password"}
            className="input pr-10"
            placeholder={placeholder}
            required={required}
            id={id}
            autoComplete="new-password"
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-[50%] translate-y-2 cursor-pointer"
          >
            {showPassword ? (
              <img src={eyeSlash} alt="eye" />
            ) : (
              <img src={eye} alt="eye" />
            )}
          </span>
        </label>
      );

    // Terms Input
    case "terms":
      return (
        <div className="flex items-start gap-2">
          <input
            checked={checked}
            onChange={(e) => onChange(e)}
            type="checkbox"
            className="w-4 h-4"
            required
            id={id}
          />
          <p className="text-[#383E49] leading-6 -mt-1">
            {page === "payment" ? (
              <>
                By proceeding with your purchase, you accept our{" "}
                <br className="max-sm:hidden" />
                <Link to="/terms" className="text-secondary3 font-medium">
                  Terms and Conditions
                </Link>{" "}
              </>
            ) : (
              <>
                {" "}
                By proceeding with your account, you accept the{" "}
                <br className="max-sm:hidden" />
                <Link to="/terms" className="text-secondary3 font-medium">
                  Terms and Conditions
                </Link>{" "}
                given by CMD Rx Global
              </>
            )}
          </p>
        </div>
      );

    // Checkbox
    case "simpleCheckbox":
      return (
        <div className="flex sm:items-center gap-2">
          <input
            checked={checked}
            onChange={(e) => onChange(e)}
            type="checkbox"
            className="w-6 h-6"
            id={id}
          />
          <p className="text-[#383E49] font-semibold leading-6">{label}</p>
        </div>
      );

    // Select Field
    case "selectField":
      return (
        <label className="label">
          {label}
          <select
            id={id}
            value={value}
            onChange={onChange}
            className="input !text-lg"
          >
            {fieldOptions?.map((option, i) => (
              <option
                key={i}
                value={id === "country" ? option.name : option.value}
              >
                {option.name}
              </option>
            ))}
          </select>
        </label>
      );

    // Default Case (optional)
    default:
      return (
        <input
          value={value}
          onChange={(e) => onChange(e)}
          type="text"
          className="input"
          placeholder={placeholder}
          required={required}
          id={id}
        />
      );
  }
}
