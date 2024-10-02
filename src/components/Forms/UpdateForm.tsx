import { countries } from "../../lib/countries";
import { statesOfNigeria } from "../../lib/states";
import Alert from "../UI/Alert";
import Btn from "../UI/Btn";
import InputField from "../UI/InputField";

const genderList = [
  { name: "Select Gender", value: "none" },
  { name: "Male", value: "male" },
  { name: "Female", value: "female" },
];

export default function UpdateForm({
  onSubmit,
  handleChange,
  formValues,
  isLoading,
  error,
}: any) {
  const {
    isPrimaryAddress,
    address,
    gender,
    dateOfBirth,
    city,
    occupation,
    state,
    country,
    postalCode,
  } = formValues;

  return (
    <form
      className="w-full px-8 max-sm:px-5 flex flex-col gap-9"
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <InputField
        label="Date of Birth"
        placeholder="Select Date"
        type="primary"
        value={dateOfBirth}
        onChange={handleChange}
        required
        id="dateOfBirth"
      />

      <InputField
        label="Gender"
        placeholder="Select Gender"
        type="selectField"
        value={gender}
        onChange={handleChange}
        required
        id="gender"
        fieldOptions={genderList}
      />

      <InputField
        label="Address"
        placeholder="Street Address"
        type="primary"
        value={address}
        onChange={handleChange}
        required
        id="address"
      />

      <div className="grid grid-cols-2 gap-2.5">
        <InputField
          placeholder="City"
          value={city}
          onChange={handleChange}
          required
          id="city"
        />

        <InputField
          placeholder="State"
          value={state}
          onChange={handleChange}
          required
          type="selectField"
          id="state"
          fieldOptions={statesOfNigeria}
        />
      </div>

      <InputField
        placeholder="Country of Residence"
        value={country}
        onChange={handleChange}
        required
        type="selectField"
        id="country"
        fieldOptions={countries}
      />

      <InputField
        placeholder="Postal Code"
        value={postalCode}
        onChange={handleChange}
        required
        id="postalCode"
      />

      <InputField
        type="simpleCheckbox"
        label="This will be used as your primary address"
        onChange={handleChange}
        checked={isPrimaryAddress}
        id="isPrimaryAddress"
      />

      <InputField
        label="Occupation"
        placeholder="e.g Retired Orthodontist"
        type="primary"
        value={occupation}
        onChange={handleChange}
        required
        id="occupation"
      />

      <Btn
        type="primary"
        label="Create Account"
        disabled={isLoading}
        btnAction="submit"
        auth
      />
      {error && <div className="-mt-8"><Alert type="danger" message={error} /></div>}
    </form>
  );
}
