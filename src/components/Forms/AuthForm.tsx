import Btn from "../UI/Btn";
import InputField from "../UI/InputField";

export default function AuthForm({
  onSubmit,
  handleChange,
  formValues,
  isLoading,
  authType,
}: any) {
  const {
    email,
    firstName,
    lastName,
    password,
    confirmPassword,
    phoneNumber,
    terms,
    stayLoggedIn,
  } = formValues;

  return (
    <form
      className="w-full px-8 max-sm:px-5 flex flex-col gap-9"
      onSubmit={onSubmit}
      autoComplete="off"
    >
      {authType === "register" && (
        <>
          <InputField
            label="Email"
            placeholder="Enter an email address"
            type="primary"
            value={email}
            onChange={handleChange}
            required
            id="email"
          />

          <div className="grid grid-cols-2 gap-2.5">
            <InputField
              label="First Name"
              placeholder="John"
              type="primary"
              value={firstName}
              onChange={handleChange}
              required
              id="firstName"
            />

            <InputField
              label="Last Name"
              placeholder="Doe"
              type="primary"
              value={lastName}
              onChange={handleChange}
              required
              id="lastName"
            />
          </div>

          {/* Phone Number */}
          <InputField
            label="Phone Number"
            placeholder="814-353-3456"
            type="phone"
            value={phoneNumber}
            onChange={handleChange}
            required
            id="phoneNumber"
          />

          {/* Password */}
          <div className="grid grid-cols-2 gap-2.5">
            <InputField
              label="Create Password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={handleChange}
              required
              id="password"
            />

            <InputField
              label="Confirm Password"
              placeholder="••••••••"
              type="password"
              value={confirmPassword}
              onChange={handleChange}
              required
              id="confirmPassword"
            />
          </div>

          <InputField
            type="terms"
            onChange={handleChange}
            checked={terms}
            id="terms"
          />

          <Btn
            type="primary"
            label="Create Account"
            disabled={isLoading}
            btnAction="submit"
            auth
          />
        </>
      )}

      {authType === "login" && (
        <>
          <InputField
            label="Email"
            placeholder="Enter your email address"
            type="primary"
            value={email}
            onChange={handleChange}
            required
            id="email"
          />

          <InputField
            label="Password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={handleChange}
            required
            id="password"
          />

          <InputField
            type="simpleCheckbox"
            onChange={handleChange}
            checked={stayLoggedIn}
            id="stayLoggedIn"
            label="Stay Logged In"
          />

          <Btn
            type="primary"
            label="Login"
            disabled={isLoading}
            btnAction="submit"
            auth
          />
        </>
      )}
    </form>
  );
}
