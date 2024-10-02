import Alert from "../UI/Alert";
import Btn from "../UI/Btn";
import InputField from "../UI/InputField";

export default function PaymentForm({
  onSubmit,
  handleChange,
  formValues,
  isLoading,
  error,
  page,
}: any) {
  const { email, nameOnCard, cardNumber, cardExpiration, cvc, terms } =
    formValues;

  return (
    <form
      className="w-full flex flex-col gap-9"
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <InputField
        label="Confirm Email"
        placeholder="Enter your email"
        type="primary"
        value={email}
        onChange={handleChange}
        required
        id="email"
      />

      <InputField
        placeholder="Name on the card"
        value={nameOnCard}
        onChange={handleChange}
        required
        id="nameOnCard"
      />

      <InputField
        type="card"
        placeholder="Card Number"
        value={cardNumber}
        onChange={handleChange}
        required
        id="cardNumber"
      />

      <div className="grid grid-cols-2 gap-2.5">
        <InputField
          type="card"
          placeholder="Expiration (MM/YY)"
          value={cardExpiration}
          onChange={handleChange}
          required
          id="cardExpiration"
        />

        <InputField
          type="card"
          placeholder="CVC"
          value={cvc}
          onChange={handleChange}
          required
          id="cvc"
        />
      </div>

      <InputField
        type="terms"
        onChange={handleChange}
        checked={terms}
        id="terms"
        page={page}
      />

      <Btn
        type="primary"
        label="Continue"
        disabled={isLoading}
        btnAction="submit"
        auth
      />
      {error && <Alert type="danger" message={error} />}
    </form>
  );
}
