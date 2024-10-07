import { countries } from "../../lib/countries"; // Assuming you have a country list
import { statesOfNigeria } from "../../lib/states"; // Assuming you have a state list
import Alert from "../UI/Alert";
import Btn from "../UI/Btn";
import InputField from "../UI/InputField";

export default function PharmacyCompleteRegForm({
  onSubmit,
  handleChange,
  formValues,
  isLoading,
  error,
}: any) {
  const {
    name,
    licenseNumber,
    experienceYears,
    location: { address, city, state, country, zipCode },
    contact: { firstName, lastName, role, phone, email },
    isPrimaryAddress,
  } = formValues;

  return (
    <form
      className="w-full px-8 max-sm:px-5 flex flex-col gap-4"
      onSubmit={onSubmit}
      autoComplete="off"
    >
      {/* Pharmacy Name */}
      <InputField
        label="Pharmacy Name"
        placeholder="e.g Revive Health Center"
        type="primary"
        value={name}
        onChange={handleChange}
        id="name"
      />

      {/* Pharmacy License Number */}
      <InputField
        label="Pharmacy License Number"
        placeholder="e.g MED-ABC123"
        type="primary"
        value={licenseNumber}
        onChange={handleChange}
        id="licenseNumber"
      />

      {/* Years of Experience */}
      <InputField
        label="Years of Experience"
        placeholder="0"
        type="primary"
        value={experienceYears}
        onChange={handleChange}
        id="experienceYears"
      />

      {/* Pharmacy Address */}
      <p className="font-medium mt-4 text-gray-500">Primary Address</p>
      <InputField
        placeholder="Street Address"
        value={address}
        onChange={handleChange}
        id="address"
      />

      <div className="grid grid-cols-2 gap-2.5">
        <InputField
          placeholder="City"
          value={city}
          onChange={handleChange}
          id="city"
        />

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

      <InputField
        placeholder="Postal Code"
        value={zipCode}
        onChange={handleChange}
        id="zipCode"
      />

      <InputField
        type="simpleCheckbox"
        label="This will be used as your primary address"
        onChange={handleChange}
        checked={isPrimaryAddress}
        id="isPrimaryAddress"
      />

      {/* Contact Person */}
      <p className="font-medium mt-4 text-gray-500">Contact Person</p>
      <div className="grid grid-cols-2 gap-2.5">
        <InputField
          type="primary"
          placeholder="First Name"
          value={firstName}
          onChange={handleChange}
          id="firstName"
        />

        <InputField
          label="Last Name"
          placeholder="Last Name"
          value={lastName}
          onChange={handleChange}
          id="lastName"
        />
      </div>

      <InputField
        placeholder="e.g Pharmacist"
        value={role}
        onChange={handleChange}
        id="role"
      />

      <InputField
        placeholder="Phone Number"
        value={phone}
        onChange={handleChange}
        id="phone"
      />

      <InputField
        placeholder="Email Address"
        value={email}
        onChange={handleChange}
        id="email"
      />

      {/* Continue Button */}
      <Btn
        type="primary"
        label="Continue"
        disabled={isLoading}
        btnAction="submit"
      />

      {error && (
        <div className="-mt-8">
          <Alert type="danger" message={error} />
        </div>
      )}
    </form>
  );
}
