import { useState } from "react";
import { PlatformCard } from "../../components/PlatformCard";
import PaymentForm from "../../components/Forms/PaymentForm";
import { OrderSummary } from "../../components/OrderSummary";
import { consultations } from "../../lib/dashboardUtils";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { paymentMethods } from "../../lib/utils";
import { contextData } from "../../context/AuthContext";
import { validateCardPaymentFields } from "../../utility/cardValidation";

export default function Checkout() {
  const { user } = contextData();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: user ? user.email : "",
    nameOnCard: "",
    cardNumber: "",
    cardExpiration: "",
    cvc: "",
    terms: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleChange = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
    setError(null)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Handle payment submission logic here
    const isValid = validateCardPaymentFields(formValues);

    if (isValid === true) {
      navigate("/payment-message?type=prescription");
    } else {
      setError(isValid);
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-primary pb-10 px-5">
      <div className="w-full grid place-content-center">
        <Link to="/">
          <img className="w-[150px] mx-auto mt-5" alt="logo" src={logo} />
        </Link>

        <h2 className="title sm:!text-[22px] !text-xl text-center my-8">
          Complete your order
        </h2>

        <div className="flex gap-5 max-lg:flex-col-reverse">
          {/* Left Section: Platform Card or Payment Form */}
          {!showPaymentForm ? (
            <PlatformCard setShowPaymentForm={setShowPaymentForm} />
          ) : (
            <div className="flex-shrink-0 w-full max-w-[542px] bg-white rounded-[14px] py-8 px-8 shadow-lg shadow-[#eaeaeaa6]">
              <div className="w-full flex justify-between gap-2 pb-4">
                {paymentMethods.map((meth, i) => (
                  <Link
                    to={meth.url}
                    key={i}
                    className="w-1/3 border border-[#f0f0f0] p-2.5 rounded-lg grid gap-1"
                  >
                    <img src={meth.img} alt={meth.name} />
                    <p className="font-medium text-[#383E49] text-sm">
                      {meth.name}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="flex items-center py-6">
                <span className="block w-[44%] h-[1px] bg-[#f2f2f2]"></span>
                <span className="block bg-white text-[#48505E] px-2">OR</span>
                <span className="block w-[44%] h-[1px] bg-[#f2f2f2]"></span>
              </div>

              <PaymentForm
                onSubmit={handleSubmit}
                handleChange={handleChange}
                formValues={formValues}
                isLoading={loading}
                error={error}
                page="payment"
              />
            </div>
          )}

          {/* Right Section: Order Summary */}
          <OrderSummary items={consultations[0].prescriptions} fees={15} />
        </div>
      </div>
    </div>
  );
}
